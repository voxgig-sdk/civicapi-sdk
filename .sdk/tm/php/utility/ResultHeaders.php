<?php
declare(strict_types=1);

// Civicapi SDK utility: result_headers

class CivicapiResultHeaders
{
    public static function call(CivicapiContext $ctx): ?CivicapiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
