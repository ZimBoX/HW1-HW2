<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);

if ($input){

    // Код взят со stackoverflow.

if(preg_match('/(\d+)(?:\s*)([\+\-\*\/])(?:\s*)(\d+)/', $input["Expression"], $matches) !== FALSE){
    $operator = $matches[2];

    switch($operator){
        case '+':
            $Result = $matches[1] + $matches[3];
            break;
        case '-':
            $Result = $matches[1] - $matches[3];
            break;
        case '*':
            $Result = $matches[1] * $matches[3];
            break;
        case '/':
            $Result = $matches[1] / $matches[3];
            break;
    }
}
    echo "Ответ: " . $Result;
}
?>