import '../css/app.css';

declare global {
    interface Window {
        route: (name: string, params?: any) => string;
        routes?: Record<string, string>;
        ziggy?: {
            url: string;
            port: number | null;
            default: Record<string, string>;
            routes: Record<string, string>;
        };
    }
}

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Add route helper to window object
        window.route = (name: string, params?: any) => {
            if (!window.ziggy) {
                return name;
            }
            return window.ziggy.routes[name] || name;
        };

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
