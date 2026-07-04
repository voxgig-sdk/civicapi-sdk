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

/** Match filter for Election#list (any subset of Election fields). */
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
    public ?string $end_date = null;
    public ?float $margin_of_error = null;
    public ?string $poll_id = null;
    public ?string $pollster = null;
    public ?array $result = null;
    public ?int $sample_size = null;
    public ?string $start_date = null;
}

/** Match filter for Polling#list (any subset of Polling fields). */
class PollingListMatch
{
    public ?string $end_date = null;
    public ?float $margin_of_error = null;
    public ?string $poll_id = null;
    public ?string $pollster = null;
    public ?array $result = null;
    public ?int $sample_size = null;
    public ?string $start_date = null;
}

/** Result entity data model. */
class Result
{
    public ?string $candidate = null;
    public ?string $party = null;
    public ?float $percentage = null;
    public ?int $vote = null;
}

/** Match filter for Result#list (any subset of Result fields). */
class ResultListMatch
{
    public ?string $candidate = null;
    public ?string $party = null;
    public ?float $percentage = null;
    public ?int $vote = null;
}

