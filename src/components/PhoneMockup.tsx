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
      {/* key forces a full remount on every screenshot change instead of an
          in-place href update — WebKit/Safari doesn't reliably repaint an
          SVG pattern when the <image> it references changes href dynamically,
          so a full remount sidesteps that browser bug entirely. */}
      <IPhoneX key={screenshot} screenshot={screenshot} />
    </div>
  );
}
