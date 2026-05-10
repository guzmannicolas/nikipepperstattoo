export const prerender = false;

export async function POST({ request }: { request: Request }) {
	const formData = await request.formData();

	const token = formData.get('cf-turnstile-response');
	if (!token || typeof token !== 'string') {
		return new Response(JSON.stringify({ ok: false, error: 'Missing CAPTCHA token' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// Verify Turnstile token server-side
	const verifyForm = new FormData();
	verifyForm.append('secret', import.meta.env.TURNSTILE_SECRET_KEY);
	verifyForm.append('response', token);

	const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body: verifyForm,
	});
	const verifyData = await verifyRes.json() as { success: boolean };

	if (!verifyData.success) {
		return new Response(JSON.stringify({ ok: false, error: 'CAPTCHA verification failed' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	// Remove Turnstile token before forwarding
	formData.delete('cf-turnstile-response');

	const sendRes = await fetch('https://formsubmit.co/ajax/nikipepperstattoo@gmail.com', {
		method: 'POST',
		body: formData,
		headers: { Accept: 'application/json' },
	});

	if (sendRes.ok) {
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const json = await sendRes.json().catch(() => null) as { message?: string } | null;
	return new Response(
		JSON.stringify({ ok: false, error: json?.message || 'Error sending message' }),
		{ status: 500, headers: { 'Content-Type': 'application/json' } }
	);
}
