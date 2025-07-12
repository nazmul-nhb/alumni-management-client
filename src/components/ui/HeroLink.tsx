import { Link as HeroLink, type LinkProps as HeroLinkProps } from '@heroui/link';
import { Link as RouterLink, LinkProps as RouterLinkProps } from '@tanstack/react-router';
import { forwardRef } from 'react';

type CombinedLinkProps = HeroLinkProps &
	Omit<RouterLinkProps, 'to'> & {
		to?: string;
		href?: string;
		isExternal?: boolean;
	};

const Link = forwardRef<HTMLAnchorElement, CombinedLinkProps>((props, ref) => {
	const { to, href, isExternal, ...restProps } = props;

	// If isExternal or no 'to' prop, use HeroUI Link
	if (isExternal || !to) {
		return <HeroLink ref={ref} href={href || to} {...restProps} />;
	}

	// For internal routing, use TanStack Router Link with HeroUI styles
	return (
		<RouterLink
			ref={ref}
			to={to}
			{...restProps}
			className={`${restProps.className || ''}`}
		/>
	);
});

Link.displayName = 'HeroLink';

export default Link;
