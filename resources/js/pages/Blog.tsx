import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Calendar, Tag, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    published_at: string;
    author: {
        name: string;
        avatar: string;
    };
    category: string;
    tags: string[];
}

interface Props {
    initialPosts: BlogPost[];
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const Blog = ({ initialPosts }: Props) => {
    const [posts] = useState<BlogPost[]>(initialPosts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 9
    });

    const categories = Array.from(new Set(posts.map(post => post.category)));

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredPosts.length / pagination.itemsPerPage);
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pagination.itemsPerPage);

    // Update pagination when filters change
    React.useEffect(() => {
        setPagination(prev => ({
            ...prev,
            currentPage: 1,
            totalPages: Math.ceil(filteredPosts.length / prev.itemsPerPage)
        }));
    }, [filteredPosts.length]);

    const handlePageChange = (page: number) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Previous button
        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 rounded-lg border border-[#2d2d6d] text-[#a8a8d8] hover:border-[#8a2be2] hover:text-[#8a2be2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
        );

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-1 rounded-lg border ${
                        pagination.currentPage === 1
                            ? 'border-[#8a2be2] text-[#8a2be2]'
                            : 'border-[#2d2d6d] text-[#a8a8d8] hover:border-[#8a2be2] hover:text-[#8a2be2]'
                    } transition-all duration-300`}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="ellipsis1" className="px-2 text-[#a8a8d8]">
                        ...
                    </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-lg border ${
                        pagination.currentPage === i
                            ? 'border-[#8a2be2] text-[#8a2be2]'
                            : 'border-[#2d2d6d] text-[#a8a8d8] hover:border-[#8a2be2] hover:text-[#8a2be2]'
                    } transition-all duration-300`}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="ellipsis2" className="px-2 text-[#a8a8d8]">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 rounded-lg border ${
                        pagination.currentPage === totalPages
                            ? 'border-[#8a2be2] text-[#8a2be2]'
                            : 'border-[#2d2d6d] text-[#a8a8d8] hover:border-[#8a2be2] hover:text-[#8a2be2]'
                    } transition-all duration-300`}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-[#2d2d6d] text-[#a8a8d8] hover:border-[#8a2be2] hover:text-[#8a2be2] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        );

        return (
            <div className="flex items-center justify-center space-x-2 mt-8">
                {pages}
            </div>
        );
    };

    return (
        <Layout title="AWISSEN - Blog | Automotive Education & Training">
            {/* Hero Section */}
            <section className="relative min-h-[400px] bg-[#0a0a29] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80"
                        alt="Blog Hero"
                        className="object-cover w-full h-full opacity-80"
                    />
                    <div className="absolute inset-0 bg-[#0a0a29]/80"></div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(138,43,226,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
                <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-20"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
                    <div className="grid grid-cols-12">
                        <motion.div 
                            className="col-span-12 lg:col-span-10 lg:col-start-2 text-center"
                            initial="initial"
                            animate="animate"
                            variants={fadeInUp}
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6a11cb] to-[#8a2be2] drop-shadow-[0_0_10px_rgba(138,43,226,0.3)]">
                                    Our Blog
                                </span>
                            </h1>
                            <p className="text-[#a8a8d8] text-lg mb-8">
                                Stay updated with the latest insights, trends, and innovations in automotive education
                            </p>
                            <motion.div 
                                className="max-w-4xl mx-auto"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            placeholder="Search articles..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-6 py-4 bg-[#0f0f3d] border border-[#2d2d6d] rounded-lg text-white placeholder-[#a8a8d8] focus:outline-none focus:border-[#8a2be2] focus:ring-2 focus:ring-[#8a2be2]/20 transition-all duration-300"
                                        />
                                        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#a8a8d8] h-5 w-5" />
                                    </div>
                                    <select
                                        value={selectedCategory || ''}
                                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                                        className="w-full md:w-48 py-4 px-6 bg-[#0f0f3d] border border-[#2d2d6d] rounded-lg focus:outline-none focus:border-[#8a2be2] focus:ring-2 focus:ring-[#8a2be2]/20 transition-all duration-300 text-white"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-20 bg-[#0a0a29]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map((post) => (
                                    <article
                                        key={post.id}
                                        className="bg-[#0f0f3d] rounded-lg overflow-hidden border border-[#2d2d6d] hover:border-[#8a2be2] hover:shadow-[0_0_30px_rgba(138,43,226,0.3)] transition-all duration-300 group"
                                    >
                                        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a29] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-[#a8a8d8] mb-4">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <time dateTime={post.published_at}>
                                                    {new Date(post.published_at).toLocaleDateString()}
                                                </time>
                                                <span className="mx-2">•</span>
                                                <span className="text-[#8a2be2]">{post.category}</span>
                                            </div>
                                            <Link href={`/blog/${post.slug}`} className="block">
                                                <h2 className="text-xl font-bold text-white mb-2 hover:text-[#8a2be2] transition-colors duration-300">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                            <p className="text-[#a8a8d8] mb-4 group-hover:text-white transition-colors duration-300">{post.excerpt}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        className="h-8 w-8 rounded-full mr-2"
                                                    />
                                                    <span className="text-sm text-[#a8a8d8] group-hover:text-white transition-colors duration-300">{post.author.name}</span>
                                                </div>
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center text-[#8a2be2] hover:text-[#6a11cb] transition-colors duration-300"
                                                >
                                                    Read More
                                                    <ChevronRight className="h-4 w-4 ml-1" />
                                                </Link>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {post.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#8a2be2]/10 text-[#8a2be2] group-hover:bg-[#8a2be2]/20 transition-colors duration-300"
                                                    >
                                                        <Tag className="h-3 w-3 mr-1" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {renderPagination()}

                            {/* No Results Message */}
                            {filteredPosts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-[#a8a8d8]">No posts found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Blog;