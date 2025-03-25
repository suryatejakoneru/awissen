import React from 'react';
import Layout from '../components/layout/Layout';

const PrivacyPolicy = () => {
    return (
        <Layout title="AWISSEN - Privacy Policy">
            <div className="min-h-screen bg-[#0a0a29] text-white">
                {/* Header Section */}
                <section className="relative py-16 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                Privacy Policy
                            </span>
                        </h1>
                        <p className="text-[#a8a8d8] text-lg text-center max-w-3xl mx-auto">
                            How we collect, use, and protect your personal information
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-12">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 shadow-lg">
                            <div className="prose prose-invert max-w-none">
                                <p className="text-[#a8a8d8] mb-6">
                                    Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    AWISSEN ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
                                <p className="text-[#a8a8d8] mb-3">
                                    We may collect personal information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">Register for an account</li>
                                    <li className="mb-2">Enroll in courses</li>
                                    <li className="mb-2">Sign up for our newsletter</li>
                                    <li className="mb-2">Contact us with inquiries</li>
                                    <li className="mb-2">Participate in surveys or promotions</li>
                                </ul>
                                <p className="text-[#a8a8d8] mb-6">
                                    The personal information we collect may include your name, email address, phone number, billing information, educational background, and professional information.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
                                <p className="text-[#a8a8d8] mb-3">
                                    We may use the information we collect for various purposes, including to:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">Provide, operate, and maintain our services</li>
                                    <li className="mb-2">Improve, personalize, and expand our services</li>
                                    <li className="mb-2">Understand and analyze how you use our services</li>
                                    <li className="mb-2">Develop new products, services, features, and functionality</li>
                                    <li className="mb-2">Communicate with you about our services, updates, and other information</li>
                                    <li className="mb-2">Process transactions and send related information</li>
                                    <li className="mb-2">Find and prevent fraud</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mb-4 text-white">4. Cookies and Tracking Technologies</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We may use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">5. Third-Party Services</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We may use third-party service providers to help us operate our business and administer activities on our behalf, such as sending emails, processing payments, and analyzing website usage. These third parties may have access to your personal information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Security</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">7. Your Data Protection Rights</h2>
                                <p className="text-[#a8a8d8] mb-3">
                                    Depending on your location, you may have the following data protection rights:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">The right to access, update, or delete your personal information</li>
                                    <li className="mb-2">The right to rectification if your information is inaccurate or incomplete</li>
                                    <li className="mb-2">The right to object to our processing of your personal data</li>
                                    <li className="mb-2">The right to request restriction of processing your personal information</li>
                                    <li className="mb-2">The right to data portability</li>
                                    <li className="mb-2">The right to withdraw consent</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mb-4 text-white">8. Children's Privacy</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    Our services are not intended for use by children under the age of 16. We do not knowingly collect personally identifiable information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">9. Changes to This Privacy Policy</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">10. Contact Us</h2>
                                <p className="text-[#a8a8d8]">
                                    If you have any questions about this Privacy Policy, please contact us at:
                                </p>
                                <p className="text-[#8a2be2] mb-6">
                                    support@awissen.in
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;