<?php
// Copy this file to _config.php (same folder) on the live server and fill
// in real values. _config.php is gitignored and must NOT be committed —
// it holds a secret API key. Deploying via git will never overwrite or
// delete an existing _config.php, since it isn't part of the repo.

return [
    'resend_api_key' => 'YOUR_RESEND_API_KEY',
    'from' => 'Fynix Tech Website <noreply@fynixtech.sg>',
    'to' => 'jojosam@fynixtech.sg',
];
