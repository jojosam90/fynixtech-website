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
$name = trim($body['name'] ?? '');
$company = trim($body['company'] ?? '');
$email = trim($body['email'] ?? '');
$phone = trim($body['phone'] ?? '');
$service = trim($body['service'] ?? '');

if ($name === '' || $email === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Name, email, and phone are required.']);
    exit;
}

$text = "New submission received from company website form.\n\n"
    . "Enquirer Details:\n"
    . "Name: {$name}\n"
    . "Company: " . ($company !== '' ? $company : '-') . "\n"
    . "Email: {$email}\n"
    . "Phone: {$phone}\n"
    . "Service Interest: " . ($service !== '' ? $service : '-') . "\n\n"
    . "---\n"
    . "This email is auto-generated from website form.";

$payload = json_encode([
    'from' => $config['from'],
    'to' => $config['to'],
    'reply_to' => $email,
    'subject' => "New consultation request from {$name}",
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
