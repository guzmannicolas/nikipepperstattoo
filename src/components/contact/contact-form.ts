// Browser side of ContactForm.astro: shows the questions of the chosen service, shrinks photos
// before upload, renders the Turnstile CAPTCHA (a fresh token after every attempt: tokens are
// single-use) and posts everything to the CMS endpoint as multipart/form-data.
// The endpoint's answers: { ok: true } or { ok: false, error, fields? } (see the CMS docs).

interface Config {
	endpoint: string;
	siteKey: string;
	lang: "en" | "es";
	placeholders: Record<string, string>;
	imageLabels: { default: string; murals: string };
	messages: Record<string, string>;
}
interface Turnstile {
	render(el: HTMLElement, options: Record<string, unknown>): string;
	getResponse(id: string): string | undefined;
	reset(id: string): void;
	remove(id: string): void;
}
declare global {
	interface Window { turnstile?: Turnstile }
}

const MAX_IMAGES = 5;
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_SIDE = 2000; // px, longest side after shrinking
const EMAIL = /^[^\s@<>,;"']+@[^\s@<>,;"']+\.[^\s@<>,;"']+$/;

function loadTurnstile(): Promise<Turnstile> {
	if (window.turnstile) return Promise.resolve(window.turnstile);
	return new Promise((resolve, reject) => {
		let script = document.querySelector<HTMLScriptElement>("script[data-turnstile-api]");
		if (!script) {
			script = document.createElement("script");
			script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
			script.async = true;
			script.dataset.turnstileApi = "";
			document.head.appendChild(script);
		}
		script.addEventListener("load", () => (window.turnstile ? resolve(window.turnstile) : reject()));
		script.addEventListener("error", () => reject());
	});
}

// Phone photos are 3-10 MB: resize to MAX_SIDE and re-encode as JPEG (~300-600 KB). Formats the
// browser can't decode (e.g. HEIC outside Safari) are sent as they are; the server accepts them.
async function shrink(file: File): Promise<File> {
	if (file.type === "image/gif") return file;
	try {
		const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
		const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
		const canvas = document.createElement("canvas");
		canvas.width = Math.round(bitmap.width * scale);
		canvas.height = Math.round(bitmap.height * scale);
		const ctx = canvas.getContext("2d")!;
		ctx.fillStyle = "#fff"; // transparent PNGs get a white background, not black
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		bitmap.close();
		const blob = await new Promise<Blob | null>((done) => canvas.toBlob(done, "image/jpeg", 0.82));
		if (!blob || blob.size >= file.size) return file;
		return new File([blob], `${file.name.replace(/\.[^.]+$/, "") || "image"}.jpg`, { type: "image/jpeg" });
	} catch {
		return file;
	}
}

