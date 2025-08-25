import { DropdownItem, Link as HeroUILink } from '@heroui/react';
import { createLink } from '@tanstack/react-router';

export const HeroLink = createLink(HeroUILink);

export const DropdownItemLink = createLink(DropdownItem);
