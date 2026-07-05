# frozen_string_literal: true

# Typed models for the Civicapi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Election entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Election = Struct.new(
  :date,
  :id,
  :name,
  :state,
  :status,
  :type,
  keyword_init: true
)

# Request payload for Election#list.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ElectionListMatch = Struct.new(
  :date,
  :id,
  :name,
  :state,
  :status,
  :type,
  keyword_init: true
)

# Polling entity data model.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] margin_of_error
#   @return [Float, nil]
#
# @!attribute [rw] poll_id
#   @return [String, nil]
#
# @!attribute [rw] pollster
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] sample_size
#   @return [Integer, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
Polling = Struct.new(
  :end_date,
  :margin_of_error,
  :poll_id,
  :pollster,
  :result,
  :sample_size,
  :start_date,
  keyword_init: true
)

# Request payload for Polling#list.
#
# @!attribute [rw] end_date
#   @return [String, nil]
#
# @!attribute [rw] margin_of_error
#   @return [Float, nil]
#
# @!attribute [rw] poll_id
#   @return [String, nil]
#
# @!attribute [rw] pollster
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
#
# @!attribute [rw] sample_size
#   @return [Integer, nil]
#
# @!attribute [rw] start_date
#   @return [String, nil]
PollingListMatch = Struct.new(
  :end_date,
  :margin_of_error,
  :poll_id,
  :pollster,
  :result,
  :sample_size,
  :start_date,
  keyword_init: true
)

# Result entity data model.
#
# @!attribute [rw] candidate
#   @return [String, nil]
#
# @!attribute [rw] party
#   @return [String, nil]
#
# @!attribute [rw] percentage
#   @return [Float, nil]
#
# @!attribute [rw] vote
#   @return [Integer, nil]
Result = Struct.new(
  :candidate,
  :party,
  :percentage,
  :vote,
  keyword_init: true
)

# Request payload for Result#list.
#
# @!attribute [rw] candidate
#   @return [String, nil]
#
# @!attribute [rw] party
#   @return [String, nil]
#
# @!attribute [rw] percentage
#   @return [Float, nil]
#
# @!attribute [rw] vote
#   @return [Integer, nil]
ResultListMatch = Struct.new(
  :candidate,
  :party,
  :percentage,
  :vote,
  keyword_init: true
)

