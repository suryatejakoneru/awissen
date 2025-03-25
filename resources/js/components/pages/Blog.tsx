import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Search, Calendar, Tag, ChevronRight } from 'lucide-react';

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

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog-posts');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            setLoading(false);
        }
    };

    const categories = Array.from(new Set(posts.map(post => post.category)));

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <Layout>
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog & News</h1>
                        <p className="text-xl text-gray-600">
                            Stay updated with the latest news, insights, and developments in automotive education.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <select
                                value={selectedCategory || ''}
                                onChange={(e) => setSelectedCategory(e.target.value || null)}
                                className="w-full md:w-48 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Blog Posts Grid */}
                    {loading ? (
                        <div className="text-center">Loading posts...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <time dateTime={post.published_at}>
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </time>
                                            <span className="mx-2">•</span>
                                            <span className="text-blue-600">{post.category}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    className="h-8 w-8 rounded-full mr-2"
                                                />
                                                <span className="text-sm text-gray-600">{post.author.name}</span>
                                            </div>
                                            <a
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex items-center text-blue-600 hover:text-blue-700"
                                            >
                                                Read More
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </a>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
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
                    )}

                    {/* No Results Message */}
                    {!loading && filteredPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No posts found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Blog; 