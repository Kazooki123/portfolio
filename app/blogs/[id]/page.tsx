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
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <time className="text-gray-500">{post.date}</time>
      </header>
      <div 
        className="prose prose-slate max-w-none
          [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8
          [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6
          [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-6
          [&>h4]:text-xl [&>h4]:font-bold [&>h4]:mb-3 [&>h4]:mt-4
          [&>h5]:text-lg [&>h5]:font-bold [&>h5]:mb-2 [&>h5]:mt-4
          [&>h6]:text-base [&>h6]:font-bold [&>h6]:mb-2 [&>h6]:mt-4
          [&>p]:text-base [&>p]:mb-4 [&>p]:leading-relaxed
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
          [&>li]:mb-2
          [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 
          [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-4
          [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto
          [&>code]:bg-gray-100 [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}