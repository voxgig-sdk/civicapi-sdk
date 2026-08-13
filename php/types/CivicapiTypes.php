<?php
declare(strict_types=1);

// Typed models for the Civicapi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Election entity data model. */
class Election
{
    public ?string $date = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $state = null;
    public ?string $status = null;
    public ?string $type = null;
}

/** Request payload for Election#list. */
class ElectionListMatch
{
    public ?string $date = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $state = null;
    public ?string $status = null;
    public ?string $type = null;
}

/** Polling entity data model. */
class Polling
{
    public ?string $endDate = null;
    public ?float $marginOfError = null;
    public ?string $pollId = null;
    public ?string $pollster = null;
    public ?array $results = null;
    public ?int $sampleSize = null;
    public ?string $startDate = null;
}

/** Request payload for Polling#list. */
class PollingListMatch
{
    public ?string $endDate = null;
    public ?float $marginOfError = null;
    public ?string $pollId = null;
    public ?string $pollster = null;
    public ?array $results = null;
    public ?int $sampleSize = null;
    public ?string $startDate = null;
}

/** Result entity data model. */
class Result
{
    public ?string $candidate = null;
    public ?string $party = null;
    public ?float $percentage = null;
    public ?int $votes = null;
}

/** Request payload for Result#list. */
class ResultListMatch
{
    public ?string $candidate = null;
    public ?string $party = null;
    public ?float $percentage = null;
    public ?int $votes = null;
}

