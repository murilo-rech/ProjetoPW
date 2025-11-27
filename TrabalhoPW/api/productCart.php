<?php

require "connect.php";

$productId = filter_input(INPUT_GET, 'productid', FILTER_DEFAULT);

$query = "select * from products where products.id = $productId;";

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Produto adicionado com sucesso!",
    "data" => $stmt->fetchAll()
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);