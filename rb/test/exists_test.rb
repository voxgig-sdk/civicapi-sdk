# Civicapi SDK exists test

require "minitest/autorun"
require_relative "../Civicapi_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CivicapiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
