<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$input = json_decode(file_get_contents('php://input'), true);
if ($input){
    // style="background-color: aliceblue; color: #555555; width: 25px; height: 36px;"
    echo "<div style='";
    echo "background-color: " . $input["background_color"] . "; ";
    echo "color: " . $input["color"] . "; ";
    echo "width: " . $input["width"] . "; ";
    echo "height: " . $input["height"] . ";' >";
    echo "</div>";
}
?>