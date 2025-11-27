<?php

require "connect.php";

$userId = filter_input(INPUT_GET, 'userid', FILTER_DEFAULT);

$query = "select * from products where products.user_id = $userId;";

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "data" => $stmt->fetchAll()
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);