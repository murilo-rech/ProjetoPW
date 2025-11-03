<?php

require "connect.php";

$name = filter_input(INPUT_POST, 'name', FILTER_DEFAULT);
$email = filter_input(INPUT_POST, 'email', FILTER_DEFAULT);
$password = filter_input(INPUT_POST, 'password', FILTER_DEFAULT);
$confirmpassword = filter_input(INPUT_POST, 'confirmpassword', FILTER_DEFAULT);

$query = "SELECT * FROM users WHERE email = '{$email}'";
$stmt = $conn->query($query);
if($stmt->rowCount() > 0) {
    echo json_encode(["type" => "error", "message" => "Email já cadastrado!"]);
    exit;
}

if(!$name || !$email || !$password) {
    echo json_encode(["type" => "error", "message" => "Por favor, preencha todos os campos."]);
    exit;
}

if ($password !== $confirmpassword) {
    echo json_encode(["type" => "error", "message" => "As senhas não coincidem."]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$query = "insert into users(nome, email, senha)values
('$name', '$email', '$hashedPassword')";

$stmt = $conn->query($query);

$user = [
    "id" => $conn->lastInsertId(),
    "nome" => $name,
    "email" => $email
];

$response = [
    "type" => "success",
    "message" => "Usuário registrado com sucesso!",
    "data" => $user
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);