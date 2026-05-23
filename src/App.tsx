import { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, MapPin, Clock, BookOpen, 
  Gamepad2, Users, FileText, Mail, 
  Phone, ArrowUpRight, ChevronRight, Search 
} from 'lucide-react';

// --- IMPORT LOGO ---
import mainLogo from './assets/logo/MAIN LOGO SAWALALEMBUR.png';
import secondaryLogo from './assets/logo/SAWALA LEMBUR SECONDARY LOGO.png';
import mainLogoWhite from './assets/logo/SAWALA LEMBUR MAIN LOGO WHITE.png';

// --- IMPORT FOTO FOTO ---
import img1 from './assets/galeri/1.jpeg';
import img2 from './assets/galeri/2.jpeg';
import img3 from './assets/galeri/3.jpeg';
import img4 from './assets/galeri/4.jpeg';
import img5 from './assets/galeri/5.jpeg';
import abah from './assets/pembicara/abah.png';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdVC8c85AkOGqqfP2FJnlen1fjkDgBlFtMJrRW57jbh1Ez6BA/viewform";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  
  // State untuk melacak foto aktif di Lightbox Galeri
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Array mapping data foto galeri
  const galeriImages = [
    { src: img1, title: "" },
    { src: img2, title: "" },
    { src: img3, title: "" },
    { src: img4, title: "" },
    { src: img5, title: "" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- EFFECT: FREEZE SCROLL SAAT FOTO FULLSCREEN OPEN ---
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImg]);

  const scrollToSection = (id: string): void => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sawala-bg text-sawala-text font-sans antialiased selection:bg-sawala-light/30 selection:text-sawala-dark">
      
      {/* --- LIGHTBOX MODAL (FULLSCREEN PREVIEW) --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-fadeIn"
          onClick={() => setSelectedImg(null)}
        >
          {/* Backdrop Overlay dengan Blur Tinggi */}
          <div className="absolute inset-0 bg-sawala-dark/70 backdrop-blur-xl transition-all duration-300" />
          
          {/* Tombol Close Silang */}
          <button 
            className="absolute top-6 right-6 text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-all z-10 shadow-lg"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Wrapper Gambar Interaktif */}
          <div className="relative max-w-5xl w-full max-h-full flex items-center justify-center overflow-hidden">
            <img 
              src={selectedImg} 
              alt="Pratinjau Foto Fullscreen" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10 animate-scaleIn"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-sawala-bg/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Brand Utama di Navbar */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img 
              src={secondaryLogo} 
              alt="Sawala Lembur" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-semibold">
            <button onClick={() => scrollToSection('about')} className="text-sawala-dark/80 hover:text-sawala-primary transition-colors text-sm">Tentang</button>
            <button onClick={() => scrollToSection('details')} className="text-sawala-dark/80 hover:text-sawala-primary transition-colors text-sm">Jadwal</button>
            <button onClick={() => scrollToSection('programs')} className="text-sawala-dark/80 hover:text-sawala-primary transition-colors text-sm">Program</button>
            <button onClick={() => scrollToSection('press')} className="text-sawala-dark/80 hover:text-sawala-primary transition-colors text-sm">Rilis Pers</button>
            <button onClick={() => scrollToSection('gallery')} className="text-sawala-dark/80 hover:text-sawala-primary transition-colors text-sm">Galeri</button>
            <button onClick={() => scrollToSection('contact')} className="text-sawala-dark/80 hover:text-sawala-primary transition-colors text-sm">Kontak</button>
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sawala-dark text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-sawala-primary hover:shadow-lg transition-all flex items-center gap-1 group"
            >
              Daftar Sekarang
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <button className="md:hidden text-sawala-dark p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-sawala-bg border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4 animate-fadeIn">
            <button onClick={() => scrollToSection('about')} className="text-left font-semibold py-2 border-b border-gray-50 text-sm">Tentang</button>
            <button onClick={() => scrollToSection('details')} className="text-left font-semibold py-2 border-b border-gray-50 text-sm">Jadwal</button>
            <button onClick={() => scrollToSection('programs')} className="text-left font-semibold py-2 border-b border-gray-50 text-sm">Program</button>
            <button onClick={() => scrollToSection('press')} className="text-left font-semibold py-2 border-b border-gray-50 text-sm">Rilis Pers</button>
            <button onClick={() => scrollToSection('gallery')} className="text-left font-semibold py-2 border-b border-gray-50 text-sm">Galeri</button>
            <button onClick={() => scrollToSection('contact')} className="text-left font-semibold py-2 border-b border-gray-50 text-sm">Kontak</button>
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sawala-dark text-white py-3 rounded-xl font-bold text-center hover:bg-sawala-primary transition-colors flex items-center justify-center gap-2 text-sm"
            >
              Daftar Sekarang <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-sawala-light/10 via-sawala-bg to-sawala-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1b4322 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-sawala-primary/10 border border-sawala-primary/20 text-sawala-dark px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-sawala-light animate-pulse"></span>
              Kenali Alam & Siagakan Diri
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-sawala-dark tracking-tight leading-[1.15]">
              Sawala <span className="text-sawala-primary underline decoration-sawala-light decoration-wavy decoration-2">Lembur</span>
            </h1>
            <p className="text-lg text-sawala-muted max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Membangun ruang kolaborasi inklusif untuk peningkatan literasi mitigasi kebencanaan melalui rajutan kearifan lokal demi keselamatan masa depan masyarakat pesisir.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sawala-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-sawala-dark/10 hover:bg-sawala-primary hover:shadow-xl hover:shadow-sawala-primary/20 transition-all text-center flex items-center justify-center gap-2 group text-base"
              >
                Daftar Sekarang 
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <button 
                onClick={() => scrollToSection('about')}
                className="bg-white text-sawala-dark border-2 border-gray-200/80 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-sawala-primary/30 transition-all text-center text-base"
              >
                Pelajari Kegiatan
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square bg-white rounded-3xl shadow-xl shadow-sawala-dark/5 p-6 flex items-center justify-center border border-gray-100/60 group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sawala-light/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sawala-primary/10 rounded-full blur-2xl"></div>
              <img 
                src={mainLogo} 
                alt="Sawala Lembur Main Badge" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT EVENT SECTION --- */}
      <section id="about" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-12 h-1 bg-sawala-light mx-auto rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-sawala-dark tracking-tight">Filosofi & Esensi Gerakan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-4">
            <div className="bg-sawala-bg p-6 rounded-2xl border border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-sawala-light block mb-2">Etimologi Sunda</span>
              <h3 className="text-xl font-bold text-sawala-dark mb-3">Sawala & Lembur</h3>
              <p className="text-sawala-muted leading-relaxed text-sm">
                <strong className="text-sawala-dark">“Sawala”</strong> dalam bahasa Sunda berarti diskusi atau pertukaran gagasan, sedangkan <strong className="text-sawala-dark">“Lembur”</strong> merepresentasikan masyarakat lokal. Nama ini mencerminkan tujuan kegiatan sebagai ruang berbagi pengetahuan mengenai literasi mitigasi bencana dan pengetahuan lokal yang berangkat dari dan untuk masyarakat.
              </p>
            </div>
            <div className="bg-sawala-bg p-6 rounded-2xl border border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-sawala-light block mb-2">Visi Aksi</span>
              <h3 className="text-xl font-bold text-sawala-dark mb-3">Misi Sosial Edukatif</h3>
              <p className="text-sawala-muted leading-relaxed text-sm">
                “Sawala Lembur” adalah kegiatan edukatif yang bertujuan meningkatkan literasi mitigasi bencana melalui pendekatan kearifan lokal dan pembelajaran interaktif bagi masyarakat dan pelajar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- EVENT DETAILS SECTION --- */}
      <section id="details" className="py-24 bg-sawala-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-sawala-dark tracking-tight">Pelaksanaan Kegiatan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 group hover:border-sawala-light/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sawala-light/10 text-sawala-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6 text-sawala-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Lokasi Utama</h3>
                <p className="text-lg font-bold text-sawala-dark">SMA Negeri 1 Bayah</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 group hover:border-sawala-light/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sawala-light/10 text-sawala-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-sawala-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Hari & Tanggal</h3>
                <p className="text-lg font-bold text-sawala-dark">Rabu, 10 Juni 2026</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4 group hover:border-sawala-light/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-sawala-light/10 text-sawala-dark flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-sawala-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Waktu / Durasi</h3>
                <p className="text-lg font-bold text-sawala-dark">08.00 – 12.00 WIB</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ACTIVITY / PROGRAM SECTION --- */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-sawala-dark tracking-tight">Open Booth Exhibition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-sawala-bg p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sawala-primary/10 flex items-center justify-center"><BookOpen className="w-5 h-5 text-sawala-primary" /></div>
              <h3 className="text-lg font-bold text-sawala-dark">Katalog Rambu Evakuasi</h3>
              <p className="text-xs text-sawala-muted leading-relaxed">Pameran buku katalog rambu evakuasi berbasis kearifan lokal.</p>
            </div>

            <div className="bg-sawala-bg p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sawala-primary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-sawala-primary" /></div>
              <h3 className="text-lg font-bold text-sawala-dark">Papan Infografis Mitigasi</h3>
              <p className="text-xs text-sawala-muted leading-relaxed">Papan infografis kebencanaan berbasis kearifan lokal.</p>
            </div>

            <div className="bg-sawala-bg p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sawala-primary/10 flex items-center justify-center"><Gamepad2 className="w-5 h-5 text-sawala-primary" /></div>
              <h3 className="text-lg font-bold text-sawala-dark">Boardgame Edukasi</h3>
              <p className="text-xs text-sawala-muted leading-relaxed">Simulasi kebencanaan interaktif lewat permainan papan mekanik.</p>
            </div>
          </div>

          {/* --- TALKSHOW SECTION --- */}
          <div className="mt-24">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold text-sawala-light uppercase tracking-widest block">Main Event</span>
              <h3 className="text-3xl font-bold text-sawala-dark tracking-tight">Sesi Pembicara Talkshow</h3>
              {/* <p className="text-sm text-sawala-muted">Diskusi interaktif panelis ahli kebencanaan dan tokoh ekosistem literasi.</p> */}
            </div>

            {/* Layout Grid Pembicara*/}
            <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto px-4">
              
              {/* Pembicara 1: Anis Faisal Reza */}
              <div className="relative w-[calc(50%-12px)] sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-gray-100 group bg-sawala-dark/5 flex flex-col justify-end">
                {/* Fallback Background jika belum dipasang file image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-sawala-dark via-sawala-primary to-sawala-light/40 flex items-center justify-center text-white/20 text-6xl font-black select-none">
                  <img src={abah} alt="Anis Faisal Reza" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                {/* Masking Gradasi Gelap di bagian bawah foto (Sama persis seperti gambar contoh) */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

                {/* Box Konten Teks Nama & Jabatan */}
                <div className="relative z-20 p-4 md:p-5 text-center text-white">
                  <h4 className="font-bold text-sm sm:text-base tracking-wide line-clamp-1">Anis Faisal Reza</h4>
                  <p className="text-[11px] sm:text-xs text-white/70 font-medium tracking-wide mt-0.5">Founder GMLS</p>
                </div>
              </div>

              {/* Pembicara 2: TBA (Coming Soon) */}
              <div className="relative w-[calc(50%-12px)] sm:w-64 aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-dashed border-gray-300 group bg-gray-50 flex flex-col justify-end opacity-85">
                {/* Animasi pulse placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 space-y-2">
                  <span className="text-5xl font-light animate-pulse">?</span>
                </div>

                {/* Overlay gradasi transparan gelap agar konsisten */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-10" />

                {/* Box Konten Teks */}
                <div className="relative z-20 p-4 md:p-5 text-center text-white">
                  <h4 className="font-bold text-sm sm:text-base tracking-wide text-white/90">To Be Announced</h4>
                  <p className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wide mt-0.5">Coming Soon</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- PRESS RELEASE SECTION --- */}
      <section id="press" className="py-24 bg-sawala-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-sawala-dark tracking-tight">Rilis Pers Resmi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-sawala-light/20 text-sawala-dark font-semibold px-2.5 py-1 rounded-md">Pre-Event Press</span>
                  <span className="text-sawala-muted font-medium">Awal Juni 2026</span>
                </div>
                <h3 className="text-xl font-bold text-sawala-dark group-hover:text-sawala-primary transition-colors line-clamp-2">
                  Pre-event Press Release (Awal Juni 2026)
                </h3>
                <p className="text-xs text-sawala-muted leading-relaxed line-clamp-3">
                  Menyambut agenda utama pada pertengahan Juni mendatang, tim kemanusiaan resmi menerbitkan modul awal serta instrumen pameran...
                </p>
              </div>
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
                <button className="text-sm font-bold text-sawala-primary flex items-center gap-1 hover:text-sawala-dark transition-colors group/btn">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-85 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-gray-100 text-gray-500 font-semibold px-2.5 py-1 rounded-md">Post-Event Press</span>
                  <span className="text-sawala-muted font-medium">Pertengahan Juni 2026</span>
                </div>
                <h3 className="text-xl font-bold text-gray-400 line-clamp-2">
                  Post-event Press Release
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  Rilis pers pasca-event akan segera diterbitkan sesaat setelah seluruh rangkaian kegiatan utama di SMA Negeri 1 Bayah selesai...
                </p>
              </div>
              <div className="px-6 pb-6 md:px-8 md:pb-8 pt-2">
                <span className="text-xs font-bold text-sawala-light bg-sawala-light/5 border border-sawala-light/20 px-3 py-1 rounded-full">Segera Hadir Pasca Acara</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION (MOBILE 2-COLUMNS LOCKED & FIXED BALANCED GRID) --- */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-sawala-dark tracking-tight">Galeri Kegiatan</h2>
          </div>

          {/* Menggunakan layout flex-wrap dengan basis lebar yang melock mobile ke 2 kolom secara simetris */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {galeriImages.map((image, index) => (
              <div 
                key={index}
                className="group relative w-[calc(50%-8px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] aspect-square bg-gray-50 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/80"
                onClick={() => setSelectedImg(image.src)}
              >
                {/* Komponen Render Foto Utama */}
                <img 
                  src={image.src} 
                  alt="Aset Kegiatan Sawala Lembur" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Efek Masking Overlay & Icon Search tanpa judul teks sesuai keinginanmu */}
                <div className="absolute inset-0 bg-sawala-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Search className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REGISTRATION CTA SECTION --- */}
      <section className="py-20 bg-gradient-to-br from-sawala-dark to-sawala-primary text-white relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-sawala-light/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Register Now</h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Daftarkan diri Anda sekarang untuk mengikuti diskusi interaktif dan mendapatkan akses eksklusif ke seluruh media edukasi mitigasi kami.
          </p>
          <div className="pt-4">
            <a 
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-sawala-light text-sawala-dark px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-black/10 hover:bg-white hover:scale-[1.03] active:scale-[0.98] transition-all group"
            >
              Daftar Sekarang
              <ArrowUpRight className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl font-bold text-sawala-dark tracking-tight">Kontak Resmi Event</h2>
              <p className="text-sawala-muted text-sm leading-relaxed">
                Silakan hubungi saluran informasi resmi kami untuk alur kemitraan, pertanyaan delegasi, atau kolaborasi aksi kebencanaan di lapangan.
              </p>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a href="https://instagram.com/sawala.lembur" target="_blank" rel="noopener noreferrer" className="p-6 bg-sawala-bg rounded-2xl border border-gray-100 flex flex-col space-y-3 group hover:border-sawala-light transition-colors">
                <svg className="w-6 h-6 text-sawala-primary group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <div>
                  <h4 className="font-bold text-sawala-dark text-sm">Instagram</h4>
                  <p className="text-xs text-sawala-muted mt-0.5">@sawala.lembur</p>
                </div>
              </a>

              <a href="https://wa.me/6282310726660" target="_blank" rel="noopener noreferrer" className="p-6 bg-sawala-bg rounded-2xl border border-gray-100 flex flex-col space-y-3 group hover:border-sawala-light transition-colors">
                <Phone className="w-6 h-6 text-sawala-primary" />
                <div>
                  <h4 className="font-bold text-sawala-dark text-sm">WhatsApp</h4>
                  <p className="text-xs text-sawala-muted mt-0.5">082310726660</p>
                </div>
              </a>

              <a href="mailto:sawalalembur@gmail.com" className="p-6 bg-sawala-bg rounded-2xl border border-gray-100 flex flex-col space-y-3 group hover:border-sawala-light transition-colors">
                <Mail className="w-6 h-6 text-sawala-primary" />
                <div>
                  <h4 className="font-bold text-sawala-dark text-sm">Email</h4>
                  <p className="text-xs text-sawala-muted mt-0.5">sawalalembur@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-sawala-dark text-white/90 pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-6 space-y-4">
              <img 
                src={mainLogoWhite} 
                alt="Sawala Lembur" 
                className="h-14 w-auto object-contain mb-2"
              />
              <p className="text-xs text-white/60 max-w-sm leading-relaxed">
                Masyarakat berdaya, tangguh bencana. Ruang diskusi kesiapsiagaan melalui kearifan lokal.
              </p>
            </div>
            <div className="md:col-span-6 flex flex-col md:items-end justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white/70">
                <button onClick={() => scrollToSection('about')} className="hover:text-sawala-light transition-colors">Tentang</button>
                <button onClick={() => scrollToSection('details')} className="hover:text-sawala-light transition-colors">Jadwal</button>
                <button onClick={() => scrollToSection('programs')} className="hover:text-sawala-light transition-colors">Program</button>
                <button onClick={() => scrollToSection('press')} className="hover:text-sawala-light transition-colors">Rilis Pers</button>
                <button onClick={() => scrollToSection('contact')} className="hover:text-sawala-light transition-colors">Kontak</button>
              </div>
              <span className="text-[11px] font-bold text-sawala-light tracking-widest uppercase">Kenali Alam & Siagakan Diri</span>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row justify-between items-center text-[11px] text-white/40 space-y-2 sm:space-y-0">
            <span>&copy; 2026 Sawala Lembur. All Rights Reserved.</span>
            <span>Humanity Project — Lebak Selatan</span>
          </div>
        </div>
      </footer>

    </div>
  );
}