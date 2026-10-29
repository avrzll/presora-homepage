# Presora — Official Website & Google OAuth Verification Documentation

Situs web resmi untuk **Presora** (*"Attendance, Organized."*), aplikasi presensi digital berbasis Flutter yang terintegrasi langsung dengan Google Sheets dan Google Drive milik pengguna.

Situs ini dibangun dengan arsitektur statis murni yang cepat, ringan, responsif, dan aman untuk memenuhi kebutuhan branding serta verifikasi resmi **Google OAuth 2.0 (Google Auth Platform)** tanpa memerlukan server backend atau database tambahan.

---

## 1. Daftar Halaman & Struktur Berkas

```text
D:\Project\Web\presora\
├── index.html                  # Halaman Beranda (/)
├── 404.html                    # Halaman Error 404 Kustom
├── privacy/
│   └── index.html              # Kebijakan Privasi (/privacy/)
├── privacy.html                # Akses langsung (/privacy.html)
├── terms/
│   └── index.html              # Syarat Layanan (/terms/)
├── terms.html                  # Akses langsung (/terms.html)
├── contact/
│   └── index.html              # Kontak Pengembang (/contact/)
├── contact.html                # Akses langsung (/contact.html)
├── _headers                    # Header Keamanan Cloudflare Pages
├── _redirects                  # Aturan Pengalihan URL Cloudflare Pages
├── robots.txt                  # Izin perayapan mesin pencari & Googlebot
├── sitemap.xml                 # Peta situs resmi untuk SEO & Google Index
├── site.config.json            # Konfigurasi terpusat (format JSON)
├── package.json                # Pengelola skrip & dependensi preview lokal
├── test-links.js               # Skrip validasi integritas tautan & konten
├── README.md                   # Dokumentasi panduan deployment & OAuth
└── assets/
    ├── css/
    │   └── style.css           # Sistem desain modern dark mode Presora
    ├── js/
    │   ├── config.js           # Konfigurasi sentral variabel & OAuth scopes
    │   └── main.js             # Skrip interaktif (navigasi, clipboard toast)
    └── images/
        ├── splash_logo.png     # Logo resmi Presora (dari Flutter app)
        ├── launcher_logo.png   # Ikon resmi launcher Presora
        ├── icon-192.png        # Web app icon 192x192
        ├── icon-512.png        # Web app icon 512x512
        └── favicon.png         # Favicon browser
```

---

## 2. Identitas Brand & Sistem Desain

Situs ini menggunakan palet warna dan tipografi resmi yang 100% konsisten dengan aplikasi Presora:

- **Background Utama (Deep Charcoal):** `#17191E`
- **Surface (Charcoal):** `#22252A`
- **Card Surface:** `#282B32`
- **Electric Blue (Aksen Utama):** `#6C8CFF`
- **Soft Violet (Aksen Sekunder):** `#A78BFA`
- **Ice Blue (Sorotan / Highlight):** `#A5D8FF`
- **Teks Utama:** `#F5F7FA`
- **Teks Sekunder:** `#9298A5`
- **Tipografi:** *Plus Jakarta Sans* & *Inter* (Google Fonts)

---

## 3. Konfigurasi Terpusat

Seluruh informasi kontak, tanggal efektif, tautan halaman, dan cakupan OAuth dikelola terpusat di:
- **`assets/js/config.js`** (digunakan otomatis oleh browser)
- **`site.config.json`** (digunakan oleh skrip atau generator eksternal)

### Informasi Pengembang yang Digunakan:
- **Nama Pengembang:** Avrizal Rendi Prayoga
- **Email Dukungan Resmi:** `avrizalrendiprayoga@gmail.com`
- **Placeholder Domain:** `https://presora.pages.dev` (Ubah ke domain kustom Anda setelah pembelian / konfigurasi domain)
- **Tanggal Kebijakan:** 29 Oktober 2026

---

## 4. Cara Menjalankan Secara Lokal (Local Preview)

Anda dapat melihat situs ini di komputer lokal dengan beberapa metode mudah:

### Opsi A: Menggunakan npm / npx (Direkomendasikan)
Masuk ke direktori web dan jalankan:
```powershell
cd D:\Project\Web\presora
npm run dev
```
Buka browser di: `http://localhost:3000`

### Opsi B: Menggunakan Python
```powershell
cd D:\Project\Web\presora
python -m http.server 3000
```
Buka browser di: `http://localhost:3000`

