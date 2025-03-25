import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useForm, usePage } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
    role: string;
    profile_photo?: string;
}

// Define a custom page props interface with index signature
interface CustomPageProps {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any; // Add index signature for string keys
}

const UserProfileSettings = () => {
    const { auth } = usePage<CustomPageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        phone_number: auth.user.phone_number || '',
    });
    
    // Format phone number for display (xxxx-nnnnnn)
    const formatPhoneNumber = (value: string) => {
        // Only format if we have enough digits
        if (value.length >= 4) {
            return `${value.slice(0, 4)}-${value.slice(4)}`;
        }
        return value;
    };
    
    // Add phone number validation function
    const validatePhoneNumber = (value: string) => {
        // Remove any non-numeric characters and dashes
        const numericValue = value.replace(/\D/g, '');
        
        // Limit to 10 digits
        return numericValue.slice(0, 10);
    };
    
    // Display formatted version but save raw numeric value
    const [displayPhone, setDisplayPhone] = React.useState(
        auth.user.phone_number ? formatPhoneNumber(auth.user.phone_number) : ''
    );
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = validatePhoneNumber(e.target.value);
        setData('phone_number', rawValue);
        setDisplayPhone(formatPhoneNumber(rawValue));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/profile', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profile updated successfully');
            },
        });
    };

    return (
        <DashboardLayout role="user" title='Profile Settings'>
            {/* Add Toaster component directly in the component */}
            <Toaster position="top-right" />
            
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
                    <p className="text-[#8B949E]">Update your personal information</p>
                </div>

                {/* Profile Form */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 max-w-lg">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-white font-medium mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5A0] focus:border-transparent"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-white font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5A0] focus:border-transparent"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone Number - New field */}
                        <div>
                            {/* Phone Number field with formatting */}
                            <div>
                                <label htmlFor="phone_number" className="block text-white font-medium mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    value={displayPhone}
                                    onChange={handlePhoneChange}
                                    className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0EA5A0] focus:border-transparent"
                                    placeholder="Enter 10 digit number (xxxx-nnnnnn)"
                                />
                                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                                {data.phone_number && data.phone_number.length < 10 && (
                                    <p className="text-yellow-500 text-sm mt-1">Please enter a 10-digit phone number</p>
                                )}
                            </div>
                            {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-[#0EA5A0] text-white rounded-lg hover:bg-[#13C4BC] transition-colors duration-200 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserProfileSettings;