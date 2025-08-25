<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only allow GET requests for loading data
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get the type parameter
$type = $_GET['type'] ?? '';

if (empty($type)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing type parameter']);
    exit;
}

// Define the data directory
$dataDir = 'data';

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
    // Check if file exists
    if (!file_exists($filePath)) {
        // Return default data structure if file doesn't exist
        $defaultData = getDefaultData($type);
        echo json_encode([
            'success' => true,
            'data' => $defaultData,
            'type' => $type,
            'message' => 'Using default data'
        ]);
        exit;
    }
    
    // Read the file content
    $content = file_get_contents($filePath);
    if ($content === false) {
        throw new Exception('Failed to read file');
    }
    
    // Decode JSON
    $data = json_decode($content, true);
    if ($data === null) {
        throw new Exception('Invalid JSON in file');
    }
    
    echo json_encode([
        'success' => true,
        'data' => $data,
        'type' => $type
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to load data: ' . $e->getMessage()
    ]);
}

function getDefaultData($type) {
    switch ($type) {
        case 'classes':
            return [
                [
                    'id' => 1,
                    'title' => 'Suzuki Class 1',
                    'date' => 'Saturday 11th of October',
                    'time' => '9:00 - 10:00',
                    'location' => 'Allegro Suzuki Music School',
                    'description' => 'This is a class for children with parents. Everyone is welcome to join.'
                ],
                [
                    'id' => 2,
                    'title' => 'Suzuki Class 2',
                    'date' => 'Saturday 11th of October',
                    'time' => '10:15 - 11:15',
                    'location' => 'Allegro Suzuki Music School',
                    'description' => 'This is a class for children with parents. Everyone is welcome to join.'
                ]
            ];
        case 'calendar':
            return [];
        case 'about':
            return [
                'suzuki_method' => 'At the heart of our music classes is the Suzuki Method, a world-renowned approach to music education that focuses on creating a nurturing, supportive environment for young children. Developed by Dr. Shinichi Suzuki, the method believes that every child can develop musical talent, just like they learn to speak their native language — through listening, repetition, and encouragement in a loving environment.',
                'principles' => [
                    'Early Learning: Just like language, music can be learned from a young age. The earlier we start, the more natural the learning process becomes.',
                    'Parental Involvement: Parents play a crucial role in the learning process, participating alongside their child to encourage progress and celebrate milestones.',
                    'Positive Reinforcement: The Suzuki Method fosters a love for learning through positive feedback, allowing children to build confidence and joy in their musical journey.'
                ],
                'program_description' => 'Suzuki Early Childhood Education program takes Suzuki philosophy a step further by offering a holistic learning experience, focusing on the emotional, social, and cognitive development of your child. Through playful and interactive music activities, children develop listening skills, concentration, and an appreciation for the arts — all while forming meaningful bonds with their peers and caregivers.',
                'teacher_description' => 'We are excited to introduce you to Justyna Bidler, the passionate and experienced teacher who will be leading our music classes. Originally from Poland, Justyna holds a Master of Arts degree in Violin Performance and has completed specialized training in both Suzuki Violin Teaching and Suzuki Early Childhood Education. With her diverse qualifications, including three levels of Suzuki Violin certification, Justyna combines her expertise with a deep love for music and teaching.'
            ];
        case 'pricing':
            return [
                [
                    'title' => '1-Lesson Voucher',
                    'price' => '5,500 ISK',
                    'description' => 'For those who would like to try out our classes without commitment!',
                    'savings' => null
                ],
                [
                    'title' => '5-Lesson Voucher',
                    'price' => '26,000 ISK',
                    'description' => 'A great option if you\'re looking to try out our classes with flexibility!',
                    'savings' => 'Save 5%'
                ],
                [
                    'title' => '10-Lesson Voucher',
                    'price' => '49,500 ISK',
                    'description' => 'The best value for regular attendance, with even more savings!',
                    'savings' => 'Save 10%'
                ]
            ];
        case 'faq':
            return [
                [
                    'question' => 'What is the Suzuki Method?',
                    'answer' => 'The Suzuki Method is a unique approach to music education that emphasizes early learning through listening, repetition, and a nurturing environment. Created by Dr. Shinichi Suzuki, it believes that every child has the potential to develop musical ability, just like learning a language. It encourages children to play instruments from a young age, with parents actively involved in the learning process.'
                ],
                [
                    'question' => 'What age can children start?',
                    'answer' => 'Children can start as early as 0 to 3 years old. The earlier, the better, as the Suzuki Method thrives on the natural development of musical skills in the early years.'
                ],
                [
                    'question' => 'Do I need to buy an instrument?',
                    'answer' => 'No, you don\'t need to buy an instrument. We provide all the instruments required for the class, such as glockenspiels, xylophones, shakers, and other simple percussion instruments, ensuring that your child has everything they need to participate.'
                ]
            ];
        default:
            return [];
    }
}
?>
