import { ComponentType } from 'preact';

export type NewsEntry = {
	Content: ComponentType;
	author?: string;
	coverImage?: string;
	date: string;
	featured: boolean;
	focus?: string;
	slug: string;
	summary: string;
	tags: string[];
	title: string;
};
