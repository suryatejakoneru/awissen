import React, { useRef, useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { ArrowRight, Star, Award, Users, Clock, ChevronRight, CheckCircle2, ArrowDown, CheckCircle, Play, BookOpen, GraduationCap } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import axios from 'axios';
import { Link } from '@inertiajs/react';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    gradient_color: string;
    sub_courses_count: number;
    sub_courses?: Array<{
        id: number;
        title: string;
        description: string;
        image: string;
    }>;
}

interface SubCourse {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
    course_slug: string;
}

interface Stat {
    icon: any; // Using any for Lucide icons
    label: string;
    value: string;
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
}

// Demo data
const demoCourses: Course[] = [
    {
        id: 1,
        title: "Engines",
        slug: "engines",
        description: "Master the fundamentals of internal combustion engines and their components. Learn about engine design, operation, maintenance, and performance optimization. Perfect for both beginners and experienced professionals.",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60",
        gradient_color: "from-blue-500 to-purple-500",
        sub_courses_count: 2,
        sub_courses: [
            { id: 1, title: "Engine Basics", description: "Understanding engine components and operation", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60" },
            { id: 2, title: "Engine Performance", description: "Advanced engine tuning and optimization", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 2,
        title: "EV Technology",
        slug: "ev-technology",
        description: "Explore the latest developments in electric vehicle technology and systems. From battery management to motor control, gain comprehensive knowledge of modern EV systems and future trends.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60",
        gradient_color: "from-green-500 to-blue-500",
        sub_courses_count: 2,
        sub_courses: [
            { id: 3, title: "EV Fundamentals", description: "Basic concepts of electric vehicles", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60" },
            { id: 4, title: "Battery Systems", description: "Advanced battery technology and management", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 3,
        title: "Design",
        slug: "design",
        description: "Learn automotive design principles and modern design tools. Master CAD software, 3D modeling, and design optimization techniques. Create stunning vehicle designs with industry-standard tools.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
        gradient_color: "from-purple-500 to-pink-500",
        sub_courses_count: 2,
        sub_courses: [
            { id: 5, title: "AutoCAD Basics", description: "Introduction to automotive CAD design", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60" },
            { id: 6, title: "3D Modeling", description: "Advanced 3D modeling techniques", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 4,
        title: "Manufacturing",
        slug: "manufacturing",
        description: "Understanding modern automotive manufacturing processes. Learn about production systems, quality control, and lean manufacturing principles. Master the art of efficient vehicle production.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60",
        gradient_color: "from-orange-500 to-red-500",
        sub_courses_count: 2,
        sub_courses: [
            { id: 7, title: "Production Systems", description: "Modern manufacturing systems", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60" },
            { id: 8, title: "Quality Control", description: "Quality management in manufacturing", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60" }
        ]
    },
    {
        id: 5,
        title: "Engine Tuning",
        slug: "engine-tuning",
        description: "Advanced engine tuning and performance optimization. Learn ECU programming, dyno testing, and advanced tuning techniques. Perfect for performance enthusiasts and professional tuners.",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60",
        gradient_color: "from-yellow-500 to-orange-500",
        sub_courses_count: 2,
        sub_courses: [
            { id: 9, title: "ECU Tuning", description: "Electronic control unit tuning", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60" },
            { id: 10, title: "Performance Tuning", description: "Advanced performance optimization", image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60" }
        ]
    }
];

const demoSubCourses: SubCourse[] = [
    {
        id: 1,
        title: "Engine Basics",
        description: "Comprehensive understanding of engine components, operation principles, and maintenance procedures. Learn about combustion cycles, valve timing, and engine diagnostics.",
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60",
        slug: "engine-basics",
        course_slug: "engines"
    },
    {
        id: 2,
        title: "EV Fundamentals",
        description: "Master the core concepts of electric vehicles, including motor types, power electronics, and charging systems. Understand the future of automotive technology.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60",
        slug: "ev-fundamentals",
        course_slug: "ev-technology"
    },
    {
        id: 3,
        title: "AutoCAD Basics",
        description: "Learn essential CAD skills for automotive design. Master 2D and 3D modeling, technical drawing, and design optimization techniques using industry-standard software.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
        slug: "autocad-basics",
        course_slug: "design"
    },
    {
        id: 4,
        title: "Production Systems",
        description: "Explore modern manufacturing processes, automation, and production line optimization. Learn about lean manufacturing principles and quality control systems.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60",
        slug: "production-systems",
        course_slug: "manufacturing"
    }
];

const demoTestimonials = [
    {
        id: 1,
        name: "John Smith",
        role: "Senior Automotive Engineer",
        quote: "The courses at AWISSEN have been instrumental in advancing my career. The practical knowledge gained is invaluable.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        role: "EV Systems Specialist",
        quote: "The EV Technology course provided me with the latest knowledge in electric vehicle systems. Highly recommended!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "Design Engineer",
        quote: "The design courses helped me master modern automotive design tools. The instructors are industry experts.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60"
    }
];

const demoStats = {
    seminars: 150,
    satisfaction: 98,
    experts: 25,
    students: 5000
};

interface Props {
    courses?: Course[];
    subCourses?: SubCourse[];
    settings?: Record<string, any>;
}

const Home = ({ courses = [], subCourses = [], settings = {} }: Props) => {
    useEffect(() => {
        console.log('Home component mounted');
        console.log('Courses:', courses);
        console.log('SubCourses:', subCourses);
        console.log('Settings:', settings);
    }, []);

    // Use demo data if no props are provided
    const displayCourses = courses.length > 0 ? courses : demoCourses;
    const displaySubCourses = subCourses.length > 0 ? subCourses : demoSubCourses;

    const targetRef = useRef(null);
    const [displayStats] = React.useState<Stat[]>([
        { icon: BookOpen, label: 'Seminars', value: '50+' },
        { icon: Users, label: 'Students', value: '1000+' },
        { icon: Star, label: 'Satisfaction', value: '98%' },
        { icon: GraduationCap, label: 'Experts', value: '100+' }
    ]);

    const [displayTestimonials] = React.useState<Testimonial[]>([
        {
            quote: "AWISSEN transformed my understanding of automotive technology. The courses are comprehensive and practical.",
            author: "John Doe",
            role: "Automotive Engineer"
        },
        {
            quote: "The instructors are industry experts who bring real-world experience to the classroom.",
            author: "Jane Smith",
            role: "Mechanical Engineer"
        },
        {
            quote: "I've gained valuable skills that have helped me advance in my career. Highly recommended!",
            author: "Mike Johnson",
            role: "Technical Specialist"
        }
    ]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const scaleOnHover = {
        initial: { scale: 1 },
        hover: { 
            scale: 1.05,
            transition: { type: "spring", stiffness: 300 }
        }
    };

    // Add scroll indicator animation
    const scrollIndicator = {
        initial: { y: 0 },
        animate: {
            y: [0, 10, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <Layout title="AWISSEN - Home | Automotive Education & Training">
            <div className="min-h-screen bg-[#0a0a29] text-white">
                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&auto=format&fit=crop&q=60"
                            alt="Hero Background"
                            className="w-full h-full object-cover animate-ken-burns"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a29]/90 via-[#1a1a4d]/80 to-[#0a0a29]/70"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a29]/90 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6a11cb]/30 via-transparent to-[#8a2be2]/30 animate-pulse-slow"></div>
                        <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-5 animate-pulse-slow"></div>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <motion.div 
                                className="mb-8"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <img
                                    src={settings?.branding_icon_light}
                                    alt="AWISSEN Logo"
                                    className="h-24 mx-auto mb-6 animate-float"
                                />
                            </motion.div>
                            <motion.h1 
                                className="text-5xl md:text-6xl font-bold mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] via-[#8a2be2] to-[#6a11cb] drop-shadow-[0_0_10px_rgba(138,43,226,0.3)] animate-gradient">
                                    Master Automotive Excellence
                                </span>
                            </motion.h1>
                            <motion.p 
                                className="text-[#a8a8d8] text-xl mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                Discover comprehensive automotive courses designed to elevate your expertise and advance your career
                            </motion.p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] text-white rounded-lg font-semibold text-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transition-all duration-300 shadow-lg hover:shadow-[#8a2be2]/30 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Explore Courses</span>
                                    <ArrowRight className="ml-3 h-5 w-5 relative z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#8a2be2] to-[#6a11cb] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                    {/* Scroll Down Indicator */}
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={scrollIndicator}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                    >
                        <div className="flex flex-col items-center text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300">
                            <span className="text-sm mb-2">Scroll Down</span>
                            <ArrowDown className="h-6 w-6 animate-bounce-slow" />
                        </div>
                    </motion.div>
                </section>

                {/* Main Courses Grid */}
                <section className="py-24 bg-[#0a0a29]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-white mb-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Choose Your Path
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8] text-lg">
                                Select from our comprehensive range of automotive courses
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {displayCourses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <Link href={`/courses/${course.slug}`} className="h-full block">
                                        <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300 h-full flex flex-col">
                                            <div className="relative h-36 w-full overflow-hidden">
                                                <img
                                                    src={course.image}
                                                    alt={course.title}
                                                    className="object-cover w-full h-full opacity-90 transition-opacity duration-300 group-hover:opacity-40"
                                                />
                                                <div className={`absolute inset-0 bg-gradient-to-b ${course.gradient_color} opacity-40`} />
                                            </div>
                                            <div className="p-4 flex-grow flex items-center justify-center text-center">
                                                <h3 className="text-base font-semibold text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2]">
                                                    {course.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Brief Description */}
                <section className="py-24 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                        About AWISSEN
                                    </span>
                                </h2>
                                <p className="text-[#a8a8d8] mb-8">
                                    AWISSEN delivers cutting-edge automotive education, combining expert instruction with hands-on training. Our specialized programs cover automotive engineering, design, and emerging technologies to prepare you for success in the industry.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="h-6 w-6 text-[#8a2be2] flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-[#a8a8d8] text-lg font-medium">Industry-leading Curriculum</p>
                                            <p className="text-[#a8a8d8] text-sm mt-1">Developed by automotive experts with decades of experience in the field</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="h-6 w-6 text-[#8a2be2] flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-[#a8a8d8] text-lg font-medium">Hands-on Learning</p>
                                            <p className="text-[#a8a8d8] text-sm mt-1">Access to state-of-the-art equipment and tools for practical experience</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="h-6 w-6 text-[#8a2be2] flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-[#a8a8d8] text-lg font-medium">Career Support</p>
                                            <p className="text-[#a8a8d8] text-sm mt-1">Job placement assistance and career development resources</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="h-6 w-6 text-[#8a2be2] flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-[#a8a8d8] text-lg font-medium">Industry Certification</p>
                                            <p className="text-[#a8a8d8] text-sm mt-1">Recognized certifications and professional credentials upon completion</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center text-[#8a2be2] hover:text-[#6a11cb] transition-colors duration-300"
                                    >
                                        Learn more about our vision
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="relative rounded-lg overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&auto=format&fit=crop&q=60"
                                        alt="About AWISSEN"
                                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-70"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f3d] to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"></div>
                                    <div className="absolute inset-0 bg-[#8a2be2] opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Sub Courses Grid */}
                <section className="py-24 bg-[#0a0a29]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-white mb-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Featured Courses
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8] text-lg">
                                Start your learning journey with our most popular courses
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {displaySubCourses.map((subCourse, index) => (
                                <motion.div
                                    key={subCourse.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/courses/${subCourse.course_slug}/${subCourse.slug}`}>
                                        <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300">
                                            <div className="aspect-[16/9] relative">
                                                <img
                                                    src={subCourse.image}
                                                    alt={subCourse.title}
                                                    className="object-cover w-full h-full opacity-90 transition-opacity duration-300 group-hover:opacity-40"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold mb-2 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2]">
                                                    {subCourse.title}
                                                </h3>
                                                <p className="text-sm text-[#a8a8d8] line-clamp-2">
                                                    {subCourse.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Key Statistics */}
                <section className="py-24 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {displayStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="bg-[#0a0a29] rounded-full p-6 w-20 h-20 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-[#8a2be2]/10 group-hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]">
                                        <stat.icon className="h-10 w-10 text-[#8a2be2] transition-colors duration-300 group-hover:text-[#6a11cb]" />
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-[#8a2be2]">{stat.value}</div>
                                    <div className="text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#6a11cb]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 bg-[#0a0a29]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-white mb-4">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    What Our Students Say
                                </span>
                            </h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {displayTestimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 backdrop-blur-lg bg-opacity-50 transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)]"
                                >
                                    <div className="text-[#a8a8d8] mb-6 transition-colors duration-300 group-hover:text-[#8a2be2]">"{testimonial.quote}"</div>
                                    <div className="text-white font-semibold transition-colors duration-300 group-hover:text-[#6a11cb]">{testimonial.author}</div>
                                    <div className="text-[#a8a8d8] text-sm transition-colors duration-300 group-hover:text-[#8a2be2]">{testimonial.role}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Home;
