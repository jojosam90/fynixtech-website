"use client";

import { IPhoneX } from "react-device-frames";
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
    <div className={`aspect-[1305/2598] ${className}`}>
      <IPhoneX screenshot={screenshot} />
    </div>
  );
}
