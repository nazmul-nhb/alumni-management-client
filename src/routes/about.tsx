import { createFileRoute } from '@tanstack/react-router';
import { title } from '../components/primitives';
import { useTitle } from 'nhb-hooks';

export const Route = createFileRoute('/about')({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ name: 'description', content: 'About page for Alumni Management' },
			{ name: 'keywords', content: 'about, alumni management, information' },
			{ title: 'About | Alumni Management' }
		]
	})
});

function RouteComponent() {
	useTitle('About');

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>About</h1>
			</div>
		</section>
	);
}
