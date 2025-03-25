import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb, BookOpen, Rocket, GraduationCap, Globe, Clock, Star, Flag, Eye } from 'lucide-react';

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

const hoverScale = {
    hover: {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const iconAnimation = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
        scale: 1.2,
        rotate: 12,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const featureAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
        scale: 1.05,
        y: -8,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const featureIconAnimation = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
        scale: 1.2,
        rotate: 12,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const teamAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
        scale: 1.05,
        y: -8,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const teamImageAnimation = {
    hover: {
        scale: 1.1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 10
        }
    }
};

const About = () => {
    const team = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Chief Executive Officer',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
            description: 'With over 15 years of experience in automotive engineering and education.'
        },
        {
            name: 'Michael Chen',
            role: 'Head of Engineering',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
            description: 'Expert in electric vehicle technology and automotive systems design.'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Director of Education',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
            description: 'Specializes in curriculum development and educational innovation.'
        },
        {
            name: 'David Thompson',
            role: 'Head of Research',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
            description: 'Leading research initiatives in automotive technology and innovation.'
        }
    ];

    return (
        <Layout title="AWISSEN - About | Automotive Education & Training">
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                        alt="About Hero"
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
                                    About AWISSEN
                                </span>
                            </h1>
                            <p className="text-[#a8a8d8] text-lg mb-8">
                                Empowering the next generation of automotive professionals
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="grid grid-cols-12 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {/* Left Content */}
                        <motion.div
                            className="col-span-12 lg:col-span-5 lg:col-start-2"
                            variants={fadeInUp}
                            whileHover="hover"
                        >
                            <motion.div 
                                className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 h-full transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)]"
                                variants={hoverScale}
                            >
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                        What's AWISSEN?
                                    </span>
                                </h2>
                                <p className="text-[#a8a8d8] mb-8">
                                    AWISSEN is dedicated to revolutionizing automotive education through cutting-edge training programs and industry expertise. Our comprehensive curriculum covers everything from traditional engine systems to advanced electric vehicle technology.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 transition-all duration-300 hover:text-[#8a2be2] group">
                                        <div className="bg-[#0a0a29] rounded-full p-3 transition-all duration-300 group-hover:bg-[#8a2be2]/10">
                                            <Users className="h-6 w-6 text-[#8a2be2]" />
                                        </div>
                                        <span className="text-[#a8a8d8] group-hover:text-[#8a2be2]">10,000+ Students</span>
                                    </div>
                                    <div className="flex items-center space-x-3 transition-all duration-300 hover:text-[#8a2be2] group">
                                        <div className="bg-[#0a0a29] rounded-full p-3 transition-all duration-300 group-hover:bg-[#8a2be2]/10">
                                            <Globe className="h-6 w-6 text-[#8a2be2]" />
                                        </div>
                                        <span className="text-[#a8a8d8] group-hover:text-[#8a2be2]">Global Reach</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div
                            className="col-span-12 lg:col-span-5"
                            variants={fadeInUp}
                            whileHover="hover"
                        >
                            <motion.div 
                                className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 h-full transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)]"
                                variants={hoverScale}
                            >
                                <h2 className="text-3xl font-bold mb-6">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                        How to Learn?
                                    </span>
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4 group transition-all duration-300">
                                        <div className="bg-[#0a0a29] rounded-full p-3 transition-all duration-300 group-hover:bg-[#8a2be2]/10">
                                            <GraduationCap className="h-6 w-6 text-[#8a2be2]" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#a8a8d8] font-semibold group-hover:text-[#8a2be2]">Expert-Led Courses</h3>
                                            <p className="text-[#a8a8d8] text-sm">Learn from industry professionals with years of experience</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 group transition-all duration-300">
                                        <div className="bg-[#0a0a29] rounded-full p-3 transition-all duration-300 group-hover:bg-[#8a2be2]/10">
                                            <Clock className="h-6 w-6 text-[#8a2be2]" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#a8a8d8] font-semibold group-hover:text-[#8a2be2]">Flexible Schedule</h3>
                                            <p className="text-[#a8a8d8] text-sm">Learn at your own pace with our online platform</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 group transition-all duration-300">
                                        <div className="bg-[#0a0a29] rounded-full p-3 transition-all duration-300 group-hover:bg-[#8a2be2]/10">
                                            <BookOpen className="h-6 w-6 text-[#8a2be2]" />
                                        </div>
                                        <div>
                                            <h3 className="text-[#a8a8d8] font-semibold group-hover:text-[#8a2be2]">Hands-on Practice</h3>
                                            <p className="text-[#a8a8d8] text-sm">Access to virtual labs and real-world projects</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="relative py-20 bg-[#0a0a29]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Our Mission & Vision
                                </span>
                            </h2>
                        </div>
                    </div>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div
                            className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] group"
                            variants={fadeInUp}
                            whileHover="hover"
                        >
                            <div className="flex items-start space-x-6">
                                <motion.div 
                                    className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:bg-[#8a2be2]/10"
                                    variants={iconAnimation}
                                >
                                    <Flag className="h-8 w-8 text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]" />
                                </motion.div>
                                <motion.div 
                                    className="flex-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] transition-all duration-300 group-hover:from-[#8a2be2] group-hover:to-[#6a11cb]">Our Mission</h3>
                                    <p className="text-[#a8a8d8] mb-6 transition-all duration-300 group-hover:text-white">
                                        To revolutionize automotive education by providing cutting-edge training programs that empower individuals with the knowledge and skills needed for success in the rapidly evolving automotive industry.
                                    </p>
                                    <ul className="space-y-3 text-[#a8a8d8]">
                                        <li className="flex items-start space-x-2 transition-all duration-300 hover:translate-x-2">
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span className="transition-all duration-300 group-hover:text-white">Deliver high-quality, industry-relevant education</span>
                                        </li>
                                        <li className="flex items-start space-x-2 transition-all duration-300 hover:translate-x-2">
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span className="transition-all duration-300 group-hover:text-white">Foster innovation and technical excellence</span>
                                        </li>
                                        <li className="flex items-start space-x-2 transition-all duration-300 hover:translate-x-2">
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span className="transition-all duration-300 group-hover:text-white">Build a global community of skilled professionals</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] group"
                            variants={fadeInUp}
                            whileHover="hover"
                        >
                            <div className="flex items-start space-x-6">
                                <motion.div 
                                    className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center transition-all duration-300 group-hover:bg-[#8a2be2]/10"
                                    variants={iconAnimation}
                                >
                                    <Eye className="h-8 w-8 text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]" />
                                </motion.div>
                                <motion.div 
                                    className="flex-1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] transition-all duration-300 group-hover:from-[#8a2be2] group-hover:to-[#6a11cb]">Our Vision</h3>
                                    <p className="text-[#a8a8d8] mb-6 transition-all duration-300 group-hover:text-white">
                                        To be the global leader in automotive education, recognized for excellence in preparing the next generation of automotive professionals for the challenges and opportunities of tomorrow.
                                    </p>
                                    <ul className="space-y-3 text-[#a8a8d8]">
                                        <li className="flex items-start space-x-2 transition-all duration-300 hover:translate-x-2">
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span className="transition-all duration-300 group-hover:text-white">Lead in automotive technology education</span>
                                        </li>
                                        <li className="flex items-start space-x-2 transition-all duration-300 hover:translate-x-2">
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span className="transition-all duration-300 group-hover:text-white">Drive industry innovation and advancement</span>
                                        </li>
                                        <li className="flex items-start space-x-2 transition-all duration-300 hover:translate-x-2">
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span className="transition-all duration-300 group-hover:text-white">Shape the future of mobility</span>
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 bg-[#0a0a29]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        className="grid grid-cols-12 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div 
                            className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16"
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Our Features
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8] text-lg">
                                Discover what makes AWISSEN the leading platform for automotive education
                            </p>
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {[
                            {
                                icon: Award,
                                title: 'Excellence',
                                description: 'Our commitment to excellence is reflected in every aspect of our platform. From industry-leading curriculum to expert instructors, we ensure the highest quality education and training experience.',
                                details: [
                                    'Industry-recognized certifications',
                                    'Expert-led courses',
                                    'Quality-assured content'
                                ]
                            },
                            {
                                icon: BookOpen,
                                title: 'Innovation',
                                description: 'We stay at the forefront of automotive technology by continuously updating our content and embracing new teaching methodologies. Our platform evolves with industry trends.',
                                details: [
                                    'Latest technology integration',
                                    'Interactive learning methods',
                                    'Regular content updates'
                                ]
                            },
                            {
                                icon: Rocket,
                                title: 'Growth',
                                description: 'We believe in continuous learning and development. Our platform provides comprehensive resources and support to help you achieve your career goals in the automotive industry.',
                                details: [
                                    'Career development paths',
                                    'Skill assessment tools',
                                    'Professional networking'
                                ]
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] group"
                                variants={featureAnimation}
                                whileHover="hover"
                            >
                                <motion.div 
                                    className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#8a2be2]/10"
                                    variants={featureIconAnimation}
                                >
                                    <feature.icon className="h-8 w-8 text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]" />
                                </motion.div>
                                <motion.h3 
                                    className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] transition-all duration-300 group-hover:from-[#8a2be2] group-hover:to-[#6a11cb]"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {feature.title}
                                </motion.h3>
                                <motion.p 
                                    className="text-[#a8a8d8] mb-6 transition-all duration-300 group-hover:text-white"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {feature.description}
                                </motion.p>
                                <motion.ul 
                                    className="space-y-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    {feature.details.map((detail, idx) => (
                                        <motion.li 
                                            key={idx}
                                            className="flex items-center space-x-2 text-[#a8a8d8] transition-all duration-300 group-hover:text-white"
                                            whileHover={{ x: 5 }}
                                        >
                                            <span className="text-[#8a2be2] transition-all duration-300 group-hover:text-[#6a11cb]">•</span>
                                            <span>{detail}</span>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="relative py-20 bg-[#0f0f3d] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        className="grid grid-cols-12 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div 
                            className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16"
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Our Leadership Team
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8] text-lg">
                                Meet the experts leading our mission to transform automotive education
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-12 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {team.map((member, index) => (
                                    <motion.div
                                        key={index}
                                        className="w-full"
                                        variants={teamAnimation}
                                        whileHover="hover"
                                    >
                                        <div className="bg-[#0a0a29] rounded-lg border border-[#2d2d6d] overflow-hidden h-full transition-all duration-300 hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] group">
                                            <motion.div 
                                                className="relative pb-[100%] overflow-hidden"
                                                variants={teamImageAnimation}
                                            >
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a29] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                                            </motion.div>
                                            <motion.div 
                                                className="p-6 relative"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <motion.h3 
                                                    className="text-lg font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#a8a8d8] transition-all duration-300 group-hover:from-[#6a11cb] group-hover:to-[#8a2be2]"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {member.name}
                                                </motion.h3>
                                                <motion.p 
                                                    className="text-[#8a2be2] font-medium mb-4 text-sm transition-all duration-300 group-hover:text-[#6a11cb]"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {member.role}
                                                </motion.p>
                                                <motion.p 
                                                    className="text-[#a8a8d8] text-sm leading-relaxed transition-all duration-300 group-hover:text-white"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    {member.description}
                                                </motion.p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default About;