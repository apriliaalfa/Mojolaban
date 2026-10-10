# Website Informasi Kecamatan Mojolaban

Website statis berisi informasi Kecamatan Mojolaban, Kabupaten Sukoharjo, Jawa Tengah: profil kecamatan, daftar desa, info publik (kepegawaian, perangkat desa, kesejahteraan sosial, pelayanan umum), berita, serta alamat dan kontak.

Dibuat untuk keperluan akademik (mata kuliah Sistem Terdistribusi). **Website ini bukan situs resmi pemerintah.** Situs resmi kecamatan: <https://mojolaban.sukoharjokab.go.id/>.

Teknologi: HTML, CSS, dan JavaScript biasa (tanpa framework, tanpa backend, tanpa proses build).

---

## Menjalankan secara lokal

Cara paling mudah: buka `index.html` langsung di browser (klik dua kali).

Cara yang disarankan, supaya perilakunya sama seperti di hosting, adalah memakai server lokal sederhana:

- **VS Code:** pasang ekstensi *Live Server*, klik kanan `index.html` lalu pilih **Open with Live Server**.
- **Python:** jalankan `python -m http.server 8000` di folder proyek, lalu buka <http://localhost:8000>.

Perlu koneksi internet untuk font (Google Fonts), peta (Google Maps), dan cuaca (API BMKG). Tanpa internet, halaman tetap tampil, peta tidak muncul, dan panel cuaca menampilkan pesan "Data cuaca BMKG tidak dapat dimuat".

---

## Struktur folder

```text
Mojolaban/
├── index.html                  Beranda
├── profil.html                 Profil Kecamatan Mojolaban ┐
├── tupoksi.html                Tupoksi, Visi, dan Misi    ├ menu "Profil Kecamatan Mojolaban"
├── struktur.html               Struktur Organisasi        ┘
├── desa.html                   Direktori 15 desa          ┐
├── desa-bekonang.html          Desa Bekonang (belum dibuat) ├ menu "Daftar Desa"
├── desa-palur.html             Desa Palur (belum dibuat)  │  lima desa kelompok;
├── desa-plumbon.html           Desa Plumbon (kosong)      │  navigasi sudah menaut
├── desa-gadingan.html          Desa Gadingan (belum dibuat) │ ke nama file ini
├── desa-wirun.html             Desa Wirun                 ┘
├── pegawai.html                Daftar pegawai             ┐
├── pegawai-eselon.html         … berdasarkan eselon       │
├── pegawai-golongan.html       … berdasarkan golongan     │
├── pegawai-jenis-kelamin.html  … berdasarkan jenis kelamin│
├── pegawai-pendidikan.html     … berdasarkan pendidikan   ├ menu "Info Publik"
├── perangkat-desa.html         Data perangkat desa        │
├── gereja.html                 Jumlah gereja              │
├── masjid.html                 Jumlah masjid              │
├── tokoh-agama.html            Tokoh agama                │
├── pelayanan-umum.html         Pelayanan umum (12 SOP)    ┘
├── berita.html                 Berita & pengumuman
├── kontak.html                 Alamat & Kontak
├── assets/
│   ├── css/
│   │   └── portal.css          Satu-satunya stylesheet (dipakai semua halaman)
│   ├── js/
│   │   ├── data.js             Semua data + sumbernya (diubah di sini, bukan di HTML)
│   │   ├── mojo.js             Interaksi: navbar, tabel/grafik dari data, cuaca, dll.
│   │   └── salat.js            Perhitungan jadwal salat (hanya dimuat di index.html)
│   └── img/
│       ├── kecm.jpeg           Foto Kantor Kecamatan Mojolaban
│       └── skh-logo.png        Lambang Kabupaten Sukoharjo
└── README.md
```

Halaman HTML sengaja diletakkan di folder utama supaya semua tautan antarhalaman cukup ditulis `nama-halaman.html` dan path aset selalu diawali `assets/`.

Dokumen PDF dan XLSX (daftar pegawai, data perangkat desa, SOP, data rumah ibadah) **tidak disimpan di proyek**. Website menautkan langsung ke berkas aslinya di situs resmi kecamatan, sehingga selalu merujuk ke sumber resmi.

