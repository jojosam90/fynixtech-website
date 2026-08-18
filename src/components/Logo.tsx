"use client";

import { useImagePreload } from "@/lib/useImagePreload";

const LOGO_IMAGE = "/logo.png";
const LOGO_IMAGE_LIGHT = "/logo-white.png";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden="true">
      <polygon points="50,4 96,50 50,50" fill="#4A8FE0" />
      <polygon points="50,4 4,50 50,50" fill="#F5A623" />
      <polygon points="4,50 50,96 50,50" fill="#B9A0E8" />
      <polygon points="96,50 50,96 50,50" fill="#6B4FCF" />
    </svg>
  );
}

export default function Logo({
  markClassName = "h-9 w-9",
  textClassName = "text-xl",
  imgClassName = "h-9 w-auto",
  light = false,
}: {
  markClassName?: string;
  textClassName?: string;
  imgClassName?: string;
  light?: boolean;
}) {
  const loaded = useImagePreload(LOGO_IMAGE);
  const loadedLight = useImagePreload(LOGO_IMAGE_LIGHT);

  // The dark-text logo is only legible on light backgrounds; the white
  // logo is only legible on dark backgrounds. Fall back to the adaptive
  // SVG mark + text when the matching variant hasn't been uploaded.
  if (loaded && !light) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={LOGO_IMAGE} alt="Fynix Tech Pte Ltd" className={imgClassName} />;
  }
  if (loadedLight && light) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={LOGO_IMAGE_LIGHT} alt="Fynix Tech Pte Ltd" className={imgClassName} />;
  }

  return (
    <span className="flex items-center gap-2">
      <LogoMark className={markClassName} />
      <span className={`font-extrabold tracking-tight ${light ? "text-white" : "text-[#1a1a2e]"} ${textClassName}`}>
        Fynix Tech Pte Ltd
      </span>
    </span>
  );
}
