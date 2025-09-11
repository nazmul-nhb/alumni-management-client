import '@/styles/globals.css';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { TitleProvider } from 'nhb-hooks';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { siteConfig } from '@/config/site';
import { routeTree } from '@/routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	context: {
		queryClient,
	},
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<HeroUIProvider>
					<ToastProvider placement="bottom-right" />
					<TitleProvider config={{ siteTitle: siteConfig.name }}>
						<RouterProvider router={router} />
					</TitleProvider>
				</HeroUIProvider>
			</QueryClientProvider>
		</StrictMode>
	);
}
