# DWP Frontend Technical Test

E-commerce prototype for internet data package purchasing, built as a frontend technical test submission.

**Demo:** https://msholehhudin-wdp-frontend.vercel.app
**Credentials:** `admin` / `admin123`
**Start date:** 13 Juni 2025, 20.00 WIB
**End date:** 15 Juni 2025, 13.00 WIB

---

## Tech Stack

| Category          | Library                      |
| ----------------- | ---------------------------- |
| UI Framework      | React 19 + TypeScript        |
| Component Library | Material UI (MUI) v6         |
| Routing           | React Router DOM v7          |
| Server State      | TanStack Query v5            |
| Form & Validation | React Hook Form              |
| API Mocking       | Mock Service Worker (MSW) v2 |
| Build Tool        | Vite                         |

---

## Soal json-server

Requirement menyebutkan penggunaan [json-server](https://github.com/typicode/json-server) sebagai mock backend. Namun karena hasil akhir di-deploy ke **Vercel** (serverless), json-server tidak dapat digunakan karena:

1. json-server membutuhkan persistent Node.js process yang tidak didukung Vercel
2. json-server membutuhkan akses file system (`db.json`) yang tidak tersedia di environment serverless
   **Solusi:** diganti dengan **Mock Service Worker (MSW)** yang berjalan sepenuhnya di browser via Service Worker. Pola REST API tetap sama persis — semua request menggunakan `fetch` ke endpoint `/api/customers`, `/api/transactions`, dst — hanya layer interceptor-nya yang berjalan di sisi browser, bukan server terpisah. Data dipersist menggunakan `localStorage` sehingga perubahan (CRUD) tetap tersimpan selama sesi browser.

> Untuk environment lokal dengan json-server, hanya perlu mengganti `BASE` URL di service layer dari `/api` ke `http://localhost:3001` tanpa perubahan lain.

---

## Features

- 🔐 **Auth** — Login / Logout dengan session via localStorage dan protected routes
- 👥 **Customer** — Full CRUD (tambah, edit, hapus customer)
- 🧾 **Transaction** — Full CRUD transaksi pembelian paket per customer
- 📊 **Dashboard** — Ringkasan statistik: total customer, transaksi, revenue, dan transaksi terbaru

---

## Folder Structure

Feature-based architecture:

```
src/
├── app/              # App-level provider (QueryClient, Theme)
├── components/
│   ├── common/       # Reusable components (CustomerTable, TransactionTable, FormModal, ProtectedRoute)
│   └── layout/       # DashboardLayout, Sidebar, Topbar
├── features/
│   ├── auth/         # Login page
│   ├── customer/     # Customer page
│   ├── dashboard/    # Dashboard page
│   └── transaction/  # Transaction page
├── hooks/            # Custom hooks (useCustomers, useTransactions)
├── lib/              # Seed & localStorage db helper
├── mocks/            # MSW handlers & browser worker setup
├── routes/           # React Router config
├── services/         # Fetch layer per domain (customer, transaction, auth)
└── types/            # TypeScript interfaces
```

---

## Progress

| Module                    | Status |
| ------------------------- | ------ |
| Project Setup             | ✅     |
| Routing + Protected Route | ✅     |
| Dashboard Layout          | ✅     |
| Sidebar + Topbar          | ✅     |
| Login / Logout            | ✅     |
| Dashboard Overview        | ✅     |
| Customer CRUD             | ✅     |
| Transaction CRUD          | ✅     |
| API Mock (MSW)            | ✅     |

---

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server (MSW aktif otomatis)
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) atau sesuaikan dengan port yang sedang berjalan dan login dengan:

- **Username:** `admin`
- **Password:** `admin123`
  > Untuk reset data ke kondisi awal, jalankan `localStorage.clear()` di browser console lalu refresh.