export function initContactForm(root: HTMLElement) {
	if (root.dataset.ready) return;
	root.dataset.ready = "1";
	const config: Config = JSON.parse(root.querySelector("[data-config]")!.textContent!);
	const msg = config.messages;
	const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
	const form = $<HTMLFormElement>("[data-form]");
	const status = $("[data-status]");
	const submit = $<HTMLButtonElement>("[data-submit]");
	const message = $<HTMLTextAreaElement>("#cf-message");
	const fileInput = $<HTMLInputElement>("[data-file-input]");
	const dropzone = $("[data-dropzone]");
	const previews = $("[data-previews]");
	const imagesError = $("[data-images-error]");
	let images: { file: File; url: string }[] = [];
	let widgetId: string | null = null;

	// --- service -> its questions, placeholder and images label --------------------------------
	const service = () => form.querySelector<HTMLInputElement>('input[name="service"]:checked')?.value ?? "";
	function showService(key: string) {
		root.querySelectorAll<HTMLElement>("[data-service-fields]").forEach((el) => (el.hidden = el.dataset.serviceFields !== key));
		message.placeholder = config.placeholders[key] ?? config.placeholders.other;
		$("[data-images-label]").textContent = key === "murals" ? config.imageLabels.murals : config.imageLabels.default;
		markInvalid("service", false);
	}
	form.addEventListener("change", (e) => {
		const target = e.target as HTMLInputElement;
		if (target.name === "service") showService(target.value);
	});
	const preset = new URLSearchParams(location.search).get("service");
	const presetInput = preset && form.querySelector<HTMLInputElement>(`input[name="service"][value="${CSS.escape(preset)}"]`);
	if (presetInput) {
		presetInput.checked = true;
		showService(preset!);
	}

	// Answers of the visible questions, as the visitor saw them: [{ key, label, value }]
	function answers() {
		const list: { key: string; label: string; value: string }[] = [];
		const group = root.querySelector<HTMLElement>(`[data-service-fields="${service()}"]`);
		group?.querySelectorAll<HTMLElement>("[data-question]").forEach((q) => {
			let value = "";
			if (q.dataset.type === "single" || q.dataset.type === "multi") {
				value = [...q.querySelectorAll<HTMLInputElement>("input:checked")].map((i) => i.dataset.text).join(", ");
			} else if (q.dataset.type === "select") {
				const select = q.querySelector("select")!;
				value = select.value ? select.selectedOptions[0].text : "";
			} else {
				value = q.querySelector("input")!.value.trim();
			}
			if (value) list.push({ key: q.dataset.question!, label: q.dataset.label!, value });
		});
		return list;
	}

	// --- images ----------------------------------------------------------------------------------
	function showImagesError(text = "") {
		imagesError.textContent = text;
		imagesError.classList.toggle("hidden", !text);
	}
	function renderPreviews() {
		previews.replaceChildren(...images.map((img, i) => {
			const li = document.createElement("li");
			li.className = "relative aspect-square";
			const pic = document.createElement("img");
			pic.src = img.url;
			pic.alt = "";
			pic.className = "h-full w-full rounded-lg object-cover border border-neutral-200";
			const remove = document.createElement("button");
			remove.type = "button";
			remove.setAttribute("aria-label", msg.remove);
			remove.className = "absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black text-white text-sm leading-none hover:bg-red-600";
			remove.textContent = "×";
			remove.addEventListener("click", () => {
				URL.revokeObjectURL(img.url);
				images.splice(i, 1);
				renderPreviews();
				showImagesError();
			});
			li.append(pic, remove);
			return li;
		}));
	}
	async function addFiles(files: FileList | File[]) {
		showImagesError();
		markInvalid("images", false);
		for (const original of files) {
			if (images.length >= MAX_IMAGES) { showImagesError(msg.tooMany); break; }
			if (!original.type.startsWith("image/") && !/\.(heic|heif)$/i.test(original.name)) { showImagesError(msg.notImage); continue; }
			const file = await shrink(original);
			if (file.size > MAX_BYTES) { showImagesError(msg.tooBig); continue; }
			images.push({ file, url: URL.createObjectURL(file) });
		}
		renderPreviews();
	}
	fileInput.addEventListener("change", () => {
		if (fileInput.files) addFiles([...fileInput.files]);
		fileInput.value = "";
	});
	dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.dataset.over = ""; });
	dropzone.addEventListener("dragleave", () => delete dropzone.dataset.over);
	dropzone.addEventListener("drop", (e) => {
		e.preventDefault();
		delete dropzone.dataset.over;
		if (e.dataTransfer?.files) addFiles([...e.dataTransfer.files]);
	});

	// --- CAPTCHA -----------------------------------------------------------------------------------
	loadTurnstile().then((turnstile) => {
		widgetId = turnstile.render($("[data-turnstile]"), {
			sitekey: config.siteKey, action: "contact", theme: "light", size: "flexible", language: config.lang,
		});
	}).catch(() => showStatus(msg.network));
	document.addEventListener("astro:before-swap", () => {
		if (widgetId) window.turnstile?.remove(widgetId);
		images.forEach((img) => URL.revokeObjectURL(img.url));
	}, { once: true });

	// --- errors ----------------------------------------------------------------------------------
	function showStatus(text = "") {
		status.textContent = text;
		status.classList.toggle("hidden", !text);
	}
	function markInvalid(field: string, invalid = true) {
		const el = root.querySelector<HTMLElement>(`[data-field="${field}"]`);
		if (!el) return;
		if (el.matches("input, textarea")) {
			el.setAttribute("aria-invalid", String(invalid));
		} else {
			for (const cls of ["ring-2", "ring-red-400", "ring-offset-4", "rounded-xl"]) el.classList.toggle(cls, invalid);
		}
	}
	for (const field of ["name", "email", "phone", "message"]) {
		$(`[data-field="${field}"]`).addEventListener("input", () => markInvalid(field, false));
	}
	form.addEventListener("input", () => showStatus()); // the visitor is fixing it

	// --- send ------------------------------------------------------------------------------------
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		showStatus();
		const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement).value.trim();
		const missing = [
			!service() && "service",
			!value("name") && "name",
			!EMAIL.test(value("email")) && "email",
			!value("message") && "message",
		].filter(Boolean) as string[];
		if (missing.length) {
			missing.forEach((f) => markInvalid(f));
			showStatus(msg.required);
			root.querySelector<HTMLElement>(`[data-field="${missing[0]}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
			return;
		}
		const token = widgetId ? window.turnstile?.getResponse(widgetId) : "";
		if (!token) { showStatus(msg.captchaPending); return; }

		const data = new FormData();
		data.append("service", service());
		for (const name of ["name", "email", "phone", "message", "hp_field"]) data.append(name, value(name));
		data.append("language", config.lang);
		data.append("answers", JSON.stringify(answers()));
		images.forEach((img) => data.append("images", img.file, img.file.name));
		data.append("cf-turnstile-response", token);

		submit.disabled = true;
		submit.textContent = msg.sending;
		try {
			const res = await fetch(config.endpoint, { method: "POST", body: data });
			const body = await res.json().catch(() => null);
			if (body?.ok) return showSuccess(value("name"), value("email"));
			(body?.fields ?? []).forEach((f: string) => markInvalid(f));
			showStatus(msg[body?.error] ?? msg.server);
		} catch {
			showStatus(msg.network);
		} finally {
			submit.disabled = false;
			submit.textContent = msg.submit;
			if (widgetId) window.turnstile?.reset(widgetId); // the token is spent either way
		}
	});

	const success = $("[data-success]");
	function showSuccess(name: string, email: string) {
		$("[data-success-text]").textContent = msg.successText.replace("{name}", name.split(" ")[0]).replace("{email}", email);
		form.reset();
		images.forEach((img) => URL.revokeObjectURL(img.url));
		images = [];
		renderPreviews();
		showService("");
		form.hidden = true;
		success.hidden = false;
		root.scrollIntoView({ block: "start" }); // the page just got shorter: jump, don't animate
		success.focus({ preventScroll: true });
	}
	$("[data-again]").addEventListener("click", () => {
		success.hidden = true;
		form.hidden = false;
	});
}
