# ProjectName SDK exists test

import pytest
from civicapi_sdk import CivicapiSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CivicapiSDK.test(None, None)
        assert testsdk is not None
