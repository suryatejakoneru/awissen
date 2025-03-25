import React, { useState, useRef } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Edit2, Trash2, Plus, Filter, Upload } from 'react-feather';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    full_content?: string;
    image: string;
    author_name: string;
    author_avatar: string;
    category: string;
    tags: string[];
    published_at: string;
    created_at: string;
}

interface Props {
    blogs: {
        data: Blog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        category: string;
    };
    categories: string[];
}

const Blog: React.FC<Props> = ({ blogs, filters, categories }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author_name: '',
        author_avatar: '',
        category: 'Technology',
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/blog', { search: e.target.value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleFilter = (category: string) => {
        router.get('/admin/blog', { ...filters, category }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        // Create a deep copy of the blog data to avoid reference issues
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.full_content || blog.content, // Use full_content if available
            image: blog.image,
            author_name: blog.author_name,
            author_avatar: blog.author_avatar,
            category: blog.category,
        });
        setImagePreview(blog.image);
        setAvatarPreview(blog.author_avatar);
        setIsModalOpen(true);
    };

    const handleDelete = (blog: Blog) => {
        setDeletingBlog(blog);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deletingBlog) return;

        router.delete(`/admin/blog/${deletingBlog.id}`, {
            onSuccess: () => {
                toast.success('Blog post deleted successfully');
                setShowDeleteModal(false);
                setDeletingBlog(null);
            },
            onError: () => {
                toast.error('Failed to delete blog post');
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

    const handleContentChange = (content: string) => {
        setFormData(prev => ({
            ...prev,
            content
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
            const response = await axios.post('/admin/blog/upload-image', formData, {
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

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Create form data
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/admin/blog/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            setFormData(prev => ({
                ...prev,
                author_avatar: response.data.image_url
            }));

            toast.success('Avatar uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload avatar');
            setAvatarPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error('Please upload a blog image');
            return;
        }

        if (!formData.author_avatar) {
            toast.error('Please upload an author avatar');
            return;
        }

        if (editingBlog) {
            router.put(`/admin/blog/${editingBlog.id}`, formData, {
                onSuccess: () => {
                    toast.success('Blog post updated successfully');
                    setIsModalOpen(false);
                    setEditingBlog(null);
                    resetForm();
                },
                onError: (errors: any) => {
                    Object.keys(errors).forEach(key => {
                        toast.error(errors[key]);
                    });
                }
            });
        } else {
            router.post('/admin/blog', formData, {
                onSuccess: () => {
                    toast.success('Blog post created successfully');
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
            excerpt: '',
            content: '',
            image: '',
            author_name: '',
            author_avatar: '',
            category: 'Technology',
        });
        setImagePreview(null);
        setAvatarPreview(null);
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
        <DashboardLayout role="admin" title='Blogs Management'>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
                        <p className="text-[#8B949E]">Manage and publish blog posts</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Blog Post
                    </button>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
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
                                value={filters.category}
                                onChange={(e) => handleFilter(e.target.value)}
                                className="bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#30363D]">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Blog Post</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Author</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-[#8B949E] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#30363D]">
                                {blogs.data.map((blog) => (
                                    <tr key={blog.id} className="hover:bg-[#1C2128]">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={blog.image}
                                                        alt={blog.title}
                                                        className="h-full w-full object-cover"
                                                        style={{ aspectRatio: '3/2' }}
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-white font-medium truncate">{blog.title}</h3>
                                                    <p className="text-[#8B949E] text-sm line-clamp-1">{blog.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <img 
                                                    src={blog.author_avatar} 
                                                    alt={blog.author_name}
                                                    className="h-6 w-6 rounded-full object-cover"
                                                />
                                                <span className="text-[#8B949E]">{blog.author_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#8B949E]">
                                            {formatDate(blog.published_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="text-blue-500 hover:text-blue-600"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog)}
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
                    
                    {blogs.data.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[#8B949E]">No blog posts found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {blogs.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex items-center space-x-2">
                            {Array.from({ length: blogs.last_page }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => router.get('/admin/blog', { page }, { preserveState: true })}
                                    className={`px-3 py-1 rounded ${
                                        page === blogs.current_page
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
                                Delete Blog Post
                            </h2>
                            <p className="text-[#8B949E] mb-6">
                                Are you sure you want to delete "{deletingBlog?.title}"? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeletingBlog(null);
                                    }}
                                    className="px-4 py-2 text-[#8B949E] hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete Blog Post
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                        <div className="bg-[#161B22] rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] flex flex-col">
                            <div className="border-b border-[#30363D] px-6 py-3 flex justify-between items-center sticky top-0 bg-[#161B22] z-10">
                                <h2 className="text-xl font-bold text-white">
                                    {editingBlog ? 'Edit Blog Post' : 'Add Blog Post'}
                                </h2>
                                <button 
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingBlog(null);
                                        resetForm();
                                    }}
                                    className="text-[#8B949E] hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4">
                                <form onSubmit={handleSubmit} className="h-full">
                                    <div className="grid grid-cols-3 gap-4 h-full">
                                        {/* Left Column - Basic Info */}
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Enter blog title..."
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                        Category
                                                    </label>
                                                    <select
                                                        name="category"
                                                        value={formData.category}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                        required
                                                    >
                                                        {categories.map((category) => (
                                                            <option key={category} value={category}>{category}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                        Author
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="author_name"
                                                        value={formData.author_name}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                        placeholder="Author name..."
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex space-x-4 items-end">
                                                <div>
                                                    <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                        Author Avatar
                                                    </label>
                                                    <div 
                                                        className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-dashed border-[#30363D] bg-[#0D1117] hover:border-[#58a6ff] transition-colors cursor-pointer group"
                                                        onClick={() => avatarInputRef.current?.click()}
                                                    >
                                                        {avatarPreview ? (
                                                            <>
                                                                <img
                                                                    src={avatarPreview}
                                                                    alt="Avatar Preview"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                                    <Upload className="w-5 h-5 text-white" />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                <Upload className="w-5 h-5 text-[#8B949E]" />
                                                                <span className="text-xs text-[#8B949E] mt-1">Upload</span>
                                                            </div>
                                                        )}
                                                        <input
                                                            type="file"
                                                            ref={avatarInputRef}
                                                            onChange={handleAvatarChange}
                                                            accept="image/*"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                        Featured Image
                                                    </label>
                                                    <div 
                                                        className="relative h-32 rounded-lg overflow-hidden border-2 border-dashed border-[#30363D] bg-[#0D1117] hover:border-[#58a6ff] transition-colors cursor-pointer group"
                                                        onClick={() => fileInputRef.current?.click()}
                                                    >
                                                        {imagePreview ? (
                                                            <>
                                                                <img
                                                                    src={imagePreview}
                                                                    alt="Preview"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                                    <Upload className="w-6 h-6 text-white" />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                <Upload className="w-6 h-6 text-[#8B949E]" />
                                                                <span className="text-xs text-[#8B949E]">Upload Image</span>
                                                            </div>
                                                        )}
                                                        <input
                                                            type="file"
                                                            ref={fileInputRef}
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Right Column - Excerpt and Content */}
                                        <div className="col-span-2 space-y-4">
                                            <div>
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Excerpt
                                                </label>
                                                <textarea
                                                    name="excerpt"
                                                    value={formData.excerpt}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    placeholder="Brief summary of the blog post..."
                                                    rows={3}
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="flex-1">
                                                <label className="block text-[#8B949E] text-sm font-medium mb-1">
                                                    Content
                                                </label>
                                                <div className="bg-[#0D1117] rounded-lg border border-[#30363D] overflow-hidden h-[300px]">
                                                    <textarea
                                                        name="content"
                                                        value={formData.content}
                                                        onChange={handleInputChange}
                                                        className="w-full h-full bg-[#0D1117] text-white px-3 py-2 rounded-lg border-0 focus:outline-none"
                                                        placeholder="Write your blog content here..."
                                                        required
                                                        style={{ 
                                                            resize: 'none', 
                                                            overflowY: 'auto', 
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                                    />
                                                </div>
                                                <p className="text-xs text-[#8B949E] mt-1">
                                                    You can use HTML tags for formatting
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="border-t border-[#30363D] px-6 py-3 flex justify-end space-x-3 bg-[#161B22]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingBlog(null);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors flex items-center"
                                >
                                    {editingBlog ? (
                                        <>
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Update
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Blog;