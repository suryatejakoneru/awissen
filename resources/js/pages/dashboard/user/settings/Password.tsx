import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useForm } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';

const UserPasswordSettings = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Submit the form and show toast based on the result
        post('/password', {
            onSuccess: () => {
                // Show success toast only after successful update
                toast.success('Password updated successfully!');
                reset();
            },
            onError: (errors) => {
                // Show error toast with specific message
                if (errors.current_password) {
                    toast.error('Current password is incorrect');
                } else {
                    toast.error('Failed to update password');
                }
            },
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout role="user" title='Password Settings'>
            {/* Add Toaster component */}
            <Toaster position="top-right" />
            
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Password Settings</h1>
                    <p className="text-[#8B949E]">Update your password to keep your account secure</p>
                </div>

                {/* Password Form */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 max-w-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <label htmlFor="current_password" className="block text-white font-medium mb-2">Current Password</label>
                            <input
                                type="password"
                                id="current_password"
                                value={data.current_password}
                                onChange={e => setData('current_password', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5A0] focus:border-transparent"
                            />
                            {errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>}
                        </div>

                        {/* New Password */}
                        <div>
                            <label htmlFor="password" className="block text-white font-medium mb-2">New Password</label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5A0] focus:border-transparent"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-white font-medium mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5A0] focus:border-transparent"
                            />
                        </div>

                        {/* Password Requirements */}
                        <div className="bg-[#0D1117] p-4 rounded-lg border border-[#30363D]">
                            <h3 className="text-white font-medium mb-2">Password Requirements:</h3>
                            <ul className="text-[#8B949E] text-sm space-y-1">
                                <li>• Minimum 8 characters long</li>
                                <li>• At least one uppercase letter</li>
                                <li>• At least one lowercase letter</li>
                                <li>• At least one number</li>
                                <li>• At least one special character</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-[#0EA5A0] text-white rounded-lg hover:bg-[#13C4BC] transition-colors duration-200 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserPasswordSettings;