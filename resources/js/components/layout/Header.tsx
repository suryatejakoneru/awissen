import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Check system preference for dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        if (prefersDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Courses', href: '/courses' },
        { name: 'Certification', href: '/certification' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="backdrop-blur-md bg-white/70 dark:bg-[#0a0a29]/90 border-b border-gray-200 dark:border-[#2d2d6d] transition-colors duration-300">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] bg-clip-text text-transparent">
                                    AWISSEN
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        'inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-[#a8a8d8] hover:text-[#8a2be2] dark:hover:text-[#8a2be2] transition-colors duration-200',
                                        'border-b-2 border-transparent hover:border-[#8a2be2]'
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Dark Mode Toggle */}
                            <motion.button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a4d] transition-colors duration-200"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isDarkMode ? 'dark' : 'light'}
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isDarkMode ? (
                                            <Sun className="h-5 w-5 text-yellow-400" />
                                        ) : (
                                            <Moon className="h-5 w-5 text-gray-600" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>

                            <a
                                href="/login"
                                className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300"
                            >
                                Login
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <motion.button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="sm:hidden"
                            >
                                <div className="pt-2 pb-3 space-y-1">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-[#a8a8d8] hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a4d]"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <div className="flex items-center justify-between px-3 py-2">
                                        <motion.button
                                            onClick={toggleDarkMode}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a4d]"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {isDarkMode ? (
                                                <Sun className="h-5 w-5 text-yellow-400" />
                                            ) : (
                                                <Moon className="h-5 w-5 text-gray-600" />
                                            )}
                                        </motion.button>
                                        <a
                                            href="/login"
                                            className="block w-full px-4 py-2 text-center text-white bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] rounded-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Login
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </header>
    );
};

export default Header;