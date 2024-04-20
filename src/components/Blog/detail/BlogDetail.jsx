'use client';
import { useState } from 'react';
import { Image } from '@nextui-org/react';
import DOMPurify from 'isomorphic-dompurify';
import ScrollBlog from './ScrollBlog';
import CommentForm from './CommentForm';
import dynamic from 'next/dynamic';
const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const BlogDetail = ({ data, iniComments, totalComments }) => {
  const [comments, setComments] = useState(iniComments);

  return (
    <div className="grid grid-rows-[max-content,auto] gap-3 items-stretch m-4 md:mx-0 lg:grid-rows-none lg:grid-cols-[20%,auto] lg:gap-10">
      <Image
        src={data.image}
        alt="Blog picture"
        className="w-screen !h-full !max-h-[200px] rounded-lg lg:rounded-none object-cover object-center md:p-0 lg:!max-h-[1500px]"
      />
      <div className="flex flex-col overflow-hidden">
        <div className="lg:gap-2 grid lg:grid-cols-[auto,max-content] items-center mb-2 md:mb-3">
          <h1 className="capitalize leading-[2.6rem] text-3xl m-0 text-balance">
            {data.title}
          </h1>
          <div className="flex gap-2 items-center row-start-1 lg:col-start-2 md:gap-3">
            {data.avg_rating >= 1 && (
              <span className="text-[#06B0FF] font-semibold">
                {data.avg_rating}
              </span>
            )}
            <StarRatings
              starRatedColor="#06B0FF"
              rating={data.avg_rating}
              numberOfStars={5}
              starDimension="18px"
              starSpacing="2px"
            />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.text) }}
          className="grow"
        />
        <ScrollBlog
          blogId={data._id}
          comments={comments}
          totalComments={totalComments}
          setComments={setComments}
        />
        <CommentForm blogId={data._id} setComments={setComments} />
      </div>
    </div>
  );
};

export default BlogDetail;
