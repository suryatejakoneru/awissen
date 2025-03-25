import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Users, BarChart, Settings, Zap, Wrench, Cpu, GraduationCap, Award, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    gradient_color: string;
    is_active: boolean;
    order: number;
    sub_courses: SubCourse[];
}

interface SubCourse {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    prerequisites: string[];
    is_active: boolean;
    order: number;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationData>({
        current_page: 1,
        last_page: 1,
        per_page: 6,
        total: 0
    });
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/courses');
            
            if (!response.data) {
                throw new Error('No data received from the server');
            }

            // Store all courses
            const coursesData = Array.isArray(response.data) ? response.data : (response.data.data || []);
            setAllCourses(coursesData);
            
            // Set initial pagination
            const totalItems = coursesData.length;
            setPagination({
                current_page: 1,
                last_page: Math.ceil(totalItems / itemsPerPage),
                per_page: itemsPerPage,
                total: totalItems
            });

            // Set initial courses
            const initialCourses = coursesData.slice(0, itemsPerPage);
            setCourses(initialCourses);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Failed to load courses. Please try again later.');
            setLoading(false);
            setAllCourses([]);
            setCourses([]);
            setPagination({
                current_page: 1,
                last_page: 1,
                per_page: itemsPerPage,
                total: 0
            });
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.last_page) {
            setCurrentPage(page);
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedCourses = allCourses.slice(startIndex, endIndex);
            setCourses(paginatedCourses);
            setPagination(prev => ({
                ...prev,
                current_page: page
            }));
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, pagination.current_page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pagination.last_page, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className={`px-3 py-1 rounded-lg text-sm ${
                    pagination.current_page === 1
                        ? 'text-[#a8a8d8] cursor-not-allowed'
                        : 'text-[#8a2be2] hover:text-[#6a11cb]'
                }`}
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
        );

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 rounded-lg text-sm text-[#8a2be2] hover:text-[#6a11cb]"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-3 py-1 text-[#a8a8d8]">
                        ...
                    </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                        pagination.current_page === i
                            ? 'bg-[#8a2be2] text-white'
                            : 'text-[#8a2be2] hover:text-[#6a11cb]'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < pagination.last_page) {
            if (endPage < pagination.last_page - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-3 py-1 text-[#a8a8d8]">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={pagination.last_page}
                    onClick={() => handlePageChange(pagination.last_page)}
                    className="px-3 py-1 rounded-lg text-sm text-[#8a2be2] hover:text-[#6a11cb]"
                >
                    {pagination.last_page}
                </button>
            );
        }

        // Next button
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className={`px-3 py-1 rounded-lg text-sm ${
                    pagination.current_page === pagination.last_page
                        ? 'text-[#a8a8d8] cursor-not-allowed'
                        : 'text-[#8a2be2] hover:text-[#6a11cb]'
                }`}
            >
                <ChevronRightIcon className="h-4 w-4" />
            </button>
        );

        return pages;
    };

    return (
        <Layout title="AWISSEN - Courses | Automotive Education & Training">
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                        alt="Courses Hero"
                        className="object-cover w-full h-full opacity-80"
                    />
                    <div className="absolute inset-0 bg-[#0a0a29]/80"></div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                    <div className="grid grid-cols-12">
                        <motion.div 
                            className="col-span-12 lg:col-span-10 lg:col-start-2 text-center"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] drop-shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                                    Our Course Categories
                                </span>
                            </h1>
                            <p className="text-[#a8a8d8] text-lg mb-8">
                                Discover our comprehensive range of automotive courses designed to elevate your expertise
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Course Categories Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Course Categories
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                Explore our comprehensive range of automotive training programs
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center text-[#a8a8d8]">Loading courses...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                {courses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        variants={fadeInUp}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ delay: index * 0.1 }}
                                        className="h-full"
                                    >
                                        <Link href={`/courses/${course.slug}`} className="block h-full">
                                            <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300 h-full cursor-pointer">
                                                <div className="aspect-[16/9] relative">
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="object-cover w-full h-full opacity-90 transition-opacity duration-300 group-hover:opacity-40"
                                                    />
                                                    <div className={`absolute inset-0 bg-gradient-to-b ${course.gradient_color} opacity-40`} />
                                                </div>
                                                <div className="p-6 -mt-12 relative z-10">
                                                    <div className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-colors duration-300 group-hover:bg-[#8a2be2]">
                                                        <Settings className="h-8 w-8 text-[#8a2be2] transition-colors duration-300 group-hover:text-white" />
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-4 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2] text-center">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-[#a8a8d8] transition-colors duration-300 group-hover:text-white text-center mb-6">
                                                        {course.description}
                                                    </p>
                                                    <div className="flex justify-between items-center text-sm text-[#a8a8d8]">
                                                        <span>{course.sub_courses.length} Sub-courses</span>
                                                        <span className="inline-flex items-center text-[#8a2be2] group-hover:text-[#6a11cb]">
                                                            View Details
                                                            <ChevronRight className="ml-2 h-4 w-4" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.last_page > 1 && (
                                <div className="mt-12 flex justify-center items-center space-x-2">
                                    {renderPagination()}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-[#0f0f3d]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Why Choose Our Courses?
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                Experience the difference with our comprehensive learning approach
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                icon: GraduationCap,
                                title: 'Expert Instructors',
                                description: 'Learn from industry professionals with years of experience'
                            },
                            {
                                icon: Clock,
                                title: 'Flexible Learning',
                                description: 'Study at your own pace with our online platform'
                            },
                            {
                                icon: Award,
                                title: 'Certification',
                                description: 'Earn recognized certifications upon completion'
                            },
                            {
                                icon: Users,
                                title: 'Community Support',
                                description: 'Join a network of learners and professionals'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="bg-[#0a0a29] rounded-lg border border-[#2d2d6d] p-6 text-center h-full transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.5)] group">
                                    <div className="bg-[#0f0f3d] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:bg-[#8a2be2]/20">
                                        <feature.icon className="h-8 w-8 text-[#8a2be2] transition-colors duration-300 group-hover:text-[#8a2be2]" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2]">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[#a8a8d8] text-sm transition-colors duration-300 group-hover:text-white">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Courses;