'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from './components/header';
import Section1 from './components/section1';
import SelectionsSection from './components/SelectionsSection';


export default function Home() {
  return (
<div className="relative w-full min-h-screen overflow-x-b=visible mb-10">
  {/* Background Image with overlay */}
  <div className="absolute top-0 left-0 w-full h-[900px] overflow-hidden -z-10 ">
    <div className="relative w-full h-full">
      <Image
        src="/landingimage.png"
        alt="Landing"
        width={1600}
        height={1054}
        className="w-full h-full object-cover  object-top translate-y-[-100px]"
        priority
      />
      <div className="absolute inset-0 bg-[#1B2930] object-top translate-y-[-100px] opacity-70" />
    </div>
  </div>

      {/* Sticky Header */}
      <Header />

      {/* Hero Section (Desktop) */}
      <div className="hidden sm:block relative min-h-[1100px] ">
        {/* Hero Text */}
        <div className="absolute top-[130px] left-[780px] w-[792px] text-[#E2C269] text-center">
          <h1 className="text-[80px] font-bold leading-[77px]">
            Where every bottle tells a story
          </h1>
        </div>

        {/* Subtext */}
        <div className="absolute top-[300px] left-[820px] w-[734px] text-[#E2C269] text-center">
          <p className="text-[36px] font-bold leading-[44px]">
            Our wines reflect the unique terroir and the stories of the people behind them.
            Whether you're seeking a bold red or a crisp white, discover the flavors
            that have been lovingly bottled just for you.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          href="/products"
          className="absolute top-[540px] left-[1059px] w-[279px] h-[88px] flex items-center justify-center bg-[#1B2930] text-[#E2C269] border border-[#E2C269] text-lg font-semibold hover:opacity-90 transition rounded"
        >
          click to shop
        </Link>

        {/* Bottles Image */}
        <Image
          src="/threebottles.png"
          alt="Wine Bottles"
          width={879}
          height={879}
          className="absolute top-[17px] object-contain"
        />
      </div>

      {/* Hero Section (Mobile) */}
      <div className="sm:hidden flex flex-col items-center text-center text-[#E2C269] px-4 pt-24 space-y-8 mb-16">
        <Image
          src="/threebottles.png"
          alt="Wine Bottles"
          width={300}
          height={300}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold leading-tight ">
          Where every bottle tells a story
        </h1>
        <p className="text-lg font-medium leading-snug ">
          Our wines reflect the unique terroir and the stories of the people behind them.
          Whether you're seeking a bold red or a crisp white, discover the flavors
          that have been lovingly bottled just for you.
        </p>
        <Link
          href="/products"
          className="w-[200px] h-[60px] flex items-center justify-center bg-[#34434F] text-[#E2C269] border border-[#E2C269] text-base font-semibold hover:opacity-90 transition rounded"
        >
          click to shop
        </Link>
      </div>

      {/* Section1 */}
      <Section1 className="-mt-[200px]" />
      {/* Selections Section */}
      <SelectionsSection />
    </div>
  );
}
