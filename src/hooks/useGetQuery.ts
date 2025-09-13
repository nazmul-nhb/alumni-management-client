import { useAxiosPublic, useAxiosSecure } from '@/hooks/useAxios';
import type { TQueryKey } from '@/types';
import type { IErrorResponse, IServerResponse } from '@/types/interface';
import { useQuery, type UndefinedInitialDataOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { QueryObject } from 'nhb-toolbox/object/types';

/**
 * * Options for the query hook.
 *
 * @template T - the inner `data` type returned inside `IServerResponse`
 */
export interface QueryOptions<T>
	extends Omit<
		UndefinedInitialDataOptions<
			T | undefined,
			AxiosError<IErrorResponse, unknown>,
			T | undefined,
			readonly TQueryKey[]
		>,
		'queryKey' | 'queryFn'
	> {
	/** API endpoint path starting with a slash */
	endpoint: `/${string}`;
	/** Optional query params appended to the request */
	params?: QueryObject;
	/** Stable query key used by TanStack Query for caching/invalidation */
	queryKey: TQueryKey[];
	/** Which axios instance to use, defaults to `'public'` */
	connection?: 'secured' | 'public';
}

/**
 * * A thin wrapper around TanStack Query's `useQuery` with axios integration.
 *
 * - Automatically chooses between secured/public axios instances.
 * - Strongly typed with the generic `T` representing the `data` field inside your API response.
 * - Uses `queryKey` for cache identity and invalidation.
 *
 * @template T - The type of the response `data` field inside `IServerResponse`.
 *
 * @param options - Configuration object extending TanStack's `UndefinedInitialDataOptions`
 *                  with additional fields like `endpoint`, `params`, `queryKey`, and `connection`.
 *
 * @returns The full `UseQueryResult` object from TanStack Query, containing:
 * - `data`: typed as `T | undefined`
 * - `isLoading`, `isError`, `error`, etc.
 *
 * @example
 * ```ts
 * const { data, isLoading } = useGetQuery<{ name: string }>({
 *   endpoint: '/users',
 *   queryKey: ['Users'],
 *   connection: 'secured'
 * });
 * ```
 */
export const useGetQuery = <T>(options: QueryOptions<T>) => {
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();

	const { connection = 'public', endpoint, params, queryKey, ...rest } = options;

	const axios = connection === 'secured' ? axiosSecure : axiosPublic;

	const data = useQuery<
		T | undefined,
		AxiosError<IErrorResponse, unknown>,
		T | undefined,
		readonly TQueryKey[]
	>({
		queryKey,
		queryFn: async () => {
			const result = await axios.get<IServerResponse<T>>(endpoint, { params });

			return result.data.data;
		},
		...rest,
	});

	return { ...data, error: data.error?.response?.data };
};
