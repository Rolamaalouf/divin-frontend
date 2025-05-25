'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Section1() {
  return (
    <section className="relative w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:pl-[120px] lg:pr-12 py-16 gap-10  bg-white -mt-[250px]">
      {/* Left Image */}
      <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
        <Image
          src="/image1.png"
          alt="Wine in vineyard"
          width={593}
          height={893}
          className="object-contain"
        />
      </div>

      {/* Text + Barrel Illustration */}
      <div className="w-full lg:w-1/2 relative flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <Image
          src="/barrel.png"
          alt="Barrel Illustration"
          width={400}
          height={400}
          className="absolute right-0 bottom-0 -z-10 opacity-40 max-w-[280px] hidden lg:block"
        />

        <h2 className="text-4xl sm:text-5xl font-bold text-[#34434F] mb-4">
          A sip of resilience
        </h2>
        <p className="text-[#34434F] text-lg sm:text-2xl font-medium mb-6 max-w-xl leading-relaxed">
          Divin’s wines beautifully blend Lebanon’s ancient terroir with steadfast craftsmanship, refined by passion into timeless excellence.
          Nestled at 1,200 meters altitude, our vineyard enhances flavor profiles while offering breathtaking views of the surrounding landscape.
          <br /><br />
          Located just 15 minutes from Beirut, we invite both locals and travelers to experience the spirit of our wines.
        </p>
        <Link
          href="/about"
          className="relative  bg-[#E2C269] text-[#34434F] font-bold px-6 py-3 rounded hover:opacity-90 transition"
        >
          See more
        </Link>
      </div>
    </section>
  );
}
