<?php

require "connect.php";

$user_id = filter_input(INPUT_GET, 'user_id', FILTER_DEFAULT);
$code = filter_input(INPUT_POST, 'coupon-code', FILTER_DEFAULT);
$value = filter_input(INPUT_POST, 'coupon-value', FILTER_DEFAULT);


if(empty($user_id) || empty($code) || empty($value)) {
    $response = [
        "type" => "error",
        "message" => "Parâmetros insuficientes para criar o cupom.",
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$query = "select * from cupons where codigo = '$code';";
$stmt = $conn->query($query);
if($stmt->rowCount() > 0) {
    $response = [
        "type" => "error",
        "message" => "Código de cupom já existe. Escolha outro código.",
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}


$query = "insert into cupons(user_id, codigo, desconto) values ('$user_id', '$code', '$value');";
$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Cupom criado com sucesso!",
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);