import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

// export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, playlist] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const editorPosts = playlist?.select || [];

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="w-full min-h-[530px] flex justify-center items-center flex-col py-10 px-6 bg-[linear-gradient(90deg,rgba(14,165,255,0.06),rgba(255,176,32,0.02))] pattern !min-h[230px]">
        <p className="px-6 py-3 uppercase font-semibold rounded-sm relative bg-[var(--accent-ember)] text-[color:#041021] tracking-wider">
          {formatDate(post?.createdAt)}
        </p>

        <h1 className="uppercase px-6 py-3 font-extrabold sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 text-[color:var(--txt-primary)]">
          {post.title}
        </h1>
        <p className="text-[20px] text-[color:var(--txt-secondary)]  text-center break-words font-[var(--font-inter)] !max-w-5xl">
          {post.description}
        </p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl x-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-[20px] font-medium text-[color:var(--bg-900)]">
                  {post.author.name}
                </p>
                <p className="text-[16px] font-medium text-[color:var(--bg-900)] !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="font-medium text-[16px] px-4 py-2 rounded-full bg-[rgba(14,165,255,0.08)] text-[color:var(--txt-primary)]">
              {post.category}
            </p>
          </div>
          <h3 className="text-[30px] font-bold text-[color:var(--bg-900)]">
            Startup Details
          </h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl break-all"
            />
          ) : (
            <p className="text-sm font-normal text-[color:var(--txt-muted)] view-container">
              No Details Provided
            </p>
          )}
        </div>
        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <Suspense
        fallback={
          <Skeleton className="bg-[color:var(--txt-secondary)] h-10 w-24 rounded-lg fixed bottom-3 right-3" />
        }
      >
        <View id={id} />
      </Suspense>
    </>
  );
};

export default Page;
