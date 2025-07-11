import { Kbd } from '@heroui/kbd';
import HeroLink from './ui/HeroLink';
import { Input } from '@heroui/input';
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem
} from '@heroui/navbar';
import { link as linkStyles } from '@heroui/theme';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { TwitterIcon, GithubIcon, DiscordIcon, SearchIcon } from '@/components/icons';
import { Logo } from '@/components/icons';

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: 'bg-default-100',
				input: 'text-sm'
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={['command']}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<HeroLink
						className="flex justify-start items-center gap-1"
						color="foreground"
						href="/"
					>
						<Logo />
						<p className="font-bold text-inherit">ACME</p>
					</HeroLink>
				</NavbarBrand>
				<div className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<HeroLink
								className={clsx(
									linkStyles({ color: 'foreground' }),
									'data-[active=true]:text-primary data-[active=true]:font-medium'
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</HeroLink>
						</NavbarItem>
					))}
				</div>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
				<NavbarItem className="hidden sm:flex gap-2">
					<HeroLink isExternal href={siteConfig.links.twitter} title="Twitter">
						<TwitterIcon className="text-default-500" />
					</HeroLink>
					<HeroLink isExternal href={siteConfig.links.discord} title="Discord">
						<DiscordIcon className="text-default-500" />
					</HeroLink>
					<HeroLink isExternal href={siteConfig.links.github} title="GitHub">
						<GithubIcon className="text-default-500" />
					</HeroLink>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<HeroLink isExternal href={siteConfig.links.github}>
					<GithubIcon className="text-default-500" />
				</HeroLink>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<HeroLink
								color={
									index === 2 ? 'primary'
									: index === siteConfig.navMenuItems.length - 1 ?
										'danger'
									:	'foreground'
								}
								href="#"
								size="lg"
							>
								{item.label}
							</HeroLink>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</HeroUINavbar>
	);
};
