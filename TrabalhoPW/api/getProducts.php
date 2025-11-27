<?php

require "connect.php";

$code = filter_input(INPUT_GET, 'code', FILTER_DEFAULT);

$query = "SELECT products.id from products where products.codigo = '{$code}';";
$stmt = $conn->query($query);
if($stmt->rowCount() == 1) {
    $response = [
    "type" => "success",
    "message" => "Produto adicionado com sucesso!",
    "data" => $stmt->fetchAll()
];
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;
}else{
    echo json_encode(["type" => "error", "message" => "Produto inválido!"]);
    exit;
}