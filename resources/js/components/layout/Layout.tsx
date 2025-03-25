import React, { useState, useEffect } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { type SharedData } from '@/types';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const Layout = ({ 
    children, 
    title = 'AWISSEN - Automotive Education & Training',
    description = 'AWISSEN is your premier destination for automotive education. We combine cutting-edge technology with expert instruction to provide comprehensive training.'
}: LayoutProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth, settings } = usePage<SharedData>().props;
    const currentPath = window.location.pathname;

    const isActive = (path: string) => {
        return currentPath === path;
    };

    return (
        <div className="min-h-screen bg-[#0a0a29]">
            <Head title={title}>
                <meta name="description" content={description} />
            </Head>
            
            {/* Header */}
            <header className="fixed w-full top-0 z-50 bg-[#0a0a29]/80 backdrop-blur-lg border-b border-[#2d2d6d]">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div className="flex items-center justify-between h-16">
                                {/* Logo */}
                                <Link href="/" className="flex items-center">
                                    <img 
                                        src={settings?.branding_logo}
                                        alt="AWISSEN" 
                                        className="h-8 w-auto filter drop-shadow-[0_0_10px_rgba(138,43,226,0.5)]"
                                    />
                                </Link>

                                {/* Desktop Navigation */}
                                <div className="hidden md:flex items-center space-x-8">
                                    <Link 
                                        href="/" 
                                        className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/') ? 'text-[#8a2be2]' : ''}`}
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        href="/courses" 
                                        className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/courses') ? 'text-[#8a2be2]' : ''}`}
                                    >
                                        Courses
                                    </Link>
                                    <Link 
                                        href="/blog" 
                                        className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/blog') ? 'text-[#8a2be2]' : ''}`}
                                    >
                                        Blog
                                    </Link>
                                    <Link 
                                        href="/certification" 
                                        className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/certification') ? 'text-[#8a2be2]' : ''}`}
                                    >
                                        Certification
                                    </Link>
                                    <Link 
                                        href="/about" 
                                        className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/about') ? 'text-[#8a2be2]' : ''}`}
                                    >
                                        About
                                    </Link>
                                    <Link 
                                        href="/contact" 
                                        className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/contact') ? 'text-[#8a2be2]' : ''}`}
                                    >
                                        Contact
                                    </Link>
                                    {auth.user ? (
                                        <Link 
                                            href="/dashboard" 
                                            className={`px-6 py-2 text-white bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] rounded-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)] ${isActive('/dashboard') ? 'ring-2 ring-[#8a2be2]' : ''}`}
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href={window.route('login')}
                                            className={`px-6 py-2 text-white bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] rounded-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)] ${isActive('/login') ? 'ring-2 ring-[#8a2be2]' : ''}`}
                                        >
                                            Login
                                        </Link>
                                    )}
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden">
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="text-[#a8a8d8] hover:text-[#8a2be2]"
                                    >
                                        {isOpen ? (
                                            <X className="h-6 w-6" />
                                        ) : (
                                            <Menu className="h-6 w-6" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            {isOpen && (
                                <div className="md:hidden py-4">
                                    <div className="flex flex-col space-y-4">
                                        <Link 
                                            href="/" 
                                            className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/') ? 'text-[#8a2be2]' : ''}`}
                                        >
                                            Home
                                        </Link>
                                        <Link 
                                            href="/courses" 
                                            className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/courses') ? 'text-[#8a2be2]' : ''}`}
                                        >
                                            Courses
                                        </Link>
                                        <Link 
                                            href="/blog" 
                                            className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/blog') ? 'text-[#8a2be2]' : ''}`}
                                        >
                                            Blog
                                        </Link>
                                        <Link 
                                            href="/certification" 
                                            className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/certification') ? 'text-[#8a2be2]' : ''}`}
                                        >
                                            Certification
                                        </Link>
                                        <Link 
                                            href="/about" 
                                            className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/about') ? 'text-[#8a2be2]' : ''}`}
                                        >
                                            About
                                        </Link>
                                        <Link 
                                            href="/contact" 
                                            className={`text-[#a8a8d8] hover:text-[#8a2be2] transition-colors ${isActive('/contact') ? 'text-[#8a2be2]' : ''}`}
                                        >
                                            Contact
                                        </Link>
                                        {auth.user ? (
                                            <Link 
                                                href="/dashboard" 
                                                className={`block w-full px-4 py-2 text-center text-white bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] rounded-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)] ${isActive('/dashboard') ? 'ring-2 ring-[#8a2be2]' : ''}`}
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href={window.route('login')}
                                                className={`block w-full px-4 py-2 text-center text-white bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] rounded-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)] ${isActive('/login') ? 'ring-2 ring-[#8a2be2]' : ''}`}
                                            >
                                                Login
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="pt-16">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-[#0f0f3d] border-t border-[#2d2d6d]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* Brand */}
                                <div className="col-span-1 md:col-span-4">
                                    <img 
                                        src={settings?.branding_footer_logo} 
                                        alt="AWISSEN" 
                                        className="h-12 w-auto mb-4 filter drop-shadow-[0_0_10px_rgba(138,43,226,0.3)]"
                                    />
                                    <p className="text-[#a8a8d8] text-sm leading-relaxed">
                                        AWISSEN is your premier destination for automotive education. We combine cutting-edge technology with expert instruction to provide comprehensive training in automotive engineering, design, and technology.
                                    </p>
                                </div>

                                {/* Quick Links */}
                                <div className="col-span-1 md:col-span-2">
                                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/about" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contact" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                Contact
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                Blog
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/certification" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                Certification
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Support */}
                                <div className="col-span-1 md:col-span-2">
                                    <h3 className="text-white font-semibold mb-4">Support</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="/faq" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                FAQ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms-of-service" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                Terms of Service
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/help-center" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                                Help Center
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Newsletter */}
                                <div className="col-span-1 md:col-span-4">
                                    <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                                    <p className="text-[#a8a8d8] text-sm mb-4">
                                        Subscribe to our newsletter for the latest updates and course offerings.
                                    </p>
                                    <form className="flex space-x-2 mb-6">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="flex-1 bg-[#0a0a29] border border-[#2d2d6d] rounded-lg px-4 py-2 text-sm text-white placeholder-[#a8a8d8] focus:outline-none focus:border-[#8a2be2]"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-[#8a2be2] hover:to-[#6a11cb] transition-colors duration-300"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                    <div className="flex space-x-4">
                                        <a href={settings?.social_media_facebook} target='_blank' className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300">
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                            </svg>
                                        </a>
                                        <a href={settings?.social_media_twitter} target='_blank' className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300">
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                        <a href={settings?.social_media_instagram} target='_blank' className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300">
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.09 1.064.077 1.791.232 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.233.636.388 1.363.465 2.427.077 1.067.09 1.407.09 4.123v.08c0 2.643-.012 2.987-.09 4.043-.077 1.064-.232 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.233-1.363.388-2.427.465-1.067.077-1.407.09-4.123.09h-.08c-2.643 0-2.987-.012-4.043-.09-1.064-.077-1.791-.232-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.233-.636-.388-1.363-.465-2.427-.047-1.024-.09-1.379-.09-3.808v-.63c0-2.43.013-2.784.09-3.808.077-1.064.232-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.233 1.363-.388 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href={settings?.social_media_linkedin} target='_blank' className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300">
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Copyright */}
                            <div className="mt-12 pt-8 border-t border-[#2d2d6d]">
                                <div className="flex flex-col md:flex-row justify-between items-center">
                                    <p className="text-[#a8a8d8] text-sm">
                                        © {new Date().getFullYear()} AWISSEN. All rights reserved.
                                    </p>
                                    <div className="flex space-x-6 mt-4 md:mt-0">
                                        <Link href="/sitemap" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                            Sitemap
                                        </Link>
                                        <Link href="/accessibility" className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300 text-sm">
                                            Accessibility
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;