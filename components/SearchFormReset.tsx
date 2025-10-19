"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const router = useRouter();

  const handleReset = () => {
    // Clear the search by pushing to the base URL
    router.push("/");

    // Also clear any input fields immediately for better UX
    const input = document.querySelector(
      'input[name="query"]'
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[var(--bg-900)] text-[color:var(--txt-primary)]"
    >
      <X className="size-5" />
    </button>
  );
};

export default SearchFormReset;
