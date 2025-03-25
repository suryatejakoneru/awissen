import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to send message');
            }

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to send message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                        <p className="text-xl text-gray-600">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Visit Us</h3>
                                                <p className="mt-1 text-gray-600">
                                                    123 Education Street<br />
                                                    City, State 12345<br />
                                                    Country
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Phone className="h-6 w-6 text-blue-600 mt-1" />
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                                                <p className="mt-1 text-gray-600">
                                                    +1 (123) 456-7890<br />
                                                    Monday - Friday, 9am - 6pm
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Mail className="h-6 w-6 text-blue-600 mt-1" />
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                                                <p className="mt-1 text-gray-600">
                                                    info@awissen.com<br />
                                                    support@awissen.com
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg">
                                    {/* TODO: Add Google Maps integration */}
                                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">Map placeholder</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                'Sending...'
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {success && (
                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                                        <p className="text-green-600">
                                            Thank you for your message. We'll get back to you soon!
                                        </p>
                                    </div>
                                )}

                                {error && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-red-600">{error}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact; 