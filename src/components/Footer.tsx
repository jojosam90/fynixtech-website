"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { brand, footerContact, type Bi } from "@/lib/content";
import Logo from "./Logo";
import { IconPhone, IconMail, IconLocationPin, IconGoogle, IconFacebook, IconInstagram, IconLinkedin, IconGithub } from "./icons";

const socialLinks = [
  { name: "Google", href: "https://google.com", icon: IconGoogle, className: "bg-white border border-line" },
  { name: "Facebook", href: "https://facebook.com", icon: IconFacebook, className: "bg-[#1877F2] text-white" },
  { name: "Instagram", href: "https://instagram.com", icon: IconInstagram, className: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5] text-white" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: IconLinkedin, className: "bg-[#0A66C2] text-white" },
  { name: "GitHub", href: "https://github.com", icon: IconGithub, className: "bg-[#181717] text-white" },
];

const inquiryOptions: { value: string; label: Bi }[] = [
  { value: "consultation", label: { en: "One-on-one consultation", zh: "一对一咨询" } },
  { value: "quote", label: { en: "Get a quote", zh: "获取报价" } },
  { value: "demo", label: { en: "Request a demo", zh: "预约演示" } },
  { value: "other", label: { en: "Others, please specify", zh: "其他，请说明" } },
];

export default function Footer() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [inquiryType, setInquiryType] = useState(inquiryOptions[0].value);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherDetail, setOtherDetail] = useState("");

  return (
    <footer id="contact" className="-mt-px flex min-h-screen flex-col bg-white text-text-body">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pt-20 pb-14 md:px-12 md:pt-28 md:pb-20">
        <div className="flex flex-1 flex-col justify-center">
        <h2 className="text-center text-xl font-bold text-text-dark md:text-3xl">
          {t({ en: "Contact Us", zh: "联系我们" })}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-[1fr_1.1fr] md:items-start">
          {/* Brand + contact */}
          <div className="-ml-4 md:ml-0">
            <Logo markClassName="h-8 w-8 md:h-9 md:w-9" textClassName="text-lg md:text-xl" imgClassName="h-11 md:h-14 w-auto" />
            <p className="mt-4 max-w-xs text-lg font-semibold leading-relaxed md:ml-4">
              {t({
                en: "A software and hardware development partner for government, enterprise, and individual clients.",
                zh: "为政府、企业、个人提供软硬件一站式应用解决方案的开发服务商。",
              })}
            </p>
            <ul className="mt-6 space-y-4 md:ml-4">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light">
                  <IconLocationPin className="h-5 w-5 text-brand-blue" />
                </span>
                <span>
                  <span className="block text-base font-extrabold text-brand-blue">
                    {t({ en: "Location", zh: "公司地址" })}
                  </span>
                  <span className="mt-0.5 block text-base font-medium text-text-body">{t(footerContact.address)}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light">
                  <IconMail className="h-5 w-5 text-brand-blue" />
                </span>
                <span>
                  <span className="block text-base font-extrabold text-brand-blue">
                    {t({ en: "Email", zh: "邮箱" })}
                  </span>
                  <span className="mt-0.5 block text-base font-medium text-text-body">{footerContact.email}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-light">
                  <IconPhone className="h-5 w-5 text-brand-blue" />
                </span>
                <span>
                  <span className="block text-base font-extrabold text-brand-blue">
                    {t({ en: "Phone Number", zh: "联系电话" })}
                  </span>
                  <span className="mt-0.5 block text-base font-medium text-text-body">{footerContact.phone}</span>
                </span>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3 md:ml-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105 ${social.className}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Consultation form */}
          <div className="rounded-2xl bg-white p-6 text-text-dark shadow-[0_16px_40px_rgba(0,0,0,0.25)] md:-ml-8 md:p-8">
            <h3 className="text-xl font-bold text-text-dark md:text-2xl">
              {t({ en: "Schedule a Free Consultation", zh: "预约免费咨询" })}
            </h3>
            <div className="mt-4 h-px bg-line" />

            {submitted ? (
              <p className="mt-6 rounded-lg bg-brand-blue-light px-4 py-4 text-sm font-medium text-brand-blue">
                {t({
                  en: "Thanks! We've received your request and will be in touch shortly.",
                  zh: "感谢您的提交，我们会尽快与您联系。",
                })}
              </p>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  setSendError(false);
                  const service =
                    inquiryType === "other"
                      ? `${t(inquiryOptions.find((o) => o.value === "other")!.label)}: ${otherDetail}`
                      : t(inquiryOptions.find((o) => o.value === inquiryType)!.label);
                  try {
                    const res = await fetch("/api/contact.php", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name,
                        company,
                        email,
                        phone: `+65 ${phone}`,
                        service,
                      }),
                    });
                    if (!res.ok) throw new Error("send failed");
                    setSubmitted(true);
                  } catch {
                    setSendError(true);
                  } finally {
                    setSending(false);
                  }
                }}
              >
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t({ en: "Name", zh: "姓名" })}
                  className="w-full rounded-lg bg-surface-soft px-4 py-3 text-base text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t({ en: "Company", zh: "公司名称" })}
                  className="w-full rounded-lg bg-surface-soft px-4 py-3 text-base text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t({ en: "Email", zh: "邮箱" })}
                  className="w-full rounded-lg bg-surface-soft px-4 py-3 text-base text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
                <div className="flex w-full items-center rounded-lg bg-surface-soft focus-within:ring-2 focus-within:ring-brand-blue">
                  <span className="border-r border-line py-3 pl-4 pr-3 text-base text-text-dark">+65</span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t({ en: "Phone Number", zh: "电话号码" })}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-text-dark placeholder:text-text-muted focus:outline-none"
                  />
                </div>
                <label className="block text-base font-medium text-text-dark">
                  {t({ en: "Service：", zh: "服务：" })}
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full rounded-lg bg-surface-soft px-4 py-3 text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  {inquiryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {t(opt.label)}
                    </option>
                  ))}
                </select>
                {inquiryType === "other" && (
                  <input
                    required
                    type="text"
                    value={otherDetail}
                    onChange={(e) => setOtherDetail(e.target.value)}
                    placeholder={t({ en: "Please specify", zh: "请说明" })}
                    className="w-full rounded-lg bg-surface-soft px-4 py-3 text-base text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                )}
                {sendError && (
                  <p className="text-sm font-medium text-red-600">
                    {t({
                      en: "Something went wrong sending your request. Please try again.",
                      zh: "提交失败，请稍后重试。",
                    })}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-lg bg-brand-blue px-8 py-3 text-base font-bold text-white transition-colors hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? t({ en: "Sending...", zh: "发送中..." }) : t({ en: "Send", zh: "发送" })}
                </button>
              </form>
            )}
          </div>
        </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 text-center text-sm md:text-left">
          <p>
            © {new Date().getFullYear()} {t(brand)} Pte Ltd. {t({ en: "All rights reserved.", zh: "保留所有权利。" })}
          </p>
        </div>
      </div>
    </footer>
  );
}
