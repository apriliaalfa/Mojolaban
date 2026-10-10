/**
 * data.js — Data Statis Website Kecamatan Mojolaban
 * Versi 4.0 · Oktober 2026
 *
 * ATURAN DATA:
 *   null  → data belum tersedia; tampilkan sebagai "Belum tersedia", jangan dikarang.
 *   Setiap angka wajib punya sumber (lihat SUMBER di bawah).
 *
 * Diverifikasi 10 Oktober 2026 terhadap:
 *   [kependudukan] Profil Perkembangan Kependudukan Kabupaten Sukoharjo 2024,
 *                  Dinas Kependudukan dan Pencatatan Sipil Kab. Sukoharjo
 *                  (Tabel 2.1, 2.2, 3.3, 3.4; tabel penduduk per desa Kec. Mojolaban)
 *   [papan]        Papan nama Kantor Kecamatan Mojolaban (assets/img/kecm.jpeg, ±2023)
 *   [kecamatan]    Situs resmi Kecamatan Mojolaban, mojolaban.sukoharjokab.go.id
 *                  (halaman Profil, Tupoksi, Struktur, Kontak, Berita; diakses 10 Okt 2026)
 *
 * CATATAN KONFLIK DATA: situs kecamatan dan Dispendukcapil mencatat luas dan jarak
 * ke ibu kota kabupaten yang berbeda. Keduanya ditampilkan beserta sumbernya;
 * jangan memilih salah satu sebagai angka pasti.
 */

/* ============================================================
   SUMBER
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
   DAFTAR 15 DESA
   Penduduk 2024: SUMBER.kependudukan (urutan kode = urutan tabel resmi)
   fokus:    lima desa kelompok (Bekonang, Palur, Plumbon, Gadingan, Wirun) yang punya halaman profil
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
   SOP PELAYANAN UMUM — daftar resmi dari situs kecamatan
   (halaman Info Publik › Pelayanan Umum). Dokumen PDF berupa
   Keputusan Camat hasil pindaian, diunggah 2022 (lihat path berkas).
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
  /* KLASIFIKASI SITUS INI (bukan kategori resmi pemerintah): indeks ke `daftar` */
  kelompok: [
    { nama: "Kependudukan",     isi: [1, 2, 3, 4, 6, 9] },
    { nama: "Surat keterangan", isi: [7, 8, 10] },
    { nama: "Lainnya",          isi: [0, 5, 11] },
  ],
};

/* ============================================================
   BERITA — kosong sampai ada berita terverifikasi.
   Format: { id, judul, tanggal: "2026-10-01", kategori, cuplikan,
             foto: "assets/img/...jpg" | null, fotoAlt, url }
   Entri pertama otomatis menjadi berita utama.
   ============================================================ */
const BERITA = [
  /* Berita & kegiatan dari situs PPID Kecamatan Mojolaban (diperiksa 10 Okt 2026).
     Ucapan hari besar tanpa kegiatan tidak dimuat. Cuplikan diringkas dari teks asli. */
  { id: "penyaluran-cadangan-pangan-pemerintah-daerah-cpp", judul: "Penyaluran Cadangan Pangan Pemerintah Daerah (CPPD) Kabupaten Sukoharjo Tahun 2026",
    tanggal: "2026-10-06", kategori: "Bantuan sosial", sumber: "ppid",
    cuplikan: "CPPD untuk penanganan kerawanan pangan didistribusikan di wilayah Kecamatan Mojolaban bagi keluarga penerima manfaat.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/penyaluran-cadangan-pangan-pemerintah-daerah-cppd-kabupaten-sukoharjo-tahun-2026" },
  { id: "upacara-peringatan-kesaktian-pancasila-tahun-202", judul: "Upacara Peringatan Kesaktian Pancasila Tahun 2026",
    tanggal: "2026-10-01", kategori: "Peringatan", sumber: "ppid",
    cuplikan: "Peringatan Hari Kesaktian Pancasila tahun 2026 oleh Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/upacara-peringatan-kesaktian-pancasila-tahun-2026" },
  { id: "monitoring-dan-evaluasi-administrasi-10-program-", judul: "Monev Administrasi 10 Program Pokok PKK Desa Binaan dalam rangka HKG PKK ke-54",
    tanggal: "2026-09-25", kategori: "PKK", sumber: "ppid",
    cuplikan: "Monitoring dan evaluasi tingkat Kabupaten Sukoharjo di Desa Kragilan dan Desa Dukuh untuk menilai pelaksanaan 10 Program Pokok PKK dan tertib administrasi desa.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/monitoring-dan-evaluasi-administrasi-10-program-pokok-pkk-desa-binaan-pkk-dalam-rangka-hari-kesatuan-gerak-pkk-ke-54-kabupaten-sukoharjo" },
  { id: "pengucapan-sumpahjanji-dan-peresmian-anggota-bad", judul: "Pengucapan Sumpah/Janji dan Peresmian Anggota BPD Masa Jabatan 2026–2034",
    tanggal: "2026-09-19", kategori: "Pemerintahan desa", sumber: "ppid",
    cuplikan: "Pemerintah Kecamatan Mojolaban meresmikan anggota Badan Permusyawaratan Desa se-Kecamatan Mojolaban masa jabatan 2026–2034.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/pengucapan-sumpahjanji-dan-peresmian-anggota-badan-permusyawaratan-desa-bpd-masa-jabatan-2026-2034" },
  { id: "longsor-tanggul-kali-samin-sepanjang-5o-m-pemdes", judul: "Longsor Tanggul Kali Samin Sepanjang ±50 m di Desa Laban Ditinjau",
    tanggal: "2026-02-24", kategori: "Kebencanaan", sumber: "ppid",
    cuplikan: "Plt. Camat, Kasi Trantib, Pemdes Laban, dan BBWS Bengawan Solo meninjau longsor tanggul Kali Samin di perbatasan Dukuh Krajan dan Dukuh Jatiteken, Desa Laban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/longsor-tanggul-kali-samin-sepanjang-5o-m-pemdes-laban-plt-camat-mojolaban-beserta-kasi-trantib-dan-staff-dan-bbws-lakukan-peninjauan" },
  { id: "sinergi-firkopimcam-mojolaban-bergerak-cepat-tin", judul: "Forkopimcam Mojolaban Tinjau Banjir di Desa Tegalmade dan Desa Gadingan",
    tanggal: "2026-02-23", kategori: "Kebencanaan", sumber: "ppid",
    cuplikan: "Plt. Camat bersama unsur TNI-Polri, perangkat desa, dan BPBD Sukoharjo meninjau genangan dan menyalurkan bantuan logistik kepada warga terdampak.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/sinergi-firkopimcam-mojolaban-bergerak-cepat-tinjau-banjir-di-desa-tegalmade-dan-desa-gadingan-serta-berikan-bantuan-logistik-untuk-warga-terdampak" },
  { id: "pengukuhan-penyuluh-pertanian-swadaya-pps-tulodh", judul: "Pengukuhan Penyuluh Pertanian Swadaya (PPS) Tulodho Tani se-Kabupaten Sukoharjo",
    tanggal: "2026-01-13", kategori: "Pertanian", sumber: "ppid",
    cuplikan: "Bupati Sukoharjo mengukuhkan Penyuluh Pertanian Swadaya di Balai Penyuluh Pertanian Kecamatan Mojolaban, didampingi Plt. Camat Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/pengukuhan-penyuluh-pertanian-swadaya-pps-tulodho-tani-se-kabupaten-sukoharjo-di-balai-penyuluh-pertanian-kecamatan-mojolaban-oleh-bupati-sukoharjo" },
  { id: "lepas-sambut-camat-kecamatan-mojolaban-tahun-202", judul: "Lepas Sambut Camat Kecamatan Mojolaban Tahun 2026",
    tanggal: "2026-01-13", kategori: "Pemerintahan", sumber: "ppid",
    cuplikan: "Lepas sambut Camat Mojolaban dari Joko Windarto, S.STP., M.H. kepada Sriyadi, S.E., di Pendhopo Kantor Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/lepas-sambut-camat-kecamatan-mojolaban-tahun-2026" },
  { id: "monitoring-evaluasi-lpj-keuangan-tahun-2025-keca", judul: "Monitoring & Evaluasi LPJ Keuangan Tahun 2025 Kecamatan Mojolaban",
    tanggal: "2026-01-12", kategori: "Pemerintahan", sumber: "ppid",
    cuplikan: "Tim Inspektorat Daerah Kabupaten Sukoharjo melakukan monev pertanggungjawaban penggunaan anggaran Kecamatan Mojolaban tahun 2025.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/monitoring-evaluasi-lpj-keuangan-tahun-2025-kecamatan-mojolaban" },
  { id: "rapat-koordinasi-awal-tahun-2026-kecamatan-mojol", judul: "Rapat Koordinasi Awal Tahun 2026 Kecamatan Mojolaban",
    tanggal: "2026-01-05", kategori: "Pemerintahan", sumber: "ppid",
    cuplikan: "Rapat dipimpin Plt. Camat bersama pejabat struktural dan staf untuk mempersiapkan tahun anggaran dan rencana kerja 2026.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/rapat-koordinasi-awal-tahun-2026-kecamatan-mojolaban" },
  { id: "desk-penyusunan-anggaran-pendapatan-dan-belanja-", judul: "Desk Penyusunan APBDes Tahun Anggaran 2026",
    tanggal: "2025-12-17", kategori: "Pemerintahan desa", sumber: "ppid",
    cuplikan: "15 desa se-Kecamatan Mojolaban mengikuti desk penyusunan APBDes 2026 di Balai Desa Plumbon, didampingi Dinas PMD Kabupaten Sukoharjo dan pendamping desa.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/desk-penyusunan-anggaran-pendapatan-dan-belanja-desa-tahun-anggaran-2026" },
  { id: "rapat-rutin-tp-pkk-kecamatan-dan-tp-pkk-desa-se-", judul: "Rapat Rutin TP PKK Kecamatan dan TP PKK Desa se-Kecamatan Mojolaban Desember 2025",
    tanggal: "2025-12-16", kategori: "PKK", sumber: "ppid",
    cuplikan: "Rapat rutin bulanan TP PKK kecamatan dan desa se-Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/rapat-rutin-tp-pkk-kecamatan-dan-tp-pkk-desa-se-kecaamatan-mojolaban-bulan-desember-2025" },
  { id: "upacara-peringatan-hari-kesaktian-pancasila-1-ok", judul: "Upacara Peringatan Hari Kesaktian Pancasila 2025 Kecamatan Mojolaban",
    tanggal: "2025-10-02", kategori: "Peringatan", sumber: "ppid",
    cuplikan: "Upacara di halaman Kantor Kecamatan dipimpin Danramil 10 Mojolaban, dihadiri Forkopimcam dan perangkat desa se-Kecamatan Mojolaban.",
    url: "https://ppid.mojolaban.sukoharjokab.go.id/informasi/beritadetail/upacara-peringatan-hari-kesaktian-pancasila-1-oktober-kecamatan-mojolaban" },
];

