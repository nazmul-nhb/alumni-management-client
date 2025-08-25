import { DropdownItem, Link as HeroUILink } from '@heroui/react';
import { createLink } from '@tanstack/react-router';
import type { CombinedLinkProps } from '../../types';

const Link = createLink(HeroUILink);

export const HeroLink = (props: CombinedLinkProps) => {
	return <Link {...props} />;
};

export const DropdownItemLink = createLink(DropdownItem);
