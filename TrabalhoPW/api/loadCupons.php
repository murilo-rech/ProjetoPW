<?php

require "connect.php";

$id = filter_input(INPUT_GET, 'id', FILTER_DEFAULT);

$query = "SELECT cupons.* FROM cupons, users WHERE users.id = {$id};";
$stmt = $conn->query($query);
    $response = [
    "type" => "success",
    "message" => "Cupom aplicado com sucesso!",
    "count" => $stmt->rowCount(),
    "data" => $stmt->fetchAll()
];
echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;

