# Civicapi PHP SDK Reference

Complete API reference for the Civicapi PHP SDK.


## CivicapiSDK

### Constructor

```php
require_once __DIR__ . '/civicapi_sdk.php';

$client = new CivicapiSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CivicapiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CivicapiSDK::test();
```


### Instance Methods

#### `Election($data = null)`

Create a new `ElectionEntity` instance. Pass `null` for no initial data.

#### `Polling($data = null)`

Create a new `PollingEntity` instance. Pass `null` for no initial data.

#### `Result($data = null)`

Create a new `ResultEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CivicapiUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ElectionEntity

```php
$election = $client->Election();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No | Election date |
| `id` | `string` | No | Unique election identifier |
| `name` | `string` | No | Election name |
| `state` | `string` | No | State or jurisdiction |
| `status` | `string` | No | Current status of the election |
| `type` | `string` | No | Type of election |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Election()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ElectionEntity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PollingEntity

```php
$polling = $client->Polling();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | Poll end date |
| `marginOfError` | `float` | No | Margin of error percentage |
| `pollId` | `string` | No | Unique poll identifier |
| `pollster` | `string` | No | Organization conducting the poll |
| `results` | `array` | No |  |
| `sampleSize` | `int` | No | Number of respondents |
| `startDate` | `string` | No | Poll start date |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Polling()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PollingEntity`

Create a new `PollingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ResultEntity

```php
$result = $client->Result();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate` | `string` | No | Candidate name |
| `party` | `string` | No | Political party |
| `percentage` | `float` | No | Percentage of total votes |
| `votes` | `int` | No | Number of votes received |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Result()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ResultEntity`

Create a new `ResultEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CivicapiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

