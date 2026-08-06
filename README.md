# Penghijauan Repo (Bikin Contribution Graph Auto Hijau)

Repo ini dibuat khusus buat ngehijaun grafik kontribusi GitHub lu biar keliatan aktif dan rame tiap hari tanpa ribet.

---

## Cara Pake Buat User Lain (Fork / Clone)

Buat siapa aja yang nemu repo ini dan mau profil GitHub-nya makin pekat ijonya, lu bisa pake cara ini:

### Cara 1: Otomatis Pake Fork (Gak Perlu Nyalain PC)
1. **Fork Repo Ini**: Klik tombol **Fork** di pojok kanan atas GitHub.
2. **Aktifin GitHub Actions**: Masuk ke tab **Actions** di repo hasil fork lu, terus klik tombol **I understand my workflows, go ahead and enable them**.
3. **Set Workflow Permission**: Masuk ke **Settings** repo fork lu → **Actions** → **General** → pilih **Read and write permissions** → Save.
4. **Beres!**: Tiap hari GitHub Actions bakal otomatis nambahin 5-12 commit acak sebanyak 4 kali sehari. Profil lu auto hijau terus!

---

### Cara 2: Clone & Backfill Hari-Hari Lalu (Bikin Ijo Setahun Terakhir)
Kalo lu mau ngisi hari-hari yang udah lewat biar setahun ke belakang langsung ijo pekat:

1. Clone repo ini ke komputer lu:
   ```bash
   git clone https://github.com/zidanaetrna/penghijauan.git
   cd penghijauan
   ```
2. Set email git lu sesuai email akun GitHub:
   ```bash
   git config user.email "emaillu@gmail.com"
   git config user.name "username_github_lu"
   ```
3. Jalanin script generator-nya:

   - **Backfill 1 tahun terakhir (Default 5-10 commit/hari):**
     ```bash
     node generator.js --email emaillu@gmail.com --push
     ```

   - **Custom tanggal & jumlah commit suka-suka:**
     ```bash
     node generator.js --start 2025-01-01 --end 2026-08-06 --email emaillu@gmail.com --min 5 --max 15 --push
     ```

---

## Opsi Parameter Script (`generator.js`)
- `--start YYYY-MM-DD`: Tanggal mulai (default: 1 tahun lalu)
- `--end YYYY-MM-DD`: Tanggal selesai (default: hari ini)
- `--min <angka>`: Minimal commit per hari (default: 3)
- `--max <angka>`: Maksimal commit per hari (default: 10)
- `--email <email>`: Email akun GitHub lu (wajib sesuai akun GitHub)
- `--push`: Otomatis push ke repo GitHub lu pas selesai

> Catatan: Script ini pake **empty commits** jadi ga ada file yang berubah-ubah, histori git tetap bersih.
