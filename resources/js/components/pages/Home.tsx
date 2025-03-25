import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const courses = [
        {
            title: 'Engines',
            description: 'Comprehensive engine technology and maintenance courses',
            image: '/images/courses/engines.jpg',
            gradient: 'from-blue-500 to-purple-500',
        },
        {
            title: 'EV Technology',
            description: 'Electric vehicle systems and maintenance training',
            image: '/images/courses/ev.jpg',
            gradient: 'from-green-500 to-blue-500',
        },
        {
            title: 'Design',
            description: 'Automotive design principles and practices',
            image: '/images/courses/design.jpg',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Manufacturing',
            description: 'Advanced manufacturing processes and techniques',
            image: '/images/courses/manufacturing.jpg',
            gradient: 'from-orange-500 to-red-500',
        },
        {
            title: 'Engine Tuning',
            description: 'Performance optimization and engine tuning',
            image: '/images/courses/tuning.jpg',
            gradient: 'from-yellow-500 to-orange-500',
        },
        {
            title: 'Robotics',
            description: 'Automotive robotics and automation systems',
            image: '/images/courses/robotics.jpg',
            gradient: 'from-indigo-500 to-purple-500',
        },
    ];

    const testimonials = [
        {
            name: 'John Doe',
            position: 'Senior Engineer',
            company: 'Tech Motors',
            content: 'The courses at AWISSEN have been instrumental in advancing my career. The practical approach and industry expertise are unmatched.',
            image: '/images/testimonials/john.jpg',
            rating: 5,
        },
        {
            name: 'Jane Smith',
            position: 'Design Director',
            company: 'Auto Design Co',
            content: 'I highly recommend AWISSEN for anyone looking to enhance their automotive knowledge. The instructors are experts in their fields.',
            image: '/images/testimonials/jane.jpg',
            rating: 5,
        },
        {
            name: 'Mike Johnson',
            position: 'Production Manager',
            company: 'Manufacturing Pro',
            content: 'The certification program at AWISSEN has given me the skills and confidence to take on new challenges in the industry.',
            image: '/images/testimonials/mike.jpg',
            rating: 5,
        },
    ];

    return (
        <div className="space-y-24">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
                <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                        Empowering Automotive Excellence
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                        Join AWISSEN to advance your career in automotive technology through comprehensive education and certification programs.
                    </p>
                    <Link
                        href="/courses"
                        className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200"
                    >
                        Explore Courses
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div
                            key={course.title}
                            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                        >
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                                    <p className="text-white/90">{course.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Our Students Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="bg-white rounded-lg shadow-lg p-6 backdrop-blur-md bg-white/70"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="ml-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.position} at {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                                <div className="flex">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-5 w-5 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 