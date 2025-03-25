import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({ children, title, description, settings, ...props }: { children: React.ReactNode; title: string; description: string; settings:any }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
