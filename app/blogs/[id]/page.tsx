import { getAllPostIds, getPostData } from '@/lib/markdown';

export async function generateStaticParams() {
    const ids = getAllPostIds();
    return ids.map((id) => ({
        id: id,
    }));
}

export default async function BlogPost({ params }: { params: { id: string } }) {
    const post = await getPostData(params.id);

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <time className="text-gray-500 block mb-8">{post.date}</time>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
