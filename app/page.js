'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-32 lg:py-28"> {/* Increased padding */}
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          {/* You can add gradients back if needed */}
        </div>
        {/* End Gradients */}
        <div className="relative z-10">
          <div className="container py-16 lg:py-24"> {/* Increased padding */}
            <div className="max-w-2xl text-center mx-auto">
              <p className="text-lg lg:text-xl"> {/* Larger font size for the subtitle */}
				  {t("elevate")}
              </p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-5xl lg:text-6xl font-extrabold tracking-tight"> {/* Increased font size */}
                  {t("support")}
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-2xl lg:text-3xl text-sky-500"> {/* Increased font size */}
                  {t("customizable")}
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-12 gap-4 flex justify-center"> {/* Increased margin and gap */}
                <Button className="text-white bg-sky-900/15 px-8 py-4 text-lg lg:text-xl" size={"lg"} asChild>
                  <Link href="/login">{t("getstarted")}</Link>
                </Button>
              </div>
              {/* End Buttons */}
              <div className="mt-24 flex justify-center"> {/* Increased margin */}
                <Image
                  src="/images/robot.png"
                  alt="Robot"
                  width={1200} /* Increased image size */
                  height={1200} /* Increased image size */
                />
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* End Hero */}
    </>
  );
}
