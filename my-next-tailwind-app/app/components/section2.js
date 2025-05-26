'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Section2() {
  return (
    <section className="relative w-full flex flex-col-reverse lg:flex-row-reverse items-center justify-between px-6 lg:pr-[120px] lg:pl-12 py-16 gap-10 z-10 bg-white -mt-[200px]">
      {/* Right Image */}
      <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
        <Image
          src="/magic.png"
          alt="Magic Wine Experience"
          width={593}
          height={893}
          className="object-contain"
        />
      </div>

      {/* Text + Bottle Illustration */}
      <div className="w-full lg:w-1/2 relative flex flex-col items-center lg:items-end justify-center text-center lg:text-right">
        <Image
          src="/bottle.png"
          alt="Bottle Illustration"
          width={400}
          height={400}
          className="absolute left-0 bottom-0 -z-10 opacity-40 max-w-[280px] hidden lg:block"
        />

        <h2 className="text-4xl sm:text-5xl font-bold text-[#34434F] mb-4">
          Uncork the Magic
        </h2>
        <p className="text-[#34434F] text-lg sm:text-2xl font-medium mb-6 max-w-xl leading-relaxed">
          Explore picturesque vineyards and discover the story behind every sip.
          At our exclusive events, enjoy rare vintages, learn from sommeliers, and connect with fellow wine lovers for an unforgettable experience.
        </p>
<Link
  href="/contact"
  className="inline-block bg-[#E2C269] text-[#34434F] text-lg font-semibold px-6 py-3 rounded shadow-md hover:shadow-lg hover:from-[#D4B55A] hover:to-[#C6A84B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02]  active:scale-[0.98]"
>
  Contact Us
</Link>

      </div>
    </section>
  );
}
