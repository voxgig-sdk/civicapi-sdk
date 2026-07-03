package = "voxgig-sdk-civicapi"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/civicapi-sdk.git",
  tag = "lua/v0.0.1",
  dir = "civicapi-sdk/lua"
}
description = {
  summary = "Civicapi SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["civicapi_sdk"] = "civicapi_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
