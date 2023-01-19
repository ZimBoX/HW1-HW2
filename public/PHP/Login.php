<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();

$input = json_decode(file_get_contents('php://input'), true);

if($input){
    $userLogin = $input["login"];
    $userPassword = $input["password"];

    $users = json_decode(file_get_contents('./users.json'), true);

    if(isset($users[$userLogin]) && $users[$userLogin]["password"] === $userPassword){
        $_SESSION["userID"] = $users[$userLogin]["id"];
        $_SESSION["userRole"] = $users[$userLogin]["role"];
        echo "done";
    }
    else{
        echo "miss";
    }
}

?>