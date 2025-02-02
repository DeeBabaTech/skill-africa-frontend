"use client";

import { useGetProfile } from "@/app/api/get-profile";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ButtonClick from "../form/button";
import { ProfileInfo } from "./profile-info";
import { OutlinedButton } from "../ui/outlined-button";
import { NicheSkillLang } from "@/types/types";
import Loader from "../ui/loader";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user?.user;
  const router = useRouter();

  const { data, isLoading, isFetched } = useGetProfile(user?.uuid);

  console.log(data, isFetched);

  if (isFetched && !data?.first_name) {
    router.push("profile/prof-reg");
    return;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className='container mx-auto px-5 py-8'>
      <div className='outline outline-slate-100  shadow-md rounded-lg p-6'>
        <div className='md:flex items-center gap-10'>
          <img
            src={
              data?.profile_pic ||
              "https://res.cloudinary.com/dbez0fyq6/image/upload/v1729271237/ngzlkwvpxawd8w4lxsoo.png"
            }
            alt={`${data?.first_name} profile pic`}
            className='rounded-full w-52 h-52 bg-cover'
          />

          <div>
            <h2 className='text-3xl font-bold mt-5 md:mt-0'>
              {data?.first_name} {data?.last_name || user?.username}
            </h2>
            <p className='text-xl font-semibold my-2'>
              {data?.niches[0].niche ||
                "Creative Frontend developer | Community manager"}
            </p>
            <div className='flex flex-wrap md:gap-5 gap-2'>
              <div className='text-gray-600 flex items-center gap-1'>
                <img src='/images/map.svg' alt='/' />
                <p>Lagos, Nigeria</p>
              </div>
              <div className='text-gray-600 flex items-center gap-1'>
                <img src='/images/mail.svg' alt='/' />
                <p className='text-gray-600'>{user?.email}</p>
              </div>
            </div>
            <div className='flex flex-wrap gap-3 my-3'>
              {data?.niches?.map((niche: NicheSkillLang) => {
                return (
                  <OutlinedButton key={niche?.id}>
                    {niche?.niche}
                  </OutlinedButton>
                );
              })}
            </div>
            <Link
              href='/profile/prof-reg'
              className='bg-orange-500 flex items-center gap-2 py-2 px-4 rounded-full text-white w-fit'>
              <img src='/images/edit.svg' alt='/' />
              <p>Edit Profile</p>
            </Link>
          </div>
        </div>
      </div>
      <div className='outline outline-slate-100 rounded-lg shadow-md flex justify-between items-center p-3 my-5'>
        <div className='flex items-center gap-2'>
          <img src='/images/flist.svg' alt='file list icon' />
          <p>No resume uploaded</p>
        </div>

        <ButtonClick>
          <span className='text-xl font-semibold'> + </span>Upload resume
        </ButtonClick>
      </div>

      <ProfileInfo data={data} />
    </main>
  );
};

export default ProfilePage;
