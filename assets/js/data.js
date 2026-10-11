/**
 * data.js — Satu-satunya sumber data website Kecamatan Mojolaban.
 * mojo.js menyusun daftar, tabel, dan grafik dari data di file ini.
 *
 * Aturan:
 *   - null = data belum tersedia. Jangan diisi perkiraan.
 *   - Setiap angka punya sumber (kunci di SUMBER). Diperiksa 10 Oktober 2026.
 *   - Luas dan jarak ke ibu kota kabupaten berbeda antara Dispendukcapil dan situs
 *     kecamatan. Halaman memakai Dispendukcapil 2024 (KECAMATAN.stats); angka situs
 *     kecamatan disimpan di KECAMATAN.wilayahResmiKecamatan.
 */

/* ============================================================
   SUMBER — dirujuk lewat kunci, misalnya sumber: "ppid"
   ============================================================ */
const SUMBER = {
  kependudukan: {
    judul:    "Profil Perkembangan Kependudukan Kabupaten Sukoharjo 2024",
    penerbit: "Dinas Kependudukan dan Pencatatan Sipil Kabupaten Sukoharjo",
    url:      "http://portal.sukoharjokab.go.id/wp-content/uploads/2025/07/Buku-Profil-Kependudukan-2024.pdf",
  },
  papan: {
    judul:    "Papan nama Kantor Kecamatan Mojolaban (foto lokasi, ±2023)",
  },
  ppid: {
    judul:    "PPID Kecamatan Mojolaban",
    penerbit: "Pejabat Pengelola Informasi dan Dokumentasi, Kecamatan Mojolaban",
    url:      "https://ppid.mojolaban.sukoharjokab.go.id/informasi/berita",
  },
  kecamatan: {
    judul:    "Situs resmi Kecamatan Mojolaban",
    penerbit: "Pemerintah Kecamatan Mojolaban, Kabupaten Sukoharjo",
    url:      "https://mojolaban.sukoharjokab.go.id/",
  },
  gamelan: {
    judul:    "Socio-Economic Condition of Gamelan Crafter in Wirun Village, Mojolaban Subdistrict, Sukoharjo District (2019)",
    penerbit: "Jurnal Geografi, Universitas Veteran Bangun Nusantara",
    url:      "https://journal.univetbantara.ac.id/index.php/jgse/article/view/468",
  },
};

/* ============================================================
   INFORMASI KECAMATAN
   ============================================================ */
const KECAMATAN = {
  nama:      "Kecamatan Mojolaban",
  kode:      "33.11.08",
  kabupaten: "Kabupaten Sukoharjo",
  provinsi:  "Jawa Tengah",

  /* Semua angka di bawah: SUMBER.kependudukan, tahun 2024 */
  stats: {
    jumlahDesa:     15,
    jumlahDusun:    54,
    totalRW:        161,
    totalRT:        544,
    luasWilayah:    "38,29",   // km² — 7,76% luas kabupaten
    persenLuasKab:  "7,76",
    totalPenduduk:  93242,
    lakiLaki:       46560,
    perempuan:      46682,
    persenPendudukKab: "10,17",
    kepadatan:      2435,      // jiwa/km²
    jumlahKeluarga: 31893,
    ketinggian:     104,       // m dpl
    jarakKeIbuKotaKab: 17,     // km, ke ibu kota kabupaten (Kec. Bendosari)
    luasPermukiman: "8,09",    // km² lahan eksisting permukiman
    persenPermukiman: "21,1",
  },

  kantor: {
    jalan:      "Jl. Veteran Perang Kemerdekaan No. 4",
    wilayah:    "Mojolaban, Sukoharjo",
    kodePos:    "57554",
    telepon:    "(0271) 611767",
    teleponTel: "+62271611767",
    email:      "kecamatanmojolaban@gmail.com",                 // SUMBER.kecamatan, halaman Kontak
    jamPelayanan: [                                              // SUMBER.kecamatan, halaman Kontak
      { hari: "Senin–Kamis", jam: "07.00–15.30 WIB" },
      { hari: "Jumat",       jam: "07.00–14.00 WIB" },
    ],
    sumber:     "papan + kecamatan",
  },

  /* Angka dari situs resmi kecamatan (halaman Profil; tahun data tidak dicantumkan) */
  wilayahResmiKecamatan: {
    luasHa:        3554,        // 35,54 km² — berbeda dengan Dispendukcapil 2024 (38,29 km²)
    sawahHa:       2169,        // 61,02% luas wilayah
    persenSawah:   "61,02",
    jarakKeIbuKotaKab: 11,      // km — berbeda dengan Dispendukcapil 2024 (17 km)
    batas: { utara: "Kec. Jaten, Kab. Karanganyar", timur: "Kec. Jaten, Kab. Karanganyar",
             selatan: "Kec. Polokarto", barat: "Kec. Pasar Kliwon, Kota Surakarta" },
  },

  pejabat: {
    namaCamat: null,             // Berita PPID 13 Jan 2026: lepas sambut ke Sriyadi, S.E. (disebut Plt. Camat); belum ada SK yang dipublikasikan
    sambutan:  null,             // tidak ditampilkan sampai ada teks resmi
  },

  sosmed: {
    instagram: null,
    facebook:  null,
    youtube:   null,
  },

  tautan: {
    pemkabSukoharjo: "https://www.sukoharjokab.go.id/",
    bpsKabupaten:    "https://sukoharjokab.bps.go.id/",
    dispendukcapil:  "https://dispendukcapil.sukoharjokab.go.id/",
  }
};

/* ============================================================
   DAFTAR 15 DESA — urut kode wilayah; penduduk 2024 (SUMBER.kependudukan)
   halaman: file profil di folder desa/ (null = belum ada)
   fokus:   lima desa kelompok yang punya halaman profil
   ============================================================ */
