"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Pastikan mengimpor Image

export default function Home() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-01-08T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Kegiatan telah dimulai!");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days} hari ${hours} jam ${minutes} menit ${seconds} detik`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-green-700 p-8">
      <header className="flex items-center justify-between px-8 py-4 bg-transparent fixed top-0 w-full">
        <div className="flex items-center gap-4">
          <Image
            src="/kkn.png" // Pastikan path gambar benar
            alt="Logo KKN"
            width={40}
            height={40}
            priority
            className="rounded-full"
          />
          <h2 className="text-white">Suka Suka Danaraja</h2>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen pt-20 p-8">
        <h1 className="text-4xl font-bold text-white mb-4">KKN DESA DANARAJA 2025</h1>
        <div className="text-2xl text-white mb-4">{countdown}</div>
        <p className="text-lg text-white">Tanggal Mulai: 8 Januari 2025</p>
      </div>
    </div>
  );
}
