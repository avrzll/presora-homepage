/**
 * Presora Official Website Configuration
 * -------------------------------------------------------------
 * File konfigurasi terpusat untuk identitas, kontak developer,
 * URL domain, dan kebijakan privasi aplikasi Presora.
 * 
 * CATATAN UNTUK DEVELOPER SEBELUM PUBLIKASI / GOOGLE OAUTH:
 * 1. Ganti 'domain' dengan domain final Anda (misal: https://presora.avridev.my.id atau https://presora.app).
 * 2. Pastikan 'supportEmail' adalah email aktif yang didaftarkan di Google Cloud Console OAuth Consent Screen.
 * 3. Tanggal kebijakan dapat diperbarui jika ada revisi ketentuan.
 */

const PRESORA_CONFIG = {
  // Identitas Aplikasi
  appName: "Presora",
  tagline: "Attendance, Organized.",
  shortDescription: "Aplikasi presensi digital berbasis Flutter yang modern, ringan, dan terstruktur dengan integrasi langsung ke Google Sheets & Google Drive milik pengguna.",
  version: "1.0.0",

  // Informasi Pengembang & Kontak Resmi
  developer: {
    name: "Avrizal Rendi Prayoga",
    handle: "avrzll",
    supportEmail: "avrizalrendiprayoga@gmail.com",
    role: "Presora Creator & Lead Developer",
    location: "Indonesia",
    githubUrl: "https://github.com/avrzll"
  },

  // Konfigurasi Domain & Tautan Halaman
  // Placeholder default menggunakan Cloudflare Pages.
  // Harap ubah ke custom domain Anda jika sudah dikonfigurasi di Cloudflare Pages.
  urls: {
    domain: "https://presora.avridev.my.id",
    home: "/",
    privacy: "/privacy/",
    terms: "/terms/",
    contact: "/contact/",
    googleRevokeUrl: "https://myaccount.google.com/permissions",
    googleUserPolicyUrl: "https://developers.google.com/terms/api-services-user-data-policy"
  },

  // Tanggal Efektif Kebijakan
  policyDates: {
    effectiveDate: "29 Oktober 2026",
    lastUpdated: "29 Oktober 2026",
    effectiveDateEn: "October 29, 2026",
    lastUpdatedEn: "October 29, 2026"
  },

  // Rincian Cakupan (Scopes) Google OAuth 2.0 yang Digunakan Aplikasi
  oauthScopes: [
    {
      scope: "email",
      name: "Google Account Email",
      purpose: "Mengidentifikasi akun pengguna dan menampilkan profil di aplikasi tanpa menyimpan password.",
      riskLevel: "Non-sensitive"
    },
    {
      scope: "https://www.googleapis.com/auth/spreadsheets",
      name: "Google Sheets API (Read & Write)",
      purpose: "Membaca, membuat sheet (Students, Attendance, AppConfig), dan mencatat rekaman kehadiran siswa/peserta ke spreadsheet pilihan pengguna.",
      riskLevel: "Sensitive"
    },
    {
      scope: "https://www.googleapis.com/auth/drive.file",
      name: "Google Drive API (Per-file access)",
      purpose: "Membuat file spreadsheet baru di Google Drive pengguna jika pengguna memilih pembuatan otomatis.",
      riskLevel: "Sensitive / Recommended"
    },
    {
      scope: "https://www.googleapis.com/auth/drive.readonly",
      name: "Google Drive API (View spreadsheets)",
      purpose: "Menampilkan daftar file spreadsheet yang ada di Google Drive pengguna agar pengguna dapat memilih spreadsheet yang ingin dihubungkan.",
      riskLevel: "Sensitive"
    }
  ],

  // Brand Palette (sesuai spesifikasi desain Presora)
  theme: {
    bgDark: "#17191E",
    surface: "#22252A",
    cardSurface: "#282B32",
    primaryBlue: "#6C8CFF",
    secondaryViolet: "#A78BFA",
    highlightIce: "#A5D8FF",
    textPrimary: "#F5F7FA",
    textSecondary: "#9298A5"
  }
};

// Export jika di environment module, atau tetap global di browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = PRESORA_CONFIG;
}