const DESA = [
  { id: "laban",     nama: "Laban",     kode: "2001", laki: 2738, perempuan: 2705, populasi: 5443,  halaman: null },
  { id: "tegalmade", nama: "Tegalmade", kode: "2002", laki: 1132, perempuan: 1089, populasi: 2221,  halaman: null },
  { id: "wirun",     nama: "Wirun",     kode: "2003", laki: 3953, perempuan: 3951, populasi: 7904,  halaman: "desa-wirun.html",    fokus: true },
  { id: "bekonang",  nama: "Bekonang",  kode: "2004", laki: 2931, perempuan: 3006, populasi: 5937,  halaman: "desa-bekonang.html", fokus: true },
  { id: "cangkol",   nama: "Cangkol",   kode: "2005", laki: 3003, perempuan: 3061, populasi: 6064,  halaman: null },
  { id: "klumprit",  nama: "Klumprit",  kode: "2006", laki: 2698, perempuan: 2772, populasi: 5470,  halaman: null },
  { id: "kragilan",  nama: "Kragilan",  kode: "2007", laki: 1791, perempuan: 1896, populasi: 3687,  halaman: null },
  { id: "sapen",     nama: "Sapen",     kode: "2008", laki: 2514, perempuan: 2617, populasi: 5131,  halaman: null },
  { id: "joho",      nama: "Joho",      kode: "2009", laki: 3962, perempuan: 4024, populasi: 7986,  halaman: null },
  { id: "demakan",   nama: "Demakan",   kode: "2010", laki: 2837, perempuan: 2945, populasi: 5782,  halaman: null },
  { id: "dukuh",     nama: "Dukuh",     kode: "2011", laki: 2316, perempuan: 2301, populasi: 4617,  halaman: null },
  { id: "plumbon",   nama: "Plumbon",   kode: "2012", laki: 2798, perempuan: 2842, populasi: 5640,  halaman: "desa-plumbon.html",  fokus: true },
  { id: "gadingan",  nama: "Gadingan",  kode: "2013", laki: 3368, perempuan: 3319, populasi: 6687,  halaman: "desa-gadingan.html", fokus: true },
  { id: "palur",     nama: "Palur",     kode: "2014", laki: 7632, perempuan: 7281, populasi: 14913, halaman: "desa-palur.html",    fokus: true },
  { id: "triyagan",  nama: "Triyagan",  kode: "2015", laki: 2887, perempuan: 2873, populasi: 5760,  halaman: null },
];

/* ============================================================
   POTENSI & CIRI WILAYAH — hanya klaim yang bersumber
   ============================================================ */
const POTENSI = [
  {
    id:       "gamelan-wirun",
    kategori: "Kerajinan",
    judul:    "Gamelan dari Desa Wirun",
    deskripsi: "Desa Wirun dikenal sebagai sentra perajin gamelan. Penelitian tentang " +
               "perajin di desa ini mencatat bahwa bilah dan gong masih ditempa dengan tangan " +
               "di bengkel-bengkel rumahan.",
    sumber:   "gamelan",
  },
  {
    id:       "lahan",
    kategori: "Lahan",
    judul:    "Permukiman 21,1% dari luas wilayah",
    deskripsi: "Lahan permukiman eksisting di Mojolaban tercatat 8,09 km² dari 38,29 km². " +
               "Rincian penggunaan lahan lainnya, termasuk sawah, belum tersedia di sumber yang sama.",
    sumber:   "kependudukan",
  },
  {
    id:       "palur",
    kategori: "Kependudukan",
    judul:    "Palur, desa terpadat penduduknya",
    deskripsi: "Dengan 14.913 jiwa, Palur menampung 15,99% penduduk kecamatan, " +
               "hampir dua kali lipat desa terbesar berikutnya.",
    sumber:   "kependudukan",
  },
];

/* ============================================================
   SOP PELAYANAN UMUM — daftar resmi situs kecamatan (Info Publik ›
   Pelayanan Umum); dokumen PDF hasil pindaian, diunggah 2022
   ============================================================ */
const SOP_PELAYANAN = {
  sumber:  "kecamatan",
  dokumen: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/pelayanan-umum.pdf",
  halaman: "https://mojolaban.sukoharjokab.go.id/submenu/pelayanan-umum-1",
  tahunBerkas: 2022,
  daftar: [
    "Pengurusan SKCK",
    "Pindah penduduk antar-kabupaten/provinsi",
    "Pindah penduduk antar-kecamatan/kabupaten",
    "Pengurusan KK",
    "Pengurusan KTP",
    "Pelayanan KIS/BPJS",
    "Pengurusan akta kelahiran",
    "Keterangan ahli waris",
    "Pelayanan surat keterangan",
    "Keterangan satu nama",
    "Keterangan domisili",
    "Dispensasi nikah",
  ],
  /* Pengelompokan buatan situs ini (bukan kategori resmi); angka = indeks di `daftar` */
  kelompok: [
    { nama: "Kependudukan",     isi: [1, 2, 3, 4, 6, 9] },
    { nama: "Surat keterangan", isi: [7, 8, 10] },
    { nama: "Lainnya",          isi: [0, 5, 11] },
  ],
};

/* ============================================================
   BERITA — dari situs PPID Kecamatan Mojolaban (diperiksa 10 Okt 2026);
   ucapan hari besar tanpa kegiatan tidak dimuat.
   Format: { id, judul, tanggal "YYYY-MM-DD", kategori, sumber, cuplikan, url, foto, isi[] }
     id        dipakai di berita-detail.html?id=...
     cuplikan  ringkasan untuk daftar berita
     foto, isi foto dan paragraf asli untuk halaman detail
   Urutan bebas: ditampilkan dari yang terbaru; yang terbaru jadi berita utama.
   ============================================================ */
