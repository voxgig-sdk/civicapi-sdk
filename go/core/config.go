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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Date",
						"type": "`$STRING`",
						"short": "Election date",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique election identifier",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Election name",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"short": "State or jurisdiction",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Current status of the election",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of election",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "election",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/elections",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "elections",
									},
								},
								"parts": []any{
									"api",
									"elections",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.elections`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"example": "CA",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 2024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"state",
										"type",
										"year",
									},
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
						"title": "End Date",
						"type": "`$STRING`",
						"short": "Poll end date",
						"format": "date",
					},
					map[string]any{
						"name": "marginOfError",
						"title": "Margin Of Error",
						"type": "`$NUMBER`",
						"short": "Margin of error percentage",
						"format": "float",
					},
					map[string]any{
						"name": "pollId",
						"title": "Poll Id",
						"type": "`$STRING`",
						"short": "Unique poll identifier",
					},
					map[string]any{
						"name": "pollster",
						"title": "Pollster",
						"type": "`$STRING`",
						"short": "Organization conducting the poll",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "sampleSize",
						"title": "Sample Size",
						"type": "`$INTEGER`",
						"short": "Number of respondents",
					},
					map[string]any{
						"name": "startDate",
						"title": "Start Date",
						"type": "`$STRING`",
						"short": "Poll start date",
						"format": "date",
					},
				},
				"name": "polling",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/polling",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "polling",
									},
								},
								"parts": []any{
									"api",
									"polling",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.polls`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "election_id",
											"orig": "election_id",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2024-presidential",
										},
										map[string]any{
											"name": "end_date",
											"orig": "end_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2024-12-31",
										},
										map[string]any{
											"name": "start_date",
											"orig": "start_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2024-01-01",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"example": "CA",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"election_id",
										"end_date",
										"start_date",
										"state",
									},
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
						"title": "Candidate",
						"type": "`$STRING`",
						"short": "Candidate name",
					},
					map[string]any{
						"name": "party",
						"title": "Party",
						"type": "`$STRING`",
						"short": "Political party",
					},
					map[string]any{
						"name": "percentage",
						"title": "Percentage",
						"type": "`$NUMBER`",
						"short": "Percentage of total votes",
						"format": "float",
					},
					map[string]any{
						"name": "votes",
						"title": "Votes",
						"type": "`$INTEGER`",
						"short": "Number of votes received",
					},
				},
				"name": "result",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/results",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "results",
									},
								},
								"parts": []any{
									"api",
									"results",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "county",
											"orig": "county",
											"type": "`$STRING`",
											"kind": "query",
											"example": "Los Angeles",
										},
										map[string]any{
											"name": "election_id",
											"orig": "election_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "2024-presidential",
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
											"example": "CA",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"county",
										"election_id",
										"state",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
