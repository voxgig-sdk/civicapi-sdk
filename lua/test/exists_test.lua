-- Civicapi SDK exists test

local sdk = require("civicapi_sdk")

describe("CivicapiSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
