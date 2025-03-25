import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface SubCourse {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    order: number;
}

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    gradient_color: string;
    sub_courses: SubCourse[];
}

interface Props {
    course: Course;
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const truncateDescription = (description: string, maxLines: number = 3) => {
    const words = description.split(' ');
    const truncated = words.slice(0, 20).join(' ');
    return truncated + (words.length > 20 ? '...' : '');
};

const CourseDetail: React.FC<Props> = ({ course }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalItems = course.sub_courses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get current sub-courses
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSubCourses = course.sub_courses.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg text-sm ${
                    currentPage === 1
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
                        currentPage === i
                            ? 'bg-[#8a2be2] text-white'
                            : 'text-[#8a2be2] hover:text-[#6a11cb]'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-3 py-1 text-[#a8a8d8]">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 rounded-lg text-sm text-[#8a2be2] hover:text-[#6a11cb]"
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg text-sm ${
                    currentPage === totalPages
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
        <Layout title={`AWISSEN - ${course.title} | Automotive Education & Training`}>
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <img 
                        src={course.image}
                        alt={course.title}
                        className="object-cover w-full h-full opacity-90"
                    />
                    <div className="absolute inset-0 bg-[#0a0a29]/80"></div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-b ${course.gradient_color} opacity-30`}></div>
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-12">
                        <motion.div 
                            className="col-span-12 lg:col-span-10 lg:col-start-2 text-center"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] drop-shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                                    {course.title}
                                </span>
                            </h1>
                            <p className="text-[#a8a8d8] text-lg mb-8">
                                {truncateDescription(course.description, 2)}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sub-courses Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Available Courses
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                Choose from our comprehensive range of specialized modules
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {currentSubCourses.map((subCourse, index) => (
                            <motion.div
                                key={subCourse.id}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300 h-full">
                                    <div className="aspect-[16/9] relative">
                                        <img
                                            src={subCourse.image}
                                            alt={subCourse.title}
                                            className="object-cover w-full h-full opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-b ${course.gradient_color} opacity-40`} />
                                    </div>
                                    <div className="p-6 -mt-12 relative z-10">
                                        <div className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-colors duration-300 group-hover:bg-[#8a2be2]">
                                            <BookOpen className="h-8 w-8 text-[#8a2be2] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2] text-center">
                                            {subCourse.title}
                                        </h3>
                                        <p className="text-[#a8a8d8] transition-colors duration-300 group-hover:text-white text-center mb-6 line-clamp-3">
                                            {truncateDescription(subCourse.description, 3)}
                                        </p>

                                        <div className="flex justify-center">
                                            <Link 
                                                href={`/courses/${course.slug}/${subCourse.slug}`}
                                                className="inline-flex items-center text-[#8a2be2] group-hover:text-[#6a11cb]"
                                            >
                                                View Details
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center space-x-2">
                            {renderPagination()}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default CourseDetail;