import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Prerequisites {
    course: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image: string;
        gradient_color: string;
        sub_courses: {
            id: number;
            title: string;
            slug: string;
            description: string;
            image: string;
            order: number;
        }[];
    };
    subCourse: {
        id: number;
        title: string;
        slug: string;
        description: string;
        image: string;
        prerequisites: string[];
        order: number;
    };
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const SubCourseDetail: React.FC<Prerequisites> = ({ course, subCourse }) => {
    // Get related sub-courses (excluding current sub-course)
    const relatedSubCourses = course.sub_courses
        .filter(sc => sc.id !== subCourse.id)
        .sort((a, b) => a.order - b.order);

    return (
        <Layout title={`AWISSEN - ${subCourse.title} - ${course.title} - courses | Automotive Education & Training`}>
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <img 
                        src={subCourse.image}
                        alt={subCourse.title}
                        className="object-cover w-full h-full opacity-80"
                    />
                    <div className="absolute inset-0 bg-[#0a0a29]/70"></div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-b ${course.gradient_color} opacity-50`}></div>
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-12">
                        <motion.div 
                            className="col-span-12 lg:col-span-10 lg:col-start-2 text-center"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            <Link 
                                href={`/courses/${course.slug}`}
                                className="inline-flex items-center text-[#8a2be2] hover:text-[#6a11cb] mb-8"
                            >
                                <ChevronLeft className="h-5 w-5 mr-2" />
                                Back to {course.title}
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] drop-shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                                    {subCourse.title}
                                </span>
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={fadeInUp}
                                className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8"
                            >
                                <div className="flex items-center mb-8">
                                    <div className="bg-[#0a0a29] rounded-full p-4 mr-4">
                                        <BookOpen className="h-8 w-8 text-[#8a2be2]" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-semibold text-[#a8a8d8] mb-2">
                                            Course Overview
                                        </h2>
                                        <p className="text-[#a8a8d8]">
                                            Part of {course.title}
                                        </p>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-[#a8a8d8] mb-8">
                                        {subCourse.description}
                                    </p>

                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Sub-courses Section */}
            {relatedSubCourses.length > 0 && (
                <section className="py-20 bg-[#0a0a29]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                        Related Sub-courses
                                    </span>
                                </h2>
                                <p className="text-[#a8a8d8]">
                                    Explore other modules in {course.title}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {relatedSubCourses.map((relatedCourse, index) => (
                                <motion.div
                                    key={relatedCourse.id}
                                    variants={fadeInUp}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <Link href={`/courses/${course.slug}/${relatedCourse.slug}`} className="block h-full">
                                        <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300 h-full cursor-pointer">
                                            <div className="aspect-[16/9] relative">
                                                <img
                                                    src={relatedCourse.image}
                                                    alt={relatedCourse.title}
                                                    className="object-cover w-full h-full opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-b ${course.gradient_color} opacity-40`} />
                                            </div>
                                            <div className="p-6 -mt-12 relative z-10">
                                                <div className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-colors duration-300 group-hover:bg-[#8a2be2]">
                                                    <BookOpen className="h-8 w-8 text-[#8a2be2] transition-colors duration-300 group-hover:text-white" />
                                                </div>
                                                <h3 className="text-xl font-semibold mb-4 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2] text-center">
                                                    {relatedCourse.title}
                                                </h3>
                                                <div className="flex justify-center">
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
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default SubCourseDetail;