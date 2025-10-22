import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="w-full pb-10 pt-20 px-6 max-w-7xl mx-auto lg:flex-row flex-col flex gap-10">
        <div className="w-80 px-6 pb-6 pt-20 flex flex-col justify-center items-center relative z-0 h-fit rounded-[30px] max-lg:w-full bg-[var(--bg-800)] border-[5px] border-[var(--border)] shadow-[0_6px_18px_rgba(2,6,10,0.6)]">
          <div className="w-11/12 bg-[var(--txt-primary)] border-[5px] border-[var(--border)] rounded-[20px] px-5 py-3 absolute -top-9 flex items-center justify-center z-10 shadow-[2px_2px_0_rgba(0,0,0,0.6)] text-[color:var(--bg-900)]">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="rounded-full object-cover border-[3px] border-[var(--border)]"
          />

          <p className="text-[30px] font-extrabold text-[color:var(--txt-primary)] mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-sm font-normal text-[color:var(--txt-primary)/.8]">
            {user?.bio}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-[30px] font-bold text-[color:var(--bg-900)]">
            {session?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="grid md:grid-cols-3 sm:grid-cols-2 gap-5">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
