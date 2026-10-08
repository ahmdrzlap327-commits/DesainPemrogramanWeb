// ===== Hamburger menu (JS-driven, menggantikan checkbox hack) =====
function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    
    if (!toggleBtn || !nav) return;
    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function updateCounter() {
    const table = document.querySelector(".table-responsive table");
    const counterEl = document.getElementById("table-counter");
    if (!table || !counterEl) return;

    const rows = table.querySelectorAll("tbody tr");
    let total = rows.length;
    let tampil = 0;

    rows.forEach(function (row) {
        // Hitung baris yang tidak disembunyikan (display bukan 'none')
        if (row.style.display !== "none") {
            tampil++;
        }
    });

    counterEl.textContent = `Menampilkan ${tampil} dari ${total} data`;
}

// ===== Konfirmasi hapus (front-end only, belum ke server) =====
function initHapusConfirm() {
    document.querySelectorAll(".btn-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td")?.textContent.trim() : "data ini";
            
            const isAnggota = window.location.href.includes("anggota");
            const jenisData = isAnggota ? "anggota" : "buku";

            const yakin = confirm(`Yakin ingin menghapus ${jenisData} "${nama}"?`);
            if (yakin && row) {
                row.remove();
                // Perbarui counter setelah baris dihapus dari tampilan
                updateCounter();
            }
        });
    });
}

// ===== Filter/pencarian tabel dibatasi ke kolom tertentu (Kolom pertama) =====
function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    // Jalankan pertama kali saat halaman dimuat
    updateCounter();

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(function (row) {
            const kolomTarget = row.querySelector("td");
            const teks = kolomTarget ? kolomTarget.textContent.toLowerCase() : "";
            row.style.display = teks.includes(keyword) ? "" : "none";
        });

        // Perbarui counter setiap kali mengetik
        updateCounter();
    });
}

// ===== Validasi form (client-side) =====
function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

// ===== Validasi form yang sudah direfactor menggunakan array =====
function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;
    
    form.addEventListener("submit", function (e) {
        let valid = true;
        
        // Daftar field teks biasa yang wajib diisi (Judul, Nama, Pengarang)
        const fieldWajib = [
            { selector: "[name='judul'], [name='nama']", pesan: "Field ini wajib diisi." },
            { selector: "[name='pengarang']", pesan: "Field ini wajib diisi." }
        ];

        // 1. Validasi field teks menggunakan perulangan forEach
        fieldWajib.forEach(function (item) {
            const field = form.querySelector(item.selector);
            if (field) {
                if (field.value.trim() === "") {
                    tampilkanError(field, item.pesan);
                    valid = false;
                } else {
                    hapusError(field);
                }
            }
        });

        // 2. Validasi khusus Tahun (aturan angka 1900-2026)
        const tahun = form.querySelector("[name='tahun']");
        if (tahun) {
            const nilai = parseInt(tahun.value, 10);
            if (isNaN(nilai) || nilai < 1900 || nilai > 2026) {
                tampilkanError(tahun, "Tahun harus di antara 1900-2026.");
                valid = false;
            } else {
                hapusError(tahun);
            }
        }

        // 3. Validasi khusus Stok (tidak boleh negatif)
        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilaiStok = parseInt(stok.value, 10);
            if (isNaN(nilaiStok) || nilaiStok < 0) {
                tampilkanError(stok, "Stok tidak boleh negatif.");
                valid = false;
            } else {
                hapusError(stok);
            }
        }

        // 4. Validasi khusus ISBN (jika ada, harus 10 atau 13 digit)
        const isbn = form.querySelector("[name='isbn']");
        if (isbn) {
            const valIsbn = isbn.value.trim();
            if (valIsbn === "") {
                tampilkanError(isbn, "ISBN wajib diisi.");
                valid = false;
            } else if (valIsbn.length !== 10 && valIsbn.length !== 13) {
                tampilkanError(isbn, "ISBN harus 10 atau 13 digit.");
                valid = false;
            } else {
                hapusError(isbn);
            }
        }

        if (!valid) {
            e.preventDefault(); // Mencegah form terkirim jika ada error
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});