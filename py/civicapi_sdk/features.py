# Civicapi SDK feature factory

from civicapi_sdk.feature.base_feature import CivicapiBaseFeature
from civicapi_sdk.feature.ratelimit_feature import CivicapiRatelimitFeature
from civicapi_sdk.feature.retry_feature import CivicapiRetryFeature
from civicapi_sdk.feature.test_feature import CivicapiTestFeature
from civicapi_sdk.feature.timeout_feature import CivicapiTimeoutFeature


_FEATURES = {
    "base": lambda: CivicapiBaseFeature(),
    "ratelimit": lambda: CivicapiRatelimitFeature(),
    "retry": lambda: CivicapiRetryFeature(),
    "test": lambda: CivicapiTestFeature(),
    "timeout": lambda: CivicapiTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
