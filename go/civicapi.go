package voxgigcivicapisdk

import (
	"github.com/voxgig-sdk/civicapi-sdk/go/core"
	"github.com/voxgig-sdk/civicapi-sdk/go/entity"
	"github.com/voxgig-sdk/civicapi-sdk/go/feature"
	_ "github.com/voxgig-sdk/civicapi-sdk/go/utility"
)

// Type aliases preserve external API.
type CivicapiSDK = core.CivicapiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CivicapiEntity = core.CivicapiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CivicapiError = core.CivicapiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewElectionEntityFunc = func(client *core.CivicapiSDK, entopts map[string]any) core.CivicapiEntity {
		return entity.NewElectionEntity(client, entopts)
	}
	core.NewPollingEntityFunc = func(client *core.CivicapiSDK, entopts map[string]any) core.CivicapiEntity {
		return entity.NewPollingEntity(client, entopts)
	}
	core.NewResultEntityFunc = func(client *core.CivicapiSDK, entopts map[string]any) core.CivicapiEntity {
		return entity.NewResultEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCivicapiSDK = core.NewCivicapiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
