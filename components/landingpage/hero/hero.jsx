"use client";

import img6 from "./Component 2.svg";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NumberTicker from "@/components/magicui/number-ticker";
import Marquee from "@/components/magicui/marquee";
import BoxReveal from "@/components/magicui/box-reveal";
import BlurIn from "@/components/magicui/blur-in";
import skillAfrikaImages from "@/components/landingpage/images.json";

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <div className='w-5/6 mx-auto pt-10 flex flex-col justify-between items-center gap-6 pb-5'>
        <h1 className='bg-orange-500 text-white px-4 py-3 md:px-6 md:py-3 rounded-3xl md:text-base md:font-medium font-bold text-sm'>
          Over{" "}
          <span>
            <NumberTicker value={5000} className='text-white' />
          </span>{" "}
          freelancers in our community
        </h1>
        <BoxReveal boxColor={"#f97316"} duration={0.5}>
          <div className='md:w-3/4 mx-auto md:font-medium text-4xl font-bold text-center'>
            Empowering the future of Africans
          </div>
        </BoxReveal>
        <p className='md:text-lg font-normal text-center md:w-7/12 text-slate-600'>
          Providing valuable skills and opportunities to young Africas,
          empowering them to contribute positively to their communities and the
          continents future.
        </p>
        <Link href='/register'>
          <BlurIn
            duration={2}
            word='Get started'
            className='text-base md:text-sm bg-orange-500 hover:bg-orange-600 rounded-full font-medium md:px-8 md:py-3 px-5 py-2 text-white'>
            Get started
          </BlurIn>
        </Link>
      </div>
      <div className='md:flex gap-2 overflow-hidden hidden w-full'>
        <Marquee pauseOnHover className='[--duration:200s]'>
          {skillAfrikaImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={image}
              width='1000'
              height='1000'
              className='w-72 h-60 rounded-md'
              priority
            />
          ))}
        </Marquee>
      </div>
      <Marquee pauseOnHover className='[--duration:15s]'>
        <Image src={img6} alt='img1' className='md:hidden flex w-full mt-2' />
      </Marquee>
    </div>
  );
};
export default Hero;
