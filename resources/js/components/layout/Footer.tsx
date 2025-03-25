import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const navigation = {
        main: [
            { name: 'About', href: '/about' },
            { name: 'Courses', href: '/courses' },
            { name: 'Certification', href: '/certification' },
            { name: 'Contact', href: '/contact' },
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Terms of Service', href: '/terms-of-service' },
        ],
        social: [
            {
                name: 'Facebook',
                href: '#',
                icon: Facebook,
            },
            {
                name: 'Twitter',
                href: '#',
                icon: Twitter,
            },
            {
                name: 'Instagram',
                href: '#',
                icon: Instagram,
            },
            {
                name: 'LinkedIn',
                href: '#',
                icon: Linkedin,
            },
        ],
    };

    return (
        <footer className="bg-white dark:bg-[#0a0a29]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] bg-clip-text text-transparent">
                                AWISSEN
                            </span>
                        </Link>
                        <p className="mt-4 text-gray-500 dark:text-[#a8a8d8] text-sm">
                            Empowering the next generation of automotive and engineering professionals through comprehensive education and certification programs.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigation</h3>
                        <ul className="mt-4 space-y-4">
                            {navigation.main.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-base text-gray-500 dark:text-[#a8a8d8] hover:text-gray-900 dark:hover:text-[#8a2be2]"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Contact</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <p className="text-base text-gray-500 dark:text-[#a8a8d8]">123 Education Street</p>
                                <p className="text-base text-gray-500 dark:text-[#a8a8d8]">City, State 12345</p>
                            </li>
                            <li>
                                <p className="text-base text-gray-500 dark:text-[#a8a8d8]">Phone: (123) 456-7890</p>
                                <p className="text-base text-gray-500 dark:text-[#a8a8d8]">Email: info@awissen.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-[#2d2d6d] pt-8">
                    <div className="flex justify-between items-center">
                        <p className="text-base text-gray-400 dark:text-[#a8a8d8]">
                            &copy; {new Date().getFullYear()} AWISSEN. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-400 dark:text-[#a8a8d8] hover:text-gray-500 dark:hover:text-[#8a2be2]"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;