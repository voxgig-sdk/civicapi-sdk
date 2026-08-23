# Civicapi Golang SDK Reference

Complete API reference for the Civicapi Golang SDK.


## CivicapiSDK

### Constructor

```go
func NewCivicapiSDK(options map[string]any) *CivicapiSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CivicapiSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CivicapiSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Election(data map[string]any) CivicapiEntity`

Create a new `Election` entity instance. Pass `nil` for no initial data.

#### `Polling(data map[string]any) CivicapiEntity`

Create a new `Polling` entity instance. Pass `nil` for no initial data.

#### `Result(data map[string]any) CivicapiEntity`

Create a new `Result` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ElectionEntity

```go
election := client.Election(nil)
fmt.Println(election.GetName()) // "election"
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Election(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ElectionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PollingEntity

```go
polling := client.Polling(nil)
fmt.Println(polling.GetName()) // "polling"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `endDate` | `string` | No | Poll end date |
| `marginOfError` | `float64` | No | Margin of error percentage |
| `pollId` | `string` | No | Unique poll identifier |
| `pollster` | `string` | No | Organization conducting the poll |
| `results` | `[]any` | No |  |
| `sampleSize` | `int` | No | Number of respondents |
| `startDate` | `string` | No | Poll start date |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Polling(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PollingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ResultEntity

```go
result := client.Result(nil)
fmt.Println(result.GetName()) // "result"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `candidate` | `string` | No | Candidate name |
| `party` | `string` | No | Political party |
| `percentage` | `float64` | No | Percentage of total votes |
| `votes` | `int` | No | Number of votes received |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Result(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ResultEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCivicapiSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

