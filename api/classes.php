<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Include authentication class
require_once 'auth.php';

// Token-based authentication
function isAuthenticated() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? '';
    
    if (strpos($authHeader, 'Bearer ') !== 0) {
        return false;
    }
    
    $token = substr($authHeader, 7);
    $auth = new SimpleAuth();
    return $auth->validateToken($token) !== false;
}

// File path for storing classes data
$dataFile = '../data/classes.json';
$dataDir = '../data/';

// Ensure data directory exists
if (!file_exists($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Read classes
        if (file_exists($dataFile)) {
            $data = file_get_contents($dataFile);
            echo $data;
        } else {
            // Return default classes if no file exists
            $defaultClasses = [
                [
                    "id" => "1",
                    "title" => "Suzuki Class 1",
                    "day" => "Friday",
                    "time" => "9:00 - 10:00",
                    "location" => "Allegro Suzuki Music School",
                    "description" => "This is a class for children with parents. Everyone is welcome to join."
                ],
                [
                    "id" => "2",
                    "title" => "Suzuki Class 2",
                    "day" => "Friday",
                    "time" => "10:15 - 11:15",
                    "location" => "Allegro Suzuki Music School",
                    "description" => "This is a class for children with parents. Everyone is welcome to join."
                ]
            ];
            echo json_encode($defaultClasses);
        }
        break;
        
    case 'POST':
        // Create or update classes
        if (!isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            break;
        }
        
        $input = file_get_contents('php://input');
        $classes = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            break;
        }
        
        // Validate classes data
        if (!is_array($classes)) {
            http_response_code(400);
            echo json_encode(['error' => 'Classes must be an array']);
            break;
        }
        
        // Save to file
        $result = file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT));
        
        if ($result === false) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save data']);
        } else {
            echo json_encode(['success' => true, 'message' => 'Classes saved successfully']);
        }
        break;
        
    case 'PUT':
        // Update specific class
        if (!isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            break;
        }
        
        $input = file_get_contents('php://input');
        $classData = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid JSON']);
            break;
        }
        
        // Load existing classes
        $classes = [];
        if (file_exists($dataFile)) {
            $classes = json_decode(file_get_contents($dataFile), true) ?: [];
        }
        
        // Find and update the class
        $updated = false;
        foreach ($classes as &$class) {
            if ($class['id'] === $classData['id']) {
                $class = $classData;
                $updated = true;
                break;
            }
        }
        
        if (!$updated) {
            http_response_code(404);
            echo json_encode(['error' => 'Class not found']);
            break;
        }
        
        // Save updated classes
        $result = file_put_contents($dataFile, json_encode($classes, JSON_PRETTY_PRINT));
        
        if ($result === false) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save data']);
        } else {
            echo json_encode(['success' => true, 'message' => 'Class updated successfully']);
        }
        break;
        
    case 'DELETE':
        // Delete specific class
        if (!isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['error' => 'Unauthorized']);
            break;
        }
        
        $classId = $_GET['id'] ?? null;
        if (!$classId) {
            http_response_code(400);
            echo json_encode(['error' => 'Class ID required']);
            break;
        }
        
        // Load existing classes
        $classes = [];
        if (file_exists($dataFile)) {
            $classes = json_decode(file_get_contents($dataFile), true) ?: [];
        }
        
        // Remove the class
        $classes = array_filter($classes, function($class) use ($classId) {
            return $class['id'] !== $classId;
        });
        
        // Save updated classes
        $result = file_put_contents($dataFile, json_encode(array_values($classes), JSON_PRETTY_PRINT));
        
        if ($result === false) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save data']);
        } else {
            echo json_encode(['success' => true, 'message' => 'Class deleted successfully']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
