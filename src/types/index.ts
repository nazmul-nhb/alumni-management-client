import type { LinkProps as HLinkProps } from '@heroui/react';
import type { LinkProps as TLinkProps } from '@tanstack/react-router';
import type { LooseLiteral, Prettify } from 'nhb-toolbox/utils/types';
import type { SVGProps } from 'react';
import type { QUERY_KEYS } from '@/config/constants';
import type { Branded } from 'nhb-toolbox/types';

export type IconSvgProps = Prettify<
	SVGProps<SVGSVGElement> & {
		size?: number;
	}
>;

export type CombinedLinkProps = Prettify<HLinkProps & TLinkProps>;

export type LinkTo = TLinkProps['to'];

export type TQueryKey = LooseLiteral<(typeof QUERY_KEYS)[number]> | number;

export type Email = Branded<string, 'email'>;

export type ObjectId = Branded<'string', 'ObjectId'>;
