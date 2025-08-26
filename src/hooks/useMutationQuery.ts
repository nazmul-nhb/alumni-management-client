import {
	useMutation,
	useQueryClient,
	type UseMutationOptions
} from '@tanstack/react-query';
import type { QueryObject } from 'nhb-toolbox/object/types';
import type { TQueryKey } from '../types';
import type { IServerResponse } from '../types/interface';
import { useAxiosPublic, useAxiosSecure } from './useAxios';

/**
 * * Options for the mutation hook.
 *
 * @template TVariables - the type of variables/payload passed to `mutate` (e.g. body)
 * @template TResponse - the inner `data` type returned inside `IServerResponse`
 */
export interface MutationOptions<TVariables, TResponse = unknown>
	extends Omit<
		UseMutationOptions<IServerResponse<TResponse>, Error, TVariables, unknown>,
		'mutationFn'
	> {
	/** API endpoint path starting with a slash */
	endpoint: `/${string}`;
	/** optional query params appended to the request */
	params?: QueryObject;
	/** stable query key to invalidate after success */
	queryKey: TQueryKey[];
	/** which axios instance to use */
	connection?: 'secured' | 'public';
	/** HTTP method for the request */
	method: 'post' | 'put' | 'patch' | 'delete';
}

/**
 * * Tiny mutation hook using Axios + TanStack Query.
 *
 * - Pass `TVariables` (payload type) and optionally `TResponse` (the shape inside IServerResponse.data)
 * - Returns the full `UseMutationResult` so callers can use `mutate`, `mutateAsync`, `isLoading`, etc.
 *
 * @example
 * const { mutateAsync } = useMutationQuery<{ name: string }, User>({ endpoint: '/users', method: 'post', queryKey: ['Users'] });
 * await mutateAsync({ name: 'Nazmul' });
 */
export function useMutationQuery<TVariables, TResponse = unknown>(
	options: MutationOptions<TVariables, TResponse>
) {
	const queryClient = useQueryClient();

	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();

	const { connection = 'public', endpoint, params, queryKey, method, ...rest } = options;

	const axios = connection === 'secured' ? axiosSecure : axiosPublic;

	const result = useMutation<IServerResponse<TResponse>, Error, TVariables, unknown>({
		// mutationFn receives the variables passed to mutate / mutateAsync
		mutationFn: async (variables: TVariables) => {
			const res = await axios[method]<IServerResponse<TResponse>>(
				endpoint,
				variables,
				{ params }
			);

			return res.data;
		},

		// onSuccess: call user-provided onSuccess (if any), then invalidate
		onSuccess: async (data, variables, context) => {
			// call caller's onSuccess if they provided one in options
			if (typeof rest.onSuccess === 'function') {
				await rest.onSuccess(data, variables, context);
			}

			// invalidate the exact query key provided
			await queryClient.invalidateQueries({
				queryKey,
				exact: true
			});
		},

		...rest
	});

	return result;
}
