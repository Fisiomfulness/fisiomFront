import React from "react";
import { ScrollShadow } from "@nextui-org/react";
import CardCreateBlog from "./CardCreateBlog";

export default function ScrollBlog() {
  return (
    <ScrollShadow hideScrollBar className="max-h-[500px] overflow-y-auto">
      <CardCreateBlog />
      <CardCreateBlog />
      <CardCreateBlog />
      <CardCreateBlog />
      <CardCreateBlog />
      <CardCreateBlog />
      <CardCreateBlog />
      <CardCreateBlog />
    </ScrollShadow>
  );
}
