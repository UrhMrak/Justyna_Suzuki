<?php
session_start();

// Simple token-based authentication
class SimpleAuth {
    private $secretKey = 'your_super_secret_key_change_this_in_production';
    private $tokenExpiry = 3600; // 1 hour
    
    public function generateToken($username) {
        $payload = [
            'username' => $username,
            'exp' => time() + $this->tokenExpiry,
            'iat' => time()
        ];
        
        $header = base64_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
        $payload = base64_encode(json_encode($payload));
        
        $signature = hash_hmac('sha256', "$header.$payload", $this->secretKey);
        
        return "$header.$payload.$signature";
    }
    
    public function validateToken($token) {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }
        
        list($header, $payload, $signature) = $parts;
        
        // Verify signature
        $expectedSignature = hash_hmac('sha256', "$header.$payload", $this->secretKey);
        if (!hash_equals($signature, $expectedSignature)) {
            return false;
        }
        
        // Decode payload
        $payloadData = json_decode(base64_decode($payload), true);
        if (!$payloadData) {
            return false;
        }
        
        // Check expiration
        if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
            return false;
        }
        
        return $payloadData;
    }
    
    public function login($username, $password) {
        // Simple hardcoded credentials - you can enhance this
        if ($username === 'JustynaSuzukiece' && $password === 'qtmc!KetfZT49vG') {
            $token = $this->generateToken($username);
            return [
                'success' => true,
                'token' => $token,
                'expires_in' => $this->tokenExpiry
            ];
        }
        
        return ['success' => false, 'message' => 'Invalid credentials'];
    }
}

// Handle login requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth = new SimpleAuth();
    
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';
    
    $result = $auth->login($username, $password);
    
    header('Content-Type: application/json');
    echo json_encode($result);
    exit;
}

// Handle token validation
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['validate'])) {
    $auth = new SimpleAuth();
    
    $token = $_GET['token'] ?? '';
    $result = $auth->validateToken($token);
    
    header('Content-Type: application/json');
    echo json_encode([
        'valid' => $result !== false,
        'data' => $result
    ]);
    exit;
}
?>
