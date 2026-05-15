# Civicapi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CivicapiFeatures
  def self.make_feature(name)
    case name
    when "base"
      CivicapiBaseFeature.new
    when "test"
      CivicapiTestFeature.new
    else
      CivicapiBaseFeature.new
    end
  end
end
