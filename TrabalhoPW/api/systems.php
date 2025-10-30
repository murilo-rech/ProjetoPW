<?php

require "connect.php";

$query = "select * from sistemas";

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Sistemas Carregados!",
    "data" => $stmt->fetchAll()
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;