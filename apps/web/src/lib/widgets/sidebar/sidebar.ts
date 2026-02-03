import type { Component } from 'svelte';
import {
  CommunityIcon,
  InstagramIcon,
  ProfileCircleIcon,
  TelegramIcon,
} from '@packages/ui';

import { APP_ROUTES } from '$lib/navigation';

export type NavItem = {
  title: string;
  href: string;
  icon?: Component<{ size?: number }>;
  disabled?: boolean;
};

export const sidebarItems: NavItem[] = [
  {
    title: 'Profile',
    href: APP_ROUTES.profile,
    icon: ProfileCircleIcon,
    disabled: false,
  },
  {
    title: 'Contacts',
    href: APP_ROUTES.contacts,
    icon: CommunityIcon,
    disabled: false,
  },
  {
    title: 'Messages',
    href: APP_ROUTES.messages,
    icon: TelegramIcon,
    disabled: false,
  },
  {
    title: 'Stories',
    href: APP_ROUTES.stories,
    icon: InstagramIcon,
    disabled: false,
  },
];

export function getActiveNavItem(pathname: string) {
  return sidebarItems.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + '/'),
  );
}
