import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="w-full min-h-[530px] flex justify-center items-center flex-col py-10 px-6 bg-[linear-gradient(90deg,rgba(14,165,255,0.06),rgba(255,176,32,0.02))] pattern">
        <h1 className="uppercase px-6 py-3 font-extrabold sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 font-[var(--font-sora)] text-[color:var(--txt-primary)]">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className=" text-[20px] text-[color:var(--txt-secondary)] max-w-2xl text-center break-words font-[var(--font-inter)]">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>
    </>
  );
}
