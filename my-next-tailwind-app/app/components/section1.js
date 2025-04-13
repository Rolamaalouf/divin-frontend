'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Section1() {
  return (
<section className="relative w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:pl-32 lg:pr-12 py-16 gap-10 z-10 bg-white  -mt-[200px]">
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
    {/* Barrel behind text - moved to bottom */}
    <Image
      src="/barrel.png"
      alt="Barrel Illustration"
      width={400}
      height={400}
      className="absolute right-0 bottom-0 -z-10 opacity-50 max-w-[300px] hidden lg:block"
    />

    <h2 className="text-4xl sm:text-5xl font-bold text-[#34434F] mb-6">
      A sip of resilience
    </h2>
    <p className="text-[#34434F] text-lg sm:text-3xl font-semibold mb-6 max-w-xl leading-relaxed">
      Divin’s wines beautifully blend Lebanon’s ancient terroir with steadfast
      craftsmanship, refined by passion into timeless excellence. Connecting
      Beirut to Bekaa, our vineyard is just a half-hour drive from Faraya,
      nestled at an altitude of 1,200 meters. This unique location not only
      enhances the flavor profiles of our wines but also offers breathtaking
      views of the surrounding landscape.
      <br /><br />
      Moreover, our winery is conveniently located just 15 minutes from the
      heart of Beirut, making it easily accessible for wine enthusiasts and
      tourists alike.
    </p>
    <Link
      href="/about"
      className="bg-[#E2C269] text-[#34434F] font-bold px-6 py-3 rounded hover:opacity-90 transition"
    >
      See more
    </Link>
  </div>
</section>


  );
}