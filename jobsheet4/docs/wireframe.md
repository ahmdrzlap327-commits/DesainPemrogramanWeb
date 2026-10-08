# Wireframe & User Flow — SIMPUS-Mini

**Sub-CPMK:** Merancang UI/UX aplikasi (proyek).

Halaman yang sudah ada (Beranda, Daftar/Tambah Buku, Daftar/Tambah Anggota — Jobsheet 1-3) belum mencakup fitur Login, Dashboard Petugas, dan Peminjaman/Pengembalian. Dokumen ini merancang wireframe untuk halaman-halaman tersebut sebelum diimplementasikan mulai Jobsheet 5 dan seterusnya.

## Aktor
- **Tamu:** hanya bisa melihat katalog buku (Beranda, Daftar Buku) tanpa login.
- **Petugas:** login untuk mengakses seluruh fitur CRUD dan transaksi peminjaman.

## User Flow

**Peminjaman Buku**
`[Petugas Login] -> [Dashboard] -> [Pilih menu "Peminjaman Baru"] -> [Pilih Anggota] -> [Pilih Buku (stok > 0)] -> [Simpan] -> [Stok buku berkurang 1] -> [Kembali ke Dashboard]`

**Pengembalian Buku**
`[Dashboard] -> [Menu "Pengembalian"] -> [Cari transaksi aktif (anggota/buku)] -> [Tandai "Dikembalikan"] -> [Stok buku bertambah 1] -> [Kembali ke Dashboard]`

## Wireframe

### Halaman Login
```text
+--------------------------------------+
|              SIMPUS-Mini             |
|--------------------------------------|
|                                      |
|        [ Login Petugas ]             |
|                                      |
|   Username : [______________]        |
|   Password : [______________]        |
|                                      |
|          [   Masuk   ]               |
|                                      |
|   Belum punya akun? Daftar di sini   |
+--------------------------------------+

+--------------------------------------------------------------------------------+
| SIMPUS-Mini      Beranda | Buku | Anggota | Peminjaman | (Nama Petugas) Logout |
|--------------------------------------------------------------------------------|
|           [Total Buku]   [Total Anggota]   [Sedang Dipinjam]                   |
|                                                                                |
|           Aksi Cepat:                                                          |
|           [ + Peminjaman Baru ]   [ + Pengembalian ]                           |
|                                                                                |
|           Transaksi Terbaru                                                    |
|           --------------------------------------------------                   |
|           Anggota | Buku | Tgl Pinjam | Status                                 |
+--------------------------------------------------------------------------------+

+--------------------------------------+
|  Form Peminjaman Buku                |
|--------------------------------------|
|  Anggota : [ dropdown pilih anggota ]|
|  Buku    : [ dropdown, hanya stok>0 ]|
|  Tanggal Pinjam : [ auto: hari ini ] |
|                                      |
|          [  Simpan Peminjaman  ]     |
+--------------------------------------+

+---------------------------------------------+
|  Pengembalian Buku                          |
|---------------------------------------------|
|  Cari transaksi aktif:                      |
|  [ nama anggota / judul buku ______ ]       |
|                                             |
|  Anggota | Buku | Tgl Pinjam | [Kembalikan] |
+---------------------------------------------+

+-----------------------------------------------------+
|  Riwayat Peminjaman — Siti Aminah                   |
|-----------------------------------------------------|
|  Buku            | Pinjam   | Kembali | Status      |
|  Laskar Pelangi  | 01/07    | 10/07   | Selesai     |
|  Bumi Manusia    | 15/07    | -       | Dipinjam    |
+-----------------------------------------------------+