const BERITA = [
  { id: "penyaluran-cadangan-pangan-pemerintah-daerah-cpp", judul: "Penyaluran Cadangan Pangan Pemerintah Daerah (CPPD) Kabupaten Sukoharjo Tahun 2026",
    tanggal: "2026-10-06", kategori: "Bantuan sosial", sumber: "ppid",
    cuplikan: "CPPD untuk penanganan kerawanan pangan didistribusikan di wilayah Kecamatan Mojolaban bagi keluarga penerima manfaat.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/penyaluran-cadangan-pangan-pemerintah-daerah-cppd-kabupaten-sukoharjo-tahun-2026",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/707e9a4ac6bb2e13af496776f76597fd.jpg",
    isi: [
      "Mojolaban- Hari ini, pelaksanaan penyaluran Cadangan Pangan Pemerintah Daerah (CPPD) untuk Penanganan Kerawanan Pangan didistribusikan di wilayah Kecamatan Mojolaban. Penyaluran ini merupakan bentuk nyata komitmen pemerintah untuk memastikan ketersediaan bahan pangan pokok, meringankan beban ekonomi, sekaligus menjaga stabilitas pangan bagi keluarga penerima manfaat di wilayah Kabupaten Sukoharjo."
    ] },
  { id: "upacara-peringatan-kesaktian-pancasila-tahun-202", judul: "Upacara Peringatan Kesaktian Pancasila Tahun 2026",
    tanggal: "2026-10-01", kategori: "Peringatan", sumber: "ppid",
    cuplikan: "Peringatan Hari Kesaktian Pancasila tahun 2026 oleh Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/upacara-peringatan-kesaktian-pancasila-tahun-2026",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/6606788cf1f0019148e2bf2adc476cbe.jpg",
    isi: [
      "Peringatan Hari Kesaktian Pancasila menjadi momentum untuk mengenang dan menghargai perjuangan dalam mempertahankan ideologi Pancasila serta memperkuat semangat persatuan dan kesatuan bangsa.",
      "Mari kita jadikan nilai-nilai Pancasila sebagai pedoman dalam menjaga kebersamaan, memperkuat persaudaraan, serta membangun Indonesia yang berdaulat, adil, dan makmur",
      "Pancasila Pemersatu Bangsa, Menuju Indonesia Berdaulat, Adil, dan Makmur."
    ] },
  { id: "monitoring-dan-evaluasi-administrasi-10-program-", judul: "Monev Administrasi 10 Program Pokok PKK Desa Binaan dalam rangka HKG PKK ke-54",
    tanggal: "2026-09-25", kategori: "PKK", sumber: "ppid",
    cuplikan: "Monitoring dan evaluasi tingkat Kabupaten Sukoharjo di Desa Kragilan dan Desa Dukuh untuk menilai pelaksanaan 10 Program Pokok PKK dan tertib administrasi desa.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/monitoring-dan-evaluasi-administrasi-10-program-pokok-pkk-desa-binaan-pkk-dalam-rangka-hari-kesatuan-gerak-pkk-ke-54-kabupaten-sukoharjo",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/6af26dafe45f2913e8bb5391d297eb94.jpg",
    isi: [
      "Pelaksanaan Monitoring dan Evaluasi (Monev) Administrasi 10 Program Pokok PKK Desa Binaan tingkat Kabupaten Sukoharjo di Desa Kragilan dan Desa Dukuh Kecamatan Mojolaban, Kabupaten Sukoharjo.",
      "Tujuan utama dari kegiatan Monitoring dan Evaluasi (Monev) PKK Desa Binaan adalah untuk menilai sejauh mana pelaksanaan 10 Program Pokok PKK serta tertib administrasi di tingkat desa berjalan sesuai pedoman."
    ] },
  { id: "pengucapan-sumpahjanji-dan-peresmian-anggota-bad", judul: "Pengucapan Sumpah/Janji dan Peresmian Anggota BPD Masa Jabatan 2026–2034",
    tanggal: "2026-09-19", kategori: "Pemerintahan desa", sumber: "ppid",
    cuplikan: "Pemerintah Kecamatan Mojolaban meresmikan anggota Badan Permusyawaratan Desa se-Kecamatan Mojolaban masa jabatan 2026–2034.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/pengucapan-sumpahjanji-dan-peresmian-anggota-badan-permusyawaratan-desa-bpd-masa-jabatan-2026-2034",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/4256ff722d38903b5f5d727e1a377add.jpg",
    isi: [
      "Peresmian Anggota BPD se-Kecamatan Mojolaban Masa Jabatan 2026-2034",
      "Pemerintah Kecamatan Mojolaban pada hari Sabtu, 19 September 2026 menyelenggarakan kegiatan Pengucapan Sumpah/janji dan Peresmian Anggota Badan Permusyawaratan Desa (BPD) se-Kecamatan Mojolaban Masa Jabatan 2026-2034.",
      "Kegaitan ini menjadi momentum penting dalam mengawali pelaksanaan tugas dan tanggung jawab anggota BPD dalam menjalankan fungsi permusyawaratn serta mendukung penyelenggaraan pemerintah dan pembangunan desa.",
      "Kegiatan tersebut dihadiri oleh Muspika Kecamatan Mojolaban, Kepala Desa atau yang mewakili, pejabat struktural dan staf Kecamatan mojolaban, Perangkat Desa Tegalmade, Babinsa, serta Bhabinkamtibmas Desa Tegalmade",
      "Semoga dengan dilaksanakan pengucapan sumpah/janji dan peresmian ini, seluruh anggota BPD dapat menjalankan amanah dengan penuh tanggung jawab, menjunjung tinggi integritas, serta bersinergi dalam mewujudkan tata kelola pemerintahan desa yang baik dan pelayanan masyarakat yang optimal."
    ] },
  { id: "longsor-tanggul-kali-samin-sepanjang-5o-m-pemdes", judul: "Longsor Tanggul Kali Samin Sepanjang ±50 m di Desa Laban Ditinjau",
    tanggal: "2026-02-24", kategori: "Kebencanaan", sumber: "ppid",
    cuplikan: "Plt. Camat, Kasi Trantib, Pemdes Laban, dan BBWS Bengawan Solo meninjau longsor tanggul Kali Samin di perbatasan Dukuh Krajan dan Dukuh Jatiteken, Desa Laban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/longsor-tanggul-kali-samin-sepanjang-5o-m-pemdes-laban-plt-camat-mojolaban-beserta-kasi-trantib-dan-staff-dan-bbws-lakukan-peninjauan",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/PPID_2025_KEC_MOJOLABAN_(1)5.png",
    isi: [
      "Selasa, 24 Februari 2026 telah terjadi longsor tanggul Kali Samin sepanjang kurang lebih 50 meter di wilayah Desa Laban, Kecamatan Mojolaban. Lokasi kejadian berada di perbatasan antara Dukuh Krajan dan Dukuh Jatiteken, Desa Laban, Kecamatan Mojolaban.",
      "Menindaklanjuti kejadian tersebut, unsur pimpinan wilayah bersama instansi terkait segera melakukan peninjauan lapangan untuk memastikan kondisi tanggul serta mengidentifikasi potensi dampak lanjutan. Hadir dalam kegiatan tersebut Plt. Camat Mojolaban, Kasi Trantib Kecamatan Mojolaban, Lurah Desa Laban, petugas BBWS Bengawan Solo, Bayan III Desa Laban, Babinsa Desa Laban, serta FKDM Kecamatan Mojolaban. Dari hasil pemantauan sementara, longsor terjadi pada badan tanggul dengan panjang sekitar 50 meter. Aparat bersama pihak teknis melakukan asesmen awal guna menentukan langkah penanganan darurat dan upaya perbaikan lebih lanjut guna mencegah potensi longsor susulan, terutama apabila terjadi peningkatan debit air. Pemerintah Kecamatan Mojolaban bersama Pemerintah Desa Laban mengimbau masyarakat sekitar untuk tetap waspada serta segera melaporkan apabila ditemukan tanda-tanda keretakan atau pergerakan tanah di sekitar tanggul. Koordinasi lintas sektor terus dilakukan guna percepatan penanganan dan menjaga keselamatan warga di wilayah terdampak."
    ] },
  { id: "sinergi-firkopimcam-mojolaban-bergerak-cepat-tin", judul: "Forkopimcam Mojolaban Tinjau Banjir di Desa Tegalmade dan Desa Gadingan",
    tanggal: "2026-02-23", kategori: "Kebencanaan", sumber: "ppid",
    cuplikan: "Plt. Camat bersama unsur TNI-Polri, perangkat desa, dan BPBD Sukoharjo meninjau genangan dan menyalurkan bantuan logistik kepada warga terdampak.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/sinergi-firkopimcam-mojolaban-bergerak-cepat-tinjau-banjir-di-desa-tegalmade-dan-desa-gadingan-serta-berikan-bantuan-logistik-untuk-warga-terdampak",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/PPID_2025_KEC_MOJOLABAN6.png",
    isi: [
      "Mojolaban – Forum Koordinasi Pimpinan Kecamatan (Forkopimcam) Mojolaban bergerak cepat merespons banjir yang menggenangi wilayah Desa Tegalmade dan Desa Gadingan, Kecamatan Mojolaban, Kabupaten Sukoharjo, pada [Senin, 23 Februari 2026]. Plt.Camat Mojolaban bersama unsur TNI-Polri dan perangkat desa dan BPBD Kabupaten Sukoharjo turun langsung ke lokasi untuk memastikan kondisi warga serta memantau titik-titik genangan air yang masuk ke permukiman. Berdasarkan pantauan di lapangan, air menggenangi rumah warga dengan ketinggian bervariasi dan berdampak pada aktivitas masyarakat. Dalam kegiatan tersebut, Forkopimcam Mojolaban menyalurkan bantuan logistik berupa beras, mie instan, air mineral, serta kebutuhan pokok lainnya kepada warga terdampak. Bantuan diserahkan secara langsung kepada perwakilan warga sebagai bentuk kepedulian dan dukungan pemerintah di masa tanggap darurat.",
      "Selain penyaluran bantuan, Forkopimcam juga berkoordinasi dengan pemerintah desa dan relawan setempat untuk melakukan pendataan warga terdampak serta memastikan kebutuhan mendesak dapat segera dipenuhi. Plt.Camat Mojolaban menyampaikan bahwa pemerintah kecamatan akan terus memantau perkembangan situasi serta mengimbau masyarakat untuk tetap waspada terhadap potensi curah hujan yang masih tergolong tinggi. Sinergi antar unsur pemerintah dan masyarakat diharapkan dapat mempercepat proses pemulihan pasca banjir."
    ] },
  { id: "pengukuhan-penyuluh-pertanian-swadaya-pps-tulodh", judul: "Pengukuhan Penyuluh Pertanian Swadaya (PPS) Tulodho Tani se-Kabupaten Sukoharjo",
    tanggal: "2026-01-13", kategori: "Pertanian", sumber: "ppid",
    cuplikan: "Bupati Sukoharjo mengukuhkan Penyuluh Pertanian Swadaya di Balai Penyuluh Pertanian Kecamatan Mojolaban, didampingi Plt. Camat Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/pengukuhan-penyuluh-pertanian-swadaya-pps-tulodho-tani-se-kabupaten-sukoharjo-di-balai-penyuluh-pertanian-kecamatan-mojolaban-oleh-bupati-sukoharjo",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/3.png",
    isi: [
      "PENGUKUHAN PENYULUH PERTANIAN SWADAYA (PPS) TULODHO TANI SE KABUPATEN SUKOHARJO DI BALAI PENYULUH PERTANIAN KECAMATAN MOJOLABAN OLEH BUPATI SUKOHARJO",
      "Plt. Camat Mojolaban (Bp. Sriyadi, S.E.) Mendampingi Bupati Sukoharjo dalam rangka Pengukuhan Penyuluh pertanian Swadaya (PPS) se Kabupaten Sukoharjo bertempat di Balai Penyuluh Pertanian Kecamatan Mojolaban. Penyuluh Pertanian Swadaya (PPS) adalah Petani atau pelaku usaha pertanian yang memiliki Pengatahuan, keterampilan dan pengalaman yang memadai dalam bidang pertanian dan bersedia menyebarluaskan informasi serta mendampingi terhadap petani lain secara sukarela di wilayah Desanya / wilayah binaannya. Tujuan dari Pengukuhan tersebut yang utama ialah guna mendukung program pembangunan pertanian Nasional dalam rangka mencapai Swasembada Pangan dan Meningkatkan efektifitas serta jangkauan penyuluh pertanian terutama di daerah yang kekurangan Penyuluh Pertanian Lapangan (PPL). Dalam kegiatan tersebut turut serta dihadiri oleh Wakil Bupati Sukoharjo, Kepala Dinas Pertanian Kab Sukoharjo, Forkopimcam Mojolaban, Kepala Desa Palur, PPL, Bhabinkamtibmas Dan Babinsa Desa Palur."
    ] },
  { id: "lepas-sambut-camat-kecamatan-mojolaban-tahun-202", judul: "Lepas Sambut Camat Kecamatan Mojolaban Tahun 2026",
    tanggal: "2026-01-13", kategori: "Pemerintahan", sumber: "ppid",
    cuplikan: "Lepas sambut Camat Mojolaban dari Joko Windarto, S.STP., M.H. kepada Sriyadi, S.E., di Pendhopo Kantor Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/lepas-sambut-camat-kecamatan-mojolaban-tahun-2026",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/13.png",
    isi: [
      "Kecamatan Mojolaban Kabupaten Sukoharjo melaksanakan kegiatan lepas Sambut Camat Mojolaban dari Bp. Joko Windarto, S.STP., M.H. kepada Bp. Sriyadi, S.E. Bersamaan dengan Lepas Sambut Ketua TP PKK Mojolaban & Dharma Wanita Persatuan Kecamatan Mojolaban pada Selasa, 13 januari 2026 bertempat di Pendhopo Kantor Kecamatan Mojolaban, Kegiatan tersebut berlangsung dengan khidmat dan penuh kekeluargaan serta dihadiri oleh unsur Forkopimcam, Kepala Desa beserta Ibu Se Kecamatan Mojolaban, Pimpinan Instansi dan Seluruh Jajaran Pejabat Struktural beserta Staff Kecamatan. Acara Lepas Sambut inimenjadi momentum penting dalam rangka kesinambungan kepemimpinan dan penyelenggaraan Pemerintahan di Kecamatan Mojolaban. Melalui kegiatan Lepas Sambut ini diharapkan terjalin Semangat kebersamaan, Kolaborasi serta Komitmen bersama dalam mendukung penyelenggaraan pemerintahan dan pembangunan di Kecamatan Mojolaban agar semakin maju dan sejahtera serta mendorong terciptanya pemerintahan yang transparan dan berorientasi serta berdampak pada pelayanan kepada masyarakat."
    ] },
  { id: "monitoring-evaluasi-lpj-keuangan-tahun-2025-keca", judul: "Monitoring & Evaluasi LPJ Keuangan Tahun 2025 Kecamatan Mojolaban",
    tanggal: "2026-01-12", kategori: "Pemerintahan", sumber: "ppid",
    cuplikan: "Tim Inspektorat Daerah Kabupaten Sukoharjo melakukan monev pertanggungjawaban penggunaan anggaran Kecamatan Mojolaban tahun 2025.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/monitoring-evaluasi-lpj-keuangan-tahun-2025-kecamatan-mojolaban",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/21.png",
    isi: [
      "MONITORING & EVALUASI LPJ KEUANGAN TAHUN 2025 KECAMATAN MOJOLABAN",
      "Inspektorat Daerah Kabupaten Sukoharjo melaksanakan Monitoring & Evaluasi (Monev) Pertanggungjawaban atas penggunaan Anggaran Keuangan Kecamatan Mojolaban Kabupaten Sukoharjo Tahun 2025 yang dilakukan oleh Tim Inspektorat Daerah Kabupaten Sukoharjo. Kegiatan tersebut bertujuan untuk memastikan bahwa pengelolaan dan penggunaan dana desa telah dilaksanakan secara transparan, akuntabel, dan sesuai dengan aturan yang berlaku. Dalam monev tersebut, tim inspektorat melakukan pemeriksaan dan pendalaman terkait realisasi anggaran, administrasi, serta laporan pertanggungjawaban yang telah disusun oleh Kecamatan Mojolaban. Dengan adanya monitoring dan evaluasi ini, diharapkan kinerja Kecamatan Mojolaban Khusunya dalam mengelola Anggaran Keuangan semakin meningkat, serta mampu mendukung terwujudnya tata kelola keuangan yang lebih transparan serta dapat dipertanggungjawabkan."
    ] },
  { id: "rapat-koordinasi-awal-tahun-2026-kecamatan-mojol", judul: "Rapat Koordinasi Awal Tahun 2026 Kecamatan Mojolaban",
    tanggal: "2026-01-05", kategori: "Pemerintahan", sumber: "ppid",
    cuplikan: "Rapat dipimpin Plt. Camat bersama pejabat struktural dan staf untuk mempersiapkan tahun anggaran dan rencana kerja 2026.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/rapat-koordinasi-awal-tahun-2026-kecamatan-mojolaban",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/12.png",
    isi: [
      "Rapat Koordinasi Awal tahun 2026 Kecamatan Mojolaban",
      "Pada Hari Senin, 5 Januari 2026 Kecamatan Mojolaban menggelar Rapat Koordinasi dalam rangka mempersiapkan Tahun Anggaran 2026. Rapat berlangsung dipimpin oleh Plt Camat Mojolaban dihadiri oleh Jajaran Pejabat Struktural beserta Staff. Rapat dilanjutkan dengan pembahasan Rencana Kerja di tahun 2026. Diharapkan untuk kedepannya sesuai dengan Perencanaan Anggaran yang ada sehingga serapan anggaran dan pelaksanaannya kegiatan dapat efektif dan efisien."
    ] },
  { id: "desk-penyusunan-anggaran-pendapatan-dan-belanja-", judul: "Desk Penyusunan APBDes Tahun Anggaran 2026",
    tanggal: "2025-12-17", kategori: "Pemerintahan desa", sumber: "ppid",
    cuplikan: "15 desa se-Kecamatan Mojolaban mengikuti desk penyusunan APBDes 2026 di Balai Desa Plumbon, didampingi Dinas PMD Kabupaten Sukoharjo dan pendamping desa.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/desk-penyusunan-anggaran-pendapatan-dan-belanja-desa-tahun-anggaran-2026",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/DESK.png",
    isi: [
      "15 Desa se Kecamatan Mojolaban Kabupaten Sukoharjo telah melaksanakan kegiatan Desk Penyusunan Anggaran Pendapatan dan Belanja Desa Tahun Anggaran 2026 bertempat di Balai Desa Plumbon Kecamatan Mojolaban. Kegiatan ini merupakan bagian dari tahapan sebagai sarana Pembinaan dan Pengawasan dalam Penyusunan APBDes agar sesuai dengan ketentuan perundang undangan serta sebagai Prinsip Tata Kelola Keuangan Desa yang Transparan dan Akuntabel serta dapat dipertanggungjawabkan dikemudian hari. Desk tersebut di dampingi dari Dinas Pemberdayaan Masyarakat dan Desa Kabupaten Sukoharjo dan Pendamping Desa serta Pendamping Lokal Desa guna memberikan arahan petunjuk serta klarifikasi dan masukan teknis Perencanaan, penganggaran dan penyesuaian program kegiatan desa untuk tahun anggaran 2026. Kegiatan Tersebut turut dihadiri dari Dinas Pemberdayaan Masyarakat dan Desa Kabupaten Sukoharjo, Pendamping Desa dan Pendamping Lokal Desa, Kepala Desa dan Sekretaris Desa dan Perangkat Desa pengampu se Kecamatan Mojolaban. Melalui Desk ini diharapkan APBDes dapat tersusun secara tepat, tertib administrasi dan dapat dipertanggungjawabkan sesuai dengan yng diamanatkan oleh undang-undang serta mampu mendukung pelaksanaan pembangunan dan peningkatan pelayanan kepada masyarakat secara optimal khususnya."
    ] },
  { id: "rapat-rutin-tp-pkk-kecamatan-dan-tp-pkk-desa-se-", judul: "Rapat Rutin TP PKK Kecamatan dan TP PKK Desa se-Kecamatan Mojolaban Desember 2025",
    tanggal: "2025-12-16", kategori: "PKK", sumber: "ppid",
    cuplikan: "Rapat rutin bulanan TP PKK kecamatan dan desa se-Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/rapat-rutin-tp-pkk-kecamatan-dan-tp-pkk-desa-se-kecaamatan-mojolaban-bulan-desember-2025",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/PKK.png",
    isi: [
      "Selasa, 16 Desember 2025 Rapat Rutin TP PKK Kecamatan dan TP PKK Desa Se-Kecamatan Mojolaban Bulan Desember 2025"
    ] },
  { id: "upacara-peringatan-hari-kesaktian-pancasila-1-ok", judul: "Upacara Peringatan Hari Kesaktian Pancasila 2025 Kecamatan Mojolaban",
    tanggal: "2025-10-02", kategori: "Peringatan", sumber: "ppid",
    cuplikan: "Upacara di halaman Kantor Kecamatan dipimpin Danramil 10 Mojolaban, dihadiri Forkopimcam dan perangkat desa se-Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/upacara-peringatan-hari-kesaktian-pancasila-1-oktober-kecamatan-mojolaban",
    foto: "https://ppid.mojolaban.sukoharjokab.go.id/upload/berita/PPID_2025_KEC_MOJOLABAN_(1)3.png",
    isi: [
      "Dalam rangka memperingati Hari Kesaktian Pancasila Tahun 2025 Kecamatan Mojolaban Menggelar Upacara di Halaman Kantor Kecamatan. Upacara tersebut di pimpin oleh Danramil 10 Mojolaban (Kapten inf. Sunarto) selaku Inspektur Upacara Upacara tersebut turut dihadiri Oleh Jajaran Forkopimcam Mojolaban, Perangkat Desa Se Kecamatan Mojolaban, Kormin Dinas Pendidikan dan Kebudayaan Mojolaban, Seluruh Kasi/Kasubbag beserta staff Kecamatan Mojolaban . Perayaan Peringatan Hari Kesaktian Pancasila Ini merupakan Bentuk penghormatan terhadap kokohnya ideologi Pancasila setelah di Gempur oleh Paham Komunis yang merongrong kedaulatan bangsa melalui peristiwa G30SPKI. Berkat kegigihan aparat dan rakyat, rencana kudeta tersebut berhasil digagalkan sehingga Pancasila tetap menjadi landasan Negara. Betapa pentingnya menanamkan nilai-nilai Pancasila dalam kehidupan sehari-hari. “ Dengan momentum Hari Kesaktian Pancasila, diharapkan Rasa Cinta kepada Tanah Air Indonesia semakin menguat dan jiwa Pancasila tertanam kuat di hati kita semua. Upacara ini menjadi momen penting untuk mengenang Sejarah bangsa dan memperkuat komitmen dalam mengimpletasikan Nilai-Nilai Pancasila dalam dalam berbagai aspek kehidupan."
    ] },
];

