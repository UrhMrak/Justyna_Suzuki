<?php
// Simple test file to verify PHP is working
header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'message' => 'PHP is working correctly',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => PHP_VERSION,
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>
