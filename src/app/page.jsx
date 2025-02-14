import Link from "next/link";
import Header from "./Components/Header";

export const metadata = {
  title: "CoolNomade -- Travel Blog",
  description: "Generated by create next app",
};
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40" />
        <Header className="z-10 relative" />
        <main>
          <div className="min-h-[50vh] flex flex-col items-center justify-center z-10 relative">
            <h1 className="text-6xl text-center text-slate-100">
              Welcome To <span className="text-yellow-400">CoolNomad</span>{" "}
              Travel Blog
            </h1>
            <div className="mt-20">
              <Link href="/blog" className="text-2xl text-slate-100 border-2 rounded-md py-3 px-4 hover:bg-yellow-400 hover:text-slate-800 transition ">Read Blog</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
