<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();
$_SESSION['rightAnswers'] = $_SESSION['rightAnswers'] ?? 0;

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($test)){
    $test = json_decode(file_get_contents('./questions.json', true));
}

if (isset($test)){
    $number = "quest_" . $input["Number"];
    $answerNumber = "quest_" . $input["Number"]-1;

    if (isset($test->rightAnswers->$answerNumber) && $test->rightAnswers->$answerNumber === $input["Answer"]){
        session_start();
        $_SESSION['rightAnswers']++;
    }

    if (isset($test->$number) ) {
        $questJSON = json_encode($test->$number);
        echo $questJSON;

    }
    else {
        echo json_encode($_SESSION);
        session_destroy();
    }
}
exit()
?>