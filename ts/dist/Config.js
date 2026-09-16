"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Civicapi',
        slug: "civicapi",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://civicapi.org",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            election: {},
            polling: {},
            result: {},
        }
    };
    entity = {
        "election": {
            "fields": [
                {
                    "format": "date",
                    "name": "date",
                    "short": "Election date",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique election identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "short": "Election name",
                    "type": "`$STRING`"
                },
                {
                    "name": "state",
                    "short": "State or jurisdiction",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "short": "Current status of the election",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "short": "Type of election",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "election",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "CA",
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 2024,
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/elections",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "elections"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "state",
                                    "type",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.elections`"
                            },
                            "parts": [
                                "api",
                                "elections"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "polling": {
            "fields": [
                {
                    "format": "date",
                    "name": "endDate",
                    "short": "Poll end date",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "marginOfError",
                    "short": "Margin of error percentage",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "pollId",
                    "short": "Unique poll identifier",
                    "type": "`$STRING`"
                },
                {
                    "name": "pollster",
                    "short": "Organization conducting the poll",
                    "type": "`$STRING`"
                },
                {
                    "name": "results",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "sampleSize",
                    "short": "Number of respondents",
                    "type": "`$INTEGER`"
                },
                {
                    "format": "date",
                    "name": "startDate",
                    "short": "Poll start date",
                    "type": "`$STRING`"
                }
            ],
            "name": "polling",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "2024-presidential",
                                        "kind": "query",
                                        "name": "election_id",
                                        "orig": "election_id",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "2024-12-31",
                                        "kind": "query",
                                        "name": "end_date",
                                        "orig": "end_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "2024-01-01",
                                        "kind": "query",
                                        "name": "start_date",
                                        "orig": "start_date",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "CA",
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/polling",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "polling"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "election_id",
                                    "end_date",
                                    "start_date",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.polls`"
                            },
                            "parts": [
                                "api",
                                "polling"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "result": {
            "fields": [
                {
                    "name": "candidate",
                    "short": "Candidate name",
                    "type": "`$STRING`"
                },
                {
                    "name": "party",
                    "short": "Political party",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "percentage",
                    "short": "Percentage of total votes",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "votes",
                    "short": "Number of votes received",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "result",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "Los Angeles",
                                        "kind": "query",
                                        "name": "county",
                                        "orig": "county",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "2024-presidential",
                                        "kind": "query",
                                        "name": "election_id",
                                        "orig": "election_id",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "CA",
                                        "kind": "query",
                                        "name": "state",
                                        "orig": "state",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/results",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "results"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "county",
                                    "election_id",
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "api",
                                "results"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map