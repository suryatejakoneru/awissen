import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 bg-[#0D1117]">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-[#8B949E]/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-[#8B949E]/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-[#8B949E]/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-[#30363D] bg-[#161B22] md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-[#8B949E]/20" />
                </div>
            </div>
        </AppLayout>
    );
}
