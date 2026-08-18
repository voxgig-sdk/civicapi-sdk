# Civicapi SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Civicapi",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://civicapi.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "election": {},
                "polling": {},
                "result": {},
            },
        },
        "entity": {
      "election": {
        "fields": [
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
        ],
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 2024,
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/elections",
                "parts": [
                  "api",
                  "elections",
                ],
                "select": {
                  "exist": [
                    "state",
                    "type",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.elections`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "polling": {
        "fields": [
          {
            "name": "endDate",
            "type": "`$STRING`",
          },
          {
            "name": "marginOfError",
            "type": "`$NUMBER`",
          },
          {
            "name": "pollId",
            "type": "`$STRING`",
          },
          {
            "name": "pollster",
            "type": "`$STRING`",
          },
          {
            "name": "results",
            "type": "`$ARRAY`",
          },
          {
            "name": "sampleSize",
            "type": "`$INTEGER`",
          },
          {
            "name": "startDate",
            "type": "`$STRING`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2024-12-31",
                      "kind": "query",
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2024-01-01",
                      "kind": "query",
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "CA",
                      "kind": "query",
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/polling",
                "parts": [
                  "api",
                  "polling",
                ],
                "select": {
                  "exist": [
                    "election_id",
                    "end_date",
                    "start_date",
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.polls`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "result": {
        "fields": [
          {
            "name": "candidate",
            "type": "`$STRING`",
          },
          {
            "name": "party",
            "type": "`$STRING`",
          },
          {
            "name": "percentage",
            "type": "`$NUMBER`",
          },
          {
            "name": "votes",
            "type": "`$INTEGER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": "2024-presidential",
                      "kind": "query",
                      "name": "election_id",
                      "orig": "election_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "CA",
                      "kind": "query",
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/results",
                "parts": [
                  "api",
                  "results",
                ],
                "select": {
                  "exist": [
                    "county",
                    "election_id",
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
