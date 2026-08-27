// Typed models for the Civicapi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/civicapi-sdk/go/core"
)

// Election is the typed data model for the election entity.
type Election struct {
	Date *string `json:"date,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	State *string `json:"state,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ElectionListMatch is the typed request payload for Election.ListTyped.
type ElectionListMatch struct {
	State *string `json:"state,omitempty"`
	Type *string `json:"type,omitempty"`
	Year *int `json:"year,omitempty"`
}

// Polling is the typed data model for the polling entity.
type Polling struct {
	EndDate *string `json:"endDate,omitempty"`
	MarginOfError *float64 `json:"marginOfError,omitempty"`
	PollId *string `json:"pollId,omitempty"`
	Pollster *string `json:"pollster,omitempty"`
	Results *[]any `json:"results,omitempty"`
	SampleSize *int `json:"sampleSize,omitempty"`
	StartDate *string `json:"startDate,omitempty"`
}

// PollingListMatch is the typed request payload for Polling.ListTyped.
type PollingListMatch struct {
	ElectionId *string `json:"election_id,omitempty"`
	EndDate *string `json:"end_date,omitempty"`
	StartDate *string `json:"start_date,omitempty"`
	State *string `json:"state,omitempty"`
}

// Result is the typed data model for the result entity.
type Result struct {
	Candidate *string `json:"candidate,omitempty"`
	Party *string `json:"party,omitempty"`
	Percentage *float64 `json:"percentage,omitempty"`
	Votes *int `json:"votes,omitempty"`
}

// ResultListMatch is the typed request payload for Result.ListTyped.
type ResultListMatch struct {
	County *string `json:"county,omitempty"`
	ElectionId string `json:"election_id"`
	State *string `json:"state,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