/* Pengumuman terakhir di situs resmi kecamatan (diperiksa 10 Okt 2026). */
const PENGUMUMAN = [
  { judul: "Situasi Wabah Penyakit Mulut dan Kuku (PMK) di Kabupaten Sukoharjo", tanggal: "2022-06-07", sumber: "kecamatan",
    url: "https://mojolaban.sukoharjokab.go.id/pengumuman/situasi-wabah-penyakit-mulut-dan-kuku-pmk-di-kabupaten-sukoharjo" },
];

/* ============================================================
   LOKASI & KANAL RESMI
   ============================================================ */
const LOKASI = {
  /* Kantor kecamatan: kode lokasi Google Maps 6P4G9VVC+G78 (±−7,6062; 110,8707) */
  kantor: { lintang: -7.6062, bujur: 110.8707 },
  /* Prakiraan cuaca BMKG tingkat desa: Desa Bekonang, tempat kantor kecamatan berada */
  bmkg: { adm4: "33.11.08.2004", desa: "Bekonang",
          url: "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=33.11.08.2004",
          sumber: "https://data.bmkg.go.id/prakiraan-cuaca/" },
  peta: "https://www.google.com/maps?q=Kantor+Kecamatan+Mojolaban,+Sukoharjo&output=embed",
  petunjukArah: "https://www.google.com/maps/dir/?api=1&destination=Kantor+Kecamatan+Mojolaban+Sukoharjo",
};

