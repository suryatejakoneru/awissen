import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BookOpen, Award, User, Lock } from 'react-feather';
import { Link, usePage } from '@inertiajs/react';

// Define interfaces for our data
interface DashboardProps {
    coursesAttended: number;
    certificatesEarned: number;
}

// Add to your CustomPageProps interface
interface CustomPageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        }
    };
    dashboard?: DashboardProps;
    [key: string]: any;
}

const UserDashboard = () => {
    const { dashboard } = usePage<CustomPageProps>().props;
    
    // Use real data if available, otherwise fallback to defaults
    const stats = [
        { 
            icon: BookOpen, 
            label: 'Courses Attended', 
            value: dashboard?.coursesAttended?.toString() || '0', 
            change: '+1' 
        },
        { 
            icon: User, 
            label: 'Profile Completion', 
            value: '100%', 
            change: 'Complete' 
        },
        { 
            icon: Award, 
            label: 'Certificates Earned', 
            value: dashboard?.certificatesEarned?.toString() || '0', 
            change: 'Recent' 
        },
    ];

    return (
        <DashboardLayout role="user" title='Dashboard'>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Learning Dashboard</h1>
                    <p className="text-[#8B949E]">Track your progress and continue learning.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[#0EA5A0] hover:shadow-[0_0_30px_rgba(14,165,160,0.3)] transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-[#0D1117] rounded-full p-3">
                                    <stat.icon className="w-6 h-6 text-[#0EA5A0]" />
                                </div>
                                <span className="text-sm text-green-500">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-[#8B949E]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Settings Shortcuts */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link 
                            href="/profile" 
                            className="bg-[#0D1117] rounded-lg p-4 border border-[#30363D] hover:border-[#0EA5A0] transition-all duration-300 flex items-center space-x-4"
                        >
                            <div className="w-12 h-12 bg-[#161B22] rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-[#0EA5A0]" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Profile Settings</h3>
                                <p className="text-[#8B949E] text-sm">Update your personal information</p>
                            </div>
                        </Link>
                        
                        <Link 
                            href="/password" 
                            className="bg-[#0D1117] rounded-lg p-4 border border-[#30363D] hover:border-[#0EA5A0] transition-all duration-300 flex items-center space-x-4"
                        >
                            <div className="w-12 h-12 bg-[#161B22] rounded-full flex items-center justify-center">
                                <Lock className="w-6 h-6 text-[#0EA5A0]" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Password</h3>
                                <p className="text-[#8B949E] text-sm">Change your password</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserDashboard;