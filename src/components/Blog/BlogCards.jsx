'use client';
import { Card, CardHeader, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { truncateText } from '@/utils/helpers';

export default function BlogCards({ blogs }) {
  const router = useRouter();

  return (
    <div className="max-w-full lg:max-w-[900px] mx-auto gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-center">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="col-span-1 flex flex-col items-center h-auto rounded-none"
        >
          <Card className="w-full h-full rounded-none shadow-lg">
            <Image
              removeWrapper
              alt={`${blog.title} picture`}
              className="z-0 w-full h-48 object-cover rounded-none"
              src={blog.image}
            />
            <CardHeader
              onClick={() => router.push(`/blog/${blog._id}`)}
              className="relative z-10 w-full flex flex-col items-start bg-[#D8EEF8] h-auto p-4 cursor-pointer rounded-none"
            >
              <div>
                <p className="text-xs lg:text-sm text-black uppercase font-bold">
                  {blog.title}
                </p>
                <h6 className="text-xs lg:text-sm text-black font-medium overflow-hidden ">
                  {truncateText(blog.text, 15)}
                </h6>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
