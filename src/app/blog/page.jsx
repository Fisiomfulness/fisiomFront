import React from "react";
import CardBlog from "@/components/Blog/CardBlog";
import BlogList from "@/components/Blog/BlogList";
import dataBlog from "@/components/Blog/data/blogs.json";
import dataPublication from "@/components/Blog/data/publication.json";

const BlogPage = () => {
  return (
    <div className="flex flex-col gap-y-7 gap-x-10 lg:flex-row w-full h-full mt-10 mb-14">
      <CardBlog cardData={dataBlog.data} />
      <BlogList blogData={dataPublication.data} />
    </div>
  );
};

export default BlogPage;
