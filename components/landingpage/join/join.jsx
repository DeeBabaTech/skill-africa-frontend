"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import WordPullUp from "@/components/magicui/word-pull-up";

const Join = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className='w-11/12 mx-auto md:flex justify-center items-center gap-20 my-5'>
      <div className='md:w-2/5'>
        <div className='text-center text-4xl font-bold md:font-medium mb-4'>
          {/* Unlocking potential, building dreams:  */}
          <WordPullUp words='Transforming lives of freelancers' />
        </div>
        <h2 className='md:text-lg text-slate-600 font-normal text-center'>
          Join our vibrant community of African freelancers, learn new skills,
          and land high-paying projects. Together, we&apos;re building a
          brighter future for freelance work in Africa.
        </h2>
      </div>
      <div className='md:w-1/2 w-4/5 mx-auto mt-5 md:mt-0'>
        <Image
          src='/images/10.JPG'
          alt='img1'
          width='1000'
          height='1000'
          className="h-[30rem] object-cover rounded-md"
          priority
        />
      </div>
    </div>
  );
};
export default Join;
