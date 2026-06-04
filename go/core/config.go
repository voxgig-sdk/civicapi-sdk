package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Civicapi",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "state",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "status",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
				},
				"name": "election",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 2024,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"polling": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "end_date",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "margin_of_error",
						"req": false,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "poll_id",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "pollster",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "sample_size",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "start_date",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
				},
				"name": "polling",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2024-12-31",
											"kind": "query",
											"name": "end_date",
											"orig": "end_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2024-01-01",
											"kind": "query",
											"name": "start_date",
											"orig": "start_date",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "CA",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "party",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "percentage",
						"req": false,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "vote",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
				},
				"name": "result",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "2024-presidential",
											"kind": "query",
											"name": "election_id",
											"orig": "election_id",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": "CA",
											"kind": "query",
											"name": "state",
											"orig": "state",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
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
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
