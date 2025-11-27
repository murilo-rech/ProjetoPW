<?php

require "connect.php";

$code = filter_input(INPUT_GET, 'code', FILTER_DEFAULT);
$id = filter_input(INPUT_GET, 'id', FILTER_DEFAULT);

$query = "SELECT cupons.id, cupons.desconto FROM cupons, users WHERE cupons.codigo = '{$code}' and users.id = {$id};";
$stmt = $conn->query($query);
if($stmt->rowCount() == 1) {
    $response = [
    "type" => "success",
    "message" => "Cupom aplicado com sucesso!",
    "data" => $stmt->fetchAll()
];
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;
}else{
    echo json_encode(["type" => "error", "message" => "Cupom inválido!"]);
    exit;
}