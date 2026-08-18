"use client";

import { useImagePreload } from "@/lib/useImagePreload";

export default function FanCard({ gradient, image }: { gradient: string; image?: string }) {
  const loaded = useImagePreload(image);
  const showImage = Boolean(image) && loaded;

  return (
    <div className="h-full w-full overflow-hidden rounded-[9%] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-full w-full object-cover" />
      ) : (
        <>
          <div className={`h-[16%] w-full bg-gradient-to-br ${gradient}`} />
          <div className="space-y-2 p-[8%]">
            {[0, 1, 2, 3].map((r) => (
              <div key={r} className="flex items-center gap-2">
                <span className={`h-4 w-4 shrink-0 rounded-md bg-gradient-to-br ${gradient} opacity-60`} />
                <span className="flex-1 space-y-1">
                  <span className="block h-1.5 w-full max-w-[70%] rounded-full bg-slate-200" />
                  <span className="block h-1.5 w-full max-w-[45%] rounded-full bg-slate-100" />
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
