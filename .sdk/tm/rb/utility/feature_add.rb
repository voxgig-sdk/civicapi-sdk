# Civicapi SDK utility: feature_add
module CivicapiUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
