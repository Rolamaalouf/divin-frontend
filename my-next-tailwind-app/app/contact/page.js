'use client';

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Header from "../components/header";
import {motion} from "framer-motion";
import VisitUsSection from "../components/maps";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitted(false);
      
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
        if (!serviceId || !templateId || !publicKey) {
          setError("Missing EmailJS configuration.");
          return;
        }
      
        try {
          const emailParams = {
            title: "New Message from Website",
            ...formData,
            time: new Date().toLocaleString(),
          };
      
          const response = await emailjs.send(serviceId, templateId, emailParams, publicKey);
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
        } catch (err) {
          console.error("FAILED...", err);
          setError("Something went wrong while sending your message. Please try again.");
        }
      };
      
      
    return (
        <div className="bg-white">
               <div className="bg-[#1B2930]">
        <Header />
      </div>

            <div className="bg-[#1B2930] h-[40vh] flex items-center justify-center mt-20">
            <motion.h1
          className="text-[#E2C269] text-5xl sm:text-6xl font-bold text-center"
          initial={{ opacity: 0, y: -50 }}   // Start above and invisible
          animate={{ opacity: 1, y: 0 }}      // Animate down and visible
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Contact Us
        </motion.h1>

            </div>

            <div className="max-w-4xl mx-auto -mt-20 bg-white rounded-lg shadow-lg p-8 relative z-10">
                <p className="text-[#A68F7B] text-xl md:text-2xl text-center mb-8">
                    Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
                </p>

                {isSubmitted && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                        <p className="font-medium">Your message was sent successfully!</p>
                        <p>Thank you for reaching out. We will get back to you soon.</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        <p className="font-medium">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A68F7B]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A68F7B]"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            required
                            rows={5}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A68F7B]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 mt-4 bg-[#1B2930] text-white font-semibold rounded-md hover:bg-[#8a7665] transition-colors focus:outline-none focus:ring-2 focus:ring-[#A68F7B] focus:ring-offset-2"
                    >
                        Send Message
                    </button>
                </form>
            </div>

<VisitUsSection />
                </div>
    
    );
};

export default Contact;
