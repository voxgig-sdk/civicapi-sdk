# Typed models for the Civicapi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Election(TypedDict, total=False):
    date: str
    id: str
    name: str
    state: str
    status: str
    type: str


class ElectionListMatch(TypedDict, total=False):
    date: str
    id: str
    name: str
    state: str
    status: str
    type: str


class Polling(TypedDict, total=False):
    endDate: str
    marginOfError: float
    pollId: str
    pollster: str
    results: list
    sampleSize: int
    startDate: str


class PollingListMatch(TypedDict, total=False):
    endDate: str
    marginOfError: float
    pollId: str
    pollster: str
    results: list
    sampleSize: int
    startDate: str


class Result(TypedDict, total=False):
    candidate: str
    party: str
    percentage: float
    votes: int


class ResultListMatch(TypedDict, total=False):
    candidate: str
    party: str
    percentage: float
    votes: int
