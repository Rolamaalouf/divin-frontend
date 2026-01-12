'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from './components/header';
import Section1 from './components/section1';
import SelectionsSection from './components/SelectionsSection';
import Section2 from './components/section2';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen overflow-x-visible">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-[110vh] overflow-hidden -z-10">
        <div className="relative w-full h-full">
          <Image
            src="/landingimage.png"
            alt="Landing"
            width={1600}
            height={1054}
            className="w-full h-full object-cover object-top translate-y-[-100px] mb-[-40]"
            priority
          />
          <div className="absolute inset-0 bg-[#031B28] object-top translate-y-[-100px] opacity-70" />
        </div>
      </div>

      {/* Sticky Header */}
      <Header />

      <div className="mt-[-20] mb-50">
        {/* Hero Desktop */}
        <div className="hidden sm:flex flex-col lg:flex-row items-center justify-between min-h-screen lg:px-8 bg-cover bg-center">
          {/* Bottles */}
          <div className="flex justify-center lg:justify-start w-full lg:w-1/2  ml-[-20]">
          <Image
  src="/threebottles.png"
  alt="Wine Bottles"
  width={700}
  height={700}
  className="object-contain animate-drop-in"
/>

          </div>

          {/* Text + Button */}
          <div className="w-full lg:w-1/2 mb-10  text-left lg:text-left space-y-4 max-w-[650px] px-4 lg:transform lg:-translate-x-10 animate-fade-in-up">
<h1 className="
    text-2xl md:text-3xl xl:text-[50px] font-semibold tracking-wide leading-tight drop-shadow-md
  text-[#E2C269]
  sm:text-[#031B28]
  lg:text-[#FFF4C2]
">
  Where every bottle tells a story
</h1>
<p className="
  text-base md:text-lg xl:text-[22px] xl:leading-[38px]
  text-[#E2C269]
  sm:text-[#031B28]
  lg:text-[#FFF4C2]
">
  Our wines reflect the unique terroir and the stories of the people behind them.
  Whether you are seeking a bold red or a crisp white, discover the flavors that
  have been lovingly bottled just for you.
</p>

            <div className="pt-2">
              <Link
                href="/wines"
                className="glitter-button inline-block px-8 py-4 text-base lg:text-lg font-bold rounded focus:outline-none focus:ring-2 focus:ring-[#E2C269] transition hover:brightness-110"
              >
                Shop our wines →
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Mobile */}
        <div className="sm:hidden flex flex-col items-center text-center mt-[-80] text-[#E2C269] px-4 pt-20 space-y-8">
          <Image
            src="/threebottles.png"
            alt="Wine Bottles"
            width={300}
            height={300}
            className="object-contain"
          />
          <h1 className="text-3xl font-bold leading-tight">
            Where every bottle tells a story
          </h1>
          <p className="text-lg font-medium leading-snug">
            Our wines reflect the unique terroir and the stories of the people behind them.
            Whether you are seeking a bold red or a crisp white, discover the flavors
            that have been lovingly bottled just for you.
          </p>
          <Link
            href="/wines"
            className="glitter-button mb-20 w-[200px] h-[60px] flex items-center justify-center text-base font-semibold rounded transition hover:brightness-110 z-1000"
          >
            Shop our wines
          </Link>
        </div>
      </div>

      {/* Sections */}
      <Section1 className="mt-[200px]" />
      <SelectionsSection id="selections"  className="mb-54" />
      <Section2 />
    </div>
  );
}
