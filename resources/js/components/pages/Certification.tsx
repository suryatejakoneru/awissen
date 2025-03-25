import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Search, Award, CheckCircle, XCircle } from 'lucide-react';

interface Certificate {
    id: number;
    certificate_id: string;
    issue_date: string;
    expiry_date: string | null;
    user: {
        first_name: string;
        last_name: string;
    };
    sub_course: {
        title: string;
        course: {
            title: string;
        };
    };
}

const Certification = () => {
    const [certificateId, setCertificateId] = useState('');
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setCertificate(null);

        try {
            const response = await fetch(`/api/certificates/verify/${certificateId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to verify certificate');
            }

            setCertificate(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Certificate Verification</h1>
                        <p className="text-xl text-gray-600">
                            Verify the authenticity of AWISSEN certificates using the certificate ID.
                        </p>
                    </div>

                    {/* Verification Form */}
                    <div className="max-w-xl mx-auto mb-12">
                        <form onSubmit={handleVerify} className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Enter certificate ID (e.g., AW1234AB0123)"
                                    value={certificateId}
                                    onChange={(e) => setCertificateId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !certificateId}
                                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : 'Verify Certificate'}
                            </button>
                        </form>
                    </div>

                    {/* Results */}
                    {error && (
                        <div className="max-w-xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center">
                                <XCircle className="h-6 w-6 text-red-600 mr-2" />
                                <p className="text-red-600">{error}</p>
                            </div>
                        </div>
                    )}

                    {certificate && (
                        <div className="max-w-xl mx-auto bg-green-50 border border-green-200 rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                                <h2 className="text-xl font-semibold text-green-900">Valid Certificate</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Certificate ID</h3>
                                    <p className="mt-1 text-lg text-gray-900">{certificate.certificate_id}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Student Name</h3>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {certificate.user.first_name} {certificate.user.last_name}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Course</h3>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {certificate.sub_course.course.title} - {certificate.sub_course.title}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Issue Date</h3>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {new Date(certificate.issue_date).toLocaleDateString()}
                                    </p>
                                </div>
                                {certificate.expiry_date && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Expiry Date</h3>
                                        <p className="mt-1 text-lg text-gray-900">
                                            {new Date(certificate.expiry_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Information Section */}
                    <div className="max-w-3xl mx-auto mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Certificates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-lg p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Format</h3>
                                <p className="text-gray-600">
                                    Our certificates follow a unique format: AW[4 random numbers][initials][month and year].
                                    For example: AW1234JS0123 for John Smith certified in January 2023.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Process</h3>
                                <p className="text-gray-600">
                                    Enter the certificate ID to verify its authenticity. Valid certificates will display
                                    the student's name, course details, and issue date.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Certification; 