---

## Fungsi file CSS dan JavaScript

### `assets/css/portal.css`

Sistem desain "papan informasi kantor". Bagian di dalamnya bernomor:

1. **Tokens.** Variabel warna, font, jarak, dan radius di `:root`. Ubah warna atau ukuran di sini, jangan di tiap aturan.
2–4. Reset, layout (`.container`, `.section`, `.split`), komponen dasar (`.btn`, `.status`, `.source`).
5–6. Header, navbar, dropdown, mega-panel Info Publik, dan menu mobile.
7–11. Komponen Beranda (hero, panel "Hari ini", "Yang sering dicari", berita, peta).
12–16. Komponen halaman dalam: kepala halaman (`.page-head` dan `.subnav`), tabel data, grafik batang, daftar dokumen, bagan organisasi, direktori desa.
17–18. Footer, cetak, dan preferensi gerak.

### `assets/js/data.js`

Satu-satunya tempat data. Setiap kelompok data dilengkapi sumber dan tahunnya:

| Konstanta | Isi |
|---|---|
| `SUMBER` | Daftar sumber yang dikutip |
| `KECAMATAN` | Kode wilayah, statistik 2024, kontak, jam operasional, angka wilayah versi situs kecamatan |
| `DESA` | 15 desa: kode, penduduk 2024 (L/P), kategori filter, halaman profil |
| `POTENSI` | Catatan wilayah (halaman Profil) |
| `SOP_PELAYANAN` | 12 SOP pelayanan dan tautan dokumennya |
| `BERITA`, `PENGUMUMAN` | Berita dan pengumuman dari situs resmi (berita terbaru ada di urutan teratas) |
| `LOKASI` | Kode wilayah BMKG (Desa Bekonang) dan URL peta |
| `PEGAWAI` | 17 pegawai (2022): jabatan, nama, golongan, eselon, jenis kelamin, pendidikan |
| `PERANGKAT_DESA` | Daftar dokumen per desa dan rincian nama/jabatan untuk Palur dan Plumbon |
| `KESOS` | Jumlah gereja, masjid (2019), dan tokoh agama per desa |
| `KANAL`, `STRUKTUR` | Rujukan URL sumber (belum dipakai JS; teksnya ada di HTML) |

### `assets/js/mojo.js`

Dipakai semua halaman. Setiap modul hanya berjalan jika elemen targetnya ada di halaman tersebut.

1. **Navigasi:** dropdown dan mega-panel dibuka dengan klik; Escape dan klik di luar menutupnya; tombol panah; accordion di mobile.
2. **Panel "Hari ini" (Beranda):** tanggal WIB, cuaca BMKG (cache 30 menit, dengan pesan jujur saat gagal), jadwal salat, dan status buka/tutup kantor.
3. **Berita dan pengumuman.**
4. **Desa:** grafik peringkat penduduk, direktori dengan pencarian dan filter, data rumah ibadah per desa.
5. **Info publik:** tabel pegawai (5 tampilan), perangkat desa, grafik kesejahteraan sosial, daftar SOP.
6. **Profil:** catatan wilayah.

Elemen HTML yang diisi JS ditandai atribut `data-…` (misalnya `data-pegawai="golongan"`, `data-kesos="masjid"`, `data-news-list="2"`).

### `assets/js/salat.js`

Menghitung jadwal salat dengan kriteria Kemenag RI (Subuh −20°, Isya −18°, ihtiyat). Hasilnya sudah diuji terhadap jadwal resmi Kemenag Kab. Sukoharjo tahun 2026: 2.338 dari 2.555 waktu sama persis, sisanya berselisih 1 menit. Tidak memerlukan internet.

---

## Menambahkan halaman baru

