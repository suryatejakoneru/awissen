// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-[#8a2be2]">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#a8a8d8]">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="bg-[#0f0f3d] border-[#2d2d6d] text-white placeholder:text-[#a8a8d8] focus:border-[#8a2be2] focus:ring-[#8a2be2] focus:ring-1 rounded-md"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button 
                            className="w-full bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] hover:from-[#8a2be2] hover:to-[#6a11cb] text-white rounded-md" 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="text-[#a8a8d8] space-x-1 text-center text-sm">
                    <span>Or, return to</span>
                    <TextLink href={route('login')} className="text-[#8a2be2] hover:text-[#6a11cb]">log in</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
