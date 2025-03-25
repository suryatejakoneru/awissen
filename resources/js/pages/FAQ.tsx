import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openFaqs, setOpenFaqs] = useState<number[]>([]);

    const toggleFaq = (index: number) => {
        if (openFaqs.includes(index)) {
            setOpenFaqs(openFaqs.filter(item => item !== index));
        } else {
            setOpenFaqs([...openFaqs, index]);
        }
    };

    const categories = [
        { id: 'general', name: 'General' },
        { id: 'courses', name: 'Courses' },
        { id: 'account', name: 'Account' },
        { id: 'payment', name: 'Payment' },
        { id: 'certification', name: 'Certification' },
    ];

    const faqs = {
        general: [
            {
                question: 'What is AWISSEN?',
                answer: 'AWISSEN is a premier automotive education platform that provides comprehensive training in automotive engineering, design, and technology. We combine cutting-edge technology with expert instruction to deliver high-quality educational content.'
            },
            {
                question: 'How do I contact customer support?',
                answer: 'You can contact our customer support team through the Contact page on our website, by emailing support@awissen.in, or by calling our support line at +91-XXXX-XXXXXX during business hours.'
            },
            {
                question: 'What are your business hours?',
                answer: 'Our customer support team is available Monday through Friday, 9:00 AM to 6:00 PM IST. We are closed on weekends and major holidays.'
            },
            {
                question: 'Do you offer in-person training?',
                answer: 'Yes, we offer both online courses and in-person training sessions at select locations. Check our course catalog for details on available in-person training options.'
            }
        ],
        courses: [
            {
                question: 'How do I enroll in a course?',
                answer: 'To enroll in a course, navigate to the Courses page, select the course you\'re interested in, and click the "Enroll Now" button. You\'ll be guided through the registration and payment process.'
            },
            {
                question: 'Can I access course materials offline?',
                answer: 'Yes, many of our courses offer downloadable materials that you can access offline. However, video content typically requires an internet connection for streaming.'
            },
            {
                question: 'What is the duration of a typical course?',
                answer: 'Course durations vary depending on the subject matter and depth. Most courses range from 4 to 12 weeks, with approximately 3-5 hours of content per week.'
            },
            {
                question: 'Are there any prerequisites for courses?',
                answer: 'Prerequisites vary by course. Basic courses typically have no prerequisites, while advanced courses may require prior knowledge or completion of foundational courses. Each course page lists any specific prerequisites.'
            },
            {
                question: 'Can I switch between courses?',
                answer: 'Yes, you can enroll in multiple courses and switch between them at any time. Your progress in each course is saved automatically.'
            }
        ],
        account: [
            {
                question: 'How do I create an account?',
                answer: 'To create an account, click on the "Login" button in the top navigation bar and select "Create Account". Fill in the required information and follow the verification process.'
            },
            {
                question: 'How do I reset my password?',
                answer: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your registered email address, and we\'ll send you instructions to reset your password.'
            },
            {
                question: 'Can I change my email address?',
                answer: 'Yes, you can change your email address in your account settings. Log in to your account, navigate to Profile Settings, and update your email address.'
            },
            {
                question: 'How do I delete my account?',
                answer: 'To delete your account, please contact our customer support team. Please note that deleting your account will permanently remove all your data and course progress.'
            }
        ],
        payment: [
            {
                question: 'What payment methods do you accept?',
                answer: 'We accept various payment methods including credit/debit cards, net banking, UPI, and select digital wallets. All payments are processed securely through our payment gateway.'
            },
            {
                question: 'Do you offer refunds?',
                answer: 'Yes, we offer refunds within 7 days of purchase if you\'re not satisfied with the course. Please refer to our refund policy for more details.'
            },
            {
                question: 'Are there any discounts available?',
                answer: 'We occasionally offer discounts for early enrollment, seasonal promotions, and special events. Subscribe to our newsletter to stay updated on our latest offers.'
            },
            {
                question: 'Do you offer installment payment options?',
                answer: 'Yes, for select premium courses, we offer installment payment plans. Details are available on the specific course enrollment pages.'
            }
        ],
        certification: [
            {
                question: 'How do I get certified?',
                answer: 'To earn a certification, you must complete all required course modules and pass the final assessment with a minimum score (typically 70%). Once completed, you can download your certificate from your dashboard.'
            },
            {
                question: 'Are your certifications recognized by the industry?',
                answer: 'Yes, our certifications are recognized by many automotive industry leaders and educational institutions. We continuously work with industry partners to ensure our curriculum meets current industry standards.'
            },
            {
                question: 'How long are certifications valid?',
                answer: 'Our certifications do not expire. However, we recommend staying updated with the latest industry developments and considering refresher courses every few years.'
            },
            {
                question: 'Can I add my certification to LinkedIn?',
                answer: 'Yes, you can add your AWISSEN certification to your LinkedIn profile. We provide instructions on how to do this after you receive your certificate.'
            },
            {
                question: 'Do you offer advanced certifications?',
                answer: 'Yes, we offer both foundational and advanced certifications. Advanced certifications typically require completion of prerequisite courses or demonstrated experience in the field.'
            }
        ]
    };

    return (
        <Layout title="AWISSEN - Frequently Asked Questions" description="Find answers to common questions about AWISSEN's courses, certifications, and services.">
            <div className="min-h-screen bg-[#0a0a29] text-white">
                {/* Header Section */}
                <section className="relative py-16 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                Frequently Asked Questions
                            </span>
                        </h1>
                        <p className="text-[#a8a8d8] text-lg text-center max-w-3xl mx-auto">
                            Find answers to common questions about our courses, certifications, and services
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        {/* Category Tabs */}
                        <div className="flex overflow-x-auto mb-8 pb-2 scrollbar-hide">
                            <div className="flex space-x-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-6 py-3 rounded-lg whitespace-nowrap ${
                                            activeCategory === category.id
                                                ? 'bg-[#8a2be2] text-white'
                                                : 'bg-[#1a1a4d] text-[#a8a8d8] hover:bg-[#2d2d6d]'
                                        } transition-colors duration-200`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 shadow-lg">
                            <h2 className="text-2xl font-semibold mb-6">{categories.find(c => c.id === activeCategory)?.name} FAQs</h2>
                            <div className="space-y-4">
                                {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                                    <div 
                                        key={index} 
                                        className="border border-[#2d2d6d] rounded-lg overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex justify-between items-center p-4 text-left bg-[#1a1a4d] hover:bg-[#2d2d6d] transition-colors duration-200"
                                        >
                                            <span className="font-medium text-white">{faq.question}</span>
                                            {openFaqs.includes(index) ? (
                                                <ChevronUp className="text-[#a8a8d8]" size={20} />
                                            ) : (
                                                <ChevronDown className="text-[#a8a8d8]" size={20} />
                                            )}
                                        </button>
                                        {openFaqs.includes(index) && (
                                            <div className="p-4 bg-[#0f0f3d] text-[#a8a8d8]">
                                                <p>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Still Have Questions */}
                        <div className="mt-12 bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 shadow-lg text-center">
                            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
                            <p className="text-[#a8a8d8] mb-6 max-w-2xl mx-auto">
                                If you couldn't find the answer you were looking for, our support team is here to help you.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a
                                    href="/contact"
                                    className="px-6 py-3 bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] text-white rounded-lg hover:from-[#8a2be2] hover:to-[#6a11cb] transform hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)]"
                                >
                                    Contact Support
                                </a>
                                <a
                                    href="/help-center"
                                    className="px-6 py-3 bg-[#1a1a4d] text-[#a8a8d8] rounded-lg hover:bg-[#2d2d6d] hover:text-white transition-all duration-300"
                                >
                                    Visit Help Center
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default FAQ;