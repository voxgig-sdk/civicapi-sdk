# Civicapi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CivicapiFeatures
  def self.make_feature(name)
    case name
    when "base"
      CivicapiBaseFeature.new
    when "ratelimit"
      CivicapiRatelimitFeature.new
    when "retry"
      CivicapiRetryFeature.new
    when "test"
      CivicapiTestFeature.new
    when "timeout"
      CivicapiTimeoutFeature.new
    else
      CivicapiBaseFeature.new
    end
  end
end
