import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 px-6 py-4 bg-[#0B0F15] border-b border-[#1E2933]/40 backdrop-blur-sm">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 bg-gradient-to-br from-[#0EA5FF] to-[#60A5FA] rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src={"/logo_circle.png"}
              alt="SparkLine Logo"
              width={32}
              height={32}
              className="transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h1 className="font-sora font-extrabold text-[#E6EEF6] tracking-tight">
            <span className="text-[#E6EEF6]">Spark</span>
            <span className="text-[#0EA5FF]">Line</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {session && session?.user ? (
            <>
              <Link
                href={"/startup/create"}
                className="text-[#A9B6C2] hover:text-[#E6EEF6] transition-colors duration-200 font-medium"
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
                  className="text-[#A9B6C2] hover:text-[#E6EEF6] transition-colors duration-200 font-medium"
                >
                  Logout
                </button>
              </form>

              <Link
                href={`/user/${session?.id}`}
                className="flex items-center gap-2 px-3.5 py-2 bg-[#111318] rounded-full border border-[#1E2933]/60 hover:border-[#0EA5FF]/50 transition-all duration-200"
              >
                <span className="text-[#E6EEF6] font-medium">
                  {session?.user?.name}
                </span>
                {session?.user?.image && (
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      width={24}
                      height={24}
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
              <button className="px-4 py-2 bg-[#0EA5FF] text-[#05060A] font-medium rounded-md hover:bg-[#0EA5FF]/90 transition-colors duration-200">
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