/* Pengumuman dari situs resmi kecamatan (diperiksa 10 Okt 2026) */
const PENGUMUMAN = [
  { judul: "Situasi Wabah Penyakit Mulut dan Kuku (PMK) di Kabupaten Sukoharjo", tanggal: "2022-06-07", sumber: "kecamatan",
    url: "https://mojolaban.sukoharjokab.go.id/pengumuman/situasi-wabah-penyakit-mulut-dan-kuku-pmk-di-kabupaten-sukoharjo" },
];

/* ============================================================
   LOKASI & KANAL RESMI
   ============================================================ */
const LOKASI = {
  /* Kantor kecamatan (Google Maps 6P4G9VVC+G78) */
  kantor: { lintang: -7.6062, bujur: 110.8707 },
  /* Prakiraan cuaca BMKG untuk Desa Bekonang, lokasi kantor kecamatan */
  bmkg: { adm4: "33.11.08.2004", desa: "Bekonang",
          url: "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=33.11.08.2004",
          sumber: "https://data.bmkg.go.id/prakiraan-cuaca/" },
  peta: "https://www.google.com/maps?q=Kantor+Kecamatan+Mojolaban,+Sukoharjo&output=embed",
  petunjukArah: "https://www.google.com/maps/dir/?api=1&destination=Kantor+Kecamatan+Mojolaban+Sukoharjo",
};

