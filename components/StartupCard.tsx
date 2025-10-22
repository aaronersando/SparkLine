import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Startup, Author } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  // Handle optional author object safely
  const authorName = author?.name || "Unknown";
  const authorId = author?._id || author?.id || "unknown";

  return (
    <li className="group overflow-hidden flex flex-col bg-[#0B0F15] border border-[#1E2933] rounded-xl transition-all duration-300 hover:border-[#0EA5FF]/30">
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image || "https://placehold.co/600x400"}
          alt={title || "Startup image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-[#0B0F15]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#E6EEF6]">
          {formatDate(_createdAt)}
        </div>
        <div className="absolute top-3 right-3 bg-[#0B0F15]/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <EyeIcon className="size-3.5 text-[#0EA5FF]" />
          <span className="text-xs font-medium text-[#E6EEF6]">{views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category Badge */}
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <span className="inline-block text-xs font-semibold text-[#0EA5FF] mb-3">
            {category}
          </span>
        </Link>

        {/* Title */}
        <Link
          href={`/startup/${_id}`}
          className="group-hover:text-[#0EA5FF] transition-colors"
        >
          <h3 className="font-bold text-lg text-[#E6EEF6] line-clamp-1 mb-2">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-[#A9B6C2] line-clamp-2 mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#1E2933]/50">
          <Link href={`/user/${authorId}`} className="flex items-center gap-2">
            <div className="size-7 bg-[#111318] rounded-full flex items-center justify-center text-xs text-[#E6EEF6] uppercase font-bold">
              {authorName.charAt(0)}
            </div>
            <span className="text-sm text-[#A9B6C2] hover:text-[#E6EEF6] transition-colors">
              {authorName}
            </span>
          </Link>

          <Link href={`/startup/${_id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#0EA5FF] hover:text-[#E6EEF6] hover:bg-[#111318] px-3 py-1 h-auto"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
