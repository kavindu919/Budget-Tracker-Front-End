"use client";
import { useState, useEffect } from "react";

const page = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 12);
    targetDate.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-8 inline-block text-sm tracking-[0.3em] text-black/70 uppercase">
          we're launching soon
        </span>

        <h1 className="mb-6 text-6xl font-bold tracking-tight text-black md:text-8xl">
          Almost There
        </h1>

        <p className="mx-auto mb-16 max-w-2xl text-xl text-black/60 md:text-2xl">
          Something special is cooking. We'll be ready in just a few days.
        </p>

        <div className="mx-auto mb-16 grid max-w-2xl grid-cols-4 gap-4 md:gap-8">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black md:text-6xl">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="mt-2 text-sm tracking-wider text-black/50 uppercase">
              Days
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black md:text-6xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="mt-2 text-sm tracking-wider text-black/50 uppercase">
              Hours
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black md:text-6xl">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="mt-2 text-sm tracking-wider text-black/50 uppercase">
              Minutes
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-black md:text-6xl">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="mt-2 text-sm tracking-wider text-black/50 uppercase">
              Seconds
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
