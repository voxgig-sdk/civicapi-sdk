package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewElectionEntityFunc func(client *CivicapiSDK, entopts map[string]any) CivicapiEntity

var NewPollingEntityFunc func(client *CivicapiSDK, entopts map[string]any) CivicapiEntity

var NewResultEntityFunc func(client *CivicapiSDK, entopts map[string]any) CivicapiEntity

