<?php
header('Content-Type: application/json');

echo "Testing file system permissions on Bluehost...\n\n";

// Test 1: Current directory
echo "Current directory: " . getcwd() . "\n";
echo "Current directory permissions: " . substr(sprintf('%o', fileperms('.')), -4) . "\n";
echo "Current directory writable: " . (is_writable('.') ? 'YES' : 'NO') . "\n\n";

// Test 2: Try to create data directory
$dataDir = 'data';
echo "Attempting to create data directory: $dataDir\n";

if (is_dir($dataDir)) {
    echo "Data directory already exists\n";
    echo "Data directory permissions: " . substr(sprintf('%o', fileperms($dataDir)), -4) . "\n";
    echo "Data directory writable: " . (is_writable($dataDir) ? 'YES' : 'NO') . "\n";
} else {
    echo "Data directory does not exist, creating...\n";
    $created = mkdir($dataDir, 0755, true);
    if ($created) {
        echo "Data directory created successfully\n";
        echo "New data directory permissions: " . substr(sprintf('%o', fileperms($dataDir)), -4) . "\n";
        echo "New data directory writable: " . (is_writable($dataDir) ? 'YES' : 'NO') . "\n";
    } else {
        echo "Failed to create data directory\n";
    }
}

// Test 3: Try to write a test file
echo "\nTesting file write...\n";
$testFile = $dataDir . '/test_write.json';
$testData = json_encode(['test' => 'data', 'timestamp' => date('Y-m-d H:i:s')]);

$bytesWritten = file_put_contents($testFile, $testData);
if ($bytesWritten !== false) {
    echo "Test file written successfully: $testFile\n";
    echo "Bytes written: $bytesWritten\n";
    
    // Test 4: Try to read it back
    $readData = file_get_contents($testFile);
    if ($readData !== false) {
        echo "Test file read successfully\n";
        echo "Content: " . $readData . "\n";
    } else {
        echo "Failed to read test file\n";
    }
    
    // Clean up test file
    unlink($testFile);
    echo "Test file cleaned up\n";
} else {
    echo "Failed to write test file\n";
}

// Test 5: Check PHP info
echo "\nPHP version: " . PHP_VERSION . "\n";
echo "PHP user: " . get_current_user() . "\n";
echo "PHP temp directory: " . sys_get_temp_dir() . "\n";

echo "\nTest complete!\n";
?>
