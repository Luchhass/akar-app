"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const faqItems = [
  {
    id: "01",
    question: "Biz Kimiz?",
    answer:
      "AkAr, otomotiv dünyasının geleneksel üretim sınırlarını 3D yazıcı teknolojileriyle genişletmek amacıyla kurulmuş yenilikçi bir teknoloji ve yedek parça girişimidir. Üç genç girişimci tarafından hayata geçirilen AkAr, parça tedarik süreçlerini hızlandırmak ve üretilemez denilen karmaşık parçaları erişilebilir kılmak için yola çıkmıştır.",
    image: "/images/faq-1.jpg",
  },
  {
    id: "02",
    question: "Neden AkAr?",
    answer:
      "AkAr; stokta bulunmayan veya temini uzun süren parçaları dijital tasarımdan fiziksel ürüne günler içinde dönüştürür. Sadece parça basmakla kalmaz, malzeme ve tasarım optimizasyonu da sağlar. İhtiyaç kadar üretim yaparak israfı azaltır, yerel üretim gücüyle lojistik maliyetlerini ve karbon ayak izini minimize eder.",
    image: "/images/faq-2.jpg",
  },
  {
    id: "03",
    question: "Sipariş ettiğim yedek parça kaç gün içinde teslim edilir?",
    answer:
      "Tasarımı hazır standart parçalar genellikle 2 ila 4 iş günü içinde basılıp kargoya verilir. Numunesi olup dijital dosyası olmayan özel tasarım parçalar için 3D tarama ve modelleme gerektiğinden teslimat süresi 5 ila 7 iş günü arasında değişebilir. Metal baskılar için ise sipariş bazlı özel bilgilendirme yapılır.",
    image: "/images/faq-3.jpg",
  },
  {
    id: "04",
    question: "3D yazıcı ile üretilen parçalar orijinali kadar sağlam mı?",
    answer:
      "AkAr olarak kullandığımız yüksek dayanımlı mühendislik polimerleri ve uygun metal alaşımlar, parçanın görev yaptığı yerdeki mekanik streslere dayanacak şekilde seçilir. Doğru malzeme ve doğru üretim parametreleri ile orijinal parçanın performansına eş değer, hatta bazı durumlarda daha optimize çözümler sunabiliyoruz.",
    image: "/images/faq-4.jpg",
  },
  {
    id: "05",
    question:
      "Elimde parçanın dosyası yok, sadece kırık olan orijinal parça var. Ne yapabilirim?",
    answer:
      "Hiç sorun değil. Tersine mühendislik hizmetimizle kırık veya aşınmış parçanızı 3D tarama ve modelleme süreçleriyle dijital ortama aktarıyor, eksik bölgeleri onarıyor ve yeniden üretime hazır hale getiriyoruz. Parçayı bize ulaştırmanız yeterlidir.",
    image: "/images/faq-5.jpg",
  },
  {
    id: "06",
    question:
      "Artık üretimi olmayan klasik bir aracım var, parçası basılabilir mi?",
    answer:
      "Kesinlikle. AkAr’ın temel amaçlarından biri de bulunamayan parçaları yeniden üretmektir. Klasik veya modifiye araçlar için piyasada bulunmayan plastik trim parçaları, dişliler ve özel bağlantı elemanlarını numune üzerinden birebir üretebiliyoruz.",
    image: "/images/faq-6.jpg",
  },
];

const services = [
  {
    id: "01",
    title: "Hazır Ürün\nSatışı",
    image: "/images/service-1.jpeg",
  },
  {
    id: "02",
    title: "Özel Sipariş\nÜretim",
    image: "/images/service-2.jpeg",
  },
  {
    id: "03",
    title: "3D Modelleme\nve Tasarım",
    image: "/images/service-3.jpeg",
  },
  {
    id: "04",
    title: "Nadir Parça\nÇözümü",
    image: "/images/service-4.jpeg",
  },
];

