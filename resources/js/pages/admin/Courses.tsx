import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Edit2, Trash2, Plus, Filter, Book, ChevronRight, Upload } from 'react-feather';
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
    order: number;
    is_active: boolean;
    sub_courses: SubCourse[];
}

interface Props {
    courses: {
        data: Course[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        status: string;
    };
}

const gradientOptions = [
    { label: 'Blue to Purple', value: 'from-blue-500 to-purple-500' },
    { label: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
    { label: 'Red to Orange', value: 'from-red-500 to-orange-500' },
    { label: 'Teal to Green', value: 'from-teal-500 to-green-500' },
    { label: 'Indigo to Purple', value: 'from-indigo-500 to-purple-500' },
    { label: 'Yellow to Amber', value: 'from-yellow-500 to-amber-500' },
    { label: 'Blue to Cyan', value: 'from-blue-500 to-cyan-500' },
    { label: 'Purple to Pink', value: 'from-purple-500 to-pink-500' },
    { label: 'Cyan to Blue', value: 'from-cyan-500 to-blue-500' },
    { label: 'Violet to Purple', value: 'from-violet-500 to-purple-500' },
];

const Courses: React.FC<Props> = ({ courses, filters }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        gradient_color: '',
        order: 0,
        is_active: true,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/courses', { search: e.target.value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleFilter = (status: string) => {
        router.get('/admin/courses', { ...filters, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            image: course.image,
            gradient_color: course.gradient_color,
            order: course.order,
            is_active: course.is_active,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (course: Course) => {
        setDeletingCourse(course);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deletingCourse) return;

        router.delete(`/admin/courses/${deletingCourse.id}`, {
            onSuccess: () => {
                toast.success('Course deleted successfully');
                setShowDeleteModal(false);
                setDeletingCourse(null);
            },
            onError: () => {
                toast.error('Failed to delete course');
            }
        });
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

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Create form data
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Use Axios directly with the proper headers
            const response = await axios.post('/admin/courses/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            // Update form data with the returned image URL
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error('Please upload a course image');
            return;
        }

        if (!formData.gradient_color) {
            toast.error('Please select a course theme');
            return;
        }

        if (editingCourse) {
            router.put(`/admin/courses/${editingCourse.id}`, formData, {
                onSuccess: () => {
                    toast.success('Course updated successfully');
                    setIsModalOpen(false);
                    setEditingCourse(null);
                    resetForm();
                },
                onError: (errors: any) => {
                    Object.keys(errors).forEach(key => {
                        toast.error(errors[key]);
                    });
                }
            });
        } else {
            router.post('/admin/courses', formData, {
                onSuccess: () => {
                    toast.success('Course created successfully');
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
            title: '',
            description: '',
            image: '',
            gradient_color: '',
            order: 0,
            is_active: true,
        });
    };

    const handleViewSubCourses = (courseId: number) => {
        router.visit(`/admin/courses/${courseId}/sub-courses`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleStatusToggle = (course: Course) => {
        router.put(`/admin/courses/${course.id}/toggle-status`, {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`Course ${course.is_active ? 'deactivated' : 'activated'} successfully`);
            },
            onError: () => {
                toast.error('Failed to update course status');
            }
        });
    };

    return (
        <DashboardLayout role="admin" title='Courses Management'>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Course Management</h1>
                        <p className="text-[#8B949E]">Manage and organize courses</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Course
                    </button>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full bg-[#0D1117] text-white pl-10 pr-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                value={filters.search}
                                onChange={handleSearch}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center px-4 py-2 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <div className="mt-4 flex items-center space-x-4">
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilter(e.target.value)}
                                className="bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#30363D]">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-[#8B949E] uppercase tracking-wider">Sub-courses</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[#8B949E] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#30363D]">
                                {courses.data.map((course) => (
                                    <tr key={course.id} className="hover:bg-[#1C2128]">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={course.image}
                                                        alt={course.title}
                                                        className="h-full w-full object-cover"
                                                        style={{ aspectRatio: '3/2' }}
                                                    />
                                                    <div
                                                        className="absolute inset-0"
                                                        style={{
                                                            background: `linear-gradient(to right, ${course.gradient_color})`,
                                                            opacity: '0.4'
                                                        }}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-white font-medium truncate">{course.title}</h3>
                                                    <p className="text-[#8B949E] text-sm line-clamp-1">{course.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleStatusToggle(course)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                                                    course.is_active
                                                        ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                                        : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                }`}>
                                                {course.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-center text-[#8B949E]">
                                            {course.sub_courses.length}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleEdit(course)}
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course)}
                                                    className="text-red-500 hover:text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleViewSubCourses(course.id)}
                                                    className="text-[#8B949E] hover:text-white"
                                                >
                                                    <Book className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {courses.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[#8B949E]">No courses found</p>
                        </div>
                    )}
                </div>

                {courses.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-[#8B949E]">
                            Showing {courses.data.length} of {courses.total} courses
                        </p>
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: courses.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get('/admin/courses', { page }, {
                                        preserveState: true,
                                        preserveScroll: true,
                                    })}
                                    className={`px-3 py-1 rounded ${
                                        page === courses.current_page
                                            ? 'bg-[#238636] text-white'
                                            : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D]'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-[#161B22] rounded-xl shadow-xl w-full max-w-5xl">
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-[#30363D]">
                                <h2 className="text-xl font-semibold text-white">
                                    {editingCourse ? 'Edit Course' : 'Add New Course'}
                                </h2>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Left Column - Image Upload */}
                                        <div>
                                            <div 
                                                className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-[#30363D] bg-[#0D1117] hover:border-[#58a6ff] transition-colors cursor-pointer"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                {(imagePreview || formData.image) ? (
                                                    <>
                                                        <img
                                                            src={imagePreview || formData.image}
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
                                                        <span className="text-sm text-[#8B949E]">Upload Course Image</span>
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

                                            {/* Course Theme */}
                                            <div className="mt-6">
                                                <label className="block text-sm font-medium text-[#8B949E] mb-2">
                                                    Course Theme
                                                </label>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {gradientOptions.map((option) => (
                                                        <button
                                                            key={option.value}
                                                            type="button"
                                                            onClick={() => setFormData(prev => ({ ...prev, gradient_color: option.value }))}
                                                            className={`h-12 rounded-lg bg-gradient-to-r ${option.value} border-2 transition-all ${
                                                                formData.gradient_color === option.value
                                                                    ? 'border-white scale-110 shadow-lg'
                                                                    : 'border-transparent hover:scale-105'
                                                            }`}
                                                            title={option.label}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column - Course Details */}
                                        <div className="space-y-6">
                                            <div>
                                                <label htmlFor="title" className="block text-sm font-medium text-[#8B949E] mb-2">
                                                    Course Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-4 py-3 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter course title"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-[#8B949E] mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows={5}
                                                    className="w-full bg-[#0D1117] text-white px-4 py-3 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none resize-none"
                                                    placeholder="Enter course description"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="order" className="block text-sm font-medium text-[#8B949E] mb-2">
                                                        Display Order
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="order"
                                                        name="order"
                                                        value={formData.order}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#0D1117] text-white px-4 py-3 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-3 pt-8">
                                                    <input
                                                        type="checkbox"
                                                        id="is_active"
                                                        name="is_active"
                                                        checked={formData.is_active}
                                                        onChange={handleInputChange}
                                                        className="w-5 h-5 text-[#238636] bg-[#0D1117] border-[#30363D] rounded focus:ring-[#238636] focus:ring-offset-0"
                                                    />
                                                    <label htmlFor="is_active" className="text-sm font-medium text-[#8B949E]">
                                                        Active Course
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Modal Footer */}
                                    <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-[#30363D]">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setEditingCourse(null);
                                                resetForm();
                                            }}
                                            className="px-5 py-2.5 text-[#8B949E] hover:text-white transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-all hover:shadow-lg"
                                        >
                                            {editingCourse ? 'Save Changes' : 'Create Course'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-[#161B22] rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-bold text-white mb-4">
                                Delete Course
                            </h2>
                            <p className="text-[#8B949E] mb-6">
                                Are you sure you want to delete {deletingCourse?.title}? This will also delete all associated sub-courses and cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingCourse(null);
                                    }}
                                    className="px-4 py-2 text-[#8B949E] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete Course
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Courses; 