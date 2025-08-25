<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow POST requests for saving data
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
if (!isset($data['type']) || !isset($data['content'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$type = $data['type'];
$content = $data['content'];

// Define the data directory (create if it doesn't exist)
$dataDir = 'data';

// Check if data directory exists, if not create it
if (!is_dir($dataDir)) {
    $created = mkdir($dataDir, 0755, true);
    if (!$created) {
        http_response_code(500);
        echo json_encode([
            'error' => 'Failed to create data directory',
            'debug' => [
                'current_dir' => getcwd(),
                'data_dir' => $dataDir,
                'permissions' => substr(sprintf('%o', fileperms('.')), -4)
            ]
        ]);
        exit;
    }
}

// Check if data directory is writable
if (!is_writable($dataDir)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Data directory is not writable',
        'debug' => [
            'data_dir' => $dataDir,
            'permissions' => substr(sprintf('%o', fileperms($dataDir)), -4),
            'writable' => is_writable($dataDir)
        ]
    ]);
    exit;
}

// Define file paths based on type
$filePath = '';
switch ($type) {
    case 'classes':
        $filePath = $dataDir . '/classes.json';
        break;
    case 'calendar':
        $filePath = $dataDir . '/calendar.json';
        break;
    case 'about':
        $filePath = $dataDir . '/about.json';
        break;
    case 'pricing':
        $filePath = $dataDir . '/pricing.json';
        break;
    case 'faq':
        $filePath = $dataDir . '/faq.json';
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data type']);
        exit;
}

try {
    // Check if we can write to the file path
    $testWrite = @file_put_contents($filePath, 'test');
    if ($testWrite === false) {
        throw new Exception('Cannot write to file path: ' . $filePath);
    }
    
    // Remove test content
    @unlink($filePath);
    
    // Save the actual data to the appropriate file
    $result = file_put_contents($filePath, json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result === false) {
        throw new Exception('Failed to write to file: ' . $filePath);
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Data saved successfully',
        'type' => $type,
        'debug' => [
            'file_path' => $filePath,
            'bytes_written' => $result,
            'data_size' => strlen(json_encode($content))
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to save data: ' . $e->getMessage(),
        'debug' => [
            'file_path' => $filePath,
            'data_dir_exists' => is_dir($dataDir),
            'data_dir_writable' => is_writable($dataDir),
            'current_permissions' => substr(sprintf('%o', fileperms($dataDir)), -4)
        ]
    ]);
}
?>
