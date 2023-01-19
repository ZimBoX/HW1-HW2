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
    $userEmail = $input["email"];

    $users = json_decode(file_get_contents('./users.json'), true);

    if(isset($users[$userLogin])){
        echo "clone";
    }
    else{
        $userID = md5($userLogin);
        $users += [
            $userLogin => [
                "id" => $userID,
                "password" => $userPassword,
                "role" => "user",
                "email" => $userEmail,
            ]
        ];
        echo "done";
        file_put_contents('./users.json', json_encode($users));
    }
}

?>