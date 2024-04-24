"use client";
import { useState } from "react";
import BlogCards from "./BlogCards";
import BlogAside from "./BlogAside";

const CARDS_PER_PAGE = 9;

const BlogSection = ({ data, lastsBlogs }) => {
  // ? no need to use context api for only two siblings.
  const [blogs, setBlogs] = useState(data.blogs);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(data.totalPages);
  const [query, setQuery] = useState({
    limit: CARDS_PER_PAGE,
    sortBy: "title",
    order: "asc",
  });

  return (
    <main
      className={[
        "max-w-8xl mx-auto px-auto",
        "grid gap-y-7 gap-x-10",
        "py-4 md:py-6 xl:grid-cols-[auto,30%]",
      ].join(" ")}
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
