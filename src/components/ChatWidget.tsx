"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { LogoMark } from "./Logo";
import { useImagePreload } from "@/lib/useImagePreload";
import { IconClose } from "./icons";

const AVATAR_LOGO = "/logo-white.png";

const AUTO_OPEN_DELAY_MS = 5 * 60 * 1000;

const botMessages: { en: string; zh: string }[] = [
  {
    en: "Hi, welcome to Fynix Tech Pte Ltd! Custom app development for every industry — 1-on-1 consulting, fast turnaround, full source code included. Share your Name, Phone, and Project Requirements and we'll send you a free solution and quote!",
    zh: "您好，欢迎来到Fynix Tech Pte Ltd！全行业APP开发定制，1对1需求沟通，快速上线，源码交付。发送您的【姓名】【电话】【开发需求】即可免费获取解决方案和报价！",
  },
  {
    en: "We've already delivered many successful projects across finance, retail, healthcare, and education.",
    zh: "我们已在金融、零售、医疗、教育等多个行业成功交付了众多项目。",
  },
  {
    en: "Hi there — what type of software are you looking to build?",
    zh: "您好，请问您想开发什么类型的软件？",
  },
];

function AvatarBadge({ className = "h-7 w-7 p-1" }: { className?: string }) {
  const loaded = useImagePreload(AVATAR_LOGO);
  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ${className}`}>
      {loaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={AVATAR_LOGO} alt="" className="h-full w-full object-contain" />
      ) : (
        <LogoMark className="h-full w-full" />
      )}
    </span>
  );
}

function ChatBubbleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <path d="M4 5h16v10H8l-4 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ChatWidget() {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [requested, setRequested] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const openRef = useRef(open);
  const audioCtxRef = useRef<AudioContext | null>(null);
  openRef.current = open;

  const closeChat = () => {
    setOpen(false);
    setRequested(false);
    setSendError(false);
    setPhone("");
  };

  // Browsers block audio until the user has interacted with the page at
  // least once, so lazily create/unlock the AudioContext on first interaction.
  useEffect(() => {
    const unlock = () => {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (Ctx) audioCtxRef.current = new Ctx();
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  const playPopSound = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(1180, now + 0.12);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!openRef.current) {
        setOpen(true);
        playPopSound();
      }
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 left-4 z-[300] mx-auto flex h-[min(600px,78dvh)] w-auto max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:right-6 md:left-auto md:w-[400px]">
          {/* header */}
          <div className="flex items-center justify-between bg-brand-blue px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <AvatarBadge className="h-8 w-8 p-1.5" />
              <span className="text-sm font-semibold">Fynix Tech Pte Ltd</span>
            </div>
            <button
              aria-label="close chat"
              onClick={closeChat}
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/15"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-surface-alt p-4">
            {botMessages.map((msg, i) => (
              <div key={i} className="flex items-start gap-2">
                <AvatarBadge />
                <p className="rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm leading-relaxed text-text-body shadow-sm">
                  {msg[lang]}
                </p>
              </div>
            ))}

            {requested && (
              <div className="flex items-start gap-2">
                <AvatarBadge />
                <p className="rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm leading-relaxed text-text-body shadow-sm">
                  {t({
                    en: "Thanks! We've noted your number and will call you back shortly.",
                    zh: "好的，已收到您的号码，我们会尽快回电给您。",
                  })}
                </p>
              </div>
            )}
            {sendError && (
              <div className="flex items-start gap-2">
                <AvatarBadge />
                <p className="rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm leading-relaxed text-red-600 shadow-sm">
                  {t({
                    en: "Sorry, something went wrong. Please try again.",
                    zh: "抱歉，提交失败，请稍后重试。",
                  })}
                </p>
              </div>
            )}
          </div>

          {/* input row */}
          <form
            className="flex flex-col gap-2 border-t border-line p-3 sm:flex-row sm:items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!phone.trim()) return;
              setSending(true);
              setSendError(false);
              try {
                const res = await fetch("/api/callback.php", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ phone: `+65 ${phone.trim()}` }),
                });
                if (!res.ok) throw new Error("send failed");
                setRequested(true);
                setPhone("");
              } catch {
                setSendError(true);
              } finally {
                setSending(false);
              }
            }}
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t({ en: "Enter your phone number", zh: "请输入手机号码" })}
              className="min-w-0 flex-1 rounded-full bg-surface-soft px-3.5 py-2.5 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <button
              type="submit"
              disabled={sending}
              className="shrink-0 whitespace-nowrap rounded-full bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? t({ en: "Sending...", zh: "发送中..." }) : t({ en: "Request Callback", zh: "给您回电" })}
            </button>
          </form>
        </div>
      )}

      <button
        aria-label={t({ en: "Open chat", zh: "打开聊天" })}
        onClick={() => (open ? closeChat() : setOpen(true))}
        className="fixed bottom-6 right-4 z-[300] flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-[0_10px_24px_rgba(1,70,173,0.4)] transition-transform hover:scale-105 md:right-6"
      >
        {open ? <IconClose className="h-6 w-6" /> : <ChatBubbleIcon className="h-6 w-6" />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-brand-yellow" />
        )}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-brand-yellow" />
        )}
      </button>
    </>
  );
}
