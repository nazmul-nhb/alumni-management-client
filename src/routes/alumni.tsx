import AlumniTable from '@/components/AlumniTable';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/alumni')({
	component: RouteComponent,
});

function RouteComponent() {
	return <AlumniTable />;
}
