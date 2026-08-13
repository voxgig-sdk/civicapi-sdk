# Civicapi SDK feature factory

from civicapi_sdk.feature.base_feature import CivicapiBaseFeature
from civicapi_sdk.feature.test_feature import CivicapiTestFeature


def _make_feature(name):
    features = {
        "base": lambda: CivicapiBaseFeature(),
        "test": lambda: CivicapiTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
