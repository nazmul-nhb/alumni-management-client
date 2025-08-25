import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '../components/navbar';
import { HeroLink } from '../components/ui/HeroLink';

export const Route = createRootRoute({
	component: () => (
		<div className="relative flex flex-col h-screen">
			<Navbar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
				<hr />
				<Outlet />
				<TanStackRouterDevtools />
			</main>
			<footer className="w-full flex items-center justify-center py-3">
				<HeroLink
					isExternal
					className="flex items-center gap-1 text-current"
					to={'https://heroui.com' as '/'}
					title="heroui.com homepage"
				>
					<span className="text-default-600">Powered by</span>
					<p className="text-primary">HeroUI</p>
				</HeroLink>
			</footer>
		</div>
	)
});
