<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require __DIR__ . '/../includes/koneksi.php';

$username = trim($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

$login_key = 'failed_attempts_' . md5($username);
$max_attempts = 3; // Batas maksimal percobaan gagal

if (isset($_SESSION[$login_key]) && $_SESSION[$login_key] >= $max_attempts) {
    $_SESSION['flash'] = [
        'type' => 'error', 
        'pesan' => 'Terlalu banyak percobaan gagal. Akun ini dikunci sementara demi keamanan.'
    ];
    header('Location: login.php');
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    unset($_SESSION[$login_key]);
    // 1. Set session login utama
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['nama'] = $user['nama'];
    $_SESSION['role'] = $user['role'];

    // 2. Cek apakah centang "Ingat Saya" dipilih
    if (isset($_POST['remember'])) {
        // Buat token acak yang aman
        $token = bin2hex(random_bytes(32));

        // Simpan token ke database untuk user yang bersangkutan
        $stmtUpdate = $pdo->prepare("UPDATE users SET remember_token = ? WHERE id = ?");
        $stmtUpdate->execute([$token, $user['id']]);

        // Pasang cookie di browser pengguna yang bertahan selama 30 hari (86400 detik * 30 hari)
        setcookie('remember_token', $token, time() + (86400 * 30), "/", "", false, true);
    }

    // 3. Baru arahkan ke halaman utama setelah semuanya selesai
    header('Location: ../index.php');
    exit;
}

if (!isset($_SESSION[$login_key])) {
    $_SESSION[$login_key] = 0;
}
$_SESSION[$login_key]++;

$sisa_kesempatan = $max_attempts - $_SESSION[$login_key];

if ($sisa_kesempatan > 0) {
    $pesan_error = "Username atau password salah! Sisa percobaan: {$sisa_kesempatan} kali.";
} else {
    $pesan_error = "Anda telah gagal 3 kali. Akses login dibatasi sementara.";
}

// Jika login gagal
$_SESSION['flash'] = ['type' => 'error', 'pesan' => $pesan_error];
header('Location: login.php');
exit;