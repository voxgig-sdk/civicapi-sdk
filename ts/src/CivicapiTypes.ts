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
  end_date?: string
  margin_of_error?: number
  poll_id?: string
  pollster?: string
  result?: any[]
  sample_size?: number
  start_date?: string
}

export interface PollingListMatch {
  end_date?: string
  margin_of_error?: number
  poll_id?: string
  pollster?: string
  result?: any[]
  sample_size?: number
  start_date?: string
}

export interface Result {
  candidate?: string
  party?: string
  percentage?: number
  vote?: number
}

export interface ResultListMatch {
  candidate?: string
  party?: string
  percentage?: number
  vote?: number
}

