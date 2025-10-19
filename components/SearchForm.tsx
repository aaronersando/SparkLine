import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action={"/"}
      scroll={false}
      className="max-w-3xl w-full min-h-[80px] rounded-[80px] text-[24px] mt-8 px-5 flex items-center gap-5 bg-[color:var(--txt-primary)] border-[5px] border-[var(--border)]"
    >
      <input
        name="query"
        defaultValue={query}
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-[color:var(--txt-muted)] w-full h-auto outline-none text-[color:var(--bg-900)]"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[var(--bg-900)] text-[color:var(--txt-primary)]"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
