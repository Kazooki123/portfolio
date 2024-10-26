import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface BlogCardProps {
    id: string;
    title: string;
    date: string;
    excerpt?: string;
}

export function BlogCard({ id, title, date, excerpt }: BlogCardProps) {
    return(
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <Link href={`/blogs/${id}`} className="hover:text-blue-600">
                  <h2 className="text-2xl font-semibold">{title}</h2>
                </Link>
                <time className="text-sm text-gray-500">{date}</time>
            </CardHeader>
            {excerpt && (
                <CardContent>
                    <p className="text-gray-600">{excerpt}</p>
                </CardContent>
            )}
            <CardFooter className="pt-4">
                <Link
                    href={`/blogs/${id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more →
                </Link>
            </CardFooter>
        </Card>
    )
}