### Opsi C: Menguji Integritas Berkas & Persyaratan OAuth
Jalankan skrip validasi otomatis:
```powershell
node test-links.js
```

---

## 5. Panduan Deployment ke Cloudflare Pages

Cloudflare Pages menyediakan hosting statis berkecepatan tinggi dengan HTTPS otomatis gratis.

### Metode 1: Hubungkan ke Git Repository (GitHub / GitLab)
1. Buat repository baru di GitHub untuk website ini (misal: `presora-website`).
2. Masukkan berkas dari folder `D:\Project\Web\presora` ke git repository tersebut:
   ```powershell
   cd D:\Project\Web\presora
   git init
   git add .
   git commit -m "Initial commit: Presora official website"
   git branch -M main
   git remote add origin https://github.com/<username>/presora-website.git
   git push -u origin main
   ```
3. Buka dashboard [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Pilih repository `presora-website`.
5. Pengaturan Build:
   - **Framework preset:** `None`
   - **Build command:** *(kosongkan)*
   - **Build output directory:** `.` atau `output` (kosongkan / biarkan default root)
6. Klik **Save and Deploy**. Website Anda akan aktif di subdomain `https://<nama-proyek>.pages.dev`.

### Metode 2: Direct Upload melalui Cloudflare Wrangler CLI
```powershell
npx wrangler pages deploy D:\Project\Web\presora --project-name=presora
```

---

## 6. Panduan Menghubungkan Domain Kustom & Verifikasi Google OAuth

Sebelum mengajukan verifikasi ke Google Auth Platform:

### Langkah 1: Pasang Custom Domain di Cloudflare Pages
1. Pada proyek Cloudflare Pages Anda, buka tab **Custom domains**.
2. Klik **Set up a custom domain** (misal: `presora.app` atau `presora.my.id`).
3. Ikuti panduan DNS Cloudflare hingga status domain menjadi **Active (SSL/TLS Active)**.

### Langkah 2: Perbarui Konfigurasi Domain
Buka `assets/js/config.js` dan `site.config.json`, lalu ubah:
```javascript
urls: {
  domain: "https://domain-resmi-anda.com",
  ...
}
```
Lakukan deploy ulang perubahan tersebut.

### Langkah 3: Verifikasi Kepemilikan Domain di Google Search Console
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Tambahkan domain Anda (pilih metode **Domain** via DNS TXT record atau **URL Prefix** via HTML tag).
3. Setelah diverifikasi, akun Google Anda diakui sebagai pemilik domain resmi tersebut.

### Langkah 4: Pengisian OAuth Consent Screen di Google Cloud Console
1. Buka [Google Cloud Console](https://console.cloud.google.com/) > **APIs & Services** > **OAuth consent screen**.
2. Masukkan data yang sesuai dengan website:
   - **App name:** `Presora`
   - **User support email:** `avrizalrendiprayoga@gmail.com`
   - **App logo:** Upload berkas `assets/images/launcher_logo.png`
   - **Application home page:** `https://domain-resmi-anda.com/`
   - **Application privacy policy link:** `https://domain-resmi-anda.com/privacy/`
   - **Application terms of service link:** `https://domain-resmi-anda.com/terms/`
   - **Authorized domains:** Masukkan nama domain Anda (misal: `domain-resmi-anda.com`)
   - **Developer contact information:** `avrizalrendiprayoga@gmail.com`
3. Pada bagian **Scopes for Google APIs**, pastikan scope yang dipilih sama persis dengan yang tercantum di website:
   - `email`
   - `https://www.googleapis.com/auth/spreadsheets`
   - `https://www.googleapis.com/auth/drive.file`
   - `https://www.googleapis.com/auth/drive.readonly`
4. Kirim untuk verifikasi Google (*Submit for Verification*).

---

## 7. Catatan Kejujuran & Batasan

- Website ini **tidak memuat tombol login palsu** atau simulasi interaksi Google karena hal tersebut dilarang oleh Google OAuth review team.
- Website ini **tidak mengklaim bahwa aplikasi telah diverifikasi** sebelum Google menyelesaikan peninjauan resmi.
- Arsitektur Presora sepenuhnya transparan: tidak ada database perantara milik pihak ketiga, dan semua data berada di bawah kendali penuh Google Drive pengguna.
