<?php
declare(strict_types=1);

// Civicapi SDK utility: feature_add

class CivicapiFeatureAdd
{
    public static function call(CivicapiContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
