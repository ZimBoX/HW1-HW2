<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);
if ($input){
    print "Здравствуйте: " . $input["Name"] . " !" . "<br>" ."Ваш возраст: " . $input["Age"];
}
?>