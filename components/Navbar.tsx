import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
// import { Menu, X } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 bg-[#0B0F15]/95 border-b border-[#1E2933]/40 backdrop-blur-md shadow-lg">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#0EA5FF] to-[#60A5FA] rounded-lg overflow-hidden flex items-center justify-center shadow-lg shadow-[#0EA5FF]/20">
            <Image
              src={"/logo_circle.png"}
              alt="SparkLine Logo"
              width={32}
              height={32}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h1 className="font-sora font-extrabold text-lg sm:text-xl text-[#E6EEF6] tracking-tight">
            <span className="text-[#E6EEF6]">Spark</span>
            <span className="text-[#0EA5FF]">Line</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {session && session?.user ? (
            <>
              <Link
                href={"/startup/create"}
                className="text-[#A9B6C2] hover:text-[#E6EEF6] transition-all duration-200 font-medium text-sm lg:text-base hover:scale-105"
              >
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-[#A9B6C2] hover:text-[#E6EEF6] transition-all duration-200 font-medium text-sm lg:text-base hover:scale-105"
                >
                  Logout
                </button>
              </form>

              <Link
                href={`/user/${session?.id}`}
                className="flex items-center gap-2 px-3 lg:px-3.5 py-1.5 lg:py-2 bg-[#111318] rounded-full border border-[#1E2933]/60 hover:border-[#0EA5FF]/50 hover:shadow-lg hover:shadow-[#0EA5FF]/10 transition-all duration-200"
              >
                <span className="text-[#E6EEF6] font-medium text-sm lg:text-base">
                  {session?.user?.name}
                </span>
                {session?.user?.image && (
                  <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-[#0EA5FF]/20">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                )}
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button className="px-4 lg:px-5 py-2 lg:py-2.5 bg-gradient-to-r from-[#0EA5FF] to-[#0B8FDB] text-[#05060A] font-semibold rounded-lg hover:from-[#0B8FDB] hover:to-[#0EA5FF] transition-all duration-200 shadow-lg shadow-[#0EA5FF]/20 hover:shadow-[#0EA5FF]/40 hover:scale-105 text-sm lg:text-base">
                Login
              </button>
            </form>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {session && session?.user ? (
            <div className="flex items-center gap-2">
              <Link
                href={"/startup/create"}
                className="px-3 py-1.5 text-[#A9B6C2] hover:text-[#E6EEF6] transition-colors duration-200 font-medium text-sm"
              >
                Create
              </Link>

              <Link
                href={`/user/${session?.id}`}
                className="flex items-center gap-1.5 px-2 py-1.5 bg-[#111318] rounded-full border border-[#1E2933]/60"
              >
                {session?.user?.image && (
                  <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-[#0EA5FF]/20">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      width={24}
                      height={24}
                      className="object-cover"
                    />
                  </div>
                )}
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="px-3 py-1.5 text-[#A9B6C2] hover:text-[#E6EEF6] transition-colors duration-200 font-medium text-sm"
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button className="px-4 py-2 bg-gradient-to-r from-[#0EA5FF] to-[#0B8FDB] text-[#05060A] font-semibold rounded-lg hover:from-[#0B8FDB] hover:to-[#0EA5FF] transition-all duration-200 shadow-lg shadow-[#0EA5FF]/20 text-sm">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
