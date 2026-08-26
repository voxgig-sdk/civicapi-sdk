package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Civicapi",
			"slug": "civicapi",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://civicapi.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"election": map[string]any{},
				"polling": map[string]any{},
				"result": map[string]any{},
			},
		},
		"entity": map[string]any{
			"election": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"short": "Election date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique election identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Election name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "State or jurisdiction",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Current status of the election",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of election",
						"type": "`$STRING`",
					},
				},
				"name": "election",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "CA",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2024,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/elections",
								"parts": []any{
									"api",
									"elections",
								},
								"select": map[string]any{
									"exist": []any{
										"state",
										"type",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.elections`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"polling": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "endDate",
						"short": "Poll end date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "marginOfError",
						"short": "Margin of error percentage",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "pollId",
						"short": "Unique poll identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pollster",
						"short": "Organization conducting the poll",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "results",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "sampleSize",
						"short": "Number of respondents",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "startDate",
						"short": "Poll start date",
						"type": "`$STRING`",
					},
				},
				"name": "polling",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2024-presidential",
											"kind": "query",
											"name": "election_id",
											"orig": "election_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2024-12-31",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2024-01-01",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "CA",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/polling",
								"parts": []any{
									"api",
									"polling",
								},
								"select": map[string]any{
									"exist": []any{
										"election_id",
										"end_date",
										"start_date",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.polls`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"result": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "candidate",
						"short": "Candidate name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "party",
						"short": "Political party",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "percentage",
						"short": "Percentage of total votes",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "votes",
						"short": "Number of votes received",
						"type": "`$INTEGER`",
					},
				},
				"name": "result",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "Los Angeles",
											"kind": "query",
											"name": "county",
											"orig": "county",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "2024-presidential",
											"kind": "query",
											"name": "election_id",
											"orig": "election_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "CA",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/results",
								"parts": []any{
									"api",
									"results",
								},
								"select": map[string]any{
									"exist": []any{
										"county",
										"election_id",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