const features = [
  {
    title: "Uygun maliyetli çözüm",
    description:
      "Piyasada yüksek fiyatlara satılan veya zor bulunan yedek parçalar için daha erişilebilir üretim seçenekleri sunuyoruz.",
  },
  {
    title: "Hızlı ve verimli süreç",
    description:
      "Talep edilen parçayı analiz ediyor, modelleme sürecini tamamlıyor ve mümkün olan en kısa sürede üretime alıyoruz.",
  },
  {
    title: "Özel sipariş desteği",
    description:
      "Hazır stokta olmayan parçalar için referans ürün, ölçü veya görseller üzerinden özel üretim süreci başlatıyoruz.",
  },
  {
    title: "Kaliteli malzeme ve üretim",
    description:
      "Kullanım amacına uygun malzeme seçimiyle, dayanıklılığı yüksek ve işlevsel parçalar üretmeye odaklanıyoruz.",
  },
];

const firstProcessSteps = [
  {
    id: "1",
    title: "Parça Talebini Oluşturun",
    description:
      "İhtiyacınız olan ürünü hazır katalogdan seçin veya özel üretim için bize talep gönderin.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </svg>
    ),
  },
  {
    id: "2",
    title: "Analiz ve Uygunluk Kontrolü",
    description:
      "Parçanın ölçüsü, kullanım alanı, malzeme tipi ve üretim uygunluğu teknik olarak değerlendirilir.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    id: "3",
    title: "Üretim ve Düzenleme",
    description:
      "Onaylanan parça 3D modelleme, tersine mühendislik veya doğrudan baskı süreciyle üretime alınır.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v18" />
        <path d="M8 7h8" />
        <path d="M8 17h8" />
        <path d="M6 10c0-1.1.9-2 2-2M18 10c0-1.1-.9-2-2-2M6 14c0 1.1.9 2 2 2M18 14c0 1.1-.9 2-2 2" />
      </svg>
    ),
  },
];

const secondProcessSteps = [
  {
    id: "4",
    title: "Kalite ve Son Kontrol",
    description:
      "Üretilen parça baskı sonrası kontrol edilir, gerekli temizlik ve son düzenlemeler tamamlanır.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 12 2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: "5",
    title: "Paketleme ve Teslimat",
    description:
      "Parça güvenli şekilde paketlenir ve en kısa sürede adresinize kargolanır ya da teslim süreci başlatılır.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="size-7 md:size-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 7 12 3l9 4-9 4-9-4Z" />
        <path d="M3 7v10l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    ),
  },
];

function SectionDivider() {
  return (
    <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />
  );
}

