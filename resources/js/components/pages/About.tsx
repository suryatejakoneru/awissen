import React from 'react';
import Layout from '../layout/Layout';

const About = () => {
    const team = [
        {
            name: 'Dr. Sarah Williams',
            position: 'Director of Education',
            image: '/images/team/sarah.jpg',
            description: 'With over 15 years of experience in automotive engineering and education.',
        },
        {
            name: 'Prof. James Chen',
            position: 'Head of Research',
            image: '/images/team/james.jpg',
            description: 'Leading expert in electric vehicle technology and sustainable mobility.',
        },
        {
            name: 'Eng. Robert Miller',
            position: 'Technical Director',
            image: '/images/team/robert.jpg',
            description: 'Specialist in engine performance and automotive diagnostics.',
        },
    ];

    return (
        <Layout>
            <div className="space-y-24 py-12">
                {/* Mission Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">About AWISSEN</h1>
                        <p className="text-xl text-gray-600 mb-12">
                            AWISSEN is dedicated to shaping the future of automotive education through innovative learning programs and industry-leading certification courses.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 mb-6">
                                To empower individuals with comprehensive knowledge and practical skills in automotive technology, preparing them for successful careers in the rapidly evolving automotive industry.
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                            <p className="text-gray-600">
                                To be the global leader in automotive education, recognized for excellence in training, innovation, and producing industry-ready professionals.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                <img
                                    src="/images/about/mission.jpg"
                                    alt="AWISSEN Mission"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg" />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-gray-50 py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg p-8 shadow-lg backdrop-blur-md bg-white/70">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
                                <p className="text-gray-600">
                                    We strive for excellence in everything we do, from curriculum development to student support.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-lg backdrop-blur-md bg-white/70">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
                                <p className="text-gray-600">
                                    We embrace new technologies and teaching methods to provide cutting-edge education.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-lg backdrop-blur-md bg-white/70">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Integrity</h3>
                                <p className="text-gray-600">
                                    We maintain the highest standards of professional ethics and transparency.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Leadership Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="aspect-w-3 aspect-h-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                    <p className="text-blue-600 mb-4">{member.position}</p>
                                    <p className="text-gray-600">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default About; 