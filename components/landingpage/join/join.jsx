"use client";

import img1 from "./image 6.svg";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Join = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className='w-11/12 mx-auto'>
      <h1
        className='w-3/5 mx-auto text-center md:text-4xl text-base font-bold md:font-medium mb-4'
        // data-aos="fade-up"
        // data-aos-duration="2000"
      >
        {/* Unlocking potential, building dreams:  */}
        Transforming lives of freelancers
      </h1>
      <h2
        className='w-3/5 mx-auto text-xs md:text-lg text-slate-600 font-normal text-center'
        // data-aos="fade-up"
        // data-aos-duration="2000"
      >
        Join our vibrant community of African freelancers, learn new skills, and
        land high-paying projects. Together, we&apos;re building a brighter
        future for freelance work in Africa.
      </h2>
      <div className='flex justify-between w-full md:flex-row flex-col md:pt-12 pt-6'>
        <ol
          className='md:w-2/4 w-full flex flex-col gap-4 mb-8'
          // data-aos="zoom-in-right"
          // data-aos-duration="2000"
        >
          <li className='md:text-xl text-xs font-normal'>
            Join our vibrant community of African freelancers, learn new skills,
            and land high-paying projects. Together, we&apos;re building a
            brighter future for freelance work in Africa.
          </li>
          <li className='md:text-xl text-xs font-normal'>
            Join our vibrant community of African freelancers, learn new skills,
            and land high-paying projects. Together, we&apos;re building a
            brighter future for freelance work in Africa.
          </li>
          <li className='md:text-xl text-xs font-normal'>
            Join our vibrant community of African freelancers, learn new skills,
            and land high-paying projects. Together, we&apos;re building a
            brighter future for freelance work in Africa.
          </li>
        </ol>
        <div
          className='md:w-2/5 w-full'
          data-aos='zoom-in-left'
          data-aos-duration='2000'>
          <Image src={img1} alt='img1' className='w-full' />
        </div>
      </div>
    </div>
  );
};
export default Join;
