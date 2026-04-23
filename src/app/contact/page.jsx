"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    title: "",
    description: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    title: "",
    message: "",
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setFileName(file ? file.name : "");
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: "",
      title: "",
      message: "",
    });
  };

  useEffect(() => {
    if (!modalState.isOpen) return;

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      closeModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [modalState.isOpen]);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      brand: "",
      model: "",
      year: "",
      title: "",
      description: "",
      image: null,
    });

    setFileName("");
    setFileInputKey((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("brand", formData.brand);
      submitData.append("model", formData.model);
      submitData.append("year", formData.year);
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        setModalState({
          isOpen: true,
          type: "success",
          title: "Talebiniz Gönderildi",
          message:
            "Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.",
        });

        resetForm();
      } else {
        setModalState({
          isOpen: true,
          type: "error",
          title: "Gönderim Başarısız",
          message:
            result.message || "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
        });
      }
    } catch (error) {
      setModalState({
        isOpen: true,
        type: "error",
        title: "Bir Hata Oluştu",
        message: "Mesaj gönderilirken beklenmeyen bir hata oluştu.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#222222] text-white">
      <section className="relative h-[44svh] min-h-90 overflow-hidden bg-black md:h-[46svh] md:min-h-105 lg:h-[50vh] lg:min-h-105">
        <Image
          src="/banners/contact-banner-03.png"
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
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-[17px] font-semibold text-[#232323] lg:text-[18px]">
                  İletişim Bilgileri
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ad"
                    required
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Soyad"
                    required
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta Adresi"
                    required
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefon Numarası"
                    required
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-[17px] font-semibold text-[#232323] lg:text-[18px]">
                  Talep Detayı
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Araç Markası"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />

                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Araç Modeli"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />

                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Araç Yılı"
                    className="h-11 rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35 md:col-span-2 lg:col-span-1"
                  />
                </div>

                <div className="mt-4">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Başlık"
                    required
                    className="h-11 w-full rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] outline-none placeholder:text-black/35"
                  />
                </div>

                <div className="mt-4">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Detaylı açıklama"
                    required
                    className="min-h-32 w-full resize-none rounded-[10px] border border-black/18 bg-transparent px-4 py-3 text-[13px] leading-[1.7] text-[#232323] outline-none placeholder:text-black/35 lg:min-h-34"
                  />
                </div>

                <div className="mt-4">
                  <input
                    key={fileInputKey}
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-11 w-[50%] items-center justify-between rounded-[10px] border border-black/18 bg-transparent px-4 text-[13px] text-[#232323] transition hover:border-black/28"
                  >
                    <span
                      className={fileName ? "text-[#232323]" : "text-black/35"}
                    >
                      {fileName ? fileName : "Resim Ekleyin"}
                    </span>

                    <span className="text-[#04388d] font-medium">Seç</span>
                  </button>

                  <p className="mt-3 text-[13px] text-black/35">
                    JPG, PNG veya WEBP formatında görsel ekleyebilirsiniz.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-11 items-center rounded-full bg-[#04388d] px-7 text-[12px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 lg:h-10.5"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Talep Gönder ↗"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {modalState.isOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/55 px-5 backdrop-blur-[2px]">
          <div className="relative w-full max-w-105 overflow-hidden rounded-[20px] bg-white text-[#232323] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            <div className="px-7 pb-7 pt-8 text-center">
              <div
                className={`mx-auto flex size-16 items-center justify-center rounded-full ${
                  modalState.type === "success" ? "bg-[#04388d]" : "bg-red-500"
                }`}
              >
                {modalState.type === "success" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>

              <h3 className="mt-5 text-[28px] font-bold leading-none tracking-[-0.03em] text-[#232323]">
                {modalState.title}
              </h3>

              <p className="mx-auto mt-4 max-w-75 text-[14px] leading-[1.8] text-black/50">
                {modalState.message}
              </p>
            </div>

            <div className="h-1.25 w-full bg-black/8">
              <div
                className={`h-full ${
                  modalState.type === "success" ? "bg-[#04388d]" : "bg-red-500"
                } animate-[shrink_5s_linear_forwards]`}
              />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </main>
  );
}
