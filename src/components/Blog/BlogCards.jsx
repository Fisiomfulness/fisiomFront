import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination, Card, CardHeader, Image } from '@nextui-org/react';
import { truncateText } from '@/utils/helpers';
import { getBlogs } from '@/services/blogs';

const CARDS_PER_PAGE = 9;

export default function BlogCards({ blogs, iniTotalPages, setBlogs }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(iniTotalPages);
  const router = useRouter();

  const handleChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getBlogs({
      page,
      limit: CARDS_PER_PAGE,
      sortBy: 'title',
      order: 'asc',
    }).then((res) => {
      setBlogs(res.blogs);
      setTotalPages(res.totalPages);
    });
  }, [page]);

  return (
    <div className="flex flex-col items-center gap-5">
      {blogs.length > 0 ? (
        <>
          <div className="xl:h-[992px] justify-center size-fit gap-x-6 gap-y-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="col-span-1 flex flex-col items-center h-auto rounded-md overflow-hidden"
              >
                <Card className="w-full max-w-[300px] h-10rem rounded-none shadow-lg sm:w-full">
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
          />
        </>
      ) : (
        <h3 className="m-auto">No results</h3>
      )}
    </div>
  );
}