1. **Salin halaman yang paling mirip**, misalnya `kontak.html` untuk halaman sederhana atau `masjid.html` untuk halaman data. Dengan begitu header, navbar, footer, dan urutan script ikut tersalin.
2. **Ubah** `<title>`, `<meta name="description">`, dan isi di antara `<main id="main">` dan `</main>`.
3. **Tandai menu aktif di navbar halaman baru:**
   - Pindahkan atribut `aria-current="page"` ke tautan halaman tersebut di dalam `<nav class="nav">`.
   - Jika halamannya berada di dalam dropdown/mega-panel, tambahkan kelas `is-current` pada `<li class="nav__item …">` induknya.
4. **Kalau halaman perlu masuk navbar,** tambahkan tautannya ke navbar **di semua halaman** (header ditulis langsung di setiap file HTML). Cara cepat: *Find & Replace in Files* di VS Code.
5. **Pertahankan urutan script di akhir `<body>`:**
   ```html
   <script src="assets/js/data.js"></script>
   <script src="assets/js/mojo.js"></script>
   ```

Pola isi yang sudah tersedia di `portal.css`: `.page-head` (kepala halaman berlatar gelap), `.subnav` (tab antarhalaman sejenis), `.split` (dua kolom), `.facts` (daftar keterangan), `.table-wrap` dan `.table` (tabel), `.docs` (daftar dokumen), `.notice` (catatan penting), `.source` (keterangan sumber).

---

## Menambahkan gambar atau dokumen

- **Gambar:** simpan di `assets/img/`, lalu panggil dengan `<img src="assets/img/nama-file.jpg" alt="deskripsi isi gambar" width="…" height="…">`. Pakai hanya foto yang lokasinya jelas Mojolaban, dan tulis keterangan foto.
- **Dokumen (PDF/XLSX):** utamakan menautkan berkas di situs resmi. Jika memang harus disimpan di proyek, buat folder `assets/docs/` lalu tautkan `assets/docs/nama-berkas.pdf`.
- **Berita baru:** tambahkan entri di array `BERITA` dalam `data.js` (format tertera di komentar). Isi hanya dengan berita yang benar-benar terbit dan tautkan ke sumber aslinya.

---

## Catatan data yang masih perlu diverifikasi

Data dikumpulkan pada 10 Oktober 2026. Hal berikut ditandai di website dan perlu dicek ulang ke kantor kecamatan:

- **Pejabat saat ini.** Bagan struktur dan daftar pegawai berasal dari dokumen 2022. Berita PPID (13 Jan 2026) mencatat lepas sambut Camat dari Joko Windarto kepada Sriyadi, S.E. (disebut Plt. Camat); susunan lengkap 2026 belum dipublikasikan.
- **Berita** dihimpun dari PPID Kecamatan Mojolaban (`informasi/berita`); tambahkan entri baru di `BERITA` pada `data.js`.
- **Luas wilayah dan jarak ke ibu kota kabupaten** berbeda antara situs kecamatan (35,54 km²; 11 km) dan Dispendukcapil 2024 (38,29 km²; 17 km). Website menampilkan keduanya.
- **Perangkat desa** berasal dari dokumen 2022. Desa Gadingan dan lima desa lain tidak memiliki dokumen di situs resmi.
- **Persyaratan tiap SOP** tidak disalin karena dokumennya berupa pindaian; pengunjung diarahkan ke dokumen resmi.
- **Sejarah dan visi Desa Plumbon** belum terverifikasi, karena situs desanya tidak dapat diakses saat diperiksa.
- **Berita resmi terakhir** di situs kecamatan bertanggal 17 Juli 2024.
- **Status buka/tutup** belum memperhitungkan hari libur nasional.
- **Data pribadi:** NIP pegawai, tanggal lahir, agama, dan alamat rumah dari dokumen sumber sengaja tidak ditampilkan.

## Sumber utama

- Situs resmi Kecamatan Mojolaban: <https://mojolaban.sukoharjokab.go.id/>
- Profil Perkembangan Kependudukan Kab. Sukoharjo 2024 (Dispendukcapil)
- Prakiraan cuaca BMKG: <https://data.bmkg.go.id/prakiraan-cuaca/>
- Jadwal salat Kemenag RI: <https://bimasislam.kemenag.go.id/jadwalshalat>
- PPID Kecamatan Mojolaban: <https://ppid.mojolaban.sukoharjokab.go.id/>
