import { Image } from "@nextui-org/react";

function BlogDetail({ data }) {
  return (
    <div className="w-full flex flex-col justify-center items-center my-6">
      <h1 className="capitalize text-center">{data.title}</h1>
      <div className="my-6">
        <Image
          src={data.image}
          alt="NextUI Album Cover"
          className="rounded-none mb-2 w-full"
        />
        <p>
          {data.text}
        </p>
      </div>
    </div>
  );
}

export default BlogDetail;
