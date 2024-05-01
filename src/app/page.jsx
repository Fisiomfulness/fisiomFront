import HomeClient from "./page.client";

export const metadata = {
  title: "Página Principal"
}

export default function Home() {
  return (
    <main
      className={[
        "bg-[url('/Home.jpg')] bg-no-repeat bg-cover",
        "px-auto center min-h-[92vh]",
      ].join(" ")}
    >
      <div className="grow bg-white p-3 mb-20 max-w-2xl shadow-xl border-1 rounded-xl">
        <HomeClient />
      </div>
    </main>
  );
}
