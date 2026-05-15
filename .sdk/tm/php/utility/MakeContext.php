<?php
declare(strict_types=1);

// Civicapi SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CivicapiMakeContext
{
    public static function call(array $ctxmap, ?CivicapiContext $basectx): CivicapiContext
    {
        return new CivicapiContext($ctxmap, $basectx);
    }
}
