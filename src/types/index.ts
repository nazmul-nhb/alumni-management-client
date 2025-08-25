import type { LinkProps as HLinkProps } from '@heroui/react';
import type { LinkProps as TLinkProps } from '@tanstack/react-router';
import type { Prettify } from 'nhb-toolbox/utils/types';
import type { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type CombinedLinkProps = Prettify<HLinkProps & TLinkProps>;

export type LinkTo = TLinkProps['to'];
