-- Typed models for the Civicapi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Election
---@field date? string
---@field id? string
---@field name? string
---@field state? string
---@field status? string
---@field type? string

---@class ElectionListMatch
---@field date? string
---@field id? string
---@field name? string
---@field state? string
---@field status? string
---@field type? string

---@class Polling
---@field endDate? string
---@field marginOfError? number
---@field pollId? string
---@field pollster? string
---@field results? table
---@field sampleSize? number
---@field startDate? string

---@class PollingListMatch
---@field endDate? string
---@field marginOfError? number
---@field pollId? string
---@field pollster? string
---@field results? table
---@field sampleSize? number
---@field startDate? string

---@class Result
---@field candidate? string
---@field party? string
---@field percentage? number
---@field votes? number

---@class ResultListMatch
---@field candidate? string
---@field party? string
---@field percentage? number
---@field votes? number

local M = {}

return M
