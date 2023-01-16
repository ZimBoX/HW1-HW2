<?php
header("CORS «Access-Control-Allow-Origin»");

$input = file_get_contents("PHP://input");
echo ($input);
?>
