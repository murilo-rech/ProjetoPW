<?php

require "connect.php";

$email = filter_input(INPUT_POST, 'email', FILTER_DEFAULT);
$senha = filter_input(INPUT_POST, 'senha', FILTER_DEFAULT);


if (empty($email) || empty($senha) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
$response = [
    "type" => "error",
    "message" => "Email ou Senha Invalido",
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;
}

$query = "SELECT * FROM users WHERE email = '{$email}'";
$stmt = $conn->query($query);

if($stmt->rowCount() == 0) {
    $response = [
        "type" => "error",
        "message" => "E-mail não cadastrado!",
    ];
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$user = $stmt->fetch();

if(!password_verify($senha, $user->senha)) {
    $response = [
        "type" => "error",
        "message" => "Senha Incorreta!",
    ];
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

unset($user->senha);

$response = [
    "type" => "success",
    "message" => "Usuário logado com sucesso!",
    "data" => $user
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;