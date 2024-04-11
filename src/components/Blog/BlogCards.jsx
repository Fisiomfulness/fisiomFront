'use client';
import { Pagination, Card, CardHeader, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { truncateText } from '@/utils/helpers';
import { useMemo, useState } from 'react';

const cardsPerPage = 9;

export default function BlogCards({ blogs }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / cardsPerPage);
  const router = useRouter();

  const handleChange = (page) => {
    setPage(page);
  };

  const displayedBlogs = useMemo(() => {
    const start = (page - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    return blogs.slice(start, end);
  }, [page, blogs, cardsPerPage]);

  return (
    <div className="h-full flex flex-col items-center justify-between">
      <div className="grow size-fit gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 items-start">
        {displayedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="col-span-1 flex flex-col items-center h-auto rounded-md overflow-hidden"
          >
            <Card className="w-full h-10rem rounded-none shadow-lg min-[360px]:w-[80%] sm:w-full">
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
      <Pagination
        loop
        showControls
        total={totalPages}
        initialPage={1}
        page={page}
        onChange={handleChange}
        color={'bg-primary-100'}
        classNames={{
          ellipsis: 'bg-primary-100',
        }}
        className="m-2"
      />
    </div>
  );
}
