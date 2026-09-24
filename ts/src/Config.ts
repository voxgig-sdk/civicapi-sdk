
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Civicapi',
        slug: "civicapi",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://civicapi.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        election: {
        },
  
        polling: {
        },
  
        result: {
        },
  
    }
  }


  entity = {
    "election": {
      "fields": [
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "short": "Election date",
          "format": "date"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique election identifier"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Election name"
        },
        {
          "name": "state",
          "title": "State",
          "type": "`$STRING`",
          "short": "State or jurisdiction"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "Current status of the election"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of election"
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
              "parts": [
                "api",
                "elections"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.elections`"
              },
              "args": {
                "query": [
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "CA"
                  },
                  {
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 2024
                  }
                ]
              },
              "select": {
                "exist": [
                  "state",
                  "type",
                  "year"
                ]
              }
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
          "name": "endDate",
          "title": "End Date",
          "type": "`$STRING`",
          "short": "Poll end date",
          "format": "date"
        },
        {
          "name": "marginOfError",
          "title": "Margin Of Error",
          "type": "`$NUMBER`",
          "short": "Margin of error percentage",
          "format": "float"
        },
        {
          "name": "pollId",
          "title": "Poll Id",
          "type": "`$STRING`",
          "short": "Unique poll identifier"
        },
        {
          "name": "pollster",
          "title": "Pollster",
          "type": "`$STRING`",
          "short": "Organization conducting the poll"
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`"
        },
        {
          "name": "sampleSize",
          "title": "Sample Size",
          "type": "`$INTEGER`",
          "short": "Number of respondents"
        },
        {
          "name": "startDate",
          "title": "Start Date",
          "type": "`$STRING`",
          "short": "Poll start date",
          "format": "date"
        }
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
                  "lit": "api"
                },
                {
                  "lit": "polling"
                }
              ],
              "parts": [
                "api",
                "polling"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.polls`"
              },
              "args": {
                "query": [
                  {
                    "name": "election_id",
                    "orig": "election_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2024-presidential"
                  },
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2024-12-31"
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "2024-01-01"
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "CA"
                  }
                ]
              },
              "select": {
                "exist": [
                  "election_id",
                  "end_date",
                  "start_date",
                  "state"
                ]
              }
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
          "title": "Candidate",
          "type": "`$STRING`",
          "short": "Candidate name"
        },
        {
          "name": "party",
          "title": "Party",
          "type": "`$STRING`",
          "short": "Political party"
        },
        {
          "name": "percentage",
          "title": "Percentage",
          "type": "`$NUMBER`",
          "short": "Percentage of total votes",
          "format": "float"
        },
        {
          "name": "votes",
          "title": "Votes",
          "type": "`$INTEGER`",
          "short": "Number of votes received"
        }
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
                  "lit": "api"
                },
                {
                  "lit": "results"
                }
              ],
              "parts": [
                "api",
                "results"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "args": {
                "query": [
                  {
                    "name": "county",
                    "orig": "county",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "Los Angeles"
                  },
                  {
                    "name": "election_id",
                    "orig": "election_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "2024-presidential"
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "CA"
                  }
                ]
              },
              "select": {
                "exist": [
                  "county",
                  "election_id",
                  "state"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

