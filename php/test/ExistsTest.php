<?php
declare(strict_types=1);

// Civicapi SDK exists test

require_once __DIR__ . '/../civicapi_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CivicapiSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
