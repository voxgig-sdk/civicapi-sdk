# Typed models for the Civicapi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Election:
    date: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    state: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None


@dataclass
class ElectionListMatch:
    date: Optional[str] = None
    id: Optional[str] = None
    name: Optional[str] = None
    state: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Polling:
    end_date: Optional[str] = None
    margin_of_error: Optional[float] = None
    poll_id: Optional[str] = None
    pollster: Optional[str] = None
    result: Optional[list] = None
    sample_size: Optional[int] = None
    start_date: Optional[str] = None


@dataclass
class PollingListMatch:
    end_date: Optional[str] = None
    margin_of_error: Optional[float] = None
    poll_id: Optional[str] = None
    pollster: Optional[str] = None
    result: Optional[list] = None
    sample_size: Optional[int] = None
    start_date: Optional[str] = None


@dataclass
class Result:
    candidate: Optional[str] = None
    party: Optional[str] = None
    percentage: Optional[float] = None
    vote: Optional[int] = None


@dataclass
class ResultListMatch:
    candidate: Optional[str] = None
    party: Optional[str] = None
    percentage: Optional[float] = None
    vote: Optional[int] = None

