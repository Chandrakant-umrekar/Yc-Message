import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section className="p-4 bg-[#EFF0F1] dark:bg-[#0f141c]">
      <footer className="hover:bg-white dark:hover:bg-slate-950/30 hover:outline-gray-100 outline-4 bg-gray-50 rounded-md dark:bg-gray-950 py-8 border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <p className="text-gray-600 dark:text-gray-300 text-center md:text-left font-medium">
            © {new Date().getFullYear()} Yc Message. All rights reserved.
            Developed by{" "}
            <Link
              className="font-semibold hover:underline"
              href="https://www.linkedin.com/in/chandrakant-umrekar-141bb932b/"
            >
              Chandrakant Umrekar
            </Link>
            .
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              {
                icon: FaFacebookF,
                href: "https://facebook.com",
                name: "facebook",
              },
              {
                icon: FaTwitter,
                href: "https://x.com/Chandrakant_0w",
                name: "twitter",
              },
              {
                icon: FaInstagram,
                href: "https://instagram.com",
                name: "instagram",
              },
              {
                icon: FaLinkedinIn,
                href: "https://www.linkedin.com/in/chandrakant-umrekar-141bb932b/",
                name: "linkedin",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-[#ff4500] dark:hover:text-[#ff8c00] transition-colors duration-100"
              >
                <social.icon className="h-6 w-6" />
                <span className="text-[.1px] sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
