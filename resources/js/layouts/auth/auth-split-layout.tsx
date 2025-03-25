import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote, settings } = usePage<SharedData>().props;

    return (
        <div className="relative grid bg-[#0f0f3d] h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-[#0a0a29] bg-opacity-50 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center bg-blend-soft-light" />
                <Link href={route('/')} className="relative z-20 flex items-center text-lg font-medium">
                    <img 
                        src={settings?.branding_logo} 
                        alt="AWISSEN" 
                        className="h-8 w-auto filter drop-shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                    />
                    {/* <AppLogoIcon className="mr-2 size-8 fill-current text-white" /> */}
                    {/* {name} */}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">&ldquo;{quote.message}&rdquo;</p>
                            <footer className="text-sm text-[#a8a8d8]">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full bg-[#0f0f3d] lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('/')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-white sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium text-white">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance text-[#a8a8d8]">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
