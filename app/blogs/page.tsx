import { getSortedPostsData } from '@/lib/markdown';
import React from 'react';
import { ThemeToggle } from '@/components/themes/theme-toggle';
import { BlogCard } from '@/components/BlogCard';

export default function BlogsPage() {
    const posts = getSortedPostsData();

    return(
        <div className="max-w-6xl mx-auto px-4 py-12">
            <ThemeToggle />
            <h1 className="text-4xl font-bold mb-12 text-center">
                Blog Posts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard 
                     key={post.id}
                     id={post.id}
                     title={post.title}
                     date={post.date}
                     excerpt={post.excerpt}
                  />
                ))}
            </div>
        </div>
    );
}