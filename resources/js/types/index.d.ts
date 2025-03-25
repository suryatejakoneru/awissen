import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface Settings {
    logo?: string;
    footer_logo?: string;
    branding_logo?: string;
    branding_footer_logo?: string;
    branding_icon_light?: string;
    social_media_facebook?: string;
    social_media_twitter?: string;
    social_media_linkedin?: string;
    social_media_instagram?: string;
    contact_address?: string;
    contact_phone?: string;
    contact_email?: string;
    map_embed_url?: string;
    // Add other settings as needed
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    settings?: Settings;
    currentRoute?: string;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
