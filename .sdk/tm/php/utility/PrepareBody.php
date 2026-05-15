<?php
declare(strict_types=1);

// Civicapi SDK utility: prepare_body

class CivicapiPrepareBody
{
    public static function call(CivicapiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
