<?php

require "connect.php";

$name = filter_input(INPUT_POST, 'name', FILTER_DEFAULT);
$email = filter_input(INPUT_POST, 'email', FILTER_DEFAULT);
$password = filter_input(INPUT_POST, 'password', FILTER_DEFAULT);
$confirmpassword = filter_input(INPUT_POST, 'confirmpassword', FILTER_DEFAULT);

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

$response = [
    "type" => "success",
    "message" => "Registro realizado com sucesso!",
    "name" => $name
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);