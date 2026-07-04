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

---@class Polling
---@field end_date? string
---@field margin_of_error? number
---@field poll_id? string
---@field pollster? string
---@field result? table
---@field sample_size? number
---@field start_date? string

---@class PollingListMatch

---@class Result
---@field candidate? string
---@field party? string
---@field percentage? number
---@field vote? number

---@class ResultListMatch

local M = {}

return M
