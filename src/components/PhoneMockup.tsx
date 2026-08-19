"use client";

import { useImagePreload } from "@/lib/useImagePreload";
import { buildPlaceholderScreenshot } from "@/lib/placeholderScreenshot";

export default function PhoneMockup({
  image,
  gradientFrom,
  gradientTo,
  className = "",
}: {
  image?: string;
  gradientFrom: string;
  gradientTo: string;
  className?: string;
}) {
  const loaded = useImagePreload(image);
  const screenshot = image && loaded ? image : buildPlaceholderScreenshot(gradientFrom, gradientTo);

  return (
    <div
      className={`relative aspect-[1305/2598] rounded-[15%] bg-[#111214] p-[3%] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12%] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={screenshot} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute left-1/2 top-[3.6%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-[#111214]" />
    </div>
  );
}
