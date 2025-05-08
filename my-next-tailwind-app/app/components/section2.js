'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Section2() {
  return (
    <section className="relative w-full flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-0 py-2 gap-0 z-10 bg-white -mt-[200px]">
      {/* Text + Bottle Illustration */}
      <div className="w-full lg:w-1/2 relative flex flex-col items-center lg:items-start justify-center text-center lg:text-left lg:ml-[240px]">
      <Image
  src="/bottle.png"
  alt="Decorative Bottle"
  width={400}
  height={400}
  className="absolute left-0 bottom-10 -ml-35 -z-10 opacity-50 max-w-[300px] hidden lg:block"
/>


        <h2 className="text-4xl sm:text-5xl font-bold text-[#34434F] mb-2">
          Uncork the Magic
        </h2>
        <p className="text-[#34434F] text-lg sm:text-3xl font-semibold mb-6 max-w-xl leading-relaxed">
          From strolling through picturesque vineyards to exploring the intricate
          process of crafting each bottle, you will uncover the secrets behind
          every sip. Attending our events allows you to connect with fellow wine
          enthusiasts, savor exclusive tastings of rare vintages, and learn from
          expert sommeliers who will guide you through the nuances of flavor and
          aroma.
        </p>
        <Link
          href="/contact"
          className="bg-[#E2C269] text-[#34434F] font-bold px-6 py-3 rounded hover:opacity-90 transition"
        >
          Contact us
        </Link>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 relative flex justify-center lg:mr-[100px]">
        <Image
          src="/magic.png"
          alt="Magic Wine Experience"
          width={593}
          height={893}
          className="object-contain"
        />
      </div>
    </section>
  );
}
