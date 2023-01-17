<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);

if ($input) {

    function math($matches)
    {
    $operator = $matches[2];

        switch ($operator) {
            case '+':
                return $Result = $matches[1] + $matches[3];
            case '-':
                return $Result = $matches[1] - $matches[3];
            case '*':
                return $Result = $matches[1] * $matches[3];
            case '/':
                return $Result = $matches[1] / $matches[3];
        }
    }
    $test = $input["Expression"];
    do {
        $test = preg_replace_callback(
            '/(\d+)(?:\s*)([\*\/])(?:\s*)(\d+)/',
            "math",
            $test
        );
    } while (preg_match('/(\d+)(?:\s*)([\*\/])(?:\s*)(\d+)/', $test, $matches) !== 0);
    do {
        $test = preg_replace_callback(
            '/(\d+)(?:\s*)([\+\-])(?:\s*)(\d+)/',
            "math",
            $test
        );
    } while (preg_match('/(\d+)(?:\s*)([\+\-])(?:\s*)(\d+)/', $test, $matches) !== 0);
    echo "Ответ: " . $test;
}
?>