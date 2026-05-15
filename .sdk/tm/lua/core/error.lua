-- Civicapi SDK error

local CivicapiError = {}
CivicapiError.__index = CivicapiError


function CivicapiError.new(code, msg, ctx)
  local self = setmetatable({}, CivicapiError)
  self.is_sdk_error = true
  self.sdk = "Civicapi"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CivicapiError:error()
  return self.msg
end


function CivicapiError:__tostring()
  return self.msg
end


return CivicapiError
