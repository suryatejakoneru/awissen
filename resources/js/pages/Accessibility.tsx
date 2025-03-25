import React from 'react';
import Layout from '../components/layout/Layout';

const Accessibility = () => {
    return (
        <Layout title="AWISSEN - Accessibility" description="Our commitment to making AWISSEN accessible to all users">
            <div className="min-h-screen bg-[#0a0a29] text-white">
                {/* Header Section */}
                <section className="relative py-16 bg-[#0f0f3d]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-4xl font-bold mb-4 text-center">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                Accessibility Statement
                            </span>
                        </h1>
                        <p className="text-[#a8a8d8] text-lg text-center max-w-3xl mx-auto">
                            Our commitment to making AWISSEN accessible to all users
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

                                <h2 className="text-2xl font-semibold mb-4 text-white">Our Commitment</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    AWISSEN is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Standards We Follow</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    AWISSEN aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
                                </p>
                                <p className="text-[#a8a8d8] mb-6">
                                    The guidelines have three levels of accessibility (A, AA, and AAA). We've chosen Level AA as our target.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Accessibility Features</h2>
                                <p className="text-[#a8a8d8] mb-3">
                                    AWISSEN includes the following accessibility features:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">Semantic HTML: We use semantic HTML to ensure our content is properly structured and can be interpreted by assistive technologies.</li>
                                    <li className="mb-2">Keyboard Navigation: All interactive elements are accessible via keyboard navigation.</li>
                                    <li className="mb-2">Text Alternatives: We provide text alternatives for non-text content.</li>
                                    <li className="mb-2">Color Contrast: We ensure sufficient color contrast between text and background colors.</li>
                                    <li className="mb-2">Resizable Text: Text can be resized without loss of content or functionality.</li>
                                    <li className="mb-2">ARIA Attributes: We use ARIA attributes where appropriate to enhance accessibility.</li>
                                    <li className="mb-2">Focus Indicators: Visible focus indicators help keyboard users navigate our site.</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Compatibility with Assistive Technologies</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    AWISSEN is designed to be compatible with the following assistive technologies:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">Screen readers (such as NVDA, JAWS, and VoiceOver)</li>
                                    <li className="mb-2">Screen magnifiers</li>
                                    <li className="mb-2">Speech recognition software</li>
                                    <li className="mb-2">Keyboard-only navigation</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Known Limitations</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    While we strive to ensure that AWISSEN is accessible to all users, there may be some limitations:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">Some older content may not fully meet our accessibility standards. We are working to update these materials.</li>
                                    <li className="mb-2">Third-party content that we do not control may not meet the same accessibility standards as our own content.</li>
                                    <li className="mb-2">Some interactive educational simulations may have limited accessibility due to their visual nature.</li>
                                </ul>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Continuous Improvement</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We are committed to continuously improving the accessibility of AWISSEN. We regularly review our site for accessibility issues and work to address them. We also provide training to our staff to ensure they understand the importance of accessibility and how to create accessible content.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Feedback</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    We welcome your feedback on the accessibility of AWISSEN. Please let us know if you encounter any accessibility barriers:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2">Email: <a href="mailto:accessibility@awissen.in" className="text-[#8a2be2] hover:underline">accessibility@awissen.in</a></li>
                                    <li className="mb-2">Phone: +91-XXXX-XXXXXX</li>
                                    <li className="mb-2">Contact Form: <a href="/contact" className="text-[#8a2be2] hover:underline">Contact Us</a></li>
                                </ul>
                                <p className="text-[#a8a8d8] mb-6">
                                    We try to respond to feedback within 3 business days.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Assessment and Compliance</h2>
                                <p className="text-[#a8a8d8] mb-6">
                                    The accessibility of AWISSEN is assessed through a combination of automated testing tools and manual testing by users with disabilities. We conduct regular audits to ensure our site remains accessible as new content is added.
                                </p>

                                <h2 className="text-2xl font-semibold mb-4 text-white">Additional Resources</h2>
                                <p className="text-[#a8a8d8] mb-3">
                                    For more information about web accessibility, please visit these resources:
                                </p>
                                <ul className="list-disc pl-6 text-[#a8a8d8] mb-6">
                                    <li className="mb-2"><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="text-[#8a2be2] hover:underline">Web Content Accessibility Guidelines (WCAG)</a></li>
                                    <li className="mb-2"><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer" className="text-[#8a2be2] hover:underline">W3C Web Accessibility Initiative (WAI)</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Accessibility;