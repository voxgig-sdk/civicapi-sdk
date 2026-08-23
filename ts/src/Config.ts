
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "api",
                "elections"
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
          "short": "Poll end date",
          "type": "`$STRING`"
        },
        {
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
              "parts": [
                "api",
                "polling"
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
          "short": "Candidate name",
          "type": "`$STRING`"
        },
        {
          "name": "party",
          "short": "Political party",
          "type": "`$STRING`"
        },
        {
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
              "parts": [
                "api",
                "results"
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
  config
}

