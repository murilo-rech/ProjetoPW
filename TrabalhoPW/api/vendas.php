<?php

require "connect.php";

$user_id=filter_input(INPUT_GET, 'user', FILTER_VALIDATE_INT);
$formpag_id=filter_input(INPUT_GET, 'formpag', FILTER_VALIDATE_INT);
$cupom_id=filter_input(INPUT_GET, 'cupom', FILTER_VALIDATE_INT);
$total=filter_input(INPUT_GET, 'total', FILTER_VALIDATE_FLOAT);

if($cupom_id === null || $cupom_id === false) {
    $cupom_id = "NULL";
}

if($formpag_id === null || $formpag_id === false) {
    $response = [
        "type" => "error",
        "message" => "Forma de pagamento não selecionada!",
    ];
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if($user_id === null || $user_id === false) {
    $response = [
        "type" => "error",
        "message" => "Usuário não identificado!",
    ];
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if($total === null || $total === false || $total <= 0) {
    $response = [
        "type" => "error",
        "message" => "Total da venda inválido!",
    ];
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$query = "INSERT INTO vendas (user_id, formpag_id, cupom_id, total) VALUES
({$user_id}, {$formpag_id}, {$cupom_id}, {$total});";

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Venda realizada com sucesso!",
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;
