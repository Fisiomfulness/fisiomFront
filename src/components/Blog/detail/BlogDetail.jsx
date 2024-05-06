'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Image } from '@nextui-org/react';
import roles from '@/utils/roles';
import DOMPurify from 'isomorphic-dompurify';
import ScrollBlog from './ScrollBlog';
import CommentForm from './CommentForm';
import dynamic from 'next/dynamic';
const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const BlogDetail = ({ data, iniComments, totalComments }) => {
  const { data: session } = useSession()
  const [comments, setComments] = useState(iniComments);

  return (
    <div className="size-full grid grid-rows-[max-content,auto] gap-3 items-stretch lg:grid-rows-none lg:grid-cols-[20%,auto] lg:gap-10">
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
          className="htmlField grow mb-2 md:mb-3"
        />
        <ScrollBlog
          blogId={data._id}
          comments={comments}
          totalComments={totalComments}
          setComments={setComments}
        />
        {session?.user ? (
          session.user.role === roles.USER ? (
            <CommentForm
              userId={session.user.id}
              blogId={data._id}
              setComments={setComments}
            />
          ) : (
            <div className="text-center bg-primary-600 mt-5 md:mt-7 text-white p-5">
              <p>Solo usuarios comunes pueden dejar un comentario</p>
            </div>
          )
        ) : (
          <div className="text-center bg-primary-600 mt-5 md:mt-7 text-white p-5">
            <p>
              <span>
                <a
                  href="/login"
                  className="font-semibold tracking-wider text-primary-50 underline hover:no-underline hover:text-secondary-900"
                >
                  Inicie sesión
                </a>
              </span>{' '}
              para dejar un comentario
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
