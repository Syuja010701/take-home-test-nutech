# Take Home Test - Nutech

Proyek ini adalah solusi untuk **Take Home Test Nutech** yang mencakup implementasi backend API sederhana dengan Node.js dan Express.

## 📋 Deskripsi
Aplikasi ini menyediakan API untuk:
- Registrasi dan login pengguna
- Pengelolaan saldo (top-up, transaksi)
- Riwayat transaksi
- Update profil pengguna

## 🛠 Teknologi yang Digunakan
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)

## 📁 Struktur Proyek
```
take-home-test-nutech/
├── src/
│   ├── controllers/     # Logika bisnis
│   ├── routes/          # Definisi endpoint API
│   ├── models/          # Model database 
│   ├── middlewares/     # Middleware autentikasi & validasi
│   ├── config/          # Konfigurasi database
│   └── utils/           # Helper functions
├── .env.example         # Template environment variables
├── package.json
```

## ⚙️ Instalasi & Setup
1. **Clone repositori**:
   ```bash
   git clone https://github.com/Syuja010701/take-home-test-nutech.git
   cd take-home-test-nutech
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi environment**:
   ```bash
   cp .env.example .env
   ```
   Isi nilai di `.env`:

4. **import database**:

5. **Start server**:
   ```bash
   npm run dev
   ```
   Server berjalan di `http://localhost:3000`
