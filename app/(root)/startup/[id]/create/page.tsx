import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");
  return (
    <>
      <section className="w-full min-h-[530px] flex justify-center items-center flex-col py-10 px-6 bg-[linear-gradient(90deg,rgba(14,165,255,0.06),rgba(255,176,32,0.02))] pattern">
        <h1 className="uppercase px-6 py-3 font-extrabold sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5  text-[color:var(--txt-primary)]">
          Submit Your Startup
        </h1>
      </section>

      <StartupForm />
    </>
  );
};

export default Page;
