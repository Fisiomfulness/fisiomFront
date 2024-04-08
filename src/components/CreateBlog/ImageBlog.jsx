import { Image } from "@nextui-org/react";

export default function ImageBlog({ dataImage }) {
  return (
    <Image
      src={dataImage}
      alt="NextUI Album Cover"
      className="w-full h-full rounded-none md:p-0 md:h-full"
    />
  );
}
