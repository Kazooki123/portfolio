import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import React from 'react';
import { ThemeToggle } from '@/components/themes/theme-toggle';

export default function BlogsPage() {
    const posts = getSortedPostsData();

    return(
        <div className="max-w-4xl mx-auto px-4 py-8">
            <ThemeToggle />
            <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
            <div className="space-y-6">
                {posts.map((post) => (
                    <article key={post.id} className="border-b pb-6">
                        <Link href={`/blogs/${post.id}`}>
                            <h2 className="text-2xl font-semibold hover:text-blue-600">
                                {post.title}
                            </h2>
                        </Link>
                        <time className="text-gray-500">{post.date}</time>
                        {post.excerpt && <p className="mt-2">{post.excerpt}</p>}
                    </article>
                ))}
            </div>
        </div>
    );
}