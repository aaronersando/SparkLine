import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  return (
    <>
      <section className="w-full min-h-[530px] flex justify-center items-center flex-col py-10 px-6 bg-[linear-gradient(90deg,rgba(14,165,255,0.06),rgba(255,176,32,0.02))] pattern">
        <h1 className="uppercase px-6 py-3 font-extrabold sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5  text-[color:var(--txt-primary)]">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className=" text-[20px] text-[color:var(--txt-secondary)] max-w-2xl text-center break-words font-[var(--font-inter)]">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : `All Startups`}
        </p>
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-sm font-normal text-[color:var(--txt-muted)]">
              No Startups Found
            </p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
