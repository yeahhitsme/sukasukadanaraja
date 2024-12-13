"use client";

import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Home() {
  const [countdown, setCountdown] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Leaflet Map Initialization
  useEffect(() => {
    const map = L.map("map").setView([-7.447615887782863, 109.53521562369454], 16); // Set center to Desa Danaraja

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define the polygon coordinates surrounding Desa Danaraja
    const polygonCoords = [
      [-7.450, 109.530],
      [-7.450, 109.540],
      [-7.445, 109.540],
      [-7.445, 109.530],
      [-7.450, 109.530],
    ];

    // Add polygon boundary
    const polygon = L.polygon(polygonCoords, {
      color: "blue",
      weight: 2,
      fillColor: "lightblue",
      fillOpacity: 0.4,
    }).addTo(map);

    // Custom Bootstrap Blue Marker
    const blueIcon = L.divIcon({
      className: "custom-icon",
      html: '<i class="fas fa-map-marker-alt text-primary" style="font-size: 2rem; color: blue;"></i>',
      iconSize: [24, 24],
      iconAnchor: [12, 24], // Center the icon
    });

    // Add marker for Desa Danaraja
    L.marker([-7.447615887782863, 109.53521562369454], { icon: blueIcon })
      .addTo(map)
      .bindPopup("Desa Danaraja");

    return () => {
      map.remove(); // Cleanup map on component unmount
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-black to-green-700 p-8">
      <header
        className={`flex items-center justify-between px-8 py-4 bg-transparent fixed top-0 w-full z-10 transition-all duration-300 ${isScrolled ? "backdrop-blur-md bg-opacity-50" : ""}`}
      >
        <div className="flex items-center gap-4">
          <Image
            src="/kkn.png"
            alt="Logo KKN"
            width={40}
            height={40}
            priority
            className="rounded-full"
          />
          <h2 className="text-white">Suka-suka Danaraja</h2>
        </div>
        <nav className="flex space-x-8">
          <div className="group relative">
            <button className="text-white px-4 py-2">Profil</button>
            <div className="absolute hidden bg-gradient-to-b from-black to-green-700 text-white text-sm shadow-md border-2 border-white rounded-md top-10 left-0 w-48 group-hover:block">
              <ul className="p-2">
                <li><a href="#" className="block px-4 py-2">Struktur KKN</a></li>
                <li><a href="#" className="block px-4 py-2">Proker</a></li>
              </ul>
            </div>
          </div>

          <div className="group relative">
            <button className="text-white px-4 py-2">Desa</button>
            <div className="absolute hidden bg-gradient-to-b from-black to-green-700 text-white text-sm shadow-md border-2 border-white rounded-md top-10 left-0 w-48 group-hover:block">
              <ul className="p-2">
                <li><a href="#" className="block px-4 py-2">Profil Desa</a></li>
                <li><a href="#" className="block px-4 py-2">Lokasi Desa</a></li>
                <li><a href="#" className="block px-4 py-2">UMKM</a></li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <button className="text-white px-4 py-2">Dokumentasi</button>
          </div>

          <div className="relative">
            <button className="text-white px-4 py-2">Contact</button>
          </div>
        </nav>
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen pt-20 p-8">
        <h1 className="text-4xl font-bold text-white mb-4">KKN DESA DANARAJA 2025</h1>
        <div className="text-2xl text-white mb-4">{countdown}</div>
        <p className="text-lg text-white">Tanggal Mulai: 8 Januari 2025</p>
      </div>

      <div className="flex flex-col items-center justify-start p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Logo Release</h2>
        <div className="w-full flex justify-center">
          <Image
            src="/kkn.png" 
            alt="Lokasi Desa Danaraja"
            width={600}
            height={400}
            className="rounded-full" 
          />
        </div>
        <p className="text-lg mt-4 text-center">
          Gambar di atas merupakan logo resmi KKN Unsoed Desa Danaraja 2025.
        </p>
      </div>

      <div className="flex flex-col items-center justify-start p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Filosofi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Left side (4 items) */}
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Matahari Kuning Bersinar</h3>
            <p className="text-lg text-center">Melambangkan semangat dan harapan untuk masa depan yang cerah. Kehadiran matahari menggambarkan awal baru dan energi positif yang dibawa oleh mahasiswa KKN untuk desa.</p>
          </div>
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Sungai Biru</h3>
            <p className="text-lg text-center">Menggambarkan Sungai Serayu sebagai elemen penting bagi kehidupan masyarakat Desa Danaraja, baik dalam mendukung pertanian maupun sumber daya air. Warna biru melambangkan kedamaian, kesegaran, dan keberlanjutan.</p>
          </div>
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Hamparan Sawah Hijau</h3>
            <p className="text-lg text-center">Melambangkan potensi utama desa di bidang pertanian, dengan lahan yang subur dan produktif. Warna hijau mencerminkan kesuburan, harmoni dengan alam, dan keberlanjutan.</p>
          </div>
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Garis Cokelat (Tanah)</h3>
            <p className="text-lg text-center">Simbol koneksi kuat antara masyarakat desa dengan tanah sebagai sumber kehidupan. Melambangkan stabilitas dan kearifan lokal.</p>
          </div>

          {/* Right side (3 items) */}
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Lingkaran Hijau dan Rangkaian Daun</h3>
            <p className="text-lg text-center">Lingkaran melambangkan kesatuan, keberlanjutan, dan harmoni antara mahasiswa KKN dan masyarakat. Rangkaian daun menambahkan elemen alam, melambangkan pertumbuhan, kesejahteraan, dan pelestarian lingkungan.</p>
          </div>
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Tulisan 'DANARAJA'</h3>
            <p className="text-lg text-center">Identitas desa yang menjadi lokasi KKN, ditempatkan di tengah untuk menonjolkan nama desa sebagai fokus utama.</p>
          </div>
          <div className="flex flex-col items-center border border-white p-4 bg-transparent">
            <h3 className="text-xl font-bold mb-2 text-center">Komposisi Elegan dan Seimbang</h3>
            <p className="text-lg text-center">Perpaduan elemen pertanian dan alam dirancang dengan harmoni untuk merepresentasikan potensi dan keindahan Desa Danaraja.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start p-8 text-white w-full">
        <h2 className="text-3xl font-bold mb-4">Lokasi KKN</h2>
        <div id="map" className="w-full h-96 rounded-md shadow-md"></div>
      </div>

      <div className="text-white py-8">
  <div className="container mx-auto px-8">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Kolom 1 */}
      <div>
        <img
          src="/kkn.png" // Ganti dengan logo universitas
          alt="Logo Universitas"
          className=" rounded-full w-16 mb-4"
        />
        <p>KKN Periode Januari-Februari 2025</p>
        <p>Desa Danaraja, Kecamatan Purwanegara</p>
        <p>Kabupaten Banjarnegara, Jawa Tengah</p>
        <p>Indonesia, 53472</p>
      </div>

      {/* Kolom 2 */}
      <div>
        <h3 className="font-bold mb-4">Profil</h3>
        <ul>
          <li>Struktur KKN</li>
          <li>Proker</li>
        </ul>
      </div>

      {/* Kolom 3 */}
      <div>
        <h3 className="font-bold mb-4">Desa</h3>
        <ul>
          <li>Profil Desa</li>
          <li>Lokasi Desa</li>
          <li>UMKM</li>
        </ul>
      </div>

      {/* Kolom 4 */}
      <div>
        <h3 className="font-bold mb-4">Lainnya</h3>
        <ul>
          <li>Dokumentasi</li>
        </ul>
      </div>

      {/* Kolom 5 */}
      <div>
        <h3 className="font-bold mb-4">Kontak Kami</h3>
        <ul>
          <li className="flex items-center gap-2">
            <i className="fab fa-instagram text-pink-500"></i>
            <a href="https://instagram.com/kkndanaraja2025" target="_blank" className="hover:underline">
              @kkndanaraja2025
            </a>
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-phone-alt text-green-500"></i>
            <a href="https://wa.me/6285742934636" target="blank" className="hove:underline">
              +62 857-4293-4636
            </a>
          </li>
          <li className="flex items-center gap-2">
            <i className="fas fa-envelope text-red-500"></i>
            <a href="mailto:abdulfahmi598@gmail.com" className="hover:underline">
              abdulfahmi598
            </a>
          </li>
        </ul>
      </div>
    </div>

          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p>© 2024 Petir Bercerita. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
