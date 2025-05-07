import React from "react";

const VisitUsSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16  bg-white max-w-6xl mx-auto gap-6 ">
      {/* Left Side: Text + Map + Button */}
      <div className="md:w-1/2 flex flex-col items-start justify-center space-y-6 text-center md:text-left ml-25">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Or come in person as we are just<br />15 mins away from the center
        </h2>

        {/* Google Maps Embed */}
        <iframe
          title="Divin Wine Factory Location"
          className="w-full h-64 rounded-lg shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3315.5823931262546!2d35.5725188763519!3d33.82295437324432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17f62e3d2193%3A0x86f4ec9c3eb55d63!2sDivin%20wine%20factory!5e0!3m2!1sen!2slb!4v1715099902020!5m2!1sen!2slb"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <a
          href="https://maps.app.goo.gl/exxefbXhNCZXjzMX9?g_st=aw"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#1B2930] text-white px-6 py-2 rounded-md hover:bg-[#2c445d] transition"
        >
          View on Google Maps
        </a>
      </div>

      {/* Right Side: Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src="/lady.png"
          alt="Silhouette Lady"
          className="w-full max-w-xs object-contain ml-12"
        />
      </div>
    </section>
  );
};

export default VisitUsSection;
