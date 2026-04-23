import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";

const brandMeta = {
  bmw: {
    title: "BMW",
    description:
      "İç trim, kontrol düğmeleri, kapaklar ve özel parça çözümleri.",
  },
  audi: {
    title: "Audi",
    description: "İç mekan parçaları, montaj elemanları ve detay bileşenler.",
  },
  porsche: {
    title: "Porsche",
    description:
      "Premium iç trim, özel bağlantı parçaları ve nadir bileşenler.",
  },
  volkswagen: {
    title: "Volkswagen",
    description: "Günlük kullanım parçaları, klipsler ve işlevsel iç parçalar.",
  },
};

export default function CategoryPage() {
  const uniqueBrands = [...new Set(products.map((item) => item.brand))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "tr"));

  const brandCards = uniqueBrands.map((brand) => {
    const brandProducts = products.filter((item) => item.brand === brand);
    const meta = brandMeta[brand];

    return {
      brand,
      brand_logo: brandProducts[0]?.brand_logo,
      title: meta?.title || brand.toUpperCase(),
      description:
        meta?.description || "Uygun yedek parça seçeneklerini inceleyin.",
    };
  });

  return (
    <main className="min-h-screen bg-[#222222] text-white">
      <section className="relative min-h-90 overflow-hidden bg-black h-[44svh] md:min-h-105 md:h-[46svh] lg:min-h-105 lg:h-[50vh]">
        <Image
          src="/banners/category-banner.png"
          alt="AkAr category banner"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/30 to-black/55" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center md:px-10 lg:px-34">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#04388d] md:text-[13px] lg:text-[15px] lg:tracking-[0.28em]">
            Kategoriler
          </p>

          <h1 className="mt-4 max-w-[92%] text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-white md:max-w-[80%] md:text-[52px] lg:text-[64px]">
            Markaya Göre
            <span className="text-[#04388d]"> Parça Kategorileri</span>
          </h1>

          <p className="mt-5 max-w-full text-[14px] leading-[1.8] text-white/70 md:max-w-[72%] md:text-[15px] lg:max-w-150 lg:text-[16px]">
            AkAr’da yer alan markaları inceleyin, ihtiyacınız olan araç grubuna
            girin ve ilgili parçaları marka bazlı keşfedin.
          </p>

          <p className="mt-7 text-[12px] text-white/75 md:mt-8 md:text-[13px]">
            Ana Sayfa / <span className="text-white">Kategoriler</span>
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />

      <section className="px-5 py-12 md:px-10 md:py-16 lg:px-34 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
            {brandCards.map((item) => (
              <Link
                key={item.brand}
                href={`/category/${item.brand}`}
                className="group relative flex min-h-70 flex-col items-center justify-center overflow-hidden rounded-xl bg-[#292929] px-6 py-8 text-center transition-all duration-300 hover:bg-[#282828] md:min-h-75 md:px-7 md:py-9 lg:min-h-80 lg:p-8"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center p-2 md:h-22 md:w-22 lg:h-24 lg:w-24">
                  {item.brand_logo ? (
                    <Image
                      src={item.brand_logo}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain transition-all duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-4xl font-bold text-[#04388d] opacity-50">
                      {item.brand[0].toUpperCase()}
                    </div>
                  )}
                </div>

                <h3 className="mb-3 text-[24px] font-bold text-white md:text-[26px]">
                  {item.title}
                </h3>

                <p className="max-w-65 text-[13px] leading-[1.8] text-gray-400 opacity-80 md:text-[14px]">
                  {item.description}
                </p>

                <div className="absolute bottom-0 left-0 h-1.5 w-full overflow-hidden rounded-b-xl">
                  <div className="origin-center h-full w-full scale-x-0 bg-[#04388d] transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />
    </main>
  );
}