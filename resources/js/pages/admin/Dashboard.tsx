import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Users, BookOpen, FileText, Activity, Award } from 'react-feather';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define types for our data
interface StatItem {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
    change: string;
}

interface ActivityItem {
    type: 'user' | 'course' | 'blog' | 'certificate';
    description: string;
    time: string;
    actionUrl?: string;
}

interface ChartDataItem {
    month: string;
    users: number;
    courses: number;
    blogs: number;
    certificates: number;
}

// Define the auth type
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

// Extend the Inertia PageProps interface
interface CustomPageProps {
    auth: {
        user: User;
    };
    [key: string]: any; // Add index signature for string keys
}

const AdminDashboard = () => {
    const { auth } = usePage<CustomPageProps>().props;
    const [stats, setStats] = useState<StatItem[]>([
        { icon: Users, label: 'Total Users', value: '...', change: '...' },
        { icon: BookOpen, label: 'Active Courses', value: '...', change: '...' },
        { icon: FileText, label: 'Blog Posts', value: '...', change: '...' },
        { icon: Award, label: 'Certificates', value: '...', change: '...' },
        { icon: Activity, label: 'User Activity', value: '...', change: '...' },
    ]);
    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('/api/admin/dashboard-stats');
                
                if (response.data) {
                    setStats([
                        { 
                            icon: Users, 
                            label: 'Total Users', 
                            value: response.data.users.total.toString(), 
                            change: `${response.data.users.percentChange}%` 
                        },
                        { 
                            icon: BookOpen, 
                            label: 'Active Courses', 
                            value: response.data.courses.active.toString(), 
                            change: `${response.data.courses.percentChange}%` 
                        },
                        { 
                            icon: FileText, 
                            label: 'Blog Posts', 
                            value: response.data.blogs.total.toString(), 
                            change: `${response.data.blogs.percentChange}%` 
                        },
                        { 
                            icon: Award, 
                            label: 'Certificates', 
                            value: response.data.certificates.total.toString(), 
                            change: `${response.data.certificates.percentChange}%` 
                        },
                        { 
                            icon: Activity, 
                            label: 'User Activity', 
                            value: `${response.data.activity.total}`, 
                            change: `${response.data.activity.percentChange}%` 
                        },
                    ]);
                    
                    // Make sure we're handling the recentActivity data correctly
                    if (Array.isArray(response.data.recentActivity)) {
                        setRecentActivity(response.data.recentActivity);
                    }
                    
                    // Set chart data
                    if (Array.isArray(response.data.chartData)) {
                        setChartData(response.data.chartData);
                    }
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchDashboardData();
        
        // Set up polling for real-time updates (every 30 seconds)
        const interval = setInterval(fetchDashboardData, 30000);
        
        return () => clearInterval(interval);
    }, []);

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = recentActivity.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(recentActivity.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
    // Prepare chart data
    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#FFFFFF'
                }
            },
            title: {
                display: true,
                text: 'Growth Over Last 12 Months',
                color: '#FFFFFF'
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#8B949E'
                },
                grid: {
                    color: '#30363D'
                }
            },
            y: {
                ticks: {
                    color: '#8B949E'
                },
                grid: {
                    color: '#30363D'
                }
            }
        }
    };
    
    const preparedChartData: ChartData<'line'> = {
        labels: chartData.map(item => item.month),
        datasets: [
            {
                label: 'Users',
                data: chartData.map(item => item.users),
                borderColor: '#0EA5A0',
                backgroundColor: 'rgba(14, 165, 160, 0.5)',
                tension: 0.3
            },
            {
                label: 'Courses',
                data: chartData.map(item => item.courses),
                borderColor: '#E34C26',
                backgroundColor: 'rgba(227, 76, 38, 0.5)',
                tension: 0.3
            },
            {
                label: 'Blogs',
                data: chartData.map(item => item.blogs),
                borderColor: '#563D7C',
                backgroundColor: 'rgba(86, 61, 124, 0.5)',
                tension: 0.3
            },
            {
                label: 'Certificates',
                data: chartData.map(item => item.certificates),
                borderColor: '#F1E05A',
                backgroundColor: 'rgba(241, 224, 90, 0.5)',
                tension: 0.3
            }
        ]
    };

    return (
        <DashboardLayout role="admin" title='Admin Dashboard'>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-[#8B949E]">Welcome back, {auth.user.name}! Here's what's happening with your platform.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.slice(0, 4).map((stat, index) => (
                        <div
                            key={index}
                            className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 hover:border-[#0EA5A0] hover:shadow-[0_0_30px_rgba(14,165,160,0.3)] transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="bg-[#0D1117] rounded-full p-3">
                                    <stat.icon className="w-6 h-6 text-[#0EA5A0]" />
                                </div>
                                <span className={`text-sm ${!loading && stat.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                                    {loading ? '...' : stat.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">{loading ? '...' : stat.value}</h3>
                            <p className="text-[#8B949E]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Chart Section - Full Width */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6 w-full">
                    <h2 className="text-xl font-bold text-white mb-6">Growth Trends</h2>
                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-[#8B949E]">Loading chart data...</p>
                        </div>
                    ) : chartData.length > 0 ? (
                        <div className="w-full h-96">
                            <Line 
                                options={{
                                    ...chartOptions,
                                    maintainAspectRatio: false,
                                    responsive: true
                                }} 
                                data={preparedChartData} 
                            />
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[#8B949E]">No chart data available</p>
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                    {loading ? (
                        <div className="text-center py-8">
                            <p className="text-[#8B949E]">Loading activity data...</p>
                        </div>
                    ) : recentActivity.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {currentItems.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between py-3 border-b border-[#30363D] last:border-0"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-[#0D1117] flex items-center justify-center">
                                                {activity.type === 'user' && <Users className="w-5 h-5 text-[#0EA5A0]" />}
                                                {activity.type === 'course' && <BookOpen className="w-5 h-5 text-[#0EA5A0]" />}
                                                {activity.type === 'blog' && <FileText className="w-5 h-5 text-[#0EA5A0]" />}
                                                {activity.type === 'certificate' && <Award className="w-5 h-5 text-[#0EA5A0]" />}
                                            </div>
                                            <div>
                                                <p className="text-white">{activity.description}</p>
                                                <p className="text-[#8B949E] text-sm">{activity.time}</p>
                                            </div>
                                        </div>
                                        {activity.actionUrl && (
                                            <a href={activity.actionUrl} className="text-[#0EA5A0] hover:text-[#13C4BC] transition-colors duration-200">
                                                View
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6">
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                            disabled={currentPage === 1}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === 1 
                                                    ? 'bg-[#0D1117] text-[#8B949E] cursor-not-allowed' 
                                                    : 'bg-[#0D1117] text-[#0EA5A0] hover:bg-[#1C2128]'
                                            }`}
                                        >
                                            Previous
                                        </button>
                                        
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => paginate(i + 1)}
                                                className={`w-8 h-8 rounded flex items-center justify-center ${
                                                    currentPage === i + 1
                                                        ? 'bg-[#0EA5A0] text-white'
                                                        : 'bg-[#0D1117] text-[#0EA5A0] hover:bg-[#1C2128]'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                        
                                        <button
                                            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                            disabled={currentPage === totalPages}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === totalPages 
                                                    ? 'bg-[#0D1117] text-[#8B949E] cursor-not-allowed' 
                                                    : 'bg-[#0D1117] text-[#0EA5A0] hover:bg-[#1C2128]'
                                            }`}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-[#8B949E]">No recent activity found</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;