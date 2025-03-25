import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Save, RefreshCw, Upload } from 'react-feather';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Define the types for our settings
interface SettingsProps {
    settings: {
        site_name: string;
        site_description: string;
        contact_email: string;
        contact_phone: string;
        contact_address: string;
        social_media: {
            facebook: string;
            twitter: string;
            instagram: string;
            linkedin: string;
        };
        branding: {
            logo: string;
            logo_light: string;
            logo_dark: string;
            icon_light: string;
            icon_dark: string;
            favicon: string;
            footer_logo: string;
        };
        maintenance_mode: boolean;
    };
}

// Define the page props interface
interface PageProps {
    settings: SettingsProps['settings'];
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

const Settings = ({ settings }: SettingsProps) => {
    const { flash } = usePage<PageProps>().props;
    
    // Initialize form data with settings or default values
    const [formData, setFormData] = useState({
        site_name: settings?.site_name || '',
        site_description: settings?.site_description || '',
        contact_email: settings?.contact_email || '',
        contact_phone: settings?.contact_phone || '',
        contact_address: settings?.contact_address || '',
        social_media: {
            facebook: settings?.social_media?.facebook || '',
            twitter: settings?.social_media?.twitter || '',
            instagram: settings?.social_media?.instagram || '',
            linkedin: settings?.social_media?.linkedin || ''
        },
        branding: {
            logo: settings?.branding?.logo || '',
            logo_light: settings?.branding?.logo_light || '',
            logo_dark: settings?.branding?.logo_dark || '',
            icon_light: settings?.branding?.icon_light || '',
            icon_dark: settings?.branding?.icon_dark || '',
            favicon: settings?.branding?.favicon || '',
            footer_logo: settings?.branding?.footer_logo || '',
        },
        maintenance_mode: settings?.maintenance_mode || false
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    // Update form data when settings prop changes
    useEffect(() => {
        // Force a refresh from the server on initial load
        axios.get('/admin/settings/refresh')
            .then(response => {
                if (response.data.settings) {
                    console.log('Refreshed settings from server:', response.data.settings);
                    // Completely replace the form data with server data
                    setFormData(response.data.settings);
                } else {
                    console.error('No settings returned from server');
                }
            })
            .catch(error => {
                console.error('Error refreshing settings on load:', error);
            });
    }, []); // Empty dependency array to run only once on mount

    // Show success message when settings are updated
    useEffect(() => {
        // Add null checking to prevent the error
        if (flash && flash.success) {
            toast.success(flash.success);
        }
        if (flash && flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Handle file uploads
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('field', fieldName);
        
        try {
            const response = await axios.post('/admin/settings/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Get the path directly from the response
            const imagePath = response.data.path;
            console.log('Uploaded image path:', imagePath);
            
            // Update the form data with the new file path
            if (fieldName.includes('.')) {
                const [parent, child] = fieldName.split('.');
                setFormData(prevData => ({
                    ...prevData,
                    [parent]: {
                        ...prevData[parent as keyof typeof prevData] as Record<string, any>,
                        [child]: imagePath
                    }
                }));
            } else {
                setFormData(prevData => ({ ...prevData, [fieldName]: imagePath }));
            }
            
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(`Upload failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input changes
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: checked });
        } else if (name.includes('.')) {
            // Handle nested objects like social_media.facebook
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent as keyof typeof formData] as Record<string, any>,
                    [child]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Use Inertia router to submit the form
            router.post('/admin/settings', formData, {
                onSuccess: () => {
                    toast.success('Settings updated successfully');
                    
                    // Refresh data from the server
                    axios.get('/admin/settings/refresh')
                        .then(response => {
                            if (response.data.settings) {
                                console.log('Refreshed settings:', response.data.settings);
                                setFormData(response.data.settings);
                            }
                        })
                        .catch(error => {
                            console.error('Error refreshing settings:', error);
                        });
                },
                onError: (errors) => {
                    console.error(errors);
                    toast.error('Failed to update settings');
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error('Failed to update settings');
            console.error(error);
            setIsLoading(false);
        }
    };

    // Reset settings to values from database
    const resetSettings = () => {
        if (confirm('Are you sure you want to reset all settings to values from the database?')) {
            axios.get('/admin/settings/refresh')
                .then(response => {
                    if (response.data.settings) {
                        setFormData(response.data.settings);
                        toast.success('Settings refreshed from database');
                    }
                })
                .catch(error => {
                    console.error(error);
                    toast.error('Failed to refresh settings');
                });
        }
    };

    return (
        <DashboardLayout role="admin" title="System Settings">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
                        <p className="text-[#8B949E]">Configure system-wide settings and preferences</p>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={resetSettings}
                            className="flex items-center px-4 py-2 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                            disabled={isLoading}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </button>
                        <button
                            type="submit"
                            form="settings-form"
                            className="flex items-center px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-colors duration-200"
                            disabled={isLoading}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Settings Container */}
                <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-[#30363D]">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'general'
                                    ? 'text-white border-b-2 border-[#238636]'
                                    : 'text-[#8B949E] hover:text-white'
                            }`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('branding')}
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'branding'
                                    ? 'text-white border-b-2 border-[#238636]'
                                    : 'text-[#8B949E] hover:text-white'
                            }`}
                        >
                            Branding
                        </button>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'contact'
                                    ? 'text-white border-b-2 border-[#238636]'
                                    : 'text-[#8B949E] hover:text-white'
                            }`}
                        >
                            Contact
                        </button>
                        <button
                            onClick={() => setActiveTab('social')}
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'social'
                                    ? 'text-white border-b-2 border-[#238636]'
                                    : 'text-[#8B949E] hover:text-white'
                            }`}
                        >
                            Social Media
                        </button>
                        <button
                            onClick={() => setActiveTab('advanced')}
                            className={`px-6 py-3 text-sm font-medium ${
                                activeTab === 'advanced'
                                    ? 'text-white border-b-2 border-[#238636]'
                                    : 'text-[#8B949E] hover:text-white'
                            }`}
                        >
                            Advanced
                        </button>
                    </div>

                    {/* Settings Form */}
                    <form id="settings-form" onSubmit={handleSubmit} className="p-6">
                        {/* General Settings */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="site_name" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        id="site_name"
                                        name="site_name"
                                        value={formData.site_name}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="site_description" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Site Description
                                    </label>
                                    <textarea
                                        id="site_description"
                                        name="site_description"
                                        value={formData.site_description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Branding Settings */}
                        {activeTab === 'branding' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="branding.logo" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Main Logo
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="branding.logo"
                                            name="branding.logo"
                                            value={formData.branding.logo}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="/images/logo.png"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="logo_upload"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'branding.logo')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                className="h-full px-3 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {formData.branding.logo && (
                                        <div className="mt-2 p-2 bg-[#0D1117] rounded-lg border border-[#30363D] inline-block">
                                            <img 
                                                src={formData.branding.logo} 
                                                alt="Logo Preview" 
                                                className="h-10 max-w-[200px] object-contain"
                                                onError={(e) => {
                                                    console.log('Image failed to load:', formData.branding.logo);
                                                    e.currentTarget.src = '/images/placeholder.png';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="branding.logo_dark" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Dark Logo
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="branding.logo_dark"
                                            name="branding.logo_dark"
                                            value={formData.branding.logo_dark}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="/images/logo-dark.png"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="logo_dark_upload"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'branding.logo_dark')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                className="h-full px-3 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                   {formData.branding.logo_dark && (
                                        <div className="mt-2 p-2 bg-[#0D1117] rounded-lg border border-[#30363D] inline-block">
                                            <img 
                                                src={formData.branding.logo_dark} 
                                                alt="Dark Logo Preview" 
                                                className="h-10 max-w-[200px] object-contain"
                                                onError={(e) => {
                                                    console.log('Image failed to load:', formData.branding.logo_dark);
                                                    e.currentTarget.src = '/images/placeholder.png';
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="branding.icon_light" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Light Icon
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="branding.icon_light"
                                            name="branding.icon_light"
                                            value={formData.branding.icon_light}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="/images/icon-light.png"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="icon_light_upload"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'branding.icon_light')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                className="h-full px-3 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {formData.branding.icon_light && (
                                        <div className="mt-2 p-2 bg-[#0D1117] rounded-lg border border-[#30363D] inline-block">
                                            <img 
                                                src={formData.branding.icon_light} 
                                                alt="Light Icon Preview" 
                                                className="h-10 object-contain"
                                                onError={(e) => e.currentTarget.src = '/images/placeholder.png'}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="branding.icon_dark" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Dark Icon
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="branding.icon_dark"
                                            name="branding.icon_dark"
                                            value={formData.branding.icon_dark}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="/images/icon-dark.png"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="icon_dark_upload"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'branding.icon_dark')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                className="h-full px-3 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {formData.branding.icon_dark && (
                                        <div className="mt-2 p-2 bg-[#0D1117] rounded-lg border border-[#30363D] inline-block">
                                            <img 
                                                src={formData.branding.icon_dark} 
                                                alt="Dark Icon Preview" 
                                                className="h-10 object-contain"
                                                onError={(e) => e.currentTarget.src = '/images/placeholder.png'}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="branding.favicon" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Favicon
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="branding.favicon"
                                            name="branding.favicon"
                                            value={formData.branding.favicon}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="/images/favicon.ico"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="favicon_upload"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'branding.favicon')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                className="h-full px-3 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {formData.branding.favicon && (
                                        <div className="mt-2 p-2 bg-[#0D1117] rounded-lg border border-[#30363D] inline-block">
                                            <img 
                                                src={formData.branding.favicon} 
                                                alt="Favicon Preview" 
                                                className="h-10 object-contain"
                                                onError={(e) => e.currentTarget.src = '/images/placeholder.png'}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="branding.footer_logo" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Footer Logo
                                    </label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            id="branding.footer_logo"
                                            name="branding.footer_logo"
                                            value={formData.branding.footer_logo}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                            placeholder="/images/footer-logo.png"
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="footer_logo_upload"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'branding.footer_logo')}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <button
                                                type="button"
                                                className="h-full px-3 bg-[#21262D] text-white rounded-lg hover:bg-[#30363D] transition-colors duration-200"
                                            >
                                                <Upload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {formData.branding.footer_logo && (
                                        <div className="mt-2 p-2 bg-[#0D1117] rounded-lg border border-[#30363D] inline-block">
                                            <img 
                                                src={formData.branding.footer_logo} 
                                                alt="Footer Logo Preview" 
                                                className="h-10 object-contain"
                                                onError={(e) => e.currentTarget.src = '/images/placeholder.png'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Contact Settings */}
                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="contact_email" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        id="contact_email"
                                        name="contact_email"
                                        value={formData.contact_email}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact_phone" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="contact_phone"
                                        name="contact_phone"
                                        value={formData.contact_phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact_address" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Contact Address
                                    </label>
                                    <textarea
                                        id="contact_address"
                                        name="contact_address"
                                        value={formData.contact_address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Social Media Settings */}
                        {activeTab === 'social' && (
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="social_media.facebook" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Facebook URL
                                    </label>
                                    <input
                                        type="url"
                                        id="social_media.facebook"
                                        name="social_media.facebook"
                                        value={formData.social_media.facebook}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                        placeholder="https://facebook.com/yourpage"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="social_media.twitter" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Twitter URL
                                    </label>
                                    <input
                                        type="url"
                                        id="social_media.twitter"
                                        name="social_media.twitter"
                                        value={formData.social_media.twitter}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                        placeholder="https://twitter.com/yourhandle"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="social_media.instagram" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        Instagram URL
                                    </label>
                                    <input
                                        type="url"
                                        id="social_media.instagram"
                                        name="social_media.instagram"
                                        value={formData.social_media.instagram}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                        placeholder="https://instagram.com/yourhandle"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="social_media.linkedin" className="block text-sm font-medium text-[#8B949E] mb-1">
                                        LinkedIn URL
                                    </label>
                                    <input
                                        type="url"
                                        id="social_media.linkedin"
                                        name="social_media.linkedin"
                                        value={formData.social_media.linkedin}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#0D1117] text-white px-4 py-2 rounded-lg border border-[#30363D] focus:border-[#58a6ff] focus:outline-none"
                                        placeholder="https://linkedin.com/company/yourcompany"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Advanced Settings */}
                        {activeTab === 'advanced' && (
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="maintenance_mode"
                                        name="maintenance_mode"
                                        checked={formData.maintenance_mode}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-[#238636] bg-[#0D1117] border-[#30363D] rounded focus:ring-[#238636]"
                                    />
                                    <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-white">
                                        Maintenance Mode
                                    </label>
                                </div>
                                <div className="bg-[#0D1117] p-4 rounded-lg border border-[#30363D]">
                                    <p className="text-[#8B949E] text-sm">
                                        When maintenance mode is enabled, the site will display a maintenance page to all users except administrators.
                                    </p>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;