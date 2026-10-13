// Picks portfolio images for the home/cross-promo components from the CMS-generated data
// (src/data/*.json + src/assets/<section>/**), instead of "first file in a folder".
// Order: items marked "featured" in the CMS first, then the CMS sort order.
import type { ImageMetadata } from "astro";
import tattoos from "../data/tattoos.json";
import works from "../data/works.json";
import ceramics from "../data/ceramics.json";
import murals from "../data/murals.json";

export type Section = "tattoos" | "works" | "ceramics" | "murals";

interface Entry {
	featured: boolean;
	categories: string[];
	images: string[];
}

const assets = import.meta.glob<{ default: ImageMetadata }>(
	"/src/assets/{tattoos,works,ceramics,murals}/**/*.{avif,jpeg,jpg,png,webp,JPG,JPEG,PNG}",
	{ eager: true },
);

const splitCats = (c?: string) =>
	(c ?? "").split(",").map((s) => s.trim()).filter(Boolean);

const data: Record<Section, Entry[]> = {
	tattoos: tattoos.items.map((i: any) => ({
		featured: !!i.featured,
		categories: splitCats(i.category),
		images: i.images.map((im: any) => im.path),
	})),
	ceramics: ceramics.items.map((i: any) => ({
		featured: !!i.featured,
		categories: splitCats(i.category),
		images: i.images.map((im: any) => im.path),
	})),
	works: (works as any[]).map((i) => ({
		featured: !!i.featured,
		categories: i.series ? [i.series] : [],
		images: i.image ? [i.image] : [],
	})),
	murals: (murals as any[]).map((i) => ({
		featured: !!i.featured,
		categories: [],
		images: i.image ? [i.image] : [],
	})),
};

function featuredFirst(section: Section, category?: string): Entry[] {
	const list = data[section].filter((e) => !category || e.categories.includes(category));
	return [...list.filter((e) => e.featured), ...list.filter((e) => !e.featured)];
}

/** Cover images (first image of each item) for a section, featured items first. */
export function covers(section: Section, count: number, category?: string): ImageMetadata[] {
	return featuredFirst(section, category)
		.map((e) => assets[e.images[0]]?.default)
		.filter((img): img is ImageMetadata => !!img)
		.slice(0, count);
}

/** The single cover image for a section (or a category within it), or null if empty. */
export function cover(section: Section, category?: string): ImageMetadata | null {
	return covers(section, 1, category)[0] ?? null;
}
