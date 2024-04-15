'use client';
import { useState } from 'react';
import BlogCards from './BlogCards';
import BlogAside from './BlogAside';

const BlogSection = ({ data, lastsBlogs }) => {
  const [blogs, setBlogs] = useState(data.blogs);
  return (
    <div className="w-full grid gap-y-7 gap-x-10 py-4 md:py-6 xl:grid-cols-[auto,30%]">
      <BlogCards
        blogs={blogs}
        iniTotalPages={data.totalPages}
        setBlogs={setBlogs}
      />
      <BlogAside lastsBlogs={lastsBlogs} setBlogs={setBlogs} />
    </div>
  );
};

export default BlogSection;
