<?php

require "connect.php";

$query = 'select * from faq';

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Lista de faqs carregada!",
    "data" => $stmt->fetchAll()
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);