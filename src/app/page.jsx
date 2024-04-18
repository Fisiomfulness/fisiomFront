import HomeClient from "./page.client";

export default function Home() {
  return (
    <div
      className={[
        "bg-[url('/Home.jpg')] bg-no-repeat bg-cover",
        "w-full !max-w-[unset]",
        "center flex-row [&>div]:flex-1",
      ].join(" ")}
    >
      <HomeClient />
    </div>
  );
}
