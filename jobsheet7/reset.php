<?php
session_start();

// Mengosongkan semua variabel array session yang aktif
$_SESSION = [];

// Menghancurkan sesi yang berjalan di server
session_destroy();

// Mengarahkan kembali pengguna ke halaman beranda
header('Location: index.php');
exit;