/* Rujukan URL kanal resmi; teks halaman saat ini ditulis langsung di HTML. */
const KANAL = {
  ppid:  { nama: "PPID Kecamatan Mojolaban", url: "https://ppid.mojolaban.sukoharjokab.go.id/",
           fungsi: "Permohonan informasi publik dan pengajuan keberatan informasi" },
  lapor: { nama: "SP4N-LAPOR!", url: "https://www.lapor.go.id/",
           fungsi: "Kanal pengaduan pelayanan publik nasional (bukan layanan internal kecamatan)" },
  jadwalSalat: { nama: "Jadwal Shalat Kemenag RI", url: "https://bimasislam.kemenag.go.id/jadwalshalat" },
};

/* ============================================================
   PEGAWAI KECAMATAN — "Daftar Pegawai Kecamatan Mojolaban Tahun 2022"
   (5 berkas PDF resmi). NIP sengaja TIDAK disalin (memuat tanggal lahir).
   jk & pend sesuai kolom dokumen (total dokumen: L 12, P 5; S-2 3, S-1 6,
   D-III 4, SLTA/D-1 4).
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
   STRUKTUR ORGANISASI — bagan resmi (tanpa tanggal; nama sesuai dokumen
   pegawai 2022). Halaman "Profil Plt. Camat" (tanpa tanggal) menyebut
   Wisnu Pramudiya Wardhana sebagai Plt. Camat → pejabat saat ini perlu konfirmasi.
   ============================================================ */
/* Rujukan sumber bagan; bagan di struktur.html ditulis langsung di HTML. */
const STRUKTUR = {
  gambar: "https://mojolaban.sukoharjokab.go.id/storage/4F8bH8J9WUpXxlriwR9RmqvRuQi5ZO1InoT88wJa.jpeg",
  halaman: "https://mojolaban.sukoharjokab.go.id/profil/struktur",
  halamanPlt: "https://mojolaban.sukoharjokab.go.id/submenu/profil-plt-camat-1",
};

/* ============================================================
   PERANGKAT DESA — dokumen resmi per desa (2022). Hanya nama & jabatan
   yang ditampilkan; tempat/tanggal lahir, agama, dan nomor SK tidak disalin.
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
  /* Diverifikasi baris per baris dari PDF resmi desa yang bersangkutan */
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
   KESEJAHTERAAN SOSIAL — rumah ibadah & tokoh agama (XLSX situs kecamatan)
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
  /* Lembar "tokoh agama per desa" (tokoh agama Islam). Hanya 6 desa tercatat.
     Nama & alamat rumah tidak disalin. */
  tokoh: { tahun: null, total: 90,
    url: "https://mojolaban.sukoharjokab.go.id/storage/files/2022/05/jumlah-masjid-dan-tokoh-agama.xlsx",
    halaman: "https://mojolaban.sukoharjokab.go.id/submenu-multi/jumlah-masjid-dan-tokoh-agama",
    perDesa: { Wirun: 16, Triyagan: 13, Laban: 27, Gadingan: 22, Plumbon: 9, Kragilan: 3 } },
};
