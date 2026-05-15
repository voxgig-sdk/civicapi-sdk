<?php
declare(strict_types=1);

// Civicapi SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class CivicapiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new CivicapiBaseFeature();
            case "test":
                return new CivicapiTestFeature();
            default:
                return new CivicapiBaseFeature();
        }
    }
}
