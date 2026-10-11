# Website Informasi Kecamatan Mojolaban

Website statis tentang Kecamatan Mojolaban, Kabupaten Sukoharjo: profil kecamatan, daftar desa, info publik, berita, serta alamat dan kontak kantor.

Dibuat untuk tugas mata kuliah Sistem Terdistribusi. **Ini bukan situs resmi pemerintah.** Situs resminya ada di [mojolaban.sukoharjokab.go.id](https://mojolaban.sukoharjokab.go.id/).

Dibangun dengan HTML, CSS, dan JavaScript biasa, tanpa framework, backend, atau proses build.

## Menjalankan

Buka `index.html` di browser. Supaya perilakunya sama seperti di hosting, sebaiknya pakai server lokal:

- VS Code: klik kanan `index.html` → **Open with Live Server** (ekstensi Live Server).
- Python: jalankan `python -m http.server 8000` di folder proyek, lalu buka <http://localhost:8000>.

Font, peta, cuaca BMKG, dan foto berita dimuat dari internet. Tanpa koneksi, halaman tetap tampil, tetapi bagian-bagian itu tidak muncul.

## Struktur folder

```text
Mojolaban/
├── index.html              Beranda
├── berita.html             Daftar berita & pengumuman
├── berita-detail.html      Detail berita (berita-detail.html?id=...)
├── kontak.html             Alamat & kontak
├── profil/                 Profil, tupoksi, struktur organisasi
├── desa/                   Direktori desa dan profil desa
├── info/                   Kepegawaian, perangkat desa, kesejahteraan sosial, pelayanan umum
└── assets/
    ├── css/portal.css      Satu-satunya stylesheet
    ├── js/data.js          Semua data beserta sumbernya
    ├── js/mojo.js          Interaksi dan penyusunan konten dari data.js
    ├── js/salat.js         Perhitungan jadwal salat (dipakai di Beranda)
    └── img/                Logo dan foto
```

Profil desa yang ada sekarang: Bekonang, Gadingan, Plumbon, dan Wirun. `desa-palur.html` sudah ditautkan di menu, tetapi filenya belum dibuat.

Halaman di dalam `profil/`, `desa/`, dan `info/` memanggil aset dengan `../assets/...`. Halaman di folder utama memakai `assets/...`.

## File utama

- **`data.js`** menyimpan semua data: statistik kecamatan, 15 desa, berita, pegawai, perangkat desa, rumah ibadah, dan SOP. Setiap kelompok data mencantumkan sumbernya. Untuk mengubah atau menambah data, cukup edit file ini; halamannya ikut berubah.
- **`mojo.js`** mengatur navigasi (dropdown, menu mobile), panel "Hari ini" di Beranda (jam, cuaca, jadwal salat, status jam buka), dan menyusun daftar, tabel, serta grafik dari `data.js`. Elemen yang diisi otomatis ditandai atribut `data-...`, misalnya `data-pegawai="golongan"` atau `data-news-list="2"`.
- **`salat.js`** menghitung jadwal salat dengan kriteria Kemenag RI tanpa koneksi internet. Hasilnya sudah dicocokkan dengan jadwal Kemenag Kab. Sukoharjo 2026, dengan selisih paling banyak 1 menit.
- **`portal.css`** berisi seluruh tampilan. Warna dan ukuran diatur lewat variabel di `:root`.

## Menambah konten

- **Halaman baru:** salin halaman yang paling mirip di folder yang sama agar header, navbar, footer, dan path aset ikut benar. Ubah judul, deskripsi, dan isi `<main>`. Pindahkan `aria-current="page"` ke tautan halaman itu di navbar. Navbar ditulis di setiap file, jadi menu baru harus ditambahkan ke semua halaman.
- **Berita:** tambahkan entri di `BERITA` pada `data.js`. Formatnya dijelaskan di komentar file tersebut. Halaman detailnya otomatis tersedia.
- **Gambar:** simpan di `assets/img/` dan beri teks `alt` yang menjelaskan isi gambar.
- **Dokumen PDF/XLSX** tidak disimpan di proyek. Tautkan langsung ke berkas di situs resmi kecamatan.

Urutan script di akhir `<body>` harus `data.js` lalu `mojo.js`.

## Catatan data

Data dikumpulkan pada Oktober 2026.

- Daftar pegawai, bagan struktur, dan sebagian besar data perangkat desa berasal dari dokumen tahun 2022, jadi susunan pejabat saat ini bisa berbeda. Perangkat Desa Bekonang dan Gadingan diambil dari situs desa masing-masing.
- Luas wilayah dan jarak ke ibu kota kabupaten berbeda antarsumber. Website memakai angka Dispendukcapil 2024 (38,29 km²; 17 km).
- Status buka/tutup kantor belum memperhitungkan hari libur nasional.
- NIP, tanggal lahir, dan alamat rumah dari dokumen sumber sengaja tidak ditampilkan.

## Sumber data

- Situs resmi Kecamatan Mojolaban: <https://mojolaban.sukoharjokab.go.id/>
- PPID Kecamatan Mojolaban (berita): <https://ppid.mojolaban.sukoharjokab.go.id/>
- Profil Perkembangan Kependudukan Kab. Sukoharjo 2024, Dispendukcapil Kab. Sukoharjo
- Prakiraan cuaca BMKG: <https://data.bmkg.go.id/prakiraan-cuaca/>
- Jadwal salat Kemenag RI: <https://bimasislam.kemenag.go.id/jadwalshalat>
- Situs resmi Desa Bekonang, Gadingan, dan Wirun (untuk profil desa)
