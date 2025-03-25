import React from 'react';
import { Link, router, Head } from '@inertiajs/react';
import { 
    Home, 
    Users, 
    BookOpen, 
    FileText, 
    Settings, 
    LogOut,
    BarChart2,
    Edit,
    CheckSquare,
    Award,
    User,
    Lock
} from 'react-feather';
import { Toaster } from 'react-hot-toast';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'admin' | 'moderator' | 'writer' | 'user';
    title?: string;
    description?: string;
}

const menuItems = {
    admin: [
        { icon: Home, label: 'Dashboard', link: '/admin/dashboard' },
        { icon: Users, label: 'Users', link: '/admin/users' },
        { icon: Award, label: 'Colleges', link: '/admin/colleges' },
        { icon: BookOpen, label: 'Courses', link: '/admin/courses' },
        { icon: FileText, label: 'Blog', link: '/admin/blog' },
        { icon: Award, label: 'Certificates', link: '/admin/certificates' },
        { icon: Settings, label: 'Settings', link: '/admin/settings' },
    ],
    moderator: [
        { icon: Home, label: 'Dashboard', link: '/moderator/dashboard' },
        { icon: BookOpen, label: 'Courses', link: '/moderator/courses' },
        { icon: FileText, label: 'Blog', link: '/moderator/blog' },
        { icon: CheckSquare, label: 'Approvals', link: '/moderator/approvals' },
    ],
    writer: [
        { icon: Home, label: 'Dashboard', link: '/writer/dashboard' },
        { icon: FileText, label: 'Blog', link: '/writer/blog' },
        { icon: Edit, label: 'My Posts', link: '/writer/posts' },
    ],
    user: [
        { icon: Home, label: 'Dashboard', link: '/dashboard' },
        //{ icon: BookOpen, label: 'My Courses', link: '/dashboard/courses' },
        { icon: User, label: 'Profile Settings', link: '/profile' },
        { icon: Lock, label: 'Password', link: '/password' },
    ],
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role, title, description }) => {
    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.post('/logout', {}, {
            preserveScroll: true,
            preserveState: false
        });
    };

    return (
        <div className="min-h-screen bg-[#0D1117] flex">
            <Head title={title}>
                <meta name="description" content={description} />
            </Head>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1F2937',
                        color: '#fff',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10B981',
                            secondary: '#1F2937',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#1F2937',
                        },
                    },
                }}
            />
            {/* Sidebar */}
            <aside className="fixed h-screen w-64 bg-[#161B22] border-r border-[#30363D] flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0EA5A0] to-[#13C4BC]">
                        AWISSEN
                    </h2>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    {menuItems[role].map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="flex items-center px-6 py-3 text-[#8B949E] hover:text-white hover:bg-[#30363D] transition-colors duration-200"
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="flex items-center px-6 py-3 text-[#8B949E] hover:text-white hover:bg-[#30363D] transition-colors duration-200 w-full"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;