import React from "react";
import CreateBlog from "@/components/CreateBlog/CreateBlog";
import ImageBlog from "@/components/CreateBlog/ImageBlog";

function CreateBlogPage() {
  return (
    <div className="flex w-full mt-4 mb-10 flex-col md:flex-row gap-y-5 md:gap-y-0">
      <div className="w-full hidden md:w-[550px] md:flex md:visible">
        <ImageBlog dataImage="https://images.ecestaticos.com/QbL6ro7ikJbVV9a66qyu4q_AjFY=/0x70:1716x1040/1440x810/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F8db%2F8b6%2Faa5%2F8db8b6aa54b585253e15f79a68447aeb.jpg" />
      </div>
      <CreateBlog />
    </div>
  );
}

export default CreateBlogPage;
