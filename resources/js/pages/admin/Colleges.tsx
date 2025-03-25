import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Edit2, Trash2, Plus, Filter, Upload, Globe, MapPin, Phone, Mail, Link as LinkIcon, Check, X } from 'react-feather';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface College {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    logo: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    colleges: {
        data: College[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        country: string;
    };
    countries: string[];
}

const Colleges: React.FC<Props> = ({ colleges, filters, countries }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCollege, setEditingCollege] = useState<College | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingCollege, setDeletingCollege] = useState<College | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        website: '',
        logo: '',
        is_active: true,
    });
    const logoInputRef = useRef<HTMLInputElement>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/colleges', { search: e.target.value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleFilter = (country: string) => {
        router.get('/admin/colleges', { ...filters, country }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleEdit = (college: College) => {
        setEditingCollege(college);
        setFormData({
            name: college.name,
            description: college.description || '',
            address: college.address,
            city: college.city,
            state: college.state,
            country: college.country,
            phone: college.phone || '',
            email: college.email || '',
            website: college.website || '',
            logo: college.logo || '',
            is_active: college.is_active,
        });
        setLogoPreview(college.logo);
        setIsModalOpen(true);
    };

    const handleDelete = (college: College) => {
        setDeletingCollege(college);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deletingCollege) return;

        router.delete(`/admin/colleges/${deletingCollege.id}`, {
            onSuccess: () => {
                toast.success('College deleted successfully');
                setShowDeleteModal(false);
                setDeletingCollege(null);
            },
            onError: () => {
                toast.error('Failed to delete college');
            }
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Create form data
        const formData = new FormData();
        formData.append('logo', file);

        try {
            const response = await axios.post('/admin/colleges/upload-logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            setFormData(prev => ({
                ...prev,
                logo: response.data.logo_url
            }));

            toast.success('Logo uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload logo');
            setLogoPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCollege) {
            router.put(`/admin/colleges/${editingCollege.id}`, formData, {
                onSuccess: () => {
                    toast.success('College updated successfully');
                    setIsModalOpen(false);
                    setEditingCollege(null);
                    resetForm();
                },
                onError: (errors: any) => {
                    Object.keys(errors).forEach(key => {
                        toast.error(errors[key]);
                    });
                }
            });
        } else {
            router.post('/admin/colleges', formData, {
                onSuccess: () => {
                    toast.success('College created successfully');
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
            name: '',
            description: '',
            address: '',
            city: '',
            state: '',
            country: '',
            phone: '',
            email: '',
            website: '',
            logo: '',
            is_active: true,
        });
        setLogoPreview(null);
    };

    const toggleStatus = (college: College) => {
        router.put(`/admin/colleges/${college.id}/toggle-status`, {}, {
            onSuccess: () => {
                toast.success(`College ${college.is_active ? 'deactivated' : 'activated'} successfully`);
            },
            onError: () => {
                toast.error('Failed to update college status');
            },
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout role="admin" title='Colleges Management'>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Colleges Management</h1>
                        <p className="text-[#8B949E]">Manage educational institutions</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add College
                    </button>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search colleges..."
                                className="w-full bg-[#0D1117] text-white pl-10 pr-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                value={filters.search || ''}
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">College</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[#8B949E] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#30363D]">
                                {colleges.data.map((college) => (
                                    <tr key={college.id} className="hover:bg-[#1C2128]">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#0D1117] border border-[#30363D]">
                                                    {college.logo ? (
                                                        <img
                                                            src={college.logo}
                                                            alt={college.name}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <Globe className="w-6 h-6 text-[#8B949E]" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-white font-medium truncate">{college.name}</h3>
                                                    {college.website && (
                                                        <a 
                                                            href={college.website} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-[#58a6ff] text-sm hover:underline flex items-center"
                                                        >
                                                            <LinkIcon className="w-3 h-3 mr-1" />
                                                            {college.website.replace(/^https?:\/\//, '')}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center text-[#8B949E]">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    <span>{college.city}, {college.state}</span>
                                                </div>
                                                <span className="text-[#8B949E] text-sm">{college.country}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-1">
                                                {college.phone && (
                                                    <div className="flex items-center text-[#8B949E]">
                                                        <Phone className="w-3 h-3 mr-1" />
                                                        <span>{college.phone}</span>
                                                    </div>
                                                )}
                                                {college.email && (
                                                    <div className="flex items-center text-[#8B949E]">
                                                        <Mail className="w-3 h-3 mr-1" />
                                                        <span>{college.email}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => toggleStatus(college)}
                                                    className={`${
                                                        college.is_active 
                                                            ? 'text-red-500 hover:text-red-600' 
                                                            : 'text-green-500 hover:text-green-600'
                                                    }`}
                                                    title={college.is_active ? 'Deactivate' : 'Activate'}
                                                >
                                                    {college.is_active ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(college)}
                                                    className="text-blue-500 hover:text-blue-600"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(college)}
                                                    className="text-red-500 hover:text-red-600"
                                                    title="Delete"
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
                    
                    {colleges.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[#8B949E]">No colleges found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {colleges.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex items-center space-x-2">
                            {Array.from({ length: colleges.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get('/admin/colleges', { page }, { preserveState: true })}
                                    className={`px-3 py-1 rounded ${
                                        page === colleges.current_page
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
                                Delete College
                            </h2>
                            <p className="text-[#8B949E] mb-6">
                                Are you sure you want to delete "{deletingCollege?.name}"? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingCollege(null);
                                    }}
                                    className="px-4 py-2 text-[#8B949E] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete College
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-[#161B22] rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
                            <div className="p-6 border-b border-[#30363D]">
                                <h2 className="text-xl font-bold text-white">
                                    {editingCollege ? 'Edit College' : 'Add New College'}
                                </h2>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Left Column */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    College Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter college name"
                                                    required
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter college description"
                                                    rows={4}
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Address*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter street address"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                        City*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                        placeholder="City"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                        State/Province*
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                        placeholder="State/Province"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Country*
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Country"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        {/* Right Column */}
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter email address"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Website
                                                </label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="https://example.com"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Logo
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <div 
                                                        className="h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#0D1117] border border-[#30363D] flex items-center justify-center"
                                                    >
                                                        {logoPreview ? (
                                                            <img
                                                                src={logoPreview}
                                                                alt="College logo preview"
                                                                className="h-full w-full object-contain"
                                                            />
                                                        ) : (
                                                            <Globe className="w-8 h-8 text-[#8B949E]" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => logoInputRef.current?.click()}
                                                            className="flex items-center px-4 py-2 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                                        >
                                                            <Upload className="w-4 h-4 mr-2" />
                                                            Upload Logo
                                                        </button>
                                                        <input
                                                            ref={logoInputRef}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleLogoChange}
                                                            className="hidden"
                                                        />
                                                        <p className="text-[#8B949E] text-xs mt-2">
                                                            Recommended: Square image, 200x200px or larger
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="is_active"
                                                    name="is_active"
                                                    checked={formData.is_active}
                                                    onChange={handleInputChange}
                                                    className="h-4 w-4 rounded border-[#30363D] text-[#238636] focus:ring-[#238636] bg-[#0D1117]"
                                                />
                                                <label htmlFor="is_active" className="ml-2 block text-white">
                                                    Active
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end space-x-3 pt-4 border-t border-[#30363D]">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingCollege(null);
                                                resetForm();
                                            }}
                                            className="px-4 py-2 text-[#8B949E] hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043]"
                                        >
                                            {editingCollege ? 'Update College' : 'Create College'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Colleges;