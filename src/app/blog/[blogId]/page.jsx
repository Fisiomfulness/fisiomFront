import React from "react";
import dataBlog from "../../../components/Blog/data/blogs.json";
import BlogDetail from "@/components/Blog/detail/BlogDetail";

const BlogDetailPage = ({ params }) => {
  const infoBlog = dataBlog.data.find((e) => e.id === params.blogId);

  return <BlogDetail data={infoBlog} />;
};

export default BlogDetailPage;
