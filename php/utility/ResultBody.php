<?php
declare(strict_types=1);

// Civicapi SDK utility: result_body

class CivicapiResultBody
{
    public static function call(CivicapiContext $ctx): ?CivicapiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
