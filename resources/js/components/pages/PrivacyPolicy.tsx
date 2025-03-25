import React from 'react';
import Layout from '../layout/Layout';

const PrivacyPolicy = () => {
    return (
        <Layout>
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-600 mb-8">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                                <p className="text-gray-600 mb-4">
                                    AWISSEN ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                                </p>
                                <p className="text-gray-600">
                                    Please read this privacy policy carefully. By using our website and services, you consent to the practices described in this policy.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">2.1 Personal Information</h3>
                                <p className="text-gray-600 mb-4">
                                    We may collect personal information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4">
                                    <li>Register for an account</li>
                                    <li>Enroll in a course</li>
                                    <li>Sign up for our newsletter</li>
                                    <li>Contact us through our website</li>
                                </ul>
                                <p className="text-gray-600 mb-4">
                                    The personal information we collect may include:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4">
                                    <li>Name and contact information</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Payment information</li>
                                    <li>Educational background</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-900 mb-2">2.2 Automatically Collected Information</h3>
                                <p className="text-gray-600 mb-4">
                                    When you visit our website, we automatically collect certain information about your device, including:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600">
                                    <li>IP address</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>Pages visited</li>
                                    <li>Time spent on the website</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                                <p className="text-gray-600 mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4">
                                    <li>Provide and maintain our services</li>
                                    <li>Process your course enrollments</li>
                                    <li>Send you important updates and notifications</li>
                                    <li>Improve our website and services</li>
                                    <li>Communicate with you about our offerings</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                                <p className="text-gray-600 mb-4">
                                    We do not sell or rent your personal information to third parties. We may share your information with:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4">
                                    <li>Service providers who assist in our operations</li>
                                    <li>Educational institutions for certification purposes</li>
                                    <li>Law enforcement when required by law</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                                <p className="text-gray-600 mb-4">
                                    We implement appropriate security measures to protect your personal information, including:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4">
                                    <li>Encryption of sensitive data</li>
                                    <li>Regular security assessments</li>
                                    <li>Access controls and authentication</li>
                                    <li>Secure data storage and transmission</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                                <p className="text-gray-600 mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Export your data</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
                                <p className="text-gray-600">
                                    If you have any questions about this Privacy Policy, please contact us at:
                                </p>
                                <div className="mt-2 text-gray-600">
                                    <p>Email: privacy@awissen.com</p>
                                    <p>Address: 123 Education Street, City, State 12345</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy; 