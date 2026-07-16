<?php
declare(strict_types=1);

// Civicapi SDK base feature

class CivicapiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CivicapiContext $ctx, array $options): void {}
    public function PostConstruct(CivicapiContext $ctx): void {}
    public function PostConstructEntity(CivicapiContext $ctx): void {}
    public function SetData(CivicapiContext $ctx): void {}
    public function GetData(CivicapiContext $ctx): void {}
    public function GetMatch(CivicapiContext $ctx): void {}
    public function SetMatch(CivicapiContext $ctx): void {}
    public function PrePoint(CivicapiContext $ctx): void {}
    public function PreSpec(CivicapiContext $ctx): void {}
    public function PreRequest(CivicapiContext $ctx): void {}
    public function PreResponse(CivicapiContext $ctx): void {}
    public function PreResult(CivicapiContext $ctx): void {}
    public function PreDone(CivicapiContext $ctx): void {}
    public function PreUnexpected(CivicapiContext $ctx): void {}
}
