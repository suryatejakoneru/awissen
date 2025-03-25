import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { ChevronLeft, Edit2, Trash2, Plus, Upload } from 'react-feather';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface SubCourse {
    id: number;
    title: string;
    description: string;
    image: string;
    order: number;
    is_active: boolean;
}

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    gradient_color: string;
    sub_courses: SubCourse[];
}

interface Props {
    course: Course;
}

const SubCourses: React.FC<Props> = ({ course }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingSubCourse, setDeletingSubCourse] = useState<SubCourse | null>(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingSubCourse, setEditingSubCourse] = useState<SubCourse | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        order: 0,
        is_active: true,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleBack = () => {
        router.visit('/admin/courses', {
            preserveState: true,
            preserveScroll: true
        });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            image: '',
            order: course.sub_courses.length,
            is_active: true,
        });
        setImagePreview(null);
        setEditingSubCourse(null);
    };

    const handleAdd = () => {
        resetForm();
        setShowFormModal(true);
    };

    const handleEdit = (subCourse: SubCourse) => {
        setEditingSubCourse(subCourse);
        setFormData({
            title: subCourse.title,
            description: subCourse.description,
            image: subCourse.image,
            order: subCourse.order,
            is_active: subCourse.is_active,
        });
        setImagePreview(subCourse.image);
        setShowFormModal(true);
    };

    const handleDelete = (subCourse: SubCourse) => {
        setDeletingSubCourse(subCourse);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deletingSubCourse) return;

        router.delete(`/admin/courses/${course.id}/sub-courses/${deletingSubCourse.id}`, {
            onSuccess: () => {
                toast.success('Sub-course deleted successfully');
                setShowDeleteModal(false);
                setDeletingSubCourse(null);
            },
            onError: () => {
                toast.error('Failed to delete sub-course');
            }
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/admin/courses/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            setFormData(prev => ({
                ...prev,
                image: response.data.image_url
            }));

            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
            setImagePreview(null);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error('Please upload a sub-course image');
            return;
        }

        if (editingSubCourse) {
            router.put(`/admin/courses/${course.id}/sub-courses/${editingSubCourse.id}`, formData, {
                onSuccess: () => {
                    toast.success('Sub-course updated successfully');
                    setShowFormModal(false);
                    resetForm();
                },
                onError: (errors: any) => {
                    Object.keys(errors).forEach(key => {
                        toast.error(errors[key]);
                    });
                }
            });
        } else {
            router.post(`/admin/courses/${course.id}/sub-courses`, formData, {
                onSuccess: () => {
                    toast.success('Sub-course created successfully');
                    setShowFormModal(false);
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

    const handleStatusToggle = (subCourse: SubCourse) => {
        router.put(`/admin/courses/${course.id}/sub-courses/${subCourse.id}/toggle-status`, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Sub-course ${subCourse.is_active ? 'deactivated' : 'activated'} successfully`);
            },
            onError: () => {
                toast.error('Failed to update sub-course status');
            }
        });
    };

    return (
        <DashboardLayout role="admin" title='Sub Courses Management'>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <button
                            onClick={handleBack}
                            className="flex items-center text-[#8B949E] hover:text-white mb-4"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Courses
                        </button>
                        <h1 className="text-3xl font-bold text-white">
                            {course.title} - Sub-courses
                        </h1>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Sub-course
                    </button>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#30363D]">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Sub-course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-[#8B949E] uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[#8B949E] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#30363D]">
                                {course.sub_courses.map((subCourse) => (
                                    <tr key={subCourse.id} className="hover:bg-[#1C2128]">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={subCourse.image}
                                                        alt={subCourse.title}
                                                        className="h-full w-full object-cover"
                                                        style={{ aspectRatio: '3/2' }}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-white font-medium truncate">{subCourse.title}</h3>
                                                    <p className="text-[#8B949E] text-sm line-clamp-1">{subCourse.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleStatusToggle(subCourse)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                                                    subCourse.is_active
                                                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                                        : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                }`}>
                                                {subCourse.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center text-[#8B949E]">
                                            {subCourse.order}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleEdit(subCourse)}
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(subCourse)}
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
                    
                    {course.sub_courses.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[#8B949E]">No sub-courses found</p>
                        </div>
                    )}
                </div>

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-[#161B22] rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Delete Sub-course
                            </h2>
                            <p className="text-[#8B949E] mb-6">
                                Are you sure you want to delete {deletingSubCourse?.title}? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingSubCourse(null);
                                    }}
                                    className="px-4 py-2 text-[#8B949E] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete Sub-course
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showFormModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-[#161B22] rounded-lg p-6 w-full max-w-4xl">
                            <h2 className="text-xl font-bold text-white mb-4">
                                {editingSubCourse ? 'Edit Sub-course' : 'Add Sub-course'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[#8B949E] text-sm font-medium mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[#8B949E] text-sm font-medium mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={5}
                                                className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-2">
                                                    Order
                                                </label>
                                                <input
                                                    type="number"
                                                    name="order"
                                                    value={formData.order}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                    className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-2">
                                                    Status
                                                </label>
                                                <div className="flex items-center h-[42px]">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="is_active"
                                                            checked={formData.is_active}
                                                            onChange={handleInputChange}
                                                            className="sr-only peer"
                                                        />
                                                        <div className="w-11 h-6 bg-[#21262D] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#238636]"></div>
                                                        <span className="ml-3 text-sm font-medium text-white">Active</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[#8B949E] text-sm font-medium mb-2">
                                                Image
                                            </label>
                                            <div 
                                                className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-[#30363D] bg-[#0D1117] hover:border-[#58a6ff] transition-colors cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                {imagePreview ? (
                                                    <>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200">
                                                            <Upload className="w-8 h-8 text-white mb-2" />
                                                            <span className="text-sm text-white">Change Image</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <Upload className="w-8 h-8 text-[#8B949E] mb-2" />
                                                        <span className="text-sm text-[#8B949E]">Upload Sub-course Image</span>
                                                        <span className="text-xs text-[#8B949E] mt-1">800x400px recommended</span>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-[#30363D]">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowFormModal(false);
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
                                        {editingSubCourse ? 'Update Sub-course' : 'Create Sub-course'}
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

export default SubCourses;