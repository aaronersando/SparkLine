import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="font-medium text-[16px] px-4 py-2 rounded-lg capitalize bg-[rgba(14,165,255,0.08)] text-[color:var(--txt-primary)]">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
