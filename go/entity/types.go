// Typed models for the Civicapi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Election is the typed data model for the election entity.
type Election struct {
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	State *string `json:"state,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ElectionListMatch mirrors the election fields as an all-optional match
// filter (Go analog of Partial<Election>).
type ElectionListMatch struct {
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	State *string `json:"state,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Polling is the typed data model for the polling entity.
type Polling struct {
	EndDate *string `json:"end_date,omitempty"`
	MarginOfError *float64 `json:"margin_of_error,omitempty"`
	PollId *string `json:"poll_id,omitempty"`
	Pollster *string `json:"pollster,omitempty"`
	Result *[]any `json:"result,omitempty"`
	SampleSize *int `json:"sample_size,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// PollingListMatch mirrors the polling fields as an all-optional match
// filter (Go analog of Partial<Polling>).
type PollingListMatch struct {
	EndDate *string `json:"end_date,omitempty"`
	MarginOfError *float64 `json:"margin_of_error,omitempty"`
	PollId *string `json:"poll_id,omitempty"`
	Pollster *string `json:"pollster,omitempty"`
	Result *[]any `json:"result,omitempty"`
	SampleSize *int `json:"sample_size,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
}

// Result is the typed data model for the result entity.
type Result struct {
	Candidate *string `json:"candidate,omitempty"`
	Party *string `json:"party,omitempty"`
	Percentage *float64 `json:"percentage,omitempty"`
	Vote *int `json:"vote,omitempty"`
}

// ResultListMatch mirrors the result fields as an all-optional match
// filter (Go analog of Partial<Result>).
type ResultListMatch struct {
	Candidate *string `json:"candidate,omitempty"`
	Party *string `json:"party,omitempty"`
	Percentage *float64 `json:"percentage,omitempty"`
	Vote *int `json:"vote,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
