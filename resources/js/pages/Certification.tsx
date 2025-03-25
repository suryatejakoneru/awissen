import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, Search, Shield, Users, GraduationCap, FileCheck, XCircle, Calendar } from 'lucide-react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

// Define the type for the page props
interface PageProps extends InertiaPageProps {
    flash: {
        error?: string;
        success?: string;
    };
    errors: {
        certificate_code?: string;
    };
}

// Define certificate data type
interface CertificateData {
    id: number;
    user: {
        name: string;
    };
    sub_course: {
        title: string;
        course: {
            title: string;
        };
    };
    certificate_code: string;
    issue_date: string;
}

const Certification = () => {
    // Use the defined type for the page props
    const { flash, errors } = usePage<PageProps>().props;
    const [certificateCode, setCertificateCode] = React.useState('');
    const [verificationResult, setVerificationResult] = React.useState<null | { valid: boolean; message: string }>(null);
    const [loading, setLoading] = React.useState(false);
    const [certificateData, setCertificateData] = React.useState<CertificateData | null>(null);

    // Set verification result from flash messages when component mounts
    React.useEffect(() => {
        if (flash && flash.error) {
            setVerificationResult({
                valid: false,
                message: flash.error
            });
        }
        
        if (errors && errors.certificate_code) {
            setVerificationResult({
                valid: false,
                message: errors.certificate_code
            });
        }
    }, [flash, errors]);

    const handleVerify = async () => {
        if (!certificateCode.trim()) {
            setVerificationResult({
                valid: false,
                message: 'Please enter a certificate code.'
            });
            return;
        }

        setLoading(true);
        setVerificationResult(null);
        setCertificateData(null);

        try {
            const response = await axios.post('/verify-certificate', {
                certificate_code: certificateCode
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                }
            });
            
            // If we get here, the certificate was found
            setVerificationResult({
                valid: true,
                message: 'Certificate verified successfully!'
            });
            
            // Set certificate data to display
            setCertificateData(response.data.certificate);
            
        } catch (error) {
            console.error('Verification error:', error);
            // Handle error response
            let errorMessage = 'Certificate verification failed. Please check the code and try again.';
            
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Get the error message from the response if available
                    const responseData = error.response.data;
                    if (responseData.errors && responseData.errors.certificate_code) {
                        errorMessage = responseData.errors.certificate_code[0];
                    } else if (responseData.message) {
                        errorMessage = responseData.message;
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    errorMessage = 'No response received from server. Please try again later.';
                }
            }
            
            setVerificationResult({
                valid: false,
                message: errorMessage
            });
        } finally {
            setLoading(false);
        }
    };

    const certificationProcess = [
        {
            title: "Complete Course Requirements",
            description: "Successfully complete all modules and assessments in your chosen certification program.",
            icon: GraduationCap,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
        },
        {
            title: "Submit Final Project",
            description: "Complete and submit your final project demonstrating your acquired skills.",
            icon: FileCheck,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
        },
        {
            title: "Pass Final Assessment",
            description: "Achieve the required score in the comprehensive final examination.",
            icon: Award,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
        },
        {
            title: "Receive Certification",
            description: "Get your official AWISSEN certification with a unique verification ID.",
            icon: Shield,
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
        }
    ];

    const benefits = [
        {
            title: "Industry Recognition",
            description: "Our certifications are recognized by leading automotive companies worldwide.",
            icon: Award,
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
        },
        {
            title: "Career Advancement",
            description: "Boost your career prospects with industry-validated credentials.",
            icon: Users,
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
        },
        {
            title: "Lifetime Access",
            description: "Access your certification status and materials indefinitely.",
            icon: Clock,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
        },
        {
            title: "Verification System",
            description: "Employers can easily verify your certification status.",
            icon: Search,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <Layout title="AWISSEN - Certification | Automotive Education & Training">
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                        alt="Certification Hero"
                        className="object-cover w-full h-full opacity-80"
                    />
                    <div className="absolute inset-0 bg-[#0a0a29]/80"></div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                    <motion.div 
                        className="text-center max-w-3xl mx-auto"
                        initial="initial"
                        animate="animate"
                        variants={fadeInUp}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] drop-shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                                AWISSEN Certification
                            </span>
                        </h1>
                        <p className="text-[#a8a8d8] text-xl mb-8">
                            Validate your expertise with industry-recognized certifications
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Certification Process Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Certification Process
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                Follow our structured path to achieve your certification
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {certificationProcess.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300 h-full">
                                    <div className="aspect-[16/9] relative">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="object-cover w-full h-full opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f3d]/80 to-[#0f0f3d] transition-opacity duration-300 group-hover:opacity-70"></div>
                                    </div>
                                    <div className="p-6 -mt-12 relative z-10">
                                        <div className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-colors duration-300 group-hover:bg-[#8a2be2]">
                                            <step.icon className="h-8 w-8 text-[#8a2be2] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2] text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-[#a8a8d8] transition-colors duration-300 group-hover:text-white text-center">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-[#0f0f3d]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Benefits of Certification
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                Discover the advantages of becoming a certified professional
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] overflow-hidden group hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all duration-300 h-full">
                                    <div className="aspect-[16/9] relative">
                                        <img
                                            src={benefit.image}
                                            alt={benefit.title}
                                            className="object-cover w-full h-full opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f3d]/80 to-[#0f0f3d] transition-opacity duration-300 group-hover:opacity-70"></div>
                                    </div>
                                    <div className="p-6 -mt-12 relative z-10">
                                        <div className="bg-[#0a0a29] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 mx-auto transition-colors duration-300 group-hover:bg-[#8a2be2]">
                                            <benefit.icon className="h-8 w-8 text-[#8a2be2] transition-colors duration-300 group-hover:text-white" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-4 text-[#a8a8d8] transition-colors duration-300 group-hover:text-[#8a2be2] text-center">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-[#a8a8d8] transition-colors duration-300 group-hover:text-white text-center">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certificate Verification Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6 lg:col-start-4 text-center mb-16">
                            <h2 className="text-3xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2]">
                                    Verify Your Certificate
                                </span>
                            </h2>
                            <p className="text-[#a8a8d8]">
                                Enter your certificate Code to verify its authenticity
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12">
                        <motion.div
                            className="col-span-12 lg:col-span-8 lg:col-start-3"
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                        >
                            <div className="bg-[#0f0f3d] rounded-lg border border-[#2d2d6d] p-8 shadow-[0_0_30px_rgba(138,43,226,0.1)]">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <input
                                        type="text"
                                        value={certificateCode}
                                        onChange={(e) => setCertificateCode(e.target.value)}
                                        placeholder="Enter Certificate ID"
                                        className="flex-1 bg-[#0a0a29] border border-[#2d2d6d] rounded-lg px-4 py-3 text-[#a8a8d8] focus:outline-none focus:border-[#8a2be2] transition-colors duration-300"
                                    />
                                    <button
                                        onClick={handleVerify}
                                        disabled={loading}
                                        className={`${
                                            loading ? 'bg-[#8a2be2]/70' : 'bg-[#8a2be2]'
                                        } text-white rounded-lg px-6 py-3 font-medium hover:bg-[#6a11cb] transition-colors duration-300 flex items-center justify-center gap-2`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                <Search className="h-4 w-4" />
                                                Verify
                                            </>
                                        )}
                                    </button>
                                </div>

                                {verificationResult && (
                                    <div className={`mt-6 p-4 rounded-lg ${
                                        verificationResult.valid 
                                            ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                                            : 'bg-red-500/10 border border-red-500/20 text-red-500'
                                    }`}>
                                        <div className="flex items-center gap-2">
                                            {verificationResult.valid ? (
                                                <CheckCircle className="h-5 w-5" />
                                            ) : (
                                                <XCircle className="h-5 w-5" />
                                            )}
                                            <p>{verificationResult.message}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Certificate Data Display */}
                                {certificateData && (
                                    <motion.div 
                                        className="mt-8 p-6 bg-[#0a0a29] border border-[#2d2d6d] rounded-lg"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">Certificate Verification</h3>
                                            <p className="text-[#a8a8d8]">This certificate has been verified as authentic</p>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-[#0f0f3d] rounded-lg">
                                                <Users className="h-5 w-5 text-[#8a2be2]" />
                                                <div>
                                                    <p className="text-[#a8a8d8] text-sm">Certificate Holder</p>
                                                    <p className="text-white font-medium">{certificateData.user.name}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-[#0f0f3d] rounded-lg">
                                                <Award className="h-5 w-5 text-[#8a2be2]" />
                                                <div>
                                                    <p className="text-[#a8a8d8] text-sm">Course</p>
                                                    <p className="text-white font-medium">{certificateData.sub_course.course.title}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-[#0f0f3d] rounded-lg">
                                                <GraduationCap className="h-5 w-5 text-[#8a2be2]" />
                                                <div>
                                                    <p className="text-[#a8a8d8] text-sm">Specialization</p>
                                                    <p className="text-white font-medium">{certificateData.sub_course.title}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-[#0f0f3d] rounded-lg">
                                                <Calendar className="h-5 w-5 text-[#8a2be2]" />
                                                <div>
                                                    <p className="text-[#a8a8d8] text-sm">Issue Date</p>
                                                    <p className="text-white font-medium">{certificateData.issue_date}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 p-3 bg-[#0f0f3d] rounded-lg">
                                                <Shield className="h-5 w-5 text-[#8a2be2]" />
                                                <div>
                                                    <p className="text-[#a8a8d8] text-sm">Certificate ID</p>
                                                    <p className="text-white font-medium">{certificateData.certificate_code}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Rest of your component... */}
        </Layout>
    );
};

export default Certification;