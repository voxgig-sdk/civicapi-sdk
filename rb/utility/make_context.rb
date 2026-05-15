# Civicapi SDK utility: make_context
require_relative '../core/context'
module CivicapiUtilities
  MakeContext = ->(ctxmap, basectx) {
    CivicapiContext.new(ctxmap, basectx)
  }
end
