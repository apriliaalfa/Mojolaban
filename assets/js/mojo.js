/**
 * mojo.js — Interaksi website Kecamatan Mojolaban, dipakai semua halaman.

 *   1. Navigasi: dropdown, menu mobile, header, slider desa
 *   2. Panel "Hari ini": tanggal, jam, jadwal salat, jam buka kantor, cuaca BMKG
 *   3. Berita: daftar, filter, topik, halaman detail, pengumuman
 *   4. Desa: peringkat penduduk, direktori, rumah ibadah per desa
 *   5. Info publik: pegawai, perangkat desa, kesejahteraan sosial, SOP,
 *      sakelar Grafik/Tabel, tooltip grafik, bagan struktur, animasi muncul
 *   6. Profil: catatan wilayah
 */
(function () {
  'use strict';

  /* ── Utilitas ── */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function fmt(n) { return (n === null || n === undefined) ? '' : Number(n).toLocaleString('id-ID'); }
  // Escape teks sebelum disisipkan ke innerHTML
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Tautan ke situs luar: tab baru + penanda ↗ untuk pembaca layar
  function ext(url, label) {
    return '<a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(label) +
      ' <span aria-hidden="true">↗</span><span class="sr-only">(situs luar)</span></a>';
  }
  var BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  // "2026-10-06" → "6 Oktober 2026"
  function tanggalPanjang(iso) {
    var p = String(iso).split('-').map(Number);
    return p.length === 3 ? p[2] + ' ' + BULAN[p[1] - 1] + ' ' + p[0] : esc(iso);
  }

  /* Waktu WIB (UTC+7), tidak bergantung zona waktu perangkat pengunjung */
  function nowWib() {
    var d = new Date(Date.now() + 7 * 3600 * 1000);
    return {
      y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), dow: d.getUTCDay(),
      menit: d.getUTCHours() * 60 + d.getUTCMinutes()
    };
  }
  // Menit sejak tengah malam → "HH.MM"
  function jamMenit(menit) {
    var h = Math.floor(menit / 60), m = menit % 60;
    return (h < 10 ? '0' : '') + h + '.' + (m < 10 ? '0' : '') + m;
  }

  /* ────────────────────────────────────────────────────────
     1. NAVIGASI
  ──────────────────────────────────────────────────────── */
  var mainNav = qs('#main-nav');
  var mainToggle = qs('[data-nav-toggle]');
  var desktopMq = window.matchMedia('(min-width: 1120px)');

  if (mainNav) {
    /* 1a. Dropdown: dibuka dengan klik atau keyboard; di desktop juga dengan hover (CSS) */
    var triggers = qsa('[data-dd]', mainNav);
    var panelOf = function (btn) { return document.getElementById(btn.getAttribute('aria-controls')); };
    var itemOf = function (btn) { return btn.closest('.nav__item'); };
    var linksIn = function (panel) { return qsa('a[href]', panel); };

    var closeItem = function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      itemOf(btn).classList.remove('is-open');
    };
    var closeAll = function (except) { triggers.forEach(function (b) { if (b !== except) closeItem(b); }); };
    var openItem = function (btn) {
      closeAll(btn);
      btn.setAttribute('aria-expanded', 'true');
      itemOf(btn).classList.add('is-open');
    };
    var openTrigger = function () {
      return triggers.filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; })[0];
    };

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('aria-expanded') === 'true') closeItem(btn); else openItem(btn);
      });
      // Panah bawah pada tombol: buka dropdown dan fokus ke tautan pertama
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          openItem(btn);
          var first = linksIn(panelOf(btn))[0];
          if (first) first.focus();
        }
      });
      // Di dalam dropdown: panah atas/bawah berputar, Home/End ke ujung
      panelOf(btn).addEventListener('keydown', function (e) {
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].indexOf(e.key) === -1) return;
        var links = linksIn(panelOf(btn));
        var i = links.indexOf(document.activeElement);
        if (i === -1) return;
        e.preventDefault();
        var next = e.key === 'Home' ? 0 : e.key === 'End' ? links.length - 1
          : (i + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        links[next].focus();
      });
      // Desktop: dropdown yang dibuka dengan klik ikut tertutup saat kursor atau fokus keluar
      itemOf(btn).addEventListener('mouseenter', function () { if (desktopMq.matches) closeAll(btn); });
      itemOf(btn).addEventListener('mouseleave', function () { if (desktopMq.matches && !itemOf(btn).contains(document.activeElement)) closeItem(btn); });
      itemOf(btn).addEventListener('focusout', function (e) {
        if (desktopMq.matches && e.relatedTarget && !itemOf(btn).contains(e.relatedTarget)) closeItem(btn);
      });
    });

    // Klik di luar navigasi menutup dropdown (desktop)
    document.addEventListener('click', function (e) {
      if (desktopMq.matches && !e.target.closest('#main-nav')) closeAll();
    });

    /* 1b. Menu mobile: panel geser dari kanan, latar gelap, dan tombol Tutup di dalam panel */
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    (mainNav.closest('.header') || document.body).appendChild(backdrop);   // di dalam header agar tidak menutupi panel
    mainNav.insertAdjacentHTML('afterbegin', '<div class="nav-drawer__head"><span class="nav-drawer__title">Menu</span>' +
      '<button type="button" class="nav-drawer__close"><svg class="icon" aria-hidden="true"><use href="#i-close"/></svg>Tutup</button></div>');
    var drawerClose = qs('.nav-drawer__close', mainNav);

    // Buka/tutup panel; halaman di belakang dikunci dan fokus dipindah ke dalam/luar panel
    var setMobileOpen = function (open) {
      if (!mainToggle) return;
      var wasOpen = mainNav.classList.contains('is-open');
      mainNav.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('nav-locked', open && !desktopMq.matches);
      mainToggle.setAttribute('aria-expanded', String(open));
      mainToggle.querySelector('.nav-toggle__text').textContent = open ? 'Tutup' : 'Menu';
      if (open && !desktopMq.matches) drawerClose.focus();
      if (!open) { closeAll(); if (wasOpen && !desktopMq.matches) mainToggle.focus(); }
    };
    backdrop.addEventListener('click', function () { setMobileOpen(false); });
    drawerClose.addEventListener('click', function () { setMobileOpen(false); });
    if (mainToggle) {
      mainToggle.addEventListener('click', function () {
        setMobileOpen(mainToggle.getAttribute('aria-expanded') !== 'true');
      });
    }
    // Escape: tutup dropdown dulu, lalu panel menu mobile
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = openTrigger();
      if (open) { closeItem(open); open.focus(); return; }
      if (mainToggle && mainNav.classList.contains('is-open')) { setMobileOpen(false); mainToggle.focus(); }
    });
    desktopMq.addEventListener('change', function () { setMobileOpen(false); closeAll(); });
  }

  /* 1c. Header: bayangan saat halaman digulir */
  var siteHeader = qs('.header');
  if (siteHeader) {
    var onScroll = function () { siteHeader.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* 1d. Slider desa berjalan otomatis (berhenti saat hover/fokus). Isi digandakan agar
         putarannya tanpa jeda; salinannya disembunyikan dari pembaca layar dan Tab.
         Reduced motion: tidak beranimasi. */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  qsa('[data-slider]').forEach(function (sl) {
    var track = qs('.vslider__track', sl);
    if (!track || reduceMotion) return;
    var asli = Array.prototype.slice.call(track.children);
    asli.forEach(function (li) {
      var c = li.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      qsa('a', c).forEach(function (a) { a.setAttribute('tabindex', '-1'); });
      track.appendChild(c);
    });
    track.removeAttribute('tabindex');
    sl.style.setProperty('--vs-dur', (asli.length * 6) + 's');   // 6 detik per kartu
    sl.classList.add('is-auto');
  });

  if (typeof KECAMATAN === 'undefined') return;  // modul di bawah butuh data.js

  /* ────────────────────────────────────────────────────────
     2. PANEL "HARI INI"
  ──────────────────────────────────────────────────────── */
  var todayDate = qs('[data-today-date]');
  if (todayDate) {
    var w = nowWib();
    todayDate.textContent = HARI[w.dow] + ', ' + w.d + ' ' + BULAN[w.m - 1] + ' ' + w.y;
  }

  /* 2a. Jam saat ini (HH.MM WIB); diperbarui tiap detik agar pergantian menit tepat waktu */
  var clocks = qsa('[data-clock]');
  if (clocks.length) {
    var tick = function () {
      var d = new Date(Date.now() + 7 * 3600 * 1000);
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      var t = p(d.getUTCHours()) + '.' + p(d.getUTCMinutes());
      clocks.forEach(function (c) { c.textContent = t; });
    };
    tick(); setInterval(tick, 1000);
  }

  /* 2b. Jadwal salat hari ini dari salat.js; waktu berikutnya ditandai */
  var prayBox = qs('[data-pray]');
  function renderPray() {
    if (!prayBox || typeof Salat === 'undefined') return;
    var w = nowWib();
    var j = Salat.hitung(w.y, w.m, w.d);
    var urut = [['subuh', 'Subuh'], ['dzuhur', 'Dzuhur'], ['ashar', 'Asar'], ['maghrib', 'Magrib'], ['isya', 'Isya']];
    var next = urut.filter(function (u) { return j[u[0]] > w.menit; })[0];
    var besok = null;
    if (!next) {   // setelah Isya → Subuh esok hari
      var t = new Date(Date.UTC(w.y, w.m - 1, w.d + 1));
      besok = Salat.hitung(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
    }
    prayBox.innerHTML = urut.map(function (u) {
      var isNext = next && next[0] === u[0];
      return '<li' + (isNext ? ' class="is-next"' : '') + '><span class="pray__name">' + u[1] +
        (isNext ? '<span class="sr-only"> (berikutnya)</span>' : '') + '</span>' +
        '<span class="pray__time">' + jamMenit(j[u[0]]) + '</span></li>';
    }).join('');
    var note = qs('[data-pray-note]');
    if (note) {
      note.innerHTML = next
        ? 'Berikutnya <b>' + next[1] + ' pukul ' + jamMenit(j[next[0]]) + ' WIB</b> · Imsak ' + jamMenit(j.imsak) + ', terbit ' + jamMenit(j.terbit)
        : 'Berikutnya <b>Subuh besok pukul ' + jamMenit(besok.subuh) + ' WIB</b>';
    }
  }
  renderPray();

  /* 2c. Status jam buka kantor. Hari libur nasional belum diperhitungkan. */
  var openBox = qs('[data-open-status]');
  function renderOpen() {
    if (!openBox) return;
    var w = nowWib();
    // hari (1 = Senin) → [buka, tutup] dalam menit: 07.00–15.30, Jumat 07.00–14.00
    var jam = { 1: [420, 930], 2: [420, 930], 3: [420, 930], 4: [420, 930], 5: [420, 840] };
    var h = jam[w.dow];
    var buka = h && w.menit >= h[0] && w.menit < h[1];
    var teks;
    if (buka) teks = 'Sedang buka · tutup pukul ' + jamMenit(h[1]) + ' WIB';
    else if (h && w.menit < h[0]) teks = 'Tutup · buka hari ini pukul 07.00 WIB';
    else {
      var nd = w.dow;
      do { nd = (nd + 1) % 7; } while (!jam[nd]);
      teks = 'Tutup · buka ' + HARI[nd] + ' pukul 07.00 WIB';
    }
    openBox.textContent = teks;
    openBox.classList.toggle('is-open', !!buka);
  }
  renderOpen();
  if (prayBox || openBox) setInterval(function () { renderPray(); renderOpen(); }, 60000);

  /* 2d. Cuaca BMKG Desa Bekonang. Disimpan 30 menit di sessionStorage; bila gagal dimuat
         ditampilkan pesan + tautan BMKG (tanpa angka cadangan). */
  var wxBox = qs('[data-weather]');
  if (wxBox && typeof LOKASI !== 'undefined') {
    var CACHE = 'mojolaban-bmkg-v1';
    var gagal = function () {
      wxBox.innerHTML = '<p class="wx__status">Data cuaca BMKG tidak dapat dimuat saat ini. ' +
        ext('https://www.bmkg.go.id/', 'Lihat prakiraan di situs BMKG') + '</p>';
    };
    var tampil = function (data) {
      var slots = [];
      (data.data && data.data[0] && data.data[0].cuaca || []).forEach(function (hari) { slots = slots.concat(hari); });
      if (!slots.length) return gagal();
      var now = Date.now();
      var waktuSlot = function (s) { return Date.parse(s.utc_datetime.replace(' ', 'T') + 'Z'); };
      // slot yang sedang berlaku: slot terakhir yang sudah dimulai, atau slot pertama
      var idx = 0;
      slots.forEach(function (s, i) { if (waktuSlot(s) <= now) idx = i; });
      var c = slots[idx];
      var lokal = String(c.local_datetime).slice(11, 16).replace(':', '.');
      var berikut = slots.slice(idx + 1, idx + 4);
      wxBox.innerHTML =
        '<div class="wx__now">' +
        '<span class="wx__temp">' + fmt(c.t) + '°C</span>' +
        (c.image ? '<img class="wx__icon" src="' + esc(c.image) + '" alt="" width="52" height="52">' : '') +
        '<div><p class="wx__desc">' + esc(c.weather_desc) + '</p>' +
        '<p class="wx__meta">Kelembapan ' + fmt(c.hu) + '% · angin ' + fmt(c.ws) + ' km/jam</p></div>' +
        '</div>' +
        (berikut.length ? '<ul class="wx__next" aria-label="Prakiraan berikutnya">' + berikut.map(function (s) {
          return '<li><b>' + String(s.local_datetime).slice(11, 16).replace(':', '.') + '</b>' + fmt(s.t) + '° · ' + esc(s.weather_desc) + '</li>';
        }).join('') + '</ul>' : '') +
        '<p class="source mt-3">Prakiraan BMKG untuk pukul ' + lokal + ' WIB, Desa Bekonang. ' + ext(LOKASI.bmkg.sumber, 'Sumber: BMKG') + '</p>';
    };
    var cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(CACHE) || 'null'); } catch (e) { cached = null; }
    if (cached && Date.now() - cached.t < 30 * 60 * 1000) {
      tampil(cached.d);
    } else {
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 10000);
      fetch(LOKASI.bmkg.url, ctrl ? { signal: ctrl.signal } : {})
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (d) {
          clearTimeout(timer);
          try { sessionStorage.setItem(CACHE, JSON.stringify({ t: Date.now(), d: d })); } catch (e) { /* abaikan */ }
          tampil(d);
        })
        .catch(function () { clearTimeout(timer); gagal(); });
    }
  }

  /* ────────────────────────────────────────────────────────
     3. BERITA & PENGUMUMAN
  ──────────────────────────────────────────────────────── */
  var sumberNama = function (key) { return SUMBER[key] ? SUMBER[key].judul : ''; };
  var berita = (typeof BERITA !== 'undefined' ? BERITA.slice() : []).sort(function (a, b) { return a.tanggal < b.tanggal ? 1 : -1; });
  /* Tautan detail berita. ROOT = awalan path ke folder utama, dibaca dari tag <script> mojo.js,
     agar tautan benar dari halaman di subfolder. */
  var mojoTag = qs('script[src$="assets/js/mojo.js"]');
  var ROOT = mojoTag ? mojoTag.getAttribute('src').replace(/assets\/js\/mojo\.js$/, '') : '';
  var detailUrl = function (b) { return ROOT + 'berita-detail.html?id=' + encodeURIComponent(b.id); };

  /* 3a. Berita utama (terbaru) + daftar berita berikutnya; data-news-list="2" = batas jumlah */
  var leadBox = qs('[data-news-lead]');
  var newsLists = qsa('[data-news-list]');
  var renderNews = function (items) {
    if (leadBox && items.length) {
      var b0 = items[0];
      var p0 = b0.tanggal.split('-').map(Number);
      leadBox.innerHTML =
        '<article class="news-lead">' +
        '<p class="news-lead__date">' + p0[2] + '<small>' + BULAN[p0[1] - 1] + ' ' + p0[0] + '</small></p>' +
        '<h3 class="news-lead__title"><a href="' + esc(detailUrl(b0)) + '">' + esc(b0.judul) + '</a></h3>' +
        '<p class="news-lead__excerpt">' + esc(b0.cuplikan) + '</p>' +
        '<p class="news-meta news-lead__src"><span class="tag">' + esc(b0.kategori) + '</span><span>' + esc(sumberNama(b0.sumber)) + '</span></p>' +
        '</article>';
    }
    newsLists.forEach(function (list) {
      var limit = +list.getAttribute('data-news-list') || 99;
      list.innerHTML = items.slice(1, 1 + limit).map(function (b) {
        return '<li><p class="news-meta"><time datetime="' + esc(b.tanggal) + '">' + tanggalPanjang(b.tanggal) + '</time><span class="tag">' + esc(b.kategori) + '</span></p>' +
          '<h3 class="news-row__title"><a href="' + esc(detailUrl(b)) + '">' + esc(b.judul) + '</a></h3>' +
          '<p class="news-row__excerpt">' + esc(b.cuplikan) + '</p></li>';
      }).join('');
    });
  };
  if (berita.length) renderNews(berita);

  /* 3b. Filter kategori (dibuat dari kategori yang ada di data) */
  var newsChips = qs('[data-news-chips]');
  if (newsChips && berita.length) {
    var kat = [];
    berita.forEach(function (b) { if (kat.indexOf(b.kategori) === -1) kat.push(b.kategori); });
    var hitung = function (k) { return berita.filter(function (b) { return k === 'semua' || b.kategori === k; }).length; };
    newsChips.innerHTML = '<span class="toolbar__label" id="news-filter-l">Kategori</span><div class="chips" role="group" aria-labelledby="news-filter-l">' +
      ['semua'].concat(kat).map(function (k, i) {
        return '<button class="chip" type="button" data-kat="' + esc(k) + '" aria-pressed="' + (i === 0) + '">' + (k === 'semua' ? 'Semua' : esc(k)) +
          '<span class="count">' + hitung(k) + '</span></button>';
      }).join('') + '</div>';
    qsa('[data-kat]', newsChips).forEach(function (c) {
      c.addEventListener('click', function () {
        qsa('[data-kat]', newsChips).forEach(function (b) { b.setAttribute('aria-pressed', String(b === c)); });
        var k = c.getAttribute('data-kat');
        renderNews(berita.filter(function (b) { return k === 'semua' || b.kategori === k; }));
      });
    });
  }
  /* 3c. Topik berita di kolom samping: jumlah dan tanggal terbaru per kategori; klik = filter */
  var topicBox = qs('[data-news-topics]');
  if (topicBox && newsChips && berita.length) {
    var topik = [];
    berita.forEach(function (b) {   // berita sudah urut terbaru → tanggal pertama = terbaru
      var t = topik.filter(function (x) { return x.k === b.kategori; })[0];
      if (t) t.n++; else topik.push({ k: b.kategori, n: 1, baru: b.tanggal });
    });
    topik.sort(function (a, b) { return b.n - a.n || (a.baru < b.baru ? 1 : -1); });
    topicBox.innerHTML = topik.map(function (t) {
      return '<li><button type="button" data-topic="' + esc(t.k) + '" aria-pressed="false">' +
        '<span class="topic-list__name">' + esc(t.k) + '</span>' +
        '<span class="topic-list__count">' + t.n + '<span class="sr-only"> berita</span></span>' +
        '<span class="topic-list__date">Terbaru ' + tanggalPanjang(t.baru) + '</span></button></li>';
    }).join('');
    var syncTopik = function () {
      var aktif = qs('[data-kat][aria-pressed="true"]', newsChips);
      var k = aktif ? aktif.getAttribute('data-kat') : 'semua';
      qsa('[data-topic]', topicBox).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-topic') === k)); });
    };
    qsa('[data-topic]', topicBox).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('aria-pressed') === 'true' ? 'semua' : b.getAttribute('data-topic');
        var chip = qsa('[data-kat]', newsChips).filter(function (c) { return c.getAttribute('data-kat') === k; })[0];
        if (chip) chip.click();
        if (leadBox) leadBox.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
    newsChips.addEventListener('click', function () { setTimeout(syncTopik, 0); });
  }

  /* 3d. Halaman detail: berita-detail.html?id=... mengisi satu template dari BERITA */
  var detailBox = qs('[data-news-detail]');
  if (detailBox) {
    var idQ = new URLSearchParams(location.search).get('id');
    var pos = -1;
    berita.forEach(function (b, i) { if (b.id === idQ) pos = i; });
    var setText = function (sel, html) { var el = qs(sel); if (el) el.innerHTML = html; };
    if (pos < 0) {
      document.title = 'Berita tidak ditemukan · Kecamatan Mojolaban';
      setText('[data-news-crumb]', 'Tidak ditemukan');
      setText('[data-news-title]', 'Berita tidak ditemukan');
      setText('[data-news-meta]', 'Tautan berita ini tidak dikenali atau beritanya sudah tidak ada.');
      detailBox.innerHTML = '<p class="prose">Silakan pilih berita dari <a href="' + ROOT + 'berita.html">daftar berita</a>.</p>';
    } else {
      var B = berita[pos];
      var norm = function (t) { return String(t).toLowerCase().replace(/[^a-z0-9]/g, ''); };
      // Paragraf pertama yang hanya mengulang judul tidak ditampilkan
      var isi = (B.isi || []).filter(function (p, i) {
        return !(i === 0 && (p === p.toUpperCase() || norm(p) === norm(B.judul)));
      });
      if (!isi.length) isi = [B.cuplikan];
      document.title = B.judul + ' · Kecamatan Mojolaban';
      setText('[data-news-crumb]', esc(B.judul));
      setText('[data-news-title]', esc(B.judul));
      setText('[data-news-meta]', '<time datetime="' + esc(B.tanggal) + '">' + tanggalPanjang(B.tanggal) + '</time> · ' + esc(B.kategori));
      var sumber = SUMBER[B.sumber];
      detailBox.innerHTML =
        '<article class="news-article">' +
        (B.foto ? '<figure class="news-article__photo"><img src="' + esc(B.foto) + '" alt="Dokumentasi kegiatan: ' + esc(B.judul) + '" ' +
          'referrerpolicy="no-referrer" onerror="this.closest(\'figure\').hidden=true"><figcaption>Foto: ' + esc(sumberNama(B.sumber) || 'situs resmi kecamatan') + '</figcaption></figure>' : '') +
        '<div class="prose news-article__body">' + isi.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
        '<p class="source mt-5">Sumber: ' + ext(B.url, 'berita asli di ' + (sumber ? sumber.judul : 'situs resmi kecamatan')) +
        ', diterbitkan ' + tanggalPanjang(B.tanggal) + '. Teks dan foto disalin dari sumber tersebut.</p>' +
        '</article>' +
        '<nav class="village-nav block" aria-label="Berita sebelum dan sesudahnya">' +
        (berita[pos - 1] ? '<a href="' + esc(detailUrl(berita[pos - 1])) + '"><span>← Lebih baru</span><b>' + esc(berita[pos - 1].judul) + '</b></a>' : '<span></span>') +
        (berita[pos + 1] ? '<a href="' + esc(detailUrl(berita[pos + 1])) + '"><span>Lebih lama →</span><b>' + esc(berita[pos + 1].judul) + '</b></a>' : '') +
        '</nav>';
      // Berita lainnya: kategori yang sama dulu, lalu yang terbaru
      var lain = berita.filter(function (b) { return b.id !== B.id; })
        .sort(function (a, b) { return (b.kategori === B.kategori) - (a.kategori === B.kategori) || (a.tanggal < b.tanggal ? 1 : -1); })
        .slice(0, 4);
      setText('[data-news-more]', lain.map(function (b) {
        return '<li><p class="news-meta"><time datetime="' + esc(b.tanggal) + '">' + tanggalPanjang(b.tanggal) + '</time><span class="tag">' + esc(b.kategori) + '</span></p>' +
          '<h3 class="news-row__title"><a href="' + esc(detailUrl(b)) + '">' + esc(b.judul) + '</a></h3></li>';
      }).join(''));
    }
  }

  /* 3e. Pengumuman (tautan ke situs resmi kecamatan) */
  var annBox = qs('[data-announce]');
  if (annBox && typeof PENGUMUMAN !== 'undefined' && PENGUMUMAN.length) {
    annBox.innerHTML = PENGUMUMAN.map(function (p) {
      return '<li><p class="news-meta"><time datetime="' + esc(p.tanggal) + '">' + tanggalPanjang(p.tanggal) + '</time></p>' +
        '<h3 class="news-row__title"><a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.judul) +
        '<span class="sr-only"> (membuka situs resmi kecamatan)</span></a></h3></li>';
    }).join('');
  }

  /* ────────────────────────────────────────────────────────
     4. DESA
  ──────────────────────────────────────────────────────── */
  var urutPenduduk = DESA.slice().sort(function (a, b) { return b.populasi - a.populasi; });

  /* 4a. Peringkat penduduk. data-highlight="palur": desa itu disorot dan desa lain bertautan.
         Tanpa data-highlight (direktori desa): satu warna, tanpa tautan. */
  qsa('.rank').forEach(function (list) {
    var only = list.getAttribute('data-highlight');
    var max = urutPenduduk[0].populasi;
    if (!only) list.classList.add('rank--plain');
    list.innerHTML = urutPenduduk.map(function (d) {
      var hi = only ? d.id === only : false;
      var name = (only && d.halaman && d.id !== only) ? '<a href="' + esc(d.halaman) + '">' + esc(d.nama) + '</a>' : esc(d.nama);
      return '<li class="rank__row' + (hi ? ' is-focus' : '') + '"><span class="rank__name">' + name + '</span>' +
        '<span class="rank__track" aria-hidden="true"><span class="rank__bar" style="width:' + (d.populasi / max * 100).toFixed(1) + '%"></span></span>' +
        '<span class="rank__val">' + fmt(d.populasi) + '</span></li>';
    }).join('');
  });

  /* 4b. Direktori desa: daftar dari DESA + pencarian nama dengan sorotan */
  var dir = qs('#dir-index');
  if (dir) {
    dir.innerHTML = '<li class="dir-index__row dir-index__head" aria-hidden="true"><span>Kode</span><span>Desa</span><span style="text-align:right">Penduduk 2024</span><span>Profil</span></li>' +
      DESA.map(function (d) {
        return '<li class="dir-index__row' + (d.fokus ? ' is-focus' : '') + '" data-name="' + esc(d.nama.toLowerCase()) + '">' +
          '<span class="dir-index__code">' + esc(KECAMATAN.kode + '.' + d.kode) + '</span>' +
          '<span class="dir-index__name">' + (d.halaman ? '<a href="' + esc(d.halaman) + '">' + esc(d.nama) + '</a>' : esc(d.nama)) + '</span>' +
          '<span class="dir-index__pop">' + fmt(d.populasi) + '<span class="sr-only"> jiwa</span></span>' +
          (d.halaman
            ? '<span class="dir-index__page"><a class="link" href="' + esc(d.halaman) + '">Lihat profil</a></span>'
            : '<span class="dir-index__page is-none"><span aria-hidden="true">—</span><span class="sr-only">Belum ada halaman profil</span></span>') +
          '</li>';
      }).join('');
    var search = qs('#dir-search'), empty = qs('#dir-empty'), status = qs('#dir-status');
    var clearBtn = qs('#dir-clear');
    var sorot = function (teks, q) {
      var i = q ? teks.toLowerCase().indexOf(q) : -1;
      return i < 0 ? esc(teks) : esc(teks.slice(0, i)) + '<mark>' + esc(teks.slice(i, i + q.length)) + '</mark>' + esc(teks.slice(i + q.length));
    };
    var apply = function () {
      var q = search ? search.value.trim().toLowerCase() : '';
      var shown = 0;
      qsa('.dir-index__row[data-name]', dir).forEach(function (row, i) {
        var ok = !q || row.dataset.name.indexOf(q) > -1;
        row.classList.toggle('is-hidden', !ok);
        if (ok) shown++;
        var d = DESA[i], target = qs('.dir-index__name', row);
        target.innerHTML = d.halaman ? '<a href="' + esc(d.halaman) + '">' + sorot(d.nama, q) + '</a>' : sorot(d.nama, q);
      });
      if (empty) empty.hidden = shown !== 0;
      if (status) status.textContent = shown + ' dari ' + DESA.length + ' desa ditampilkan';
      if (clearBtn) clearBtn.hidden = !q;
    };
    if (search) search.addEventListener('input', apply);
    if (clearBtn) clearBtn.addEventListener('click', function () {
      if (search) { search.value = ''; search.focus(); }
      apply();
    });
    apply();
  }

  /* 4c. Rumah ibadah & tokoh agama untuk satu desa: data-desa-kesos="Wirun" */
  qsa('[data-desa-kesos]').forEach(function (box) {
    var nama = box.getAttribute('data-desa-kesos');
    var g = KESOS.gereja, m = KESOS.masjid, t = KESOS.tokoh;
    var ket = function (o) { return o.keterangan && o.keterangan[nama] ? ' <span class="source">(' + esc(o.keterangan[nama]) + ' menurut keterangan dokumen)</span>' : ''; };
    box.innerHTML =
      '<dt>Masjid (2019)</dt><dd>' + fmt(m.perDesa[nama]) + ket(m) + '</dd>' +
      '<dt>Gereja</dt><dd>' + fmt(g.perDesa[nama]) + ket(g) + ' <span class="source">(tahun data tidak dicantumkan)</span></dd>' +
      '<dt>Tokoh agama Islam tercatat</dt><dd>' + (t.perDesa[nama] !== undefined ? fmt(t.perDesa[nama]) + ' orang'
        : '<span class="status">Desa ini tidak tercatat dalam lembar tokoh agama</span>') + '</dd>';
  });

  /* ────────────────────────────────────────────────────────
     5. INFO PUBLIK
  ──────────────────────────────────────────────────────── */
  // Tabel yang bisa digulir mendatar; numCols = indeks kolom angka (rata kanan)
  var tabel = function (caption, head, rows, numCols, foot) {
    numCols = numCols || [];
    return '<div class="table-wrap" role="region" tabindex="0" aria-label="' + esc(caption) + '"><table class="table' + (head.length >= 4 ? ' table--wide' : '') + '">' +
      '<caption>' + esc(caption) + '</caption><thead><tr>' + head.map(function (h, i) {
        return '<th scope="col"' + (numCols.indexOf(i) > -1 ? ' class="num"' : '') + '>' + esc(h) + '</th>';
      }).join('') + '</tr></thead><tbody>' + rows.join('') + '</tbody>' + (foot || '') + '</table></div>';
  };
  // Pita angka ringkas; items = [[angka, label, satuan?], ...]
  var figures = function (items) {
    return '<div class="figures">' + items.map(function (it) {
      return '<div><b>' + it[0] + (it[2] ? '<small>' + it[2] + '</small>' : '') + '</b><span>' + esc(it[1]) + '</span></div>';
    }).join('') + '</div>';
  };

  /* 5a. Pegawai: data-pegawai = semua | eselon | golongan | jk | pendidikan */
  qsa('[data-pegawai]').forEach(function (box) {
    var view = box.getAttribute('data-pegawai');
    var P = PEGAWAI.daftar;
    var row = function (p, i) {
      return '<tr><td class="num">' + (i + 1) + '</td><td>' + esc(p.jabatan) + '</td><th scope="row">' + esc(p.nama) + '</th><td>' + esc(p.pangkat) + ', ' + esc(p.gol) + '</td></tr>';
    };
    // Baris tabel dikelompokkan menurut key(p), urut sesuai order; nomor urut tetap bersambung
    var groups = function (key, order, label) {
      var html = '', n = 0;
      order.forEach(function (g) {
        var list = P.filter(function (p) { return key(p) === g; });
        if (!list.length) return;
        html += '<tr class="group"><th colspan="4" scope="colgroup">' + esc(label(g)) + ' · ' + list.length + ' orang</th></tr>';
        list.forEach(function (p) { html += row(p, n++); });
      });
      return html;
    };
    var count = function (key, g) { return P.filter(function (p) { return key(p) === g; }).length; };
    var head = ['No', 'Jabatan', 'Nama', 'Pangkat, golongan'];
    // Tabel dengan jarak atas (halaman pegawai hanya menampilkan tabel)
    var dual = function (tableHtml) { return '<div class="mt-5">' + tableHtml + '</div>'; };
    var html = '';
    if (view === 'semua') {
      html = figures([[P.length, 'pegawai tercatat'], [P.filter(function (p) { return p.eselon; }).length, 'pejabat struktural (bereselon)'], [P.filter(function (p) { return !p.eselon; }).length, 'pegawai pelaksana']]) +
        '<div class="mt-5">' + tabel('Daftar pegawai Kecamatan Mojolaban tahun 2022', head, P.map(row), [0]) + '</div>';
    } else if (view === 'eselon') {
      var eOrder = ['III/a', 'III/b', 'IV/a', 'IV/b'];
      var eKey = function (p) { return p.eselon; }, eLab = function (g) { return 'Eselon ' + g; };
      html = figures(eOrder.map(function (e) { return [count(eKey, e), 'Eselon ' + e]; })) +
        dual(tabel('Pejabat struktural menurut eselon, 2022', head, [groups(eKey, eOrder, eLab)], [0])) +
        '<p class="source mt-3">' + P.filter(function (p) { return !p.eselon; }).length + ' pegawai pelaksana tidak memiliki eselon dan tidak tercantum di dokumen ini.</p>';
    } else if (view === 'golongan') {
      var gOrder = ['IV/b', 'IV/a', 'III/d', 'III/c', 'III/b', 'III/a', 'II/d', 'II/c'];
      var ruang = function (r) { return P.filter(function (p) { return p.gol.split('/')[0] === r; }).length; };
      var gKey = function (p) { return p.gol; }, gLab = function (g) { return 'Golongan ' + g; };
      html = figures([[ruang('IV'), 'golongan IV (Pembina)'], [ruang('III'), 'golongan III (Penata)'], [ruang('II'), 'golongan II (Pengatur)']]) +
        dual(tabel('Pegawai menurut pangkat dan golongan, 2022', head, [groups(gKey, gOrder, gLab)], [0]));
    } else if (view === 'jk') {
      var L = count(function (p) { return p.jk; }, 'L'), Pr = count(function (p) { return p.jk; }, 'P');
      var pl = (L / P.length * 100), pp = 100 - pl;
      var jKey = function (p) { return p.jk; }, jLab = function (g) { return g === 'L' ? 'Laki-laki' : 'Perempuan'; };
      html = figures([[L, 'laki-laki'], [Pr, 'perempuan'], [P.length, 'jumlah']]) +
        '<div class="splitbar mt-5" role="img" aria-label="' + L + ' laki-laki dan ' + Pr + ' perempuan">' +
        '<div class="splitbar__bar"><span class="splitbar__seg splitbar__seg--l" style="width:' + pl.toFixed(1) + '%">' + pl.toFixed(0) + '%</span>' +
        '<span class="splitbar__seg splitbar__seg--p" style="width:' + pp.toFixed(1) + '%">' + pp.toFixed(0) + '%</span></div>' +
        '<div class="splitbar__legend"><span>Laki-laki <b>' + L + '</b></span><span>Perempuan <b>' + Pr + '</b></span></div></div>' +
        dual(tabel('Pegawai menurut jenis kelamin, 2022', head, [groups(jKey, ['L', 'P'], jLab)], [0]));
    } else if (view === 'pendidikan') {
      var pOrder = ['S-2', 'S-1', 'D-III', 'SLTA/D-1'];
      var pKey = function (p) { return p.pend; }, pLab = function (g) { return g; };
      html = figures(pOrder.map(function (e) { return [count(pKey, e), e]; })) +
        dual(tabel('Pegawai menurut tingkat pendidikan, 2022', head, [groups(pKey, pOrder, pLab)], [0]));
    }
    box.innerHTML = html;
  });

  /* 5b. Perangkat desa: tabel per desa (data-perangkat="palur") dan daftar dokumen PDF */
  qsa('[data-perangkat]').forEach(function (box) {
    var key = box.getAttribute('data-perangkat');
    var r = PERANGKAT_DESA.rinci[key];
    if (!r) return;
    var desa = DESA.filter(function (d) { return d.id === key; })[0];
    box.innerHTML = tabel('Perangkat Desa ' + (desa ? desa.nama : key) + ', per ' + r.periode, ['Jabatan', 'Nama'],
      r.daftar.map(function (x) {
        return '<tr><td>' + esc(x[0]) + '</td>' + (x[1] ? '<th scope="row">' + esc(x[1]) + '</th>' : '<td class="empty">Tidak tercantum di dokumen</td>') + '</tr>';
      }));
  });
  var docsBox = qs('[data-perangkat-docs]');
  if (docsBox) {
    docsBox.innerHTML = PERANGKAT_DESA.dokumen.map(function (d) {
      return '<li><div><p class="docs__title">' + esc(d.desa === 'Rekap beberapa desa' ? d.desa : 'Desa ' + d.desa) + '</p>' +
        '<p class="docs__meta">Data perangkat desa · ' + esc(d.periode) + ' · PDF</p></div>' +
        '<a class="docs__link" href="' + esc(d.url) + '" target="_blank" rel="noopener">Buka dokumen <span aria-hidden="true">↗</span><span class="sr-only">(PDF, situs resmi)</span></a></li>';
    }).join('');
  }

  /* 5c. Kesejahteraan sosial (data-kesos = gereja | masjid | tokoh): grafik batang
         dengan pilihan urutan + tabel. Desa yang punya halaman profil ditebalkan. */
  qsa('[data-kesos]').forEach(function (box) {
    var key = box.getAttribute('data-kesos');
    var o = KESOS[key];
    var urut = DESA.map(function (d) { return d.nama; });   // urutan kode wilayah resmi
    var dasar = urut.filter(function (n) { return o.perDesa[n] !== undefined; }).map(function (n) { return [n, o.perDesa[n]]; });
    var max = Math.max.apply(null, dasar.map(function (x) { return x[1]; })) || 1;
    var fokus = DESA.filter(function (d) { return d.halaman; }).map(function (d) { return d.nama; });
    var barsHtml = function (mode) {
      var nilai = dasar.slice();
      if (mode === 'banyak') nilai.sort(function (a, b) { return b[1] - a[1]; });
      return nilai.map(function (x) {
        return '<li class="' + (x[1] === 0 ? 'is-zero' : '') + (fokus.indexOf(x[0]) > -1 ? ' is-focus' : '') + '"><span>' + esc(x[0]) + '</span>' +
          '<span class="bars__track" aria-hidden="true"><span class="bars__bar" style="width:' + (x[1] / max * 100).toFixed(1) + '%"></span></span>' +
          '<span class="bars__val">' + fmt(x[1]) + '</span></li>';
      }).join('');
    };
    var bars = '<div class="toolbar"><span class="toolbar__label" id="urut-' + key + '">Urutkan</span><div class="seg" role="group" aria-labelledby="urut-' + key + '">' +
      '<button type="button" data-urut="banyak" aria-pressed="true">Terbanyak</button><button type="button" data-urut="kode" aria-pressed="false">Kode wilayah</button></div></div>' +
      '<ul class="bars" aria-label="Jumlah per desa" aria-live="polite">' + barsHtml('banyak') + '</ul>' +
      '<p class="chart-note">Tebal: ' + fokus.join(', ') + ' (desa dengan halaman profil).</p>';
    var label = { gereja: 'Gereja', masjid: 'Masjid', tokoh: 'Tokoh agama Islam' }[key];
    var rows = urut.filter(function (n) { return o.perDesa[n] !== undefined; }).map(function (n) {
      return '<tr><th scope="row">' + esc(n) + '</th><td class="num">' + fmt(o.perDesa[n]) + '</td><td>' + esc(o.keterangan && o.keterangan[n] || '') + '</td></tr>';
    });
    var foot = '<tfoot><tr><th scope="row">Jumlah</th><td class="num">' + fmt(o.total) + '</td><td></td></tr></tfoot>';
    box.innerHTML = '<div class="split split--even">' +
      '<div>' + bars + '</div>' +
      '<div>' + tabel(label + ' per desa (urutan kode wilayah)', ['Desa', 'Jumlah', 'Keterangan dokumen'], rows, [1], foot) + '</div></div>';
    qsa('[data-urut]', box).forEach(function (b) {
      b.addEventListener('click', function () {
        qsa('[data-urut]', box).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        qs('.bars', box).innerHTML = barsHtml(b.getAttribute('data-urut'));
      });
    });
  });
  var tokohMissing = qs('[data-tokoh-missing]');
  if (tokohMissing) {
    tokohMissing.textContent = DESA.map(function (d) { return d.nama; })
      .filter(function (n) { return KESOS.tokoh.perDesa[n] === undefined; }).join(', ');
  }

  /* 5d. Daftar SOP pelayanan sederhana */
  var sopBox = qs('[data-sop]');
  if (sopBox && typeof SOP_PELAYANAN !== 'undefined') {
    sopBox.innerHTML = SOP_PELAYANAN.daftar.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('');
  }

  /* 5e. Peramban SOP: kelompok layanan, pencarian dengan sorotan, chip kata kunci */
  var sopBrowser = qs('[data-sop-browser]');
  if (sopBrowser && typeof SOP_PELAYANAN !== 'undefined' && SOP_PELAYANAN.kelompok) {
    var SP = SOP_PELAYANAN;
    var chev = '<svg class="icon sop-item__chev" aria-hidden="true"><use href="#i-chev"/></svg>';
    sopBrowser.innerHTML = SP.kelompok.map(function (k, gi) {
      return '<section class="sop-group" aria-labelledby="sopg-' + gi + '"><h3 class="sop-group__title" id="sopg-' + gi + '">' + esc(k.nama) +
        '<span>' + k.isi.length + ' layanan · klasifikasi situs ini</span></h3>' +
        k.isi.map(function (i) {
          var nama = SP.daftar[i];
          return '<details class="sop-item" data-nama="' + esc(nama.toLowerCase()) + '"><summary><span class="sop-item__no">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
            '<span class="sop-item__name">' + esc(nama) + '</span>' + chev + '</summary>' +
            '<div class="sop-item__body"><dl class="facts">' +
            '<dt>Tempat</dt><dd>Kantor Kecamatan Mojolaban, Jl. Veteran Perang Kemerdekaan No. 4</dd>' +
            '<dt>Prosedur &amp; persyaratan</dt><dd>Tercantum di dokumen SOP resmi (nomor ' + (i + 1) + ' dalam daftar). ' +
            '<a href="' + esc(SP.dokumen) + '" target="_blank" rel="noopener">Buka dokumen SOP (PDF) <span aria-hidden="true">↗</span></a></dd>' +
            '<dt>Tanya dulu</dt><dd><a href="tel:+62271611767">(0271) 611767</a> · Senin–Kamis 07.00–15.30, Jumat 07.00–14.00 WIB</dd>' +
            '</dl></div></details>';
        }).join('') + '</section>';
    }).join('') + '<p class="sop-empty" id="sop-empty" hidden>Tidak ada layanan yang cocok. Coba kata lain, atau hubungi kantor kecamatan.</p>';
    var sopQ = qs('#sop-q'), sopStatus = qs('#sop-status');
    var cariSop = function () {
      var q = sopQ.value.trim().toLowerCase(), n = 0;
      qsa('.sop-item', sopBrowser).forEach(function (it) {
        var ok = !q || it.dataset.nama.indexOf(q) > -1;
        it.hidden = !ok; if (ok) n++;
        var el = qs('.sop-item__name', it), raw = el.textContent, i = q ? raw.toLowerCase().indexOf(q) : -1;
        el.innerHTML = i < 0 ? esc(raw) : esc(raw.slice(0, i)) + '<mark>' + esc(raw.slice(i, i + q.length)) + '</mark>' + esc(raw.slice(i + q.length));
      });
      qsa('.sop-group', sopBrowser).forEach(function (g) { g.hidden = !qsa('.sop-item:not([hidden])', g).length; });
      qs('#sop-empty').hidden = n !== 0;
      sopStatus.textContent = q ? n + ' dari ' + SP.daftar.length + ' layanan cocok dengan "' + sopQ.value.trim() + '"' : SP.daftar.length + ' layanan';
      qsa('.chip[data-q]').forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-q').toLowerCase() === q)); });
    };
    sopQ.addEventListener('input', cariSop);
    qsa('.chip[data-q]').forEach(function (c) {
      c.addEventListener('click', function () {
        var q = c.getAttribute('data-q');
        sopQ.value = sopQ.value.trim().toLowerCase() === q.toLowerCase() ? '' : q;
        cariSop();
        var first = qs('.sop-item:not([hidden])', sopBrowser);
        if (first && sopQ.value) first.open = true;
      });
    });
    cariSop();
  }

  /* 5f. Sakelar Grafik/Tabel: tombol [data-view="id-panel"] menampilkan panelnya
         dan menyembunyikan panel tombol lain di grup yang sama */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-view]');
    if (!b) return;
    qsa('[data-view]', b.parentElement).forEach(function (x) {
      var on = x === b;
      x.setAttribute('aria-pressed', String(on));
      var panel = document.getElementById(x.getAttribute('data-view'));
      if (panel) panel.hidden = !on;
    });
  });

  /* 5g. Tooltip grafik (.chart__row[data-tip]): muncul saat hover, fokus, atau ketuk;
         Escape menutup */
  var tip = null, tipFor = null;
  var showTip = function (row) {
    if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true; }
    var wrap = row.closest('.chart-wrap'); if (!wrap) return;
    if (tip.parentElement !== wrap) wrap.appendChild(tip);
    tip.innerHTML = '<b>' + esc(row.getAttribute('data-tip-title')) + '</b><br>' + esc(row.getAttribute('data-tip'));
    tip.hidden = false;
    var r = row.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    tip.style.left = Math.max(0, Math.min(r.left - w.left + 120, w.width - tip.offsetWidth)) + 'px';
    tip.style.top = (r.bottom - w.top + 6) + 'px';
    qsa('.chart__row.is-active').forEach(function (x) { x.classList.remove('is-active'); });
    row.classList.add('is-active'); tipFor = row;
  };
  var hideTip = function () {
    if (tip) tip.hidden = true;
    if (tipFor) tipFor.classList.remove('is-active');
    tipFor = null;
  };
  document.addEventListener('mouseover', function (e) { var r = e.target.closest('.chart__row[data-tip]'); if (r) showTip(r); });
  document.addEventListener('mouseout', function (e) { var r = e.target.closest('.chart__row[data-tip]'); if (r && !r.contains(e.relatedTarget)) hideTip(); });
  document.addEventListener('focusin', function (e) { var r = e.target.closest && e.target.closest('.chart__row[data-tip]'); if (r) showTip(r); else if (tipFor) hideTip(); });
  document.addEventListener('click', function (e) {
    var r = e.target.closest('.chart__row[data-tip]');
    if (r) { if (tipFor === r && !tip.hidden) hideTip(); else showTip(r); } else if (tipFor) hideTip();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && tipFor) hideTip(); });

  /* 5h. Bagan struktur: tombol "Pangkat & golongan" per pejabat, dicocokkan lewat nama
         dengan data pegawai 2022 */
  qsa('.org__node').forEach(function (node, i) {
    var nameEl = qs('.org__name', node); if (!nameEl || typeof PEGAWAI === 'undefined') return;
    var nama = nameEl.textContent.split(',')[0].trim().toLowerCase();
    var p = PEGAWAI.daftar.filter(function (x) { return x.nama.split(',')[0].trim().toLowerCase() === nama; })[0];
    if (!p) return;
    var id = 'org-d' + i;
    node.insertAdjacentHTML('beforeend', '<button type="button" class="org__more" aria-expanded="false" aria-controls="' + id + '">Pangkat &amp; golongan</button>' +
      '<p class="org__detail" id="' + id + '" hidden>' + esc(p.pangkat) + ', ' + esc(p.gol) + (p.eselon ? ' · eselon ' + esc(p.eselon) : '') + ' · ' + esc(p.pend) + ' (data 2022)</p>');
    var btn = qs('.org__more', node), det = qs('.org__detail', node);
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open)); det.hidden = !open;
    });
  });

  /* 5i. Animasi muncul saat menggulir. Hanya untuk elemen di bawah layar awal, dan hanya
         bila IntersectionObserver tersedia serta reduced motion tidak aktif. */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = qsa('main .section > .container > *, main .section > .container.split > *');
    var vh = window.innerHeight;
    targets = targets.filter(function (el) { return el.getBoundingClientRect().top > vh; });
    if (targets.length) {
      targets.forEach(function (el) { el.classList.add('reveal'); });
      document.documentElement.classList.add('reveal-ready');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px' });
      targets.forEach(function (el) { io.observe(el); });
      // Pengaman: semua elemen tampil paling lambat setelah 4 detik
      setTimeout(function () { targets.forEach(function (el) { el.classList.add('is-in'); }); }, 4000);
    }
  }

  /* ────────────────────────────────────────────────────────
     6. PROFIL — catatan wilayah dari POTENSI, beserta sumbernya
  ──────────────────────────────────────────────────────── */
  var potensiBox = qs('[data-potensi]');
  if (potensiBox && typeof POTENSI !== 'undefined') {
    potensiBox.innerHTML = POTENSI.map(function (p) {
      var s = SUMBER[p.sumber];
      return '<li><p class="eyebrow">' + esc(p.kategori) + '</p><h3 class="news-row__title">' + esc(p.judul) + '</h3>' +
        '<p class="news-row__excerpt">' + esc(p.deskripsi) + '</p>' +
        (s ? '<p class="source mt-2">Sumber: ' + (s.url ? ext(s.url, s.judul) : esc(s.judul)) + '</p>' : '') + '</li>';
    }).join('');
  }
})();
