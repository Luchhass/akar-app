"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } =
    useCart();

  return (
    <main className="bg-[#222222] text-white">
      <section className="relative mt-24 overflow-hidden bg-black px-5 pb-10 pt-8 md:mt-28 md:px-10 md:pb-12 md:pt-10 lg:mt-32 lg:px-34">
        <div className="flex max-w-400 flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="mt-2 text-[28px] font-bold leading-none tracking-[-0.03em] text-white md:mt-4 md:text-[32px] lg:text-[34px]">
              Sepetim
            </h1>

            <p className="mt-3 text-[14px] leading-[1.8] text-white/40">
              Toplam {cartCount} Ürün
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] text-white/55 transition hover:text-[#04388d]"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            ALIŞVERİŞE DEVAM ET
          </Link>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />

      <section className="px-5 py-12 md:px-10 md:py-16 lg:px-34 lg:py-20">
        {cart.length === 0 ? (
          <div className="rounded-3xl bg-[#292929] px-6 py-24 text-center md:px-8 md:py-28 lg:py-32">
            <p className="text-[18px] font-medium text-white/20 md:text-[20px]">
              Sepetiniz şu an boş görünüyor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div className="space-y-5 md:space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-[20px] bg-[#292929] p-4 transition-all hover:bg-[#262626] md:p-5 lg:p-6"
                >
                  <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:items-center lg:gap-8">
                    <div className="relative h-52 w-full overflow-hidden rounded-xl bg-black/40 md:h-64 lg:size-36 lg:shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 pr-2">
                          <h3 className="text-[18px] font-bold leading-[1.15] tracking-tight text-white md:text-[20px]">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#04388d] md:text-[12px]">
                            {item.brand} {" // "} {item.model}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-1 shrink-0 text-white/20 transition-colors hover:text-red-500"
                          aria-label={`${item.name} ürününü sepetten kaldır`}
                        >
                          <svg
                            className="size-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-6 flex flex-col gap-5 md:mt-7 md:flex-row md:items-end md:justify-between">
                        <div className="inline-flex w-fit items-center overflow-hidden rounded-lg border border-white/5 bg-black/40">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="grid h-12 w-12 place-items-center text-[22px] font-medium text-white transition-colors hover:bg-[#04388d]"
                            aria-label="Adeti azalt"
                          >
                            -
                          </button>

                          <span className="grid h-12 min-w-12 place-items-center px-2 text-[18px] font-bold text-white">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="grid h-12 w-12 place-items-center text-[22px] font-medium text-white transition-colors hover:bg-[#04388d]"
                            aria-label="Adeti artır"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-[20px] font-black leading-none text-white md:text-[22px]">
                            ₺{item.price * item.quantity}
                          </p>

                          <p className="mt-2 text-[12px] leading-none text-white/20">
                            Birim: ₺{item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit space-y-6 lg:sticky lg:top-40">
              <div className="relative overflow-hidden rounded-3xl bg-[#04388d] p-6 md:p-8 lg:p-10">
                <div className="pointer-events-none absolute -right-2 -top-3 select-none text-[72px] font-black leading-none text-black/10 md:-right-4 md:-top-4 md:text-[100px]">
                  CART
                </div>

                <h2 className="relative z-10 text-[22px] font-black uppercase tracking-tight md:text-[24px]">
                  Ödeme Özeti
                </h2>

                <div className="relative z-10 mt-8 space-y-5 border-b border-white/10 pb-8 md:mt-10 md:pb-10">
                  <div className="flex justify-between gap-4 text-[14px] font-medium md:text-[15px]">
                    <span className="text-white/60">Ara Toplam</span>
                    <span>₺{cartTotal}</span>
                  </div>

                  <div className="flex justify-between gap-4 text-[14px] font-medium md:text-[15px]">
                    <span className="text-white/60">KDV (%20)</span>
                    <span>Dahil</span>
                  </div>

                  <div className="flex justify-between gap-4 text-[14px] font-medium md:text-[15px]">
                    <span className="text-white/60">Gönderim</span>
                    <span className="rounded bg-black/20 px-2 py-1 text-[11px] font-bold tracking-widest text-white">
                      ÜCRETSİZ
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-8 flex items-end justify-between gap-4 md:mt-10">
                  <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/60 md:text-[14px]">
                    Net Toplam
                  </span>

                  <span className="text-[34px] font-black leading-none md:text-[42px]">
                    ₺{cartTotal}
                  </span>
                </div>

                <button className="mt-8 h-14 w-full rounded-xl bg-white text-[13px] font-black uppercase tracking-widest text-[#04388d] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] md:mt-10 md:h-16 md:text-[14px] lg:mt-12 lg:h-18 lg:text-[15px]">
                  SİPARİŞİ TAMAMLA
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />
    </main>
  );
}