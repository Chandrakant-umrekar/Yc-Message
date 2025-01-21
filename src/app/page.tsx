"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/message.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-12 lg:px-24 py-12 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <section className="text-center mb-12 max-w-3xl transition-transform duration-300">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800 dark:text-gray-50 tracking-tight ">
          Discover the Power of{" "}
          <span className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] dark:from-[#ff5e57] dark:to-[#ff7849] text-transparent bg-clip-text">
            Anonymous
          </span>{" "}
          Feedback
        </h1>
        <h2 className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Empower your voice without revealing your identity at{" "}
          <span className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] dark:from-[#ff5e57] dark:to-[#ff7849] text-transparent bg-clip-text font-semibold">
            Yc Message
          </span>
        </h2>
        <h3 className="relative p-0 text-[0.001px] -z-40 text-white">
          This is the best anonymous messaging platform, build by chandrakant
          umrekar who is full stack web developer.
        </h3>
        <Link
          href="/sign-up"
          className="mt-6 inline-block px-8 py-3 text-white text-lg font-semibold rounded-lg bg-gradient-to-r from-[#ff4500] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff4500] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg dark:shadow-orange-500/20"
        >
          Get Started
        </Link>
      </section>
      <section className="w-full max-w-3xl mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-900/50 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-t-2 dark:hover:border-t-2 hover:border-blue-500/45 dark:hover:border-blue-500 transition-all duration-150">
        <Carousel plugins={[Autoplay({ delay: 3000 })]} className="p-2">
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="p-6 flex flex-col justify-center items-center"
              >
                <Card className="w-full rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800/50">
                  <CardHeader className="text-xl font-bold text-center text-gray-800 dark:text-gray-50">
                    {message.title}
                  </CardHeader>
                  <CardContent className="p-6 text-lg font-medium text-gray-700 dark:text-gray-300 text-center">
                    {message.content}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 backdrop-blur-sm" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 backdrop-blur-sm" />
        </Carousel>
      </section>
      <section className="w-full max-w-5xl text-center px-4 py-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800/50 hover:border-t-2 dark:hover:border-t-2 hover:border-blue-500/45 dark:hover:border-blue-500">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-50 mb-8">
          How to Use{" "}
          <span className="bg-gradient-to-r from-[#ff4500] to-[#ff8c00] dark:from-[#ff5e57] dark:to-[#ff7849] text-transparent bg-clip-text">
            Yc Message
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Create an account or log in to get your custom link.",
            "Share your thoughts anonymously and fearlessly with others with their custom link.",
            "Sit back and receive honest feedback from others.",
          ].map((text, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#ff4500] to-[#ff8c00] dark:from-[#ff5e57] dark:to-[#ff7849] flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 transition-transform duration-100 group-hover:scale-110">
                {index + 1}
              </div>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
