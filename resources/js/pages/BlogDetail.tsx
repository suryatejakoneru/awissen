import React from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, Tag, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

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
    post: BlogPost;
    relatedPosts: BlogPost[];
}

const BlogDetail = ({ post, relatedPosts }: Props) => {
    const shareUrl = window.location.href;
    const shareTitle = post.title;

    const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        };

        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
    };

    return (
        <Layout title={`AWISSEN - ${post.title} | Automotive Education & Training`}>
            <div className="min-h-screen bg-[#0a0a29]">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                        <div className="py-12">
                            {/* Back Button */}
                            <div className="mb-8">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center text-[#a8a8d8] hover:text-[#8a2be2] transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Blog
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    {/* Article Header */}
                                    <div className="mb-8">
                                        <div className="aspect-w-16 aspect-h-9 mb-8">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        </div>
                                        <h1 className="text-4xl font-bold text-[#8a2be2] mb-4">
                                            {post.title}
                                        </h1>
                                        <div className="flex items-center text-sm text-[#a8a8d8] mb-4">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <time dateTime={post.published_at}>
                                                {new Date(post.published_at).toLocaleDateString()}
                                            </time>
                                            <span className="mx-2">•</span>
                                            <span className="text-[#8a2be2]">{post.category}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <img
                                                src={post.author.avatar}
                                                alt={post.author.name}
                                                className="h-10 w-10 rounded-full mr-3"
                                            />
                                            <span className="text-[#a8a8d8]">{post.author.name}</span>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <div className="prose prose-invert max-w-none">
                                        <div className="text-[#a8a8d8] text-lg mb-8">
                                            {post.excerpt}
                                        </div>
                                        <div className="text-[#a8a8d8] whitespace-pre-line">
                                            {post.content}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mt-8 flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#8a2be2]/10 text-[#8a2be2]"
                                            >
                                                <Tag className="h-4 w-4 mr-1" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    {/* Share Buttons */}
                                    <div className="bg-[#0f0f3d] rounded-lg p-6 mb-8 border border-[#2d2d6d]">
                                        <h3 className="text-white font-semibold mb-4">Share This Article</h3>
                                        <div className="flex flex-col space-y-3">
                                            <button
                                                onClick={() => handleShare('facebook')}
                                                className="flex items-center justify-center w-full py-2 px-4 rounded-lg bg-[#1877F2] hover:bg-[#1877F2]/90 text-white transition-colors"
                                            >
                                                <Facebook className="h-5 w-5 mr-2" />
                                                Facebook
                                            </button>
                                            <button
                                                onClick={() => handleShare('twitter')}
                                                className="flex items-center justify-center w-full py-2 px-4 rounded-lg bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white transition-colors"
                                            >
                                                <Twitter className="h-5 w-5 mr-2" />
                                                Twitter
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin')}
                                                className="flex items-center justify-center w-full py-2 px-4 rounded-lg bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white transition-colors"
                                            >
                                                <Linkedin className="h-5 w-5 mr-2" />
                                                LinkedIn
                                            </button>
                                            <button
                                                onClick={handleCopyLink}
                                                className="flex items-center justify-center w-full py-2 px-4 rounded-lg bg-[#2d2d6d] hover:bg-[#2d2d6d]/90 text-white transition-colors"
                                            >
                                                <LinkIcon className="h-5 w-5 mr-2" />
                                                Copy Link
                                            </button>
                                        </div>
                                    </div>

                                    {/* Related Posts */}
                                    <div className="bg-[#0f0f3d] rounded-lg p-6 border border-[#2d2d6d]">
                                        <h3 className="text-white font-semibold mb-4">Related Posts</h3>
                                        <div className="space-y-4">
                                            {relatedPosts.map((relatedPost) => (
                                                <Link
                                                    key={relatedPost.id}
                                                    href={`/blog/${relatedPost.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="aspect-w-16 aspect-h-9 mb-2">
                                                        <img
                                                            src={relatedPost.image}
                                                            alt={relatedPost.title}
                                                            className="object-cover w-full h-full rounded"
                                                        />
                                                    </div>
                                                    <h4 className="text-[#a8a8d8] group-hover:text-[#8a2be2] transition-colors line-clamp-2">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <div className="flex items-center text-xs text-[#a8a8d8] mt-1">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        <time dateTime={relatedPost.published_at}>
                                                            {new Date(relatedPost.published_at).toLocaleDateString()}
                                                        </time>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default BlogDetail;