import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FileText, Eye, ThumbsUp, TrendingUp } from 'react-feather';

const WriterDashboard = () => {
    const stats = [
        { icon: FileText, label: 'Total Posts', value: '24', change: '+3' },
        { icon: Eye, label: 'Total Views', value: '12.5k', change: '+18%' },
        { icon: ThumbsUp, label: 'Engagement', value: '89%', change: '+5%' },
        { icon: TrendingUp, label: 'Growth', value: '+45%', change: '+12%' },
    ];

    return (
        <DashboardLayout role="writer">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Writer Dashboard</h1>
                    <p className="text-[#8B949E]">Track your content performance and manage your posts.</p>
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
                                <span className="text-sm text-green-500">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-[#8B949E]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Posts */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Posts</h2>
                        <button className="px-4 py-2 bg-[#0EA5A0] text-white rounded-lg hover:bg-[#13C4BC] transition-colors duration-200">
                            New Post
                        </button>
                    </div>
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
                                        <p className="text-white">The Future of Electric Vehicles</p>
                                        <div className="flex items-center space-x-4 text-[#8B949E] text-sm">
                                            <span>Published 2 days ago</span>
                                            <span>•</span>
                                            <span>1.2k views</span>
                                            <span>•</span>
                                            <span>24 comments</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-[#0EA5A0] hover:text-[#13C4BC] transition-colors duration-200">
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Performance Chart */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Views Performance</h2>
                    <div className="h-64 flex items-center justify-center">
                        <p className="text-[#8B949E]">Chart will be implemented here</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default WriterDashboard; 