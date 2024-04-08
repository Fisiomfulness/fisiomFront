import { User, Link } from "@nextui-org/react";
import Star from "./Star";

export default function CardCreateBlog() {
  return (
    <div className="bg-[#D8EEF8] px-5 pb-5 pt-5 rounded-lg mb-5">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <User
          name="Jane Doe"
          description={<Star />}
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
        <Link href="#" color="danger">
          Reportar
        </Link>
      </div>
      <h5>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore harum
        atque temporibus ratione culpa fugit error, dolorem a, quos odio enim
        corporis consequuntur exercitationem excepturi, necessitatibus modi
        corrupti repellendus earum!
      </h5>
    </div>
  );
}
