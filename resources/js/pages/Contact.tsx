import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

interface Props {
    settings?: Record<string, any>;
}

const Contact = ({ settings = {} }: Props) => {
    useEffect(() => {
        console.log('Settings:', settings);
    }, []);
    return (
        <Layout title="AWISSEN - Contact | Automotive Education & Training">
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80"
                        alt="Contact Hero"
                        className="object-cover w-full h-full opacity-80"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a29]/90 via-[#0a0a29]/80 to-[#0a0a29]/90"></div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20 bg-repeat"></div>
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
                                    Contact Us
                                </span>
                            </h1>
                            <p className="text-[#a8a8d8] text-lg mb-8">
                                Get in touch with us for any questions or inquiries about our automotive education programs
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-[#0f0f3d]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Send Us a Message
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                We'll get back to you as soon as possible
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Contact Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: MapPin,
                                    title: 'Visit Us',
                                    description: settings?.contact_address,
                                    link: 'https://maps.google.com'
                                },
                                {
                                    icon: Phone,
                                    title: 'Call Us',
                                    description: settings?.contact_phone,
                                    link: 'tel:+91'+settings?.contact_phone
                                },
                                {
                                    icon: Mail,
                                    title: 'Email Us',
                                    description: settings?.contact_email,
                                    link: 'mailto:'+settings?.contact_email
                                },
                                {
                                    icon: Clock,
                                    title: 'Business Hours',
                                    description: 'Mon - Fri: 9:00 AM - 6:00 PM',
                                    link: '#'
                                }
                            ].map((contact, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    initial="initial"
                                    animate="animate"
                                    transition={{ delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-6 text-center h-full hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300">
                                        <div className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                                            <contact.icon className="h-8 w-8 text-[#8a2be2]" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 text-[#a8a8d8]">
                                            {contact.title}
                                        </h3>
                                        <a href={contact.link} className="text-[#a8a8d8] hover:text-[#8a2be2] transition-colors duration-300">
                                            {contact.description}
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            className="h-full"
                        >
                            <div className="bg-[#0a0a29] rounded-lg border border-[#2d2d6d] p-8 h-full">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-[#a8a8d8] mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-4 py-2 bg-[#0f0f3d] border border-[#2d2d6d] rounded-lg text-white focus:outline-none focus:border-[#8a2be2] transition-colors duration-300"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-[#a8a8d8] mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-2 bg-[#0f0f3d] border border-[#2d2d6d] rounded-lg text-white focus:outline-none focus:border-[#8a2be2] transition-colors duration-300"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-[#a8a8d8] mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            className="w-full px-4 py-2 bg-[#0f0f3d] border border-[#2d2d6d] rounded-lg text-white focus:outline-none focus:border-[#8a2be2] transition-colors duration-300"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-[#a8a8d8] mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className="w-full px-4 py-2 bg-[#0f0f3d] border border-[#2d2d6d] rounded-lg text-white focus:outline-none focus:border-[#8a2be2] transition-colors duration-300"
                                            placeholder="Your message..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-[#8a2be2] text-white py-3 px-6 rounded-lg hover:bg-[#6a11cb] transition-colors duration-300"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="h-[500px] w-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532934473!3d40.69714941645637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1641234567890!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                ></iframe>
            </section>
        </Layout>
    );
};

export default Contact;