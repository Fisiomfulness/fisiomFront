import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getTypes } from "@/services/types";
import { redirect } from "next/navigation";
import MyBlogs from "@/components/Blog/my-blogs/MyBlogs";
import roles from "@/utils/roles";

export const metadata = {
  title: "Mis blogs",
  description: "Todas las publicaciones pertenecientes a un profesional",
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== roles.PROFESSIONAL)
    return redirect("/404");

  const { types } = await getTypes();

  return (
    <div className="max-w-8xl w-full flex flex-col items-center px-auto mx-auto min-h-[92vh]">
      <h1 className="mb-5 uppercase bg-gradient-to-r from-primary-600 to-primary-800 inline-block text-transparent bg-clip-text">
        Tus blogs
      </h1>
      <MyBlogs session={session} types={types} />
    </div>
  );
};

export default page;
