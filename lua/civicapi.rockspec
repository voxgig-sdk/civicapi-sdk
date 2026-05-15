package = "voxgig-sdk-civicapi"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/civicapi-sdk.git"
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
