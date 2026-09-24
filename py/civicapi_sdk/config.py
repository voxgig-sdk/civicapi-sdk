# Civicapi SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "civicapi",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Date",
            "type": "`$STRING`",
            "short": "Election date",
            "format": "date",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique election identifier",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Election name",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "short": "State or jurisdiction",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "Current status of the election",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
            "short": "Type of election",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "election",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/elections",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "elections",
                  },
                ],
                "parts": [
                  "api",
                  "elections",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.elections`",
                },
                "args": {
                  "query": [
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "CA",
                    },
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "year",
                      "orig": "year",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2024,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "state",
                    "type",
                    "year",
                  ],
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
            "title": "End Date",
            "type": "`$STRING`",
            "short": "Poll end date",
            "format": "date",
          },
          {
            "name": "marginOfError",
            "title": "Margin Of Error",
            "type": "`$NUMBER`",
            "short": "Margin of error percentage",
            "format": "float",
          },
          {
            "name": "pollId",
            "title": "Poll Id",
            "type": "`$STRING`",
            "short": "Unique poll identifier",
          },
          {
            "name": "pollster",
            "title": "Pollster",
            "type": "`$STRING`",
            "short": "Organization conducting the poll",
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
          },
          {
            "name": "sampleSize",
            "title": "Sample Size",
            "type": "`$INTEGER`",
            "short": "Number of respondents",
          },
          {
            "name": "startDate",
            "title": "Start Date",
            "type": "`$STRING`",
            "short": "Poll start date",
            "format": "date",
          },
        ],
        "name": "polling",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/polling",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "polling",
                  },
                ],
                "parts": [
                  "api",
                  "polling",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.polls`",
                },
                "args": {
                  "query": [
                    {
                      "name": "election_id",
                      "orig": "election_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2024-presidential",
                    },
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2024-12-31",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "2024-01-01",
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "CA",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "election_id",
                    "end_date",
                    "start_date",
                    "state",
                  ],
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
            "title": "Candidate",
            "type": "`$STRING`",
            "short": "Candidate name",
          },
          {
            "name": "party",
            "title": "Party",
            "type": "`$STRING`",
            "short": "Political party",
          },
          {
            "name": "percentage",
            "title": "Percentage",
            "type": "`$NUMBER`",
            "short": "Percentage of total votes",
            "format": "float",
          },
          {
            "name": "votes",
            "title": "Votes",
            "type": "`$INTEGER`",
            "short": "Number of votes received",
          },
        ],
        "name": "result",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/results",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "results",
                  },
                ],
                "parts": [
                  "api",
                  "results",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "args": {
                  "query": [
                    {
                      "name": "county",
                      "orig": "county",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "Los Angeles",
                    },
                    {
                      "name": "election_id",
                      "orig": "election_id",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "2024-presidential",
                    },
                    {
                      "name": "state",
                      "orig": "state",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "CA",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "county",
                    "election_id",
                    "state",
                  ],
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
