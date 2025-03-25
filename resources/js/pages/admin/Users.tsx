import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Search, Edit2, Trash2, UserPlus, Filter, Check, X, Star, Shield, Edit, User } from 'react-feather';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
    role: string;
    status: 'active' | 'inactive';
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search: string;
        role: string;
        status: string;
    };
}

const Users = ({ users, filters }: Props) => {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        password_confirmation: '',
        role: '',
        status: '',
    });
    const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
    const [updatingRole, setUpdatingRole] = useState<number | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get('/admin/users', { search: e.target.value }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleFilter = (role: string, status: string) => {
        router.get('/admin/users', { ...filters, role, status }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            phone_number: user.phone_number || '',
            password_confirmation: '',
            role: user.role,
            status: user.status,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (user: User) => {
        setDeletingUser(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (!deletingUser) return;

        router.delete(`/admin/users/${deletingUser.id}`, {
            onSuccess: () => {
                toast.success('User deleted successfully');
                setShowDeleteModal(false);
                setDeletingUser(null);
            },
            onError: () => {
                toast.error('Failed to delete user');
            }
        });
    };

    // Update the handleInputChange function to validate phone numbers
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        
        // For phone number, only allow numeric input and limit to 10 digits
        if (name === 'phone_number') {
            // Only allow numeric characters
            const numericValue = value.replace(/\D/g, '');
            // Limit to 10 digits
            const limitedValue = numericValue.slice(0, 10);
            setFormData({ ...formData, [name]: limitedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    
    // Update the formatPhoneNumber function to properly format phone numbers for display
    const formatPhoneNumber = (phoneNumber: string | undefined): string => {
        if (!phoneNumber) return '-';
        
        // Remove any non-numeric characters
        const numericValue = phoneNumber.replace(/\D/g, '');
        
        // Format as xxxx-xxxxxx if we have enough digits
        if (numericValue.length >= 10) {
            return `${numericValue.slice(0, 4)}-${numericValue.slice(4, 10)}`;
        } else {
            return phoneNumber; // Return original if we can't format it
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            router.put(`/admin/users/${editingUser.id}`, formData, {
                onSuccess: () => {
                    toast.success('User updated successfully');
                    setIsModalOpen(false);
                    setEditingUser(null);
                    resetForm();
                },
                onError: (errors) => {
                    toast.error(Object.values(errors)[0] as string);
                }
            });
        } else {
            router.post('/admin/users', formData, {
                onSuccess: () => {
                    toast.success('User created successfully');
                    setIsModalOpen(false);
                    resetForm();
                },
                onError: (errors) => {
                    toast.error(Object.values(errors)[0] as string);
                }
            });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            phone_number: '',
            password_confirmation: '',
            role: '',
            status: '',
        });
    };

    const handleStatusToggle = (user: User) => {
        if (updatingStatus === user.id) return;
        
        setUpdatingStatus(user.id);
        const newStatus = user.status === 'active' ? 'inactive' : 'active';

        router.patch(`/admin/users/${user.id}/status`, { 
            status: newStatus 
        }, {
            preserveState: true,
            onSuccess: () => {
                setUpdatingStatus(null);
                toast.success('Status updated successfully');
            },
            onError: () => {
                setUpdatingStatus(null);
                toast.error('Failed to update status');
            },
            onFinish: () => {
                setUpdatingStatus(null);
            }
        });
    };

    const handleRoleToggle = (user: User) => {
        if (updatingRole === user.id) return;
        
        setUpdatingRole(user.id);
        
        // Define the role cycle order
        const roleOrder = ['user', 'writer', 'moderator', 'admin'];
        const currentIndex = roleOrder.indexOf(user.role);
        const nextRole = roleOrder[(currentIndex + 1) % roleOrder.length];

        router.patch(`/admin/users/${user.id}/role`, { 
            role: nextRole 
        }, {
            preserveState: true,
            onSuccess: () => {
                setUpdatingRole(null);
                toast.success('Role updated successfully');
            },
            onError: () => {
                setUpdatingRole(null);
                toast.error('Failed to update role');
            },
            onFinish: () => {
                setUpdatingRole(null);
            }
        });
    };

    return (
        <DashboardLayout role="admin" title='Users Management'>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                        <p className="text-[#8B949E]">Manage and monitor user accounts</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search users..."
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

                    {/* Filter Options */}
                    {showFilters && (
                        <div className="mt-4 flex items-center space-x-4">
                            <select
                                value={filters.role}
                                onChange={(e) => handleFilter(e.target.value, filters.status)}
                                className="bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="writer">Writer</option>
                                <option value="user">User</option>
                            </select>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilter(filters.role, e.target.value)}
                                className="bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Users Table */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-[#21262D]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B949E] uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#30363D]">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-[#1C2128]">
                                    <td className="px-6 py-4 whitespace-nowrap text-white">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#8B949E]">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#8B949E]">
                                        {formatPhoneNumber(user.phone_number)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleRoleToggle(user)}
                                            disabled={updatingRole === user.id}
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                                                user.role === 'admin' ? 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20' :
                                                user.role === 'moderator' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' :
                                                user.role === 'writer' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' :
                                                'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
                                            } ${updatingRole === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {updatingRole === user.id ? (
                                                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                            ) : (
                                                <>
                                                    {user.role === 'admin' && <Star className="w-3 h-3 mr-1" />}
                                                    {user.role === 'moderator' && <Shield className="w-3 h-3 mr-1" />}
                                                    {user.role === 'writer' && <Edit className="w-3 h-3 mr-1" />}
                                                    {user.role === 'user' && <User className="w-3 h-3 mr-1" />}
                                                </>
                                            )}
                                            {user.role}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleStatusToggle(user)}
                                            disabled={updatingStatus === user.id}
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                                                user.status === 'active'
                                                    ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                                    : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                            } ${updatingStatus === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {updatingStatus === user.id ? (
                                                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                            ) : user.status === 'active' ? (
                                                <Check className="w-3 h-3 mr-1" />
                                            ) : (
                                                <X className="w-3 h-3 mr-1" />
                                            )}
                                            {user.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#8B949E]">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user)}
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

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-[#161B22] border-t border-[#30363D]">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#8B949E]">
                                Showing {users.data.length} of {users.total} users
                            </p>
                            <div className="flex items-center space-x-2">
                                {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => router.get('/admin/users', { page }, {
                                            preserveState: true,
                                            preserveScroll: true,
                                        })}
                                        className={`px-3 py-1 rounded ${
                                            page === users.current_page
                                                ? 'bg-[#238636] text-white'
                                                : 'bg-[#21262D] text-[#8B949E] hover:bg-[#30363D]'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* User Modal - Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#161B22] rounded-lg p-6 w-full max-w-3xl">
                        <h2 className="text-xl font-bold text-white mb-4 border-b border-[#30363D] pb-3">
                            {editingUser ? 'Edit User' : 'Add New User'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Two-column layout */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[#8B949E] mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[#8B949E] mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone_number" className="block text-sm font-medium text-[#8B949E] mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone_number"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="Enter 10-digit phone number"
                                            maxLength={10}
                                        />
                                        <p className="text-xs text-[#8B949E] mt-1">
                                            Format: xxxx-xxxxxx (numbers only)
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Right Column */}
                                <div className="space-y-4">
                                    {!editingUser && (
                                        <>
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-[#8B949E] mb-1">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    required={!editingUser}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-[#8B949E] mb-1">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    value={formData.password_confirmation}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                                    required={!editingUser}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-[#8B949E] mb-1">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="moderator">Moderator</option>
                                            <option value="writer">Writer</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-[#8B949E] mb-1">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-[#30363D]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingUser(null);
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
                                    {editingUser ? 'Save Changes' : 'Add User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-[#161B22] rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-white mb-4">
                            Delete User
                        </h2>
                        <p className="text-[#8B949E] mb-6">
                            Are you sure you want to delete {deletingUser?.name}? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeletingUser(null);
                                }}
                                className="px-4 py-2 text-[#8B949E] hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Users;