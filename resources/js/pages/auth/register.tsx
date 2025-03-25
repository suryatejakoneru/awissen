import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[#8B949E]">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="bg-[#161B22] border-[#30363D] text-white placeholder:text-[#8B949E] focus:border-[#0EA5A0] focus:ring-[#0EA5A0] focus:ring-1 rounded-md"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#8B949E]">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="bg-[#161B22] border-[#30363D] text-white placeholder:text-[#8B949E] focus:border-[#0EA5A0] focus:ring-[#0EA5A0] focus:ring-1 rounded-md"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[#8B949E]">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                            className="bg-[#161B22] border-[#30363D] text-white placeholder:text-[#8B949E] focus:border-[#0EA5A0] focus:ring-[#0EA5A0] focus:ring-1 rounded-md"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-[#8B949E]">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            className="bg-[#161B22] border-[#30363D] text-white placeholder:text-[#8B949E] focus:border-[#0EA5A0] focus:ring-[#0EA5A0] focus:ring-1 rounded-md"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-4 w-full bg-[#0EA5A0] hover:bg-[#13C4BC] text-white rounded-md" 
                        tabIndex={5} 
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-[#8B949E] text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} className="text-[#0EA5A0] hover:text-[#13C4BC]" tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
