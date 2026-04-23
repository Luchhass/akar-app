import Image from "next/image";

export default function ContactPage() {
  const requestTypes = [
    "Hazır Ürün Talebi",
    "Özel Sipariş Talebi",
    "3D Modelleme Desteği",
  ];

  const vehicleTypes = ["Binek Araç", "Ticari Araç", "Klasik Araç"];

  const supportTopics = [
    "Nadir Parça Üretimi",
    "Tersine Mühendislik",
    "Ölçü / Numune İncelemesi",
    "Malzeme Seçimi",
    "Fiyat Teklifi",
    "Diğer",
  ];

  return (
    <main className="bg-[#222222] text-white">
      <section className="relative min-h-90 overflow-hidden bg-black h-[44svh] md:min-h-105 md:h-[46svh] lg:min-h-105 lg:h-[50vh]">
        <Image
          src="/banners/contact-banner.png"
          alt="AkAr contact banner"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/30 to-black/55" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center md:px-10 lg:px-34">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#04388d] md:text-[13px] lg:text-[15px] lg:tracking-[0.28em]">
            İletişim
          </p>

          <h1 className="mt-4 max-w-[92%] text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-white md:max-w-[80%] md:text-[52px] lg:max-w-220 lg:text-[64px]">
            Parça Talebi ve
            <span className="text-[#04388d]"> İletişim Formu</span>
          </h1>

          <p className="mt-5 max-w-full text-[14px] leading-[1.8] text-white/70 md:max-w-[72%] md:text-[15px] lg:max-w-150 lg:text-[16px]">
            Hazır ürün, özel sipariş, tersine mühendislik ve bulunamayan parça
            talepleriniz için bizimle iletişime geçin.
          </p>

          <p className="mt-7 text-[12px] text-white/75 md:mt-8 md:text-[13px]">
            Ana Sayfa / <span className="text-white">İletişim</span>
          </p>
        </div>
      </section>

      <div className="h-px w-full bg-linear-to-r from-transparent via-[#04388d] to-transparent md:h-1" />

      <section className="px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-22 lg:px-34 lg:pb-24 lg:pt-26">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#04388d] md:text-[13px] lg:text-[15px] lg:tracking-[0.28em]">
              İletişime Geçin
            </p>

            <h2 className="mt-3 text-[34px] font-bold leading-none tracking-[-0.03em] text-white md:text-[48px] lg:text-[56px]">
              Parça Talep Formu
            </h2>

            <p className="mx-auto mt-5 max-w-full text-[14px] leading-[1.8] text-white/35 md:max-w-[82%] lg:max-w-190">
              Hazır ürün, özel sipariş veya üretimi bulunmayan parçalar için
              detayları bize iletin. Ekibimiz talebinizi inceleyip sizinle en
              kısa sürede iletişime geçsin.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-285 rounded-xl bg-[#efefed] px-5 py-6 text-[#232323] shadow-[0_12px_40px_rgba(0,0,0,0.18)] md:mt-12 md:px-10 md:py-10 lg:mt-16 lg:px-14 lg:py-12">
            <form className="space-y-8">
              <div>
                <h3 className="text-[17px] font-semibold text-[#232323] lg:text-[18px]">
                  İletişim Bilgileri
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon Numarası"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />
                  <input
                    type="email"
                    placeholder="E-posta Adresi"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35 md:col-span-2 lg:col-span-1"
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <input
                    type="text"
                    placeholder="Araç Markası"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />
                  <input
                    type="text"
                    placeholder="Araç Modeli"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />
                  <input
                    type="text"
                    placeholder="Araç Yılı"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35 md:col-span-2 lg:col-span-1"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[17px] font-semibold text-[#232323] lg:text-[18px]">
                  Talep Detayı
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <select className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none">
                    <option value="">Talep Türü</option>
                    {requestTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none">
                    <option value="">Araç Tipi</option>
                    {vehicleTypes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Parça Adı / Parça Kodu"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35 md:col-span-2 lg:col-span-1"
                  />
                </div>

                <div className="mt-4">
                  <textarea
                    placeholder="İhtiyacınız olan parçayı, kullanım alanını veya yaşadığınız sorunu kısaca açıklayın..."
                    className="min-h-32 w-full resize-none rounded-[10px] border border-black/18 bg-transparent px-4 py-3 text-[13px] leading-[1.7] text-[#232323] outline-none placeholder:text-black/35 lg:min-h-34"
                  />
                </div>
              </div>

              <div>
                <p className="text-[13px] text-black/45">
                  İlgilendiğiniz hizmet başlıkları
                </p>

                <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                  {supportTopics.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 text-[13px] text-black/55"
                    >
                      <input
                        type="checkbox"
                        className="size-3 rounded-xs border border-black/25 accent-[#04388d]"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-full bg-[#04388d] px-7 text-[12px] font-medium text-white transition hover:opacity-90 lg:h-10.5"
                >
                  Talep Gönder ↗
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}