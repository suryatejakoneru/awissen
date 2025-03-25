import React from 'react';
import Layout from '../components/layout/Layout';
import { Link } from '@inertiajs/react';

const Sitemap = () => {
    const siteStructure = [
        {
            title: 'Main Pages',
            links: [
                { name: 'Home', url: '/' },
                { name: 'About', url: '/about' },
                { name: 'Courses', url: '/courses' },
                { name: 'Blog', url: '/blog' },
                { name: 'Certification', url: '/certification' },
                { name: 'Contact', url: '/contact' },
            ]
        },
        {
            title: 'User Account',
            links: [
                { name: 'Login', url: '/login' },
                { name: 'Dashboard', url: '/dashboard' },
                { name: 'Profile Settings', url: '/settings/profile' },
                { name: 'Password Settings', url: '/settings/password' },
            ]
        },
        {
            title: 'Support',
            links: [
                { name: 'Help Center', url: '/help-center' },
                { name: 'FAQ', url: '/faq' },
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Terms of Service', url: '/terms-of-service' },
                { name: 'Privacy Policy', url: '/privacy-policy' },
                { name: 'Accessibility', url: '/accessibility' },
            ]
        }
    ];

    return (
        <Layout title="AWISSEN - Sitemap" description="Complete overview of all pages on AWISSEN">
            <div className="min-h-screen bg-[#0a0a29] text-white">
                {/* Header Section */}
                <section className="relative py-16 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                Sitemap
                            </span>
                        </h1>
                        <p className="text-[#a8a8d8] text-lg text-center max-w-3xl mx-auto">
                            Complete overview of all pages on AWISSEN
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {siteStructure.map((section, index) => (
                                <div key={index} className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-6 shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4 text-white border-b border-[#2d2d6d] pb-2">
                                        {section.title}
                                    </h2>
                                    <ul className="space-y-2">
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link 
                                                    href={link.url} 
                                                    className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-200"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Sitemap;