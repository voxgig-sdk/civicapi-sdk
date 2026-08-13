# Civicapi SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CivicapiUtility.registrar = ->(u) {
  u.clean = CivicapiUtilities::Clean
  u.done = CivicapiUtilities::Done
  u.make_error = CivicapiUtilities::MakeError
  u.feature_add = CivicapiUtilities::FeatureAdd
  u.feature_hook = CivicapiUtilities::FeatureHook
  u.feature_init = CivicapiUtilities::FeatureInit
  u.fetcher = CivicapiUtilities::Fetcher
  u.make_fetch_def = CivicapiUtilities::MakeFetchDef
  u.make_context = CivicapiUtilities::MakeContext
  u.make_options = CivicapiUtilities::MakeOptions
  u.make_request = CivicapiUtilities::MakeRequest
  u.make_response = CivicapiUtilities::MakeResponse
  u.make_result = CivicapiUtilities::MakeResult
  u.make_point = CivicapiUtilities::MakePoint
  u.make_spec = CivicapiUtilities::MakeSpec
  u.make_url = CivicapiUtilities::MakeUrl
  u.param = CivicapiUtilities::Param
  u.prepare_auth = CivicapiUtilities::PrepareAuth
  u.prepare_body = CivicapiUtilities::PrepareBody
  u.prepare_headers = CivicapiUtilities::PrepareHeaders
  u.prepare_method = CivicapiUtilities::PrepareMethod
  u.prepare_params = CivicapiUtilities::PrepareParams
  u.prepare_path = CivicapiUtilities::PreparePath
  u.prepare_query = CivicapiUtilities::PrepareQuery
  u.graphql_body = CivicapiUtilities::GraphqlBody
  u.graphql_errors = CivicapiUtilities::GraphqlErrors
  u.result_basic = CivicapiUtilities::ResultBasic
  u.result_body = CivicapiUtilities::ResultBody
  u.result_headers = CivicapiUtilities::ResultHeaders
  u.transform_request = CivicapiUtilities::TransformRequest
  u.transform_response = CivicapiUtilities::TransformResponse
}
