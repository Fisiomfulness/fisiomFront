import { useRouter } from 'next/navigation';
import { Pagination, Card, CardHeader, Image } from '@nextui-org/react';
import { getBlogs } from '@/services/blogs';

export default function BlogCards({
  blogs,
  page,
  totalPages,
  query,
  setBlogs,
  setPage,
}) {
  const router = useRouter();

  const handleChange = (selectedPage) => {
    getBlogs({ ...query, page: selectedPage }).then((res) => {
      setPage(res.page);
      setBlogs(res.blogs);
    });
  };

  // ! TODO: MODIFY FOR LARGE TITLE AND DESCRIPTION
  // ! ALSO SIDEBAR.
  return (
    <div className="w-full flex flex-col items-center gap-5">
      {blogs.length > 0 ? (
        <>
          <div className="xl:h-[1020px] size-fit gap-x-6 gap-y-8 grid sm:grid-cols-2 md:grid-cols-3">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="w-full grid grid-rows-[60%,auto] !max-w-[300px] h-[318px] rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  removeWrapper
                  alt={`${blog.title} picture`}
                  className="size-full object-cover rounded-none"
                  src={blog.image}
                />
                <CardHeader
                  onClick={() => router.push(`/blog/${blog._id}`)}
                  className="overflow-hidden grid grid-rows-[max-content,auto] gap-1 items-start bg-[#D8EEF8] cursor-pointer rounded-none"
                >
                  <h3 className="truncate w-full text-xs m-0 lg:text-sm text-black uppercase font-bold">
                    {blog.title}
                  </h3>
                  <p className="text-xs h-full line-clamp-5 lg:text-sm lg:line-clamp-4 text-black font-medium break-words">
                    {blog.text}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Pagination
            showControls
            total={totalPages}
            initialPage={1}
            page={page}
            onChange={handleChange}
            className="w-full flex justify-center"
          />
        </>
      ) : (
        <h3 className="m-auto">No results</h3>
      )}
    </div>
  );
}
