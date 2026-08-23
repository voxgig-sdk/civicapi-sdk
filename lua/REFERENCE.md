# Civicapi Lua SDK Reference

Complete API reference for the Civicapi Lua SDK.


## CivicapiSDK

### Constructor

```lua
local sdk = require("civicapi_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Election(data)`

Create a new `Election` entity instance. Pass `nil` for no initial data.

#### `Polling(data)`

Create a new `Polling` entity instance. Pass `nil` for no initial data.

#### `Result(data)`

Create a new `Result` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ElectionEntity

```lua
local election = client:Election(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Election():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PollingEntity

```lua
local polling = client:Polling(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | Poll end date |
| `marginOfError` | `number` | No | Margin of error percentage |
| `pollId` | `string` | No | Unique poll identifier |
| `pollster` | `string` | No | Organization conducting the poll |
| `results` | `table` | No |  |
| `sampleSize` | `number` | No | Number of respondents |
| `startDate` | `string` | No | Poll start date |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Polling():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PollingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ResultEntity

```lua
local result = client:Result(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate` | `string` | No | Candidate name |
| `party` | `string` | No | Political party |
| `percentage` | `number` | No | Percentage of total votes |
| `votes` | `number` | No | Number of votes received |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Result():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ResultEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

