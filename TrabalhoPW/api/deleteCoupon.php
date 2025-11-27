<?php

require "connect.php";

// addEventListener("click", async (e) => {
//     if (e.target.closest(".btn-delete")) {
//         const couponItem = e.target.closest(".coupon-item");
//         const couponId = couponItem.getAttribute("data-coupon-id");
//         console.log(couponId);
//         const response = await fetch("api/deleteCoupon.php?id=" + couponId)
//         const result = await response.json();
//         toast[result.type](result.message);
//         if (result.type === "success") {
//             couponItem.remove();
//         }
//     }
// });

$id = filter_input(INPUT_GET, 'id', FILTER_DEFAULT);

if(empty($id)) {
    $response = [
        "type" => "error",
        "message" => "Parâmetros insuficientes para deletar o cupom.",
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
$query = "delete from cupons where id = '$id';";
$stmt = $conn->query($query);
if($stmt) {
    $response = [
        "type" => "success",
        "message" => "Cupom deletado com sucesso!",
    ];
} else {
    $response = [
        "type" => "error",
        "message" => "Erro ao deletar o cupom.",
    ];
}

echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
exit;