/* Kanal resmi (rujukan; teks di halaman ditulis langsung di HTML) */
const KANAL = {
  ppid:  { nama: "PPID Kecamatan Mojolaban", url: "https://ppid.mojolaban.sukoharjokab.go.id/",
           fungsi: "Permohonan informasi publik dan pengajuan keberatan informasi" },
  lapor: { nama: "SP4N-LAPOR!", url: "https://www.lapor.go.id/",
           fungsi: "Kanal pengaduan pelayanan publik nasional (bukan layanan internal kecamatan)" },
  jadwalSalat: { nama: "Jadwal Shalat Kemenag RI", url: "https://bimasislam.kemenag.go.id/jadwalshalat" },
};

/* ============================================================
   PEGAWAI KECAMATAN — dokumen resmi tahun 2022 (5 berkas PDF).
   NIP tidak disalin karena memuat tanggal lahir.
   eselon null = pegawai pelaksana. jk: L/P. pend: pendidikan terakhir.
   ============================================================ */
const PEGAWAI = {
  tahun: 2022,
  halaman: "https://mojolaban.sukoharjokab.go.id/submenu-multi/daftar-pegawai-kecamatan-mojolaban",
  dokumen: {
    semua:      "https://mojolaban.sukoharjokab.go.id/storage/files/2022/07/daftar-pegawai-kecamatan-mojolaban-1.pdf",
    eselon:     "https://mojolaban.sukoharjokab.go.id/storage/files/2022/07/daftar-pegawai-berdasar-eselon-1.pdf",
    golongan:   "https://mojolaban.sukoharjokab.go.id/storage/files/2022/07/daftar-pegawai-berdasar-golongan-1.pdf",
    jk:         "https://mojolaban.sukoharjokab.go.id/storage/files/2022/07/daftar-pegawai-berdasar-jenis-kelamin-1.pdf",
    pendidikan: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/07/daftar-pegawai-berdasar-tingkat-pendidikan-1.pdf",
  },
  daftar: [
    { jabatan: "Camat",                               nama: "Joko Windarto, S.STP, M.H",            gol: "IV/b",  pangkat: "Pembina Tingkat I",     eselon: "III/a", jk: "L", pend: "S-2" },
    { jabatan: "Sekretaris Kecamatan",                nama: "Wisnu Pramudiya Wardhana, S.STP, M.H", gol: "IV/a",  pangkat: "Pembina",               eselon: "III/b", jk: "L", pend: "S-2" },
    { jabatan: "Kasi Pemerintahan",                   nama: "Hernowo Subakdo, A.Md",                gol: "III/d", pangkat: "Penata Tingkat I",      eselon: "IV/a",  jk: "L", pend: "D-III" },
    { jabatan: "Kasi Ketenteraman dan Ketertiban",    nama: "Sudino, SE",                           gol: "III/d", pangkat: "Penata Tingkat I",      eselon: "IV/a",  jk: "L", pend: "S-1" },
    { jabatan: "Kasi Pemberdayaan Masyarakat Desa",   nama: "Sriyadi, SE",                          gol: "III/c", pangkat: "Penata",                eselon: "IV/a",  jk: "L", pend: "S-1" },
    { jabatan: "Kasi Kesejahteraan Sosial",           nama: "Azmi Cahyani, S.Sos",                  gol: "III/d", pangkat: "Penata Tingkat I",      eselon: "IV/a",  jk: "P", pend: "S-1" },
    { jabatan: "Kasi Pelayanan Umum",                 nama: "Sri Lestari, SE, MM",                  gol: "IV/a",  pangkat: "Pembina",               eselon: "IV/a",  jk: "P", pend: "S-2" },
    { jabatan: "Kasubbag Umum dan Kepegawaian",       nama: "Agus Wiyono, A.Md",                    gol: "III/a", pangkat: "Penata Muda",           eselon: "IV/b",  jk: "L", pend: "D-III" },
    { jabatan: "Kasubbag Perencanaan dan Keuangan",   nama: "Atik Yunawati, SE",                    gol: "III/b", pangkat: "Penata Muda Tingkat I", eselon: "IV/b",  jk: "P", pend: "S-1" },
    { jabatan: "Pranata Laporan Keuangan",            nama: "Heny Aprianingsih, A.Md",               gol: "II/c",  pangkat: "Pengatur",              eselon: null,    jk: "P", pend: "D-III" },
    { jabatan: "Pengelola Administrasi Pemerintahan", nama: "Suramto, SE",                          gol: "III/a", pangkat: "Penata Muda",           eselon: null,    jk: "L", pend: "S-1" },
    { jabatan: "Pengelola Administrasi Pemerintahan", nama: "Hery Wibawa, SH",                      gol: "III/a", pangkat: "Penata Muda",           eselon: null,    jk: "L", pend: "S-1" },
    { jabatan: "Pengadministrasi Pemerintahan",       nama: "Sugito",                               gol: "II/d",  pangkat: "Pengatur Tingkat I",    eselon: null,    jk: "L", pend: "SLTA/D-1" },
    { jabatan: "Pengadministrasi Umum",               nama: "Prawito",                              gol: "II/c",  pangkat: "Pengatur",              eselon: null,    jk: "L", pend: "SLTA/D-1" },
    { jabatan: "Pengadministrasi Umum",               nama: "Agus Nartono",                         gol: "III/b", pangkat: "Penata Muda Tingkat I", eselon: null,    jk: "L", pend: "SLTA/D-1" },
    { jabatan: "Pengadministrasi Umum",               nama: "Didik Susanto",                        gol: "II/d",  pangkat: "Pengatur Tingkat I",    eselon: null,    jk: "L", pend: "SLTA/D-1" },
    { jabatan: "Pranata Laporan Keuangan",            nama: "Remi Pertiwi, A.Md",                   gol: "II/c",  pangkat: "Pengatur",              eselon: null,    jk: "P", pend: "D-III" },
  ],
};

