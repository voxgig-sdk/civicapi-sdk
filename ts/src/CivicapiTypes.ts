// Typed models for the Civicapi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Election {
  date?: string
  id?: string
  name?: string
  state?: string
  status?: string
  type?: string
}

export interface ElectionListMatch {
  date?: string
  id?: string
  name?: string
  state?: string
  status?: string
  type?: string
}

export interface Polling {
  endDate?: string
  marginOfError?: number
  pollId?: string
  pollster?: string
  results?: any[]
  sampleSize?: number
  startDate?: string
}

export interface PollingListMatch {
  endDate?: string
  marginOfError?: number
  pollId?: string
  pollster?: string
  results?: any[]
  sampleSize?: number
  startDate?: string
}

export interface Result {
  candidate?: string
  party?: string
  percentage?: number
  votes?: number
}

export interface ResultListMatch {
  candidate?: string
  party?: string
  percentage?: number
  votes?: number
}

