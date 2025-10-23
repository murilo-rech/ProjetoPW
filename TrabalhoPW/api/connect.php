
<?php

$host = "localhost";
$port = 3306;
$user = "root";
$password = "";
$database = "pdv";
$charset = 'utf8mb4';

$dsn = "mysql:host={$host};port={$port};dbname={$database};charset={$charset}";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $conn = new PDO($dsn, $user, $password, $options);
} catch (PDOException $e) {
    $mensagem = "Erro ao conectar ao banco (" . ($e->getCode() ?: 'sem código') . ")";
    $response = [
        "message" => $mensagem . ": " . htmlspecialchars($e->getMessage()),
        "type" => "error",
    ];
    echo json_encode($response);
    exit;
}