/* ============================================================
   STRUKTUR ORGANISASI — rujukan bagan resmi. Bagan di profil/struktur.html
   ditulis langsung di HTML dengan nama pejabat menurut data pegawai 2022.
   ============================================================ */
const STRUKTUR = {
  gambar: "https://mojolaban.sukoharjokab.go.id/storage/4F8bH8J9WUpXxlriwR9RmqvRuQi5ZO1InoT88wJa.jpeg",
  halaman: "https://mojolaban.sukoharjokab.go.id/profil/struktur",
  halamanPlt: "https://mojolaban.sukoharjokab.go.id/submenu/profil-plt-camat-1",
};

/* ============================================================
   PERANGKAT DESA — dokumen resmi per desa (2022). Hanya nama dan
   jabatan yang disalin; data pribadi lain tidak.
   ============================================================ */
const PERANGKAT_DESA = {
  halaman: "https://mojolaban.sukoharjokab.go.id/submenu-multi/data-perangkat-desa-1",
  dokumen: [
    { desa: "Rekap beberapa desa", periode: "April–September 2022", url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-1.pdf" },
    { desa: "Dukuh",     periode: "2022, bulan tidak tercantum", url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-dukuh-1.pdf" },
    { desa: "Kragilan",  periode: "April 2022",     url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-kragilan.pdf" },
    { desa: "Laban",     periode: "September 2022", url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-laban.pdf" },
    { desa: "Palur",     periode: "September 2022", url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-palur.pdf" },
    { desa: "Plumbon",   periode: "Mei 2022",       url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-plumbon.pdf" },
    { desa: "Sapen",     periode: "Mei 2022",       url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-sapen.pdf" },
    { desa: "Tegalmade", periode: "2022, bulan tidak tercantum", url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-tegalmade.pdf" },
    { desa: "Triyagan",  periode: "Mei 2022",       url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-triyagan.pdf" },
    { desa: "Wirun",     periode: "2022, bulan tidak tercantum", url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/06/data-perangkat-desa-wirun.pdf" },
  ],
  tanpaDokumen: ["Bekonang", "Cangkol", "Demakan", "Gadingan", "Joho", "Klumprit"],
  /* Rincian [jabatan, nama] dari PDF desa; nama null = tidak tercantum di dokumen */
  rinci: {
    palur: { periode: "September 2022", daftar: [
      ["Kepala Desa", "Sugito, S.Pd"], ["Sekretaris Desa", "Suramto"], ["Kaur Keuangan", "Siti Fauziah"],
      ["Kaur Perencanaan", "Yuliyanto Ari Wibowo"], ["Kaur Tata Usaha dan Umum", "Redi Hastuti, A.Md"],
      ["Kasi Pemerintahan", "Soebagyo, BA"], ["Kasi Kesejahteraan dan Pelayanan", "Muhamad Dahlan"],
      ["Kepala Dusun I", "Setiyono, SE"], ["Kepala Dusun II", "Sulardi"], ["Kepala Dusun III", "Budi Wahyono"],
      ["Kepala Dusun IV", "Dewangga Saputra, S.Sos"], ["Kepala Dusun V", "Mujiyanto"], ["Kepala Dusun VI", "Ary Karyanto"] ] },
    plumbon: { periode: "Mei 2022", daftar: [
      ["Kepala Desa", "Suparno"], ["Sekretaris Desa", "Yusuf Pangesti Aji"], ["Kasi Pemerintahan", "Sunardi Abdul Ghofar"],
      ["Kasi Pelayanan", null], ["Kasi Kesejahteraan", "Sugeng Hariyadi"], ["Kaur Tata Usaha dan Umum", "Riki Antoni, S.Kom"],
      ["Kaur Keuangan", "Sri Lestari Handayani"], ["Kaur Perencanaan", "Citra Dewi Sutarno Putri"],
      ["Kepala Dusun 1", "Dwi Marwianto, SE"], ["Kepala Dusun 2", "Sri Widi Irianto"], ["Kepala Dusun 3", "Putut Ponco Indriatno"] ] },
  },
};

/* ============================================================
   KESEJAHTERAAN SOSIAL — rumah ibadah & tokoh agama (XLSX situs kecamatan).
   tahun null = tahun data tidak dicantumkan di berkas.
   ============================================================ */
const KESOS = {
  gereja: { tahun: null, berkasDiunggah: "Mei 2022", total: 9,
    url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/05/jumlah-gereja-1.xlsx",
    halaman: "https://mojolaban.sukoharjokab.go.id/submenu-multi/jumlah-gereja-1",
    perDesa: { Triyagan: 1, Sapen: 0, Joho: 2, Kragilan: 0, Klumprit: 0, Cangkol: 1, Bekonang: 0, Demakan: 0,
               Dukuh: 0, Wirun: 1, Tegalmade: 0, Laban: 0, Plumbon: 1, Gadingan: 2, Palur: 1 },
    keterangan: { Gadingan: "1 kapel" } },
  masjid: { tahun: 2019, total: 230,
    url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/05/jumlah-masjid-dan-tokoh-agama.xlsx",
    halaman: "https://mojolaban.sukoharjokab.go.id/submenu-multi/jumlah-masjid-dan-tokoh-agama",
    perDesa: { Triyagan: 15, Sapen: 18, Joho: 15, Kragilan: 10, Klumprit: 12, Cangkol: 20, Bekonang: 12, Demakan: 25,
               Dukuh: 13, Wirun: 15, Tegalmade: 6, Laban: 16, Plumbon: 15, Gadingan: 17, Palur: 21 },
    keterangan: { Triyagan: "1 kapel", Cangkol: "2 musala", Tegalmade: "1 musala", Gadingan: "2 kapel" } },
  /* Tokoh agama Islam; hanya 6 desa tercatat. Nama dan alamat tidak disalin. */
  tokoh: { tahun: null, total: 90,
    url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/05/jumlah-masjid-dan-tokoh-agama.xlsx",
    halaman: "https://mojolaban.sukoharjokab.go.id/submenu-multi/jumlah-masjid-dan-tokoh-agama",
    perDesa: { Wirun: 16, Triyagan: 13, Laban: 27, Gadingan: 22, Plumbon: 9, Kragilan: 3 } },
};
