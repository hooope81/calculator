<?php

function calc(int $number1, int $number2, string $operation): int
{
    return match ($operation) {
        "sum" => $number1 + $number2,
        "difference" => $number1 - $number2,
        "multiplication" => $number1 * $number2,
        "dividing" => $number1 / $number2,
        default => 0,
    };
}

session_start();
$result = 0;

if (isset($_POST['number1'], $_POST['number2'], $_POST['operation'])) {
    $result = calc(
        (int) $_POST['number1'],
        (int) $_POST['number2'],
        $_POST['operation']
    );
}

include "index.html";
print_r($_POST);