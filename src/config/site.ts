export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'PU English Alumni',
	description: 'Alumni Management for Prime University English Department',
	navItems: [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'About',
			href: '/about'
		}
	],
	links: {
		github: 'https://github.com/frontio-ai/heroui',
		twitter: 'https://twitter.com/hero_ui',
		docs: 'https://heroui.com',
		discord: 'https://discord.gg/9b6yyZKmH4',
		sponsor: 'https://patreon.com/jrgarciadev'
	}
} as const;
