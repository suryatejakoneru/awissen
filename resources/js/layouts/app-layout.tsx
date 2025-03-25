import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import React from 'react';
import { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    return (
        <div>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1F2937',
                        color: '#fff',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10B981',
                            secondary: '#1F2937',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#1F2937',
                        },
                    },
                }}
            />
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppLayoutTemplate>
        </div>
    );
};

export default AppLayout;
