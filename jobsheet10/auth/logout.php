<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require __DIR__ . '/../includes/koneksi.php';

// 1. Jika user sedang login, kosongkan remember_token di database
if (isset($_SESSION['user_id'])) {
    $stmt = $pdo->prepare("UPDATE users SET remember_token = NULL WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
}

// 2. Hapus cookie remember_token dari browser dengan mengatur waktunya ke masa lalu (-3600 detik)
if (isset($_COOKIE['remember_token'])) {
    setcookie('remember_token', '', time() - 3600, "/");
}

// 3. Hancurkan seluruh session yang aktif
$_SESSION = [];
session_unset();
session_destroy();

// 4. Arahkan kembali ke halaman login
header('Location: login.php');
exit;