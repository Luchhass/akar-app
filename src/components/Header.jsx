"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import products from "@/data/products.json";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  const brands = useMemo(() => {
    return [...new Set(products.map((item) => item.brand))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "tr"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeAllMenus = () => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCategoryOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const formatBrandLabel = (brand) => {
    if (brand === "bmw") return "BMW";
    if (brand === "audi") return "Audi";
    if (brand === "porsche") return "Porsche";
    if (brand === "volkswagen") return "Volkswagen";
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };

  const isCategoryActive = pathname.startsWith("/category");
  const isDesktopCategoryOpen = isCategoryOpen && !isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#1a1a1a]/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 md:px-10 md:py-7 lg:px-34 lg:py-12">
          <Link
            href="/"
            className="flex shrink-0 items-center text-base font-bold tracking-[0.08em] text-white md:text-lg lg:text-[20px]"
            aria-label="AkAr Yedek Parça ana sayfa"
            onClick={closeAllMenus}
          >
            <span className="text-white">A</span>
            <span className="text-[#04388d]">Kar</span>
            <span className="ml-2 text-white">Yedek Parça</span>
          </Link>

          <div className="flex items-center gap-3 md:gap-4 lg:gap-12">
            <nav className="hidden items-center gap-8 lg:flex">
              <Link
                href="/"
                onClick={closeAllMenus}
                className={`flex items-center text-sm tracking-[0.08em] transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-[#04388d]"
                    : "text-white hover:text-[#04388d]"
                }`}
              >
                Ana Sayfa
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <Link
                  href="/category"
                  onClick={closeAllMenus}
                  className={`flex items-center gap-2 text-sm tracking-[0.08em] transition-colors duration-200 ${
                    isCategoryActive
                      ? "text-[#04388d]"
                      : "text-white hover:text-[#04388d]"
                  }`}
                >
                  Kategoriler
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-4 transition-transform duration-200 ${
                      isDesktopCategoryOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>

                <div
                  className={`absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-black/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-200 ${
                    isDesktopCategoryOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {brands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/category/${brand}`}
                        onClick={closeAllMenus}
                        className="rounded-lg px-4 py-3 text-sm text-white/85 transition hover:bg-white/5 hover:text-[#04388d]"
                      >
                        {formatBrandLabel(brand)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                onClick={closeAllMenus}
                className={`flex items-center text-sm tracking-[0.08em] transition-colors duration-200 ${
                  pathname === "/contact"
                    ? "text-[#04388d]"
                    : "text-white hover:text-[#04388d]"
                }`}
              >
                İletişim
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              <Link
                href="/cart"
                onClick={closeAllMenus}
                className="relative grid size-9 place-items-center text-white transition hover:text-[#04388d] md:size-10"
                aria-label={`Sepetim, ${cartCount} ürün`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[#04388d] px-1 text-[9px] font-black leading-4 text-white shadow-sm ring-1 ring-black/20">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="grid size-9 place-items-center text-white transition hover:text-[#04388d] md:size-10 lg:hidden"
                aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {isMobileMenuOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="M6 6l12 12" />
                    </>
                  ) : (
                    <>
                      <path d="M3 6h18" />
                      <path d="M3 12h18" />
                      <path d="M3 18h18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Menüyü kapat"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeAllMenus}
        />

        <div
          className={`absolute right-0 top-0 flex h-svh w-full max-w-105 flex-col border-l border-white/10 bg-[#111111] px-5 pb-8 pt-24 shadow-2xl transition-transform duration-300 md:px-10 md:pt-28 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col">
            <Link
              href="/"
              onClick={closeAllMenus}
              className={`border-b border-white/10 py-5 text-[15px] tracking-[0.08em] transition-colors ${
                pathname === "/"
                  ? "text-[#04388d]"
                  : "text-white hover:text-[#04388d]"
              }`}
            >
              Ana Sayfa
            </Link>

            <div className="border-b border-white/10">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/category"
                  onClick={closeAllMenus}
                  className={`py-5 text-[15px] tracking-[0.08em] transition-colors ${
                    isCategoryActive
                      ? "text-[#04388d]"
                      : "text-white hover:text-[#04388d]"
                  }`}
                >
                  Kategoriler
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileCategoryOpen((prev) => !prev)}
                  className="grid size-10 place-items-center text-white/80 transition hover:text-[#04388d]"
                  aria-label="Kategori listesini aç veya kapat"
                  aria-expanded={isMobileCategoryOpen}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-5 transition-transform duration-200 ${
                      isMobileCategoryOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>

              <div
                className={`grid transition-all duration-300 ${
                  isMobileCategoryOpen
                    ? "grid-rows-[1fr] pb-4 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-1 rounded-xl bg-white/5 p-2">
                    {brands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/category/${brand}`}
                        onClick={closeAllMenus}
                        className="rounded-lg px-4 py-3 text-sm text-white/85 transition hover:bg-white/5 hover:text-[#04388d]"
                      >
                        {formatBrandLabel(brand)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={closeAllMenus}
              className={`border-b border-white/10 py-5 text-[15px] tracking-[0.08em] transition-colors ${
                pathname === "/contact"
                  ? "text-[#04388d]"
                  : "text-white hover:text-[#04388d]"
              }`}
            >
              İletişim
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}