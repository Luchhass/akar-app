"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import products from "@/data/products.json";
import { useCart } from "@/context/CartContext";

const formatBrandLabel = (brand) => {
  if (brand === "bmw") return "BMW";
  if (brand === "audi") return "Audi";
  if (brand === "porsche") return "Porsche";
  if (brand === "volkswagen") return "Volkswagen";
  return brand?.charAt(0).toUpperCase() + brand?.slice(1);
};

const formatCategoryLabel = (category) => {
  const map = {
    "exterior-trim": "Dış Trim",
    "interior-controls": "İç Kontroller",
    "interior-trim": "İç Trim",
    "interior-parts": "İç Parçalar",
    "interior-accessories": "İç Aksesuarlar",
    "mounting-clips": "Montaj Klipsleri",
    "mounting-parts": "Montaj Parçaları",
  };

  return map[category] || category;
};

export default function BrandCategoryPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const brand = params?.brand?.toString().toLowerCase() || "";

  const brandProducts = useMemo(() => {
    return products.filter((item) => item.brand === brand);
  }, [brand]);

  const categories = useMemo(() => {
    return [...new Set(brandProducts.map((item) => item.category))];
  }, [brandProducts]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isStockDropdownOpen, setIsStockDropdownOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = [...brandProducts];

    if (search.trim()) {
      const q = search.toLowerCase();

      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.model.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (stockFilter === "in-stock") {
      list = list.filter((item) => item.stock > 0);
    }

    if (stockFilter === "low-stock") {
      list = list.filter((item) => item.stock > 0 && item.stock <= 20);
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating-desc") list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "stock-desc") list.sort((a, b) => b.stock - a.stock);

    return list;
  }, [brandProducts, search, selectedCategory, stockFilter, sortBy]);

  const selectedCategoryLabel =
    selectedCategory === "all"
      ? "Tüm Ürünler"
      : formatCategoryLabel(selectedCategory);

  const selectedStockLabel =
    stockFilter === "all"
      ? "Tümü"
      : stockFilter === "in-stock"
        ? "Stokta Olanlar"
        : "Kritik Stok (0-20)";

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setIsCategoryDropdownOpen(false);
  };

  const handleStockSelect = (value) => {
    setStockFilter(value);
    setIsStockDropdownOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#222222] text-white">
      <section className="relative mt-24 overflow-hidden bg-black px-5 pb-10 pt-8 md:mt-28 md:px-10 md:pb-12 md:pt-10 lg:mt-32 lg:px-34">
        <div className="flex max-w-400 flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mt-2 text-[28px] font-bold leading-none tracking-[-0.03em] text-white md:mt-4 md:text-[32px] lg:text-[34px]">
              {formatBrandLabel(brand)} Ürünleri
            </h1>

            <p className="mt-3 text-[14px] leading-[1.8] text-white/40">
              {formatBrandLabel(brand)} markasına ait uygun parçaları inceleyin.
            </p>
          </div>

          <Link
            href="/category"
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] text-white/55 transition hover:text-[#04388d]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            KATEGORİLERE DÖN
          </Link>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />

      <section className="px-5 py-12 md:px-10 md:py-16 lg:px-34 lg:py-20">
        <div className="mx-auto grid max-w-400 grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
          <div className="order-2 lg:order-1">
            <div className="mb-6 flex flex-col gap-4 text-[13px] md:flex-row md:flex-wrap md:items-center md:justify-between">
              <div className="group flex items-center gap-2 transition-opacity hover:opacity-80">
                <span className="text-[12px] font-medium uppercase tracking-wide text-white/50 md:text-[13px]">
                  Sırala:
                </span>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer appearance-none bg-transparent py-1 pr-6 text-[13px] font-semibold text-white/60 outline-none md:text-[14px]"
                  >
                    <option className="bg-[#1a1a1a]" value="featured">
                      Önerilen
                    </option>
                    <option className="bg-[#1a1a1a]" value="price-asc">
                      Fiyat: Artan
                    </option>
                    <option className="bg-[#1a1a1a]" value="price-desc">
                      Fiyat: Azalan
                    </option>
                    <option className="bg-[#1a1a1a]" value="rating-desc">
                      Puan: Yüksek
                    </option>
                    <option className="bg-[#1a1a1a]" value="stock-desc">
                      Stok: Yüksek
                    </option>
                  </select>

                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      className="text-white/40"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-5 text-white/55">
                <span>{filteredProducts.length} ürün gösteriliyor</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-[10px] bg-[#f2f2f0] text-[#202020] transition-transform duration-300 hover:-translate-y-1"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative h-60 w-full overflow-hidden rounded-t-[10px] md:h-67">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover grayscale transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="absolute left-1/2 top-[13.7rem] z-20 -translate-x-1/2 rounded-md bg-[#04388d] px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 md:top-62 md:px-6 md:text-[11px]"
                  >
                    Sepete Ekle
                  </button>

                  <Link
                    href={`/product/${product.id}`}
                    className="block p-5 md:p-6"
                  >
                    <div className="flex items-center justify-between gap-3 text-[11px] text-black/40 md:text-[12px]">
                      <span>{product.model}</span>
                      <span>{product.rating} ★</span>
                    </div>

                    <h2 className="mt-4 max-w-90 text-[17px] font-semibold leading-tight text-[#202020] md:text-[18px]">
                      {product.name}
                    </h2>

                    <p className="mt-4 text-[12px] leading-[1.8] text-black/40 md:text-[13px]">
                      {formatBrandLabel(product.brand)} /{" "}
                      {formatCategoryLabel(product.category)}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                      <span className="text-[20px] font-bold leading-none text-[#202020] md:text-[22px]">
                        ₺{product.price}
                      </span>

                      <span className="text-[11px] text-black/45 md:text-[12px]">
                        Stok ({product.stock})
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-[10px] border border-white/10 bg-[#262626] px-6 py-12 text-center md:px-8 md:py-14">
                <h3 className="text-[22px] font-semibold text-white md:text-[24px]">
                  Sonuç bulunamadı
                </h3>

                <p className="mt-4 text-[14px] leading-[1.8] text-white/45">
                  Filtreleri değiştirerek tekrar deneyin.
                </p>
              </div>
            )}
          </div>

          <aside className="order-1 space-y-4 lg:order-2 lg:space-y-5">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ürün Ara..."
                className="h-13 w-full rounded-[10px] border border-white/10 bg-transparent pl-5 pr-12 text-[13px] text-white outline-none placeholder:text-white/30 md:h-15"
              />

              <svg
                viewBox="0 0 24 24"
                className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>

            <div className="space-y-4 lg:hidden">
              <div className="overflow-hidden rounded-[10px] bg-[#262626]">
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoryDropdownOpen((prev) => !prev)
                  }
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.14em] text-white/35">
                      Kategoriler
                    </p>

                    <p className="mt-1 text-[13px] font-semibold text-white">
                      {selectedCategoryLabel}
                    </p>
                  </div>

                  <svg
                    viewBox="0 0 24 24"
                    className={`size-5 text-white/55 transition-transform duration-200 ${
                      isCategoryDropdownOpen ? "rotate-180" : ""
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

                <div
                  className={`grid transition-all duration-300 ${
                    isCategoryDropdownOpen
                      ? "grid-rows-[1fr] border-t border-white/8"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-1 p-3">
                      <button
                        onClick={() => handleCategorySelect("all")}
                        className={`rounded-lg px-3 py-3 text-left text-[13px] transition ${
                          selectedCategory === "all"
                            ? "bg-white/5 font-bold text-[#04388d]"
                            : "text-white/45 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        Tüm Ürünler
                      </button>

                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`rounded-lg px-3 py-3 text-left text-[13px] transition ${
                            selectedCategory === category
                              ? "bg-white/5 font-bold text-[#04388d]"
                              : "text-white/45 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {formatCategoryLabel(category)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[10px] bg-[#262626]">
                <button
                  type="button"
                  onClick={() => setIsStockDropdownOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.14em] text-white/35">
                      Stok Durumu
                    </p>

                    <p className="mt-1 text-[13px] font-semibold text-white">
                      {selectedStockLabel}
                    </p>
                  </div>

                  <svg
                    viewBox="0 0 24 24"
                    className={`size-5 text-white/55 transition-transform duration-200 ${
                      isStockDropdownOpen ? "rotate-180" : ""
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

                <div
                  className={`grid transition-all duration-300 ${
                    isStockDropdownOpen
                      ? "grid-rows-[1fr] border-t border-white/8"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-1 p-3">
                      <button
                        onClick={() => handleStockSelect("all")}
                        className={`rounded-lg px-3 py-3 text-left text-[13px] transition ${
                          stockFilter === "all"
                            ? "bg-white/5 font-bold text-[#04388d]"
                            : "text-white/45 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        Tümü
                      </button>

                      <button
                        onClick={() => handleStockSelect("in-stock")}
                        className={`rounded-lg px-3 py-3 text-left text-[13px] transition ${
                          stockFilter === "in-stock"
                            ? "bg-white/5 font-bold text-[#04388d]"
                            : "text-white/45 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        Stokta Olanlar
                      </button>

                      <button
                        onClick={() => handleStockSelect("low-stock")}
                        className={`rounded-lg px-3 py-3 text-left text-[13px] transition ${
                          stockFilter === "low-stock"
                            ? "bg-white/5 font-bold text-[#04388d]"
                            : "text-white/45 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        Kritik Stok (0-20)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden rounded-[10px] bg-[#262626] p-6 lg:block">
              <h3 className="text-[18px] font-semibold text-white">
                Kategoriler
              </h3>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-left text-[13px] transition ${
                    selectedCategory === "all"
                      ? "font-bold text-[#04388d]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Tüm Ürünler
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left text-[13px] transition ${
                      selectedCategory === category
                        ? "font-bold text-[#04388d]"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    {formatCategoryLabel(category)}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden rounded-[10px] bg-[#262626] p-6 lg:block">
              <h3 className="text-[18px] font-semibold text-white">
                Stok Durumu
              </h3>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => setStockFilter("all")}
                  className={`text-left text-[13px] transition ${
                    stockFilter === "all"
                      ? "font-bold text-[#04388d]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Tümü
                </button>

                <button
                  onClick={() => setStockFilter("in-stock")}
                  className={`text-left text-[13px] transition ${
                    stockFilter === "in-stock"
                      ? "font-bold text-[#04388d]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Stokta Olanlar
                </button>

                <button
                  onClick={() => setStockFilter("low-stock")}
                  className={`text-left text-[13px] transition ${
                    stockFilter === "low-stock"
                      ? "font-bold text-[#04388d]"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  Kritik Stok (0-20)
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />
    </main>
  );
}