import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Edit2, Trash2, Plus, Filter, Calendar, User, Book } from 'react-feather';
import { toast } from 'react-hot-toast';

interface Certificate {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    sub_course: {
        id: number;
        title: string;
        course: {
            id: number;
            title: string;
        };
    };
    certificate_code: string;
    issue_date: string;
    created_at: string;
}

interface Props {
    certificates: {
        data: Certificate[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
    };
    users: {
        id: number;
        name: string;
        email: string;
    }[];
    subCourses: {
        id: number;
        title: string;
        course_title: string;
        full_title: string;
    }[];
}

const Certificates: React.FC<Props> = ({ certificates, filters, users, subCourses }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingCertificate, setDeletingCertificate] = useState<Certificate | null>(null);
    const [formData, setFormData] = useState({
        user_id: '',
        sub_course_id: '',
        issue_date: new Date().toISOString().split('T')[0],
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/certificates', { search: e.target.value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleEdit = (certificate: Certificate) => {
        setEditingCertificate(certificate);
        setFormData({
            user_id: certificate.user.id.toString(),
            sub_course_id: certificate.sub_course.id.toString(),
            issue_date: new Date(certificate.issue_date).toISOString().split('T')[0],
        });
        setIsModalOpen(true);
    };

    const handleDelete = (certificate: Certificate) => {
        setDeletingCertificate(certificate);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deletingCertificate) return;

        router.delete(`/admin/certificates/${deletingCertificate.id}`, {
            onSuccess: () => {
                toast.success('Certificate deleted successfully');
                setShowDeleteModal(false);
                setDeletingCertificate(null);
            },
            onError: () => {
                toast.error('Failed to delete certificate');
            }
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCertificate) {
            router.put(`/admin/certificates/${editingCertificate.id}`, formData, {
                onSuccess: () => {
                    toast.success('Certificate updated successfully');
                    setIsModalOpen(false);
                    setEditingCertificate(null);
                    resetForm();
                },
                onError: (errors: any) => {
                    Object.keys(errors).forEach(key => {
                        toast.error(errors[key]);
                    });
                }
            });
        } else {
            router.post('/admin/certificates', formData, {
                onSuccess: () => {
                    toast.success('Certificate created successfully');
                    setIsModalOpen(false);
                    resetForm();
                },
                onError: (errors: any) => {
                    Object.keys(errors).forEach(key => {
                        toast.error(errors[key]);
                    });
                }
            });
        }
    };

    const resetForm = () => {
        setFormData({
            user_id: '',
            sub_course_id: '',
            issue_date: new Date().toISOString().split('T')[0],
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <DashboardLayout role="admin" title='Certificates Management'>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Certificate Management</h1>
                        <p className="text-[#8B949E]">Manage and issue certificates to users</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Issue Certificate
                    </button>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search certificates by user name, course, or certificate code..."
                                className="w-full bg-[#0D1117] text-white pl-10 pr-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                value={filters.search}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#30363D]">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Certificate Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Issue Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[#8B949E] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#30363D]">
                                {certificates.data.map((certificate) => (
                                    <tr key={certificate.id} className="hover:bg-[#1C2128]">
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-500">
                                                {certificate.certificate_code}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-[#8B949E]" />
                                                <div>
                                                    <div className="text-white">{certificate.user.name}</div>
                                                    <div className="text-[#8B949E] text-sm">{certificate.user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <Book className="h-4 w-4 text-[#8B949E]" />
                                                <div>
                                                    <div className="text-white">{certificate.sub_course.title}</div>
                                                    <div className="text-[#8B949E] text-sm">{certificate.sub_course.course.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-[#8B949E]" />
                                                <span className="text-[#8B949E]">{formatDate(certificate.issue_date)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleEdit(certificate)}
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(certificate)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {certificates.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[#8B949E]">No certificates found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {certificates.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex items-center space-x-2">
                            {Array.from({ length: certificates.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get('/admin/certificates', { page }, { preserveState: true })}
                                    className={`px-3 py-1 rounded ${
                                        page === certificates.current_page
                                            ? 'bg-[#238636] text-white'
                                            : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D]'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-[#161B22] rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Delete Certificate
                            </h2>
                            <p className="text-[#8B949E] mb-6">
                                Are you sure you want to delete this certificate? This action cannot be undone.
                            </p>
                            {deletingCertificate && (
                                <div className="mb-6 p-4 bg-[#0D1117] rounded-lg">
                                    <div className="mb-2">
                                        <span className="text-[#8B949E]">Certificate Code:</span>
                                        <span className="ml-2 text-white font-medium">{deletingCertificate.certificate_code}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-[#8B949E]">User:</span>
                                        <span className="ml-2 text-white font-medium">{deletingCertificate.user.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#8B949E]">Course:</span>
                                        <span className="ml-2 text-white font-medium">
                                            {deletingCertificate.sub_course.course.title} - {deletingCertificate.sub_course.title}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingCertificate(null);
                                    }}
                                    className="px-4 py-2 text-[#8B949E] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-[#161B22] rounded-lg shadow-xl w-full max-w-2xl">
                            <div className="border-b border-[#30363D] px-6 py-3 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">
                                    {editingCertificate ? 'Edit Certificate' : 'Issue New Certificate'}
                                </h2>
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingCertificate(null);
                                    }}
                                    className="text-[#8B949E] hover:text-white"
                                >
                                    &times;
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label htmlFor="user_id" className="block text-sm font-medium text-[#8B949E] mb-2">
                                            User
                                        </label>
                                        <select
                                            id="user_id"
                                            name="user_id"
                                            value={formData.user_id}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        >
                                            <option value="">Select a user</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name} ({user.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="sub_course_id" className="block text-sm font-medium text-[#8B949E] mb-2">
                                            Course Module
                                        </label>
                                        <select
                                            id="sub_course_id"
                                            name="sub_course_id"
                                            value={formData.sub_course_id}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        >
                                            <option value="">Select a course module</option>
                                            {subCourses.map((subCourse) => (
                                                <option key={subCourse.id} value={subCourse.id}>
                                                    {subCourse.full_title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="issue_date" className="block text-sm font-medium text-[#8B949E] mb-2">
                                            Issue Date
                                        </label>
                                        <input
                                            type="date"
                                            id="issue_date"
                                            name="issue_date"
                                            value={formData.issue_date}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-[#30363D] px-6 py-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setEditingCertificate(null);
                                        }}
                                        className="px-4 py-2 bg-[#21262D] text-white rounded hover:bg-[#30363D]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043]"
                                    >
                                        {editingCertificate ? 'Update Certificate' : 'Issue Certificate'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Certificates;