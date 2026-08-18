<?php
header('Content-Type: application/json');

$configFile = __DIR__ . '/_config.php';
if (!file_exists($configFile)) {
    http_response_code(503);
    echo json_encode(['error' => 'Email service is not configured yet.']);
    exit;
}
$config = require $configFile;

$body = json_decode(file_get_contents('php://input'), true) ?: [];
$phone = trim($body['phone'] ?? '');

if ($phone === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Phone number is required.']);
    exit;
}

$text = "New callback request received from the website chat widget.\n\n"
    . "Phone: {$phone}\n\n"
    . "---\n"
    . "This email is auto-generated from website chat widget.";

$payload = json_encode([
    'from' => $config['from'],
    'to' => $config['to'],
    'subject' => "New callback request: {$phone}",
    'text' => $text,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $config['resend_api_key'],
        'Content-Type: application/json',
    ],
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to send email.']);
    exit;
}

echo json_encode(['ok' => true]);
