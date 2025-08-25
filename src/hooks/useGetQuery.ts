import { useQuery, type UndefinedInitialDataOptions } from '@tanstack/react-query';
import type { QueryObject } from 'nhb-toolbox/object/types';
import type { TQueryKey } from '../types';
import { useAxiosPublic, useAxiosSecure } from './useAxios';

export interface GetQueryOptions<T>
	extends Omit<
		UndefinedInitialDataOptions<T, Error, T, readonly TQueryKey[]>,
		'queryKey' | 'queryFn'
	> {
	endpoint: `/${string}`;
	params?: QueryObject;
	queryKey: TQueryKey[];
	connection?: 'secured' | 'public';
}

export const useGetQuery = <T>(options: GetQueryOptions<T>) => {
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();

	const { connection = 'public', endpoint, params, queryKey, ...rest } = options;

	const axios = connection === 'secured' ? axiosSecure : axiosPublic;

	const data = useQuery<T, Error, T, readonly TQueryKey[]>({
		queryKey,
		queryFn: async () => {
			const result = await axios.get<T>(endpoint, { params });

			return result.data;
		},
		...rest
	});

	return data;
};
