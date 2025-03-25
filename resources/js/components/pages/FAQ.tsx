import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openItems, setOpenItems] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const faqItems: FAQItem[] = [
        {
            id: 1,
            category: 'General',
            question: 'What is AWISSEN?',
            answer: 'AWISSEN is a leading provider of automotive education and certification programs. We offer comprehensive courses designed to prepare individuals for successful careers in the automotive industry.',
        },
        {
            id: 2,
            category: 'General',
            question: 'How do I enroll in a course?',
            answer: 'To enroll in a course, visit our Courses page, select your desired course, and click the "Enroll" button. You\'ll be guided through the registration and payment process.',
        },
        {
            id: 3,
            category: 'Certification',
            question: 'How do I verify my certificate?',
            answer: 'You can verify your certificate by visiting our Certification page and entering your certificate ID. The system will display the certificate details if valid.',
        },
        {
            id: 4,
            category: 'Certification',
            question: 'What is the validity period of certificates?',
            answer: 'Most certificates are valid indefinitely. However, some specialized certifications may require renewal after a specific period to ensure knowledge is current with industry standards.',
        },
        {
            id: 5,
            category: 'Payment',
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers. Some regions may have additional local payment options available.',
        },
        {
            id: 6,
            category: 'Payment',
            question: 'Do you offer payment plans?',
            answer: 'Yes, we offer flexible payment plans for most courses. Contact our support team for more information about available payment options.',
        },
        {
            id: 7,
            category: 'Technical',
            question: 'What are the system requirements for online courses?',
            answer: 'Our online courses are accessible through any modern web browser. We recommend a stable internet connection and a computer with at least 4GB RAM for optimal performance.',
        },
        {
            id: 8,
            category: 'Technical',
            question: 'How do I access my course materials?',
            answer: 'Once enrolled, you can access your course materials through your student dashboard. All materials are available 24/7 and can be downloaded for offline viewing.',
        },
    ];

    const categories = Array.from(new Set(faqItems.map(item => item.category)));

    const filteredItems = faqItems.filter(item => {
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const toggleItem = (id: number) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl text-gray-600">
                            Find answers to common questions about our courses, certifications, and services.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search FAQs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <select
                                value={selectedCategory || ''}
                                onChange={(e) => setSelectedCategory(e.target.value || null)}
                                className="w-full md:w-48 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* FAQ Items */}
                    <div className="max-w-3xl mx-auto">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200"
                            >
                                <button
                                    className="w-full px-6 py-4 text-left focus:outline-none"
                                    onClick={() => toggleItem(item.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {item.question}
                                        </h3>
                                        {openItems.includes(item.id) ? (
                                            <ChevronUp className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-500" />
                                        )}
                                    </div>
                                </button>
                                {openItems.includes(item.id) && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* No Results Message */}
                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">No FAQs found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Support */}
                    <div className="max-w-3xl mx-auto mt-12 text-center">
                        <p className="text-gray-600 mb-4">
                            Still have questions? Our support team is here to help.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FAQ; 