'use client';
import { Image, Button } from '@nextui-org/react';
import Rating from '@/components/Blog/Detail/Rating';
import ScrollBlog from './ScrollBlog';

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
        <div className="bg-[#D8EEF8] flex flex-col justify-between mt-3 md:mt-7 sm:grid sm:grid-cols-[2fr,2.5fr,1fr]">
          <div className="flex items-center gap-2 justify-between flex-grow m-0 p-4 md:px-8 md:py-4 sm:flex-col lg:flex-row">
            <h4 className="m-0 text-secondary">Valoración</h4>
            <div className="flex items-center m-0">
              <Rating />
            </div>
          </div>
          <input
            className="outline-secondary-400 flex-grow font-medium placeholder:text-gray-600 p-4 placeholder:italic rounded-none sm:mb-0 bg-zinc-100 md:px-6"
            type="text"
            placeholder="agregar un comentario..."
          />
          <Button
            color="primary"
            className="rounded-none p-4 !size-full bg-primary-500"
          >
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
