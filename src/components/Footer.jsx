import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/category" },
  { label: "İletişim", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto w-full max-w-400 px-5 py-12 md:px-10 md:py-16 lg:px-34 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-[1.35fr_0.85fr_0.85fr_1.15fr] lg:gap-10">
          <div>
            <Link
              href="/"
              className="inline-flex flex-wrap items-center text-2xl font-bold leading-none tracking-[-0.03em] md:text-[28px] lg:text-[34px]"
              aria-label="AkAr Yedek Parça ana sayfa"
            >
              <span className="text-white">A</span>
              <span className="text-[#04388d]">Kar</span>
              <span className="ml-2 text-white">Yedek Parça</span>
            </Link>

            <p className="mt-6 max-w-105 text-sm leading-7 text-white/40 md:text-[15px]">
              Bulunması zor, üretimi durmuş veya yüksek fiyatlı otomotiv
              parçalarını daha hızlı ve daha ulaşılabilir şekilde yeniden
              üretiyoruz.
            </p>

            <div className="mt-7 space-y-4 md:mt-8">
              <div className="flex items-start gap-3 text-sm leading-7 text-white/45">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#04388d]" />
                <span>İstanbul, Türkiye</span>
              </div>

              <div className="flex items-start gap-3 text-sm leading-7 text-white/45">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#04388d]" />
                <span>+90 552 512 40 02</span>
              </div>

              <div className="flex items-start gap-3 break-all text-sm leading-7 text-white/45">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#04388d]" />
                <span>info@akaryedekparca.com</span>
              </div>

              <div className="flex items-start gap-3 break-all text-sm leading-7 text-white/45">
                <Globe className="mt-0.5 size-4 shrink-0 text-[#04388d]" />
                <span>https://akar-app.vercel.app</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white md:text-[19px]">
              Çalışma Saatleri
            </h3>

            <div className="mt-6 space-y-4 text-sm text-white/45 md:mt-8">
              <p>Pzt - Cum: 08.00 - 20.00</p>
              <p>Cmt - Paz: 10.00 - 16.00</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white md:text-[19px]">
              Hızlı Linkler
            </h3>

            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 text-sm md:mt-8 md:grid-cols-2 lg:grid-cols-1 lg:gap-y-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white/45 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white md:text-[19px]">
              Bültenimize Abone Olun
            </h3>

            <p className="mt-5 max-w-80 text-sm leading-7 text-white/45 md:mt-6">
              Kampanyalar, yeni ürünler ve özel duyurular için e-posta
              listemize katılın.
            </p>

            <form className="mt-6 md:mt-7">
              <input
                type="email"
                placeholder="Email Address"
                className="h-12 w-full rounded-xl border border-white/20 bg-transparent px-5 text-sm text-white outline-none placeholder:text-white/30 lg:max-w-80"
              />

              <button
                type="submit"
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-[#04388d] px-6 text-[13px] font-medium text-white transition hover:opacity-90"
              >
                Submit
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 md:mt-14 lg:mt-16" />

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center md:flex-row md:text-left">
          <p className="text-[13px] leading-7 text-white/35">
            Copyright © 2024 AkAr Yedek Parça. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-[13px] text-white/35">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}