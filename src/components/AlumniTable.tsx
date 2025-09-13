import { useGetQuery } from '@/hooks/useGetQuery';
import type { IAlumnusInfo } from '@/types/alumnus';
import {
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import type { DotNotationKey, GenericObject } from 'nhb-toolbox/object/types';

function getNestedValue<T extends GenericObject>(obj: T, path: DotNotationKey<T>) {
	if (!path.includes('.')) {
		return obj[path] as any;
	}
	return path.split('.').reduce((current, key) => current?.[key], obj);
}

const columns: Array<{ key: DotNotationKey<IAlumnusInfo>; label: string }> = [
	{
		key: 'personal_info.full_name',
		label: 'NAME',
	},
	{
		key: 'contact_info.email',
		label: 'EMAIL',
	},
	{
		key: 'contact_info.phone',
		label: 'PHONE',
	},
	{
		key: 'academic_info.degree_earned',
		label: 'DEGREE',
	},
	{
		key: 'participation',
		label: 'PARTICIPATION',
	},
];

export default function AlumniTable() {
	const { data = [], isLoading } = useGetQuery<IAlumnusInfo[]>({
		endpoint: '/alumni',
		queryKey: ['Alumni'],
		connection: 'secured',
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<Table isStriped aria-label="Alumni table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody emptyContent="No Data Found!" items={data}>
				{(item) => (
					<TableRow key={item._id}>
						{(columnKey) => (
							<TableCell>
								{getNestedValue(
									item,
									columnKey as DotNotationKey<IAlumnusInfo>
								)}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
