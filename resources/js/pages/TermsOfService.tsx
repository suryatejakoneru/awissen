import React from 'react';
import Layout from '../components/layout/Layout';

const TermsOfService = () => {
    return (
        <Layout title="AWISSEN - Terms of Service">
            <div className="min-h-screen bg-[#0a0a29] text-white">
                {/* Header Section */}
                <section className="relative py-16 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                Terms of Service
                            </span>
                        </h1>
                        <p className="text-[#a8a8d8] text-lg text-center max-w-3xl mx-auto">
                            Please read these terms carefully before using our services
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

                                <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    By accessing or using AWISSEN's website, services, or courses, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Services</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    AWISSEN provides educational content, courses, and training related to automotive technology and engineering. Our services include online courses, in-person training, seminars, and educational resources.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">3. User Accounts</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    To access certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">4. Course Enrollment and Payments</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    Enrollment in our courses may require payment of fees. All payments are processed securely through our payment providers. Fees are non-refundable except as specified in our refund policy. We reserve the right to modify our pricing at any time.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">5. Intellectual Property</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    All content provided through our services, including but not limited to text, graphics, logos, images, audio, video, and software, is owned by AWISSEN or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of our content without our explicit permission.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">6. User Conduct</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our services. You also agree not to attempt to gain unauthorized access to any part of our services, other accounts, or computer systems.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    AWISSEN and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. In no event shall our total liability exceed the amount paid by you for the services in question.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">8. Termination</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">9. Changes to Terms</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We may modify these Terms of Service at any time. We will provide notice of significant changes by posting an updated version of these terms on our website. Your continued use of our services after such modifications constitutes your acceptance of the revised terms.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">10. Governing Law</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    These Terms of Service shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">11. Contact Information</h2>
                                <p className="text-[#a8a8d8]">
                                    If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;