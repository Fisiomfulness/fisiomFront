'use client';
import { Image } from '@nextui-org/react';
import ScrollBlog from './ScrollBlog';
import CommentForm from './CommentForm';

const BlogDetail = ({ data }) => {
  return (
    <div className="grid gap-4 items-stretch m-4 md:mx-0 md:grid-cols-[20%,auto] md:gap-10">
      <Image
        src={data.image}
        alt="Blog picture"
        className="w-screen !h-full max-h-[200px] rounded-none object-cover object-center md:p-0 md:max-h-[1500px]"
      />
      <div className="flex flex-col">
        <h1 className="capitalize">{data.title}</h1>
        <h5 className="mb-7 leading-relaxed grow">{data.text}</h5>
        <ScrollBlog />
        <CommentForm blogId={data._id} />
      </div>
    </div>
  );
};

export default BlogDetail;