function ProcessCard({ step, showArrow = false, arrowWidth = "lg:w-30" }) {
  return (
    <div className="relative text-center">
      <div className="relative mx-auto grid size-20 place-items-center rounded-full bg-[#04388d] md:size-24">
        <span className="absolute -top-1 right-0 grid size-7 place-items-center rounded-full bg-white text-[12px] font-semibold text-[#04388d] md:size-8 md:text-[13px]">
          {step.id}
        </span>
        {step.icon}
      </div>

      <h3 className="mx-auto mt-6 max-w-64 text-[22px] font-medium leading-[1.18] text-white md:mt-7 md:text-[26px] lg:text-[28px]">
        {step.title}
      </h3>

      <p className="mx-auto mt-4 max-w-80 text-[13px] leading-[1.8] text-white/40 md:mt-5 md:text-[14px]">
        {step.description}
      </p>

      {showArrow && (
        <div
          className={`absolute left-[calc(100%-10px)] top-10 hidden w-20 -translate-y-1/2 items-center justify-center md:flex ${arrowWidth}`}
        >
          <svg
            viewBox="0 0 120 20"
            className="h-4 w-full text-white/45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 10h108" strokeDasharray="5 5" />
            <path d="m103 4 7 6-7 6" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="bg-[#222222]">
      <section className="min-h-svh overflow-hidden bg-black text-white">
        <div className="relative mx-auto flex min-h-svh w-full items-center">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden h-full w-[54vw] lg:block">
            <Image
              src="/banners/home-banner-01.png"
              alt="Banner car"
              fill
              priority
              className="object-contain object-bottom-right"
            />
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full lg:hidden">
            <Image
              src="/banners/banner-car.png"
              alt="Banner car"
              fill
              priority
              className="object-contain object-bottom-right scale-105 md:scale-115"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/75 to-black/15 md:from-black md:via-black/65 md:to-transparent" />
          </div>

          <div className="z-10 flex w-full items-center justify-between px-5 py-28 md:px-10 md:py-32 lg:px-34">
            <div className="w-full max-w-full lg:max-w-none">
              <p className="hero-tag mb-6 inline-flex bg-[#04388d] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white md:mb-8 md:px-7 md:py-3.5 md:text-[13px] lg:mb-9 lg:px-9 lg:py-4 lg:text-[15px] lg:tracking-[0.24em]">
                AkAr Yedek Parça’ya Hoş Geldiniz
              </p>

              <h1 className="max-w-[92%] text-[32px] font-bold leading-[1.08] tracking-[0.01em] text-white md:max-w-[70%] md:text-[52px] lg:max-w-200 lg:text-[52px] lg:leading-[1.14] lg:tracking-[0.04em]">
                Bulunamayan Parçaları{" "}
                <span className="text-[#04388d]">Yeniden Üretiyoruz</span>
              </h1>

              <p className="mt-6 max-w-full text-[15px] leading-[1.6] tracking-[0.01em] text-white/55 md:mt-7 md:max-w-[62%] md:text-[17px] lg:mt-8 lg:max-w-117.5 lg:text-[18px] lg:leading-[1.35] lg:tracking-[0.03em] lg:text-white/45">
                Nadir, üretimi durmuş veya piyasada yüksek fiyatlara satılan
                yedek parçaları 3D baskı teknolojisiyle sizin için yeniden
                üretiyoruz. İster hazır ürünlerden satın alın, ister özel
                sipariş verin — daha hızlı, daha uygun maliyetle çözüm sunalım.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-[#222222] px-5 py-16 text-white md:px-10 md:py-24 lg:px-34 lg:py-26">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-10">
          <div className="max-w-145">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#04388d] md:text-[14px] lg:text-[15px] lg:tracking-[0.28em]">
              Neler Sunuyoruz
            </p>

            <h2 className="mt-3 text-[34px] font-bold leading-none tracking-[-0.03em] text-white md:text-[48px] lg:text-[56px]">
              AkAr Hizmetleri
            </h2>

            <p className="mt-5 max-w-full text-[14px] leading-[1.8] text-white/45 md:max-w-110 md:text-[15px] lg:text-[16px]">
              Hazır satıştan özel sipariş üretimine kadar, bulunması zor
              otomotiv parçaları için esnek ve hızlı çözümler sunuyoruz.
            </p>
          </div>

          <Link
            href="/category"
            className="inline-flex h-11 items-center rounded-full border border-white/12 px-5 text-[13px] font-medium text-white transition hover:border-[#04388d] hover:bg-[#04388d] md:h-12 md:px-6 md:text-[14px] lg:h-13 lg:px-7"
          >
            Ürünleri İncele
          </Link>
        </div>

        <div className="mt-8 border-t border-white/10 md:mt-10" />

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative h-56 overflow-hidden rounded-[10px] bg-black md:h-64 lg:h-65"
            >
              <Image
                src={service.image}
                alt={service.title.replace("\n", " ")}
                fill
                className="object-cover grayscale"
              />

              <div className="absolute inset-0 bg-black/18" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end gap-2 text-white">
                <span className="text-[11px] font-medium text-white/85 md:text-[12px]">
                  {service.id}
                </span>

                <h3 className="whitespace-pre-line text-[16px] font-medium leading-[1.15] text-white md:text-[17px] lg:text-[18px]">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-245 text-center md:mt-20 lg:mt-28">
          <h2 className="text-[34px] font-bold leading-none tracking-[-0.03em] text-white md:text-[48px] lg:text-[56px]">
            Neden AkAr?
          </h2>

          <p className="mt-4 text-[18px] font-medium text-[#04388d] md:mt-5 md:text-[24px] lg:text-[28px]">
            Bulunamayan parçalar için akıllı üretim çözümü
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-10 md:mt-14 md:grid-cols-2 md:gap-y-12 lg:mt-18 lg:gap-x-20 lg:gap-y-14">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4 md:gap-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#04388d] md:size-11 lg:size-12">
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 text-white md:size-4.5 lg:size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="m9.5 12 1.7 1.7L14.8 10" />
                </svg>
              </div>

              <div>
                <h3 className="max-w-[320px] text-[19px] font-semibold leading-[1.2] text-white md:text-[20px] lg:text-[22px]">
                  {feature.title}
                </h3>

                <p className="mt-3 max-w-107.5 text-[13px] leading-[1.8] text-white/40 md:mt-4 md:text-[14px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="bg-[#292929] px-5 py-16 text-white md:px-10 md:py-24 lg:px-34 lg:py-26">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#04388d] md:text-[14px] lg:text-[15px] lg:tracking-[0.28em]">
              Sıkça Sorulanlar
            </p>

            <h2 className="mt-3 text-[34px] font-bold leading-none tracking-[-0.03em] text-white md:text-[48px] lg:text-[56px]">
              Merak Ettikleriniz
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-12 lg:mt-16 lg:grid-cols-[420px_1fr] lg:items-center lg:gap-12">
            <div className="relative order-2 h-64 overflow-hidden rounded-[10px] bg-black md:h-96 lg:order-1 lg:h-105">
              <Image
                src={faqItems[openFaq].image}
                alt={faqItems[openFaq].question}
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/18" />
            </div>

            <div className="order-1 lg:order-2">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={item.id} className="border-b border-white/15">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(index)}
                      className="flex w-full items-start justify-between gap-4 py-5 text-left md:gap-6 md:py-6"
                    >
                      <div>
                        <h3 className="text-[18px] font-medium leading-[1.35] text-white md:text-[20px] lg:text-[22px]">
                          {item.question}
                        </h3>

                        {isOpen && (
                          <p className="mt-3 max-w-190 text-[13px] leading-[1.85] text-white/45 md:mt-4 md:text-[14px] md:leading-[1.9]">
                            {item.answer}
                          </p>
                        )}
                      </div>

                      <span className="mt-1 shrink-0 text-[22px] leading-none text-[#04388d] md:text-[24px]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-[#222222] px-5 py-16 text-white md:px-10 md:py-24 lg:px-34 lg:py-26">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#04388d] md:text-[14px] lg:text-[15px] lg:tracking-[0.28em]">
              Nasıl Çalışıyoruz
            </p>

            <h2 className="mt-3 text-[34px] font-bold leading-none tracking-[-0.03em] text-white md:text-[48px] lg:text-[56px]">
              AkAr Süreç Yönetimi
            </h2>
          </div>

          <div className="mt-10 md:mt-12 lg:mt-16">
            <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
              {firstProcessSteps.map((step, index) => (
                <ProcessCard
                  key={step.id}
                  step={step}
                  showArrow={index !== 2}
                  arrowWidth="lg:w-30"
                />
              ))}
            </div>

            <div className="mx-auto mt-12 grid max-w-215 grid-cols-1 gap-y-12 md:mt-14 md:grid-cols-2 md:gap-x-20 md:gap-y-16 lg:mt-18 lg:gap-x-24">
              {secondProcessSteps.map((step, index) => (
                <ProcessCard
                  key={step.id}
                  step={step}
                  showArrow={index === 0}
                  arrowWidth="w-25"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />
    </main>
  );
}