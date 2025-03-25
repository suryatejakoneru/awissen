import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { CheckSquare, AlertTriangle, Clock, ThumbsUp, FileText } from 'react-feather';

const ModeratorDashboard = () => {
    const stats = [
        { icon: CheckSquare, label: 'Approved Content', value: '156', change: '+8%' },
        { icon: AlertTriangle, label: 'Pending Review', value: '23', change: '-15%' },
        { icon: Clock, label: 'Avg. Response Time', value: '2.5h', change: '-30m' },
        { icon: ThumbsUp, label: 'Quality Score', value: '94%', change: '+2%' },
    ];

    return (
        <DashboardLayout role="moderator">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Moderator Dashboard</h1>
                    <p className="text-[#8B949E]">Monitor and manage content across the platform.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[#0EA5A0] hover:shadow-[0_0_30px_rgba(14,165,160,0.3)] transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-[#0D1117] rounded-full p-3">
                                    <stat.icon className="w-6 h-6 text-[#0EA5A0]" />
                                </div>
                                <span className={`text-sm ${stat.change.includes('+') ? 'text-green-500' : 'text-yellow-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-[#8B949E]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Pending Reviews */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Pending Reviews</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b border-[#30363D] last:border-0"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-[#0D1117] flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-[#0EA5A0]" />
                                    </div>
                                    <div>
                                        <p className="text-white">New Blog Post: "Advanced Automotive Electronics"</p>
                                        <p className="text-[#8B949E] text-sm">Submitted 30 minutes ago</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20 transition-colors duration-200">
                                        Approve
                                    </button>
                                    <button className="px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors duration-200">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ModeratorDashboard; 