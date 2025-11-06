<?php

require "connect.php";


$query = 'select * from formpag';

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Lista de Pagamentos carregado!",
    "data" => $stmt->fetchAll()
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);