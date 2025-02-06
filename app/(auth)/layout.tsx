"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useGetProfile } from "../api/get-profile";
import { Bell, ChevronDown } from "lucide-react";
import { Avatar } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data } = useSession();
  const id = data?.user?.user?.uuid;

  const { data: profileData } = useGetProfile(id);

  return (
    <main>
      <header className='container flex justify-between items-center py-5'>
        <Link href='/profile' className='text-xl font-semibold'>
          SkillAfrika
        </Link>
        <nav className='hidden md:block'>
          <ul className='flex gap-7 text-slate-700'>
            <li>About us</li>
            <li>Find freelancers</li>
            <li>Jobs</li>
            <li>Blog</li>
            <li>Events</li>
          </ul>
        </nav>
        {data && (
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-3'>
              <Bell size={20} />
              <Avatar
                src={profileData?.profile?.profile_pic}
                sx={{ width: 30, height: 30 }}
              />
              <ChevronDown size={16} />
            </div>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-2 md:px-4 px-1 rounded-md'
              onClick={() => signOut()}>
              Log out
            </button>
          </div>
        )}
      </header>
      <div>{children}</div>
    </main>
  );
}
