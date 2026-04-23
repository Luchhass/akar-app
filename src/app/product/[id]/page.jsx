"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
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

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const { addToCart } = useCart();

  const product = useMemo(() => {
    return products.find((item) => item.id.toString() === id);
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#292929] px-5 text-white md:px-10 lg:px-34">
        <p>Ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#222222] text-white">
      <section className="relative mt-24 overflow-hidden bg-black px-5 pb-10 pt-8 md:mt-28 md:px-10 md:pb-12 md:pt-10 lg:mt-32 lg:px-34">
        <div className="flex max-w-400 flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mt-2 text-[28px] font-bold leading-none tracking-[-0.03em] text-white md:mt-4 md:text-[32px] lg:text-[34px]">
              {product.name}
            </h1>

            <p className="mt-3 text-sm leading-7 text-white/40 md:text-[15px]">
              {formatBrandLabel(product.brand)} {product.model} için özel üretim
              parçayı inceleyin.
            </p>
          </div>

          <Link
            href={`/category/${product.brand}`}
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
        <div className="mx-auto max-w-400">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="space-y-5 md:space-y-6">
              <div className="group relative aspect-16/11 overflow-hidden rounded-xl bg-[#262626] md:aspect-16/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                <div className="absolute left-4 top-4 rounded-md bg-[#04388d] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white md:left-6 md:top-6">
                  Premium Parça
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    id: "01",
                    label: "Mükemmel Uyum",
                    desc: "Araca özel 3D tarama ile milimetrik hassasiyet.",
                  },
                  {
                    id: "02",
                    label: "Yüksek Dayanım",
                    desc: "Otomotiv standartlarında endüstriyel malzeme.",
                  },
                ].map((feat) => (
                  <div
                    key={feat.id}
                    className="rounded-xl border-b-2 border-transparent bg-[#292929] p-5 transition-all hover:border-[#04388d] md:p-6"
                  >
                    <span className="text-[13px] font-bold text-[#04388d] opacity-50 md:text-sm">
                      {feat.id}
                    </span>

                    <h4 className="mt-2 text-[15px] font-bold text-white md:text-base">
                      {feat.label}
                    </h4>

                    <p className="mt-2 text-[13px] leading-6 text-white/40">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-xl bg-[#292929] p-5 md:p-6 lg:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30 md:text-[13px]">
                    Ürün Detayı
                  </span>

                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-bold text-[#04388d] md:text-sm">
                      {product.rating}
                    </span>

                    <span className="text-[11px] text-white/20 md:text-xs">
                      / 5.0
                    </span>
                  </div>
                </div>

                <h2 className="mt-4 text-[26px] font-bold leading-tight tracking-tight text-white md:text-[30px] lg:text-[32px]">
                  {product.name}
                </h2>

                <div className="mt-7 md:mt-8">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/30 md:text-xs">
                    Başlangıç Fiyatı
                  </span>

                  <div className="mt-1 flex items-end gap-1">
                    <span className="text-[34px] font-black text-[#04388d] md:text-[38px] lg:text-[42px]">
                      ₺{product.price}
                    </span>

                    <span className="pb-1 text-[13px] text-white/20 md:text-sm">
                      / Adet
                    </span>
                  </div>
                </div>

                <div className="mt-7 space-y-4 md:mt-8">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="h-14 w-full rounded-xl bg-[#04388d] text-[13px] font-black uppercase tracking-[0.15em] text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40 md:h-15 md:text-sm lg:h-16"
                  >
                    Sepete Ekle
                  </button>

                  <div className="flex items-center justify-center gap-2 text-center text-[11px] font-medium text-white/30 md:text-xs">
                    <div
                      className={`size-2 rounded-full ${
                        product.stock > 0
                          ? "bg-[#04388d]"
                          : "animate-pulse bg-red-500"
                      }`}
                    />

                    {product.stock > 0
                      ? `Şu an stokta ${product.stock} adet var`
                      : "Üretim Bekleniyor"}
                  </div>
                </div>

                <div className="mt-8 space-y-4 border-t border-white/5 pt-7 md:mt-10 md:pt-8">
                  {[
                    { label: "Model", value: product.model },
                    {
                      label: "Kategori",
                      value: formatCategoryLabel(product.category),
                    },
                    { label: "Malzeme", value: "3D Industrial Resin" },
                    { label: "Renk", value: "Siyah (Standart)" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 text-[13px] md:text-sm"
                    >
                      <span className="text-white/40">{item.label}</span>

                      <span className="text-right font-bold text-white/90">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />
    </main>
  );
}