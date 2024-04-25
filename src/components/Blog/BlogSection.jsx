'use client';
import { useState } from 'react';
import BlogCards from './BlogCards';
import BlogAside from './BlogAside';

const BlogSection = ({ data, lastsBlogs, cardsPerPage }) => {
  // ? no need to use context api for only two siblings.
  const [blogs, setBlogs] = useState(data.blogs);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.totalPages);
  const [query, setQuery] = useState({
    limit: cardsPerPage,
    sortBy: 'title',
    order: 'asc',
  });

  return (
    <main
      className={[
        'w-full max-w-8xl mx-auto min-h-[92vh] px-auto',
        'grid gap-y-7 gap-x-10',
        'py-4 md:py-6 xl:grid-cols-[auto,30%]',
      ].join(' ')}
    >
      <BlogCards
        blogs={blogs}
        page={page}
        totalPages={totalPages}
        query={query}
        setBlogs={setBlogs}
        setPage={setPage}
      />
      <BlogAside
        cardsPerPage={cardsPerPage}
        lastsBlogs={lastsBlogs}
        setBlogs={setBlogs}
        setPage={setPage}
        setTotalPages={setTotalPages}
        setQuery={setQuery}
      />
    </main>
  );
};

export default BlogSection;
