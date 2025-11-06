<?php

require "connect.php";

$codigo = filter_input(INPUT_POST, 'codigo', FILTER_DEFAULT);
$nome = filter_input(INPUT_POST, 'nome', FILTER_DEFAULT);
$valor = filter_input(INPUT_POST, 'valor', FILTER_DEFAULT);
$userId = filter_input(INPUT_POST, 'user_id', FILTER_DEFAULT);


$query = "insert into products(user_id, nome, codigo, valor) values
('{$userId}', '{$nome}', '{$codigo}', '{$valor}')";

$stmt = $conn->query($query);

$response = [
    "type" => "success",
    "message" => "Produto Cadastrado",
];

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);