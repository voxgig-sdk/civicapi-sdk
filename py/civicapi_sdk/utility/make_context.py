# Civicapi SDK utility: make_context

from civicapi_sdk.core.context import CivicapiContext


def make_context_util(ctxmap, basectx):
    return CivicapiContext(ctxmap, basectx)
