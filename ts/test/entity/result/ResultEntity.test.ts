

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CivicapiSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ResultEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVICAPI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVICAPI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivicapiSDK.test()
    const ent = testsdk.Result()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVICAPI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'result.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"candidate":{"a":true,"h":"Candidate","n":"candidate","r":false,"sh":"Candidate name","t":"`$STRING`","key$":"candidate","index$":0},"party":{"a":true,"h":"Party","n":"party","r":false,"sh":"Political party","t":"`$STRING`","key$":"party","index$":1},"percentage":{"a":true,"fo":"float","h":"Percentage","n":"percentage","r":false,"sh":"Percentage of total votes","t":"`$NUMBER`","key$":"percentage","index$":2},"votes":{"a":true,"h":"Votes","n":"votes","r":false,"sh":"Number of votes received","t":"`$INTEGER`","key$":"votes","index$":3}},"name":"result","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/results","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"Los Angeles","k":"query","n":"county","or":"county","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"2024-presidential","k":"query","n":"election_id","or":"election_id","r":true,"t":"`$STRING`","index$":1},{"a":true,"ex":"CA","k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/results","q":{"exist":["county","election_id","state"]},"r":{},"s":[{"lit":"api"},{"lit":"results"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"result","name__orig":"result","Name":"Result","name_":"result","name-":"result","NAME":"RESULT","index$":2}, {"active":true,"entity":"result","key$":"BasicResultFlow","kind":"basic","name":"BasicResultFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"result_ref01"}}],"index$":0}]}, 'Result', {"GET /api/results":{"protocol":"http","operationId":"getElectionResults","responses":{"200":{"description":"Successful response with election results","content":{"application/json":{"schema":{"type":"object","properties":{"electionId":{"description":"Election identifier","key$":"electionId","type":"string"},"lastUpdated":{"description":"Timestamp of last update","format":"date-time","key$":"lastUpdated","type":"string"},"reportingPercentage":{"description":"Percentage of precincts reporting","format":"float","key$":"reportingPercentage","type":"number"},"results":{"items":{"properties":{"candidate":{"description":"Candidate name","type":"string","key$":"candidate"},"party":{"description":"Political party","type":"string","key$":"party"},"percentage":{"description":"Percentage of total votes","format":"float","type":"number","key$":"percentage"},"votes":{"description":"Number of votes received","type":"integer","key$":"votes"}},"type":"object","index$":0},"key$":"results","type":"array"}}}}}},"400":{"description":"Bad request - missing or invalid electionId"},"404":{"description":"Election not found"},"500":{"description":"Internal server error"}},"parameters":[{"name":"electionId","in":"query","description":"Unique identifier for the election","required":true,"schema":{"type":"string","example":"2024-presidential"},"index$":0},{"name":"state","in":"query","description":"Filter results by state","required":false,"schema":{"type":"string","example":"CA"},"index$":1},{"name":"county","in":"query","description":"Filter results by county","required":false,"schema":{"type":"string","example":"Los Angeles"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let result_ref01_data = Object.values(setup.data.existing.result)[0] as any

    // LIST
    const result_ref01_ent = client.Result()
    const result_ref01_match: any = {}

    const result_ref01_list = (await result_ref01_ent.list(result_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/result/ResultTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CivicapiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['result01','result02','result03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVICAPI_TEST_RESULT_ENTID': idmap,
    'CIVICAPI_TEST_LIVE': 'FALSE',
    'CIVICAPI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CIVICAPI_TEST_RESULT_ENTID']

  const live = 'TRUE' === env.CIVICAPI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVICAPI_TEST_RESULT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CivicapiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CIVICAPI_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
