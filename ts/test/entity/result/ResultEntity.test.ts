

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"candidate","req":false,"short":"Candidate name","type":"`$STRING`","index$":0},{"active":true,"name":"party","req":false,"short":"Political party","type":"`$STRING`","index$":1},{"active":true,"format":"float","name":"percentage","req":false,"short":"Percentage of total votes","type":"`$NUMBER`","index$":2},{"active":true,"name":"votes","req":false,"short":"Number of votes received","type":"`$INTEGER`","index$":3}],"name":"result","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"Los Angeles","kind":"query","name":"county","orig":"county","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2024-presidential","kind":"query","name":"election_id","orig":"election_id","reqd":true,"type":"`$STRING`","index$":1},{"active":true,"example":"CA","kind":"query","name":"state","orig":"state","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /api/results","json":"{\"operationId\":\"getElectionResults\",\"parameters\":[{\"description\":\"Unique identifier for the election\",\"in\":\"query\",\"name\":\"electionId\",\"required\":true,\"schema\":{\"example\":\"2024-presidential\",\"type\":\"string\"}},{\"description\":\"Filter results by state\",\"in\":\"query\",\"name\":\"state\",\"required\":false,\"schema\":{\"example\":\"CA\",\"type\":\"string\"}},{\"description\":\"Filter results by county\",\"in\":\"query\",\"name\":\"county\",\"required\":false,\"schema\":{\"example\":\"Los Angeles\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"electionId\":{\"description\":\"Election identifier\",\"type\":\"string\"},\"lastUpdated\":{\"description\":\"Timestamp of last update\",\"format\":\"date-time\",\"type\":\"string\"},\"reportingPercentage\":{\"description\":\"Percentage of precincts reporting\",\"format\":\"float\",\"type\":\"number\"},\"results\":{\"items\":{\"properties\":{\"candidate\":{\"description\":\"Candidate name\",\"type\":\"string\"},\"party\":{\"description\":\"Political party\",\"type\":\"string\"},\"percentage\":{\"description\":\"Percentage of total votes\",\"format\":\"float\",\"type\":\"number\"},\"votes\":{\"description\":\"Number of votes received\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with election results\"},\"400\":{\"description\":\"Bad request - missing or invalid electionId\"},\"404\":{\"description\":\"Election not found\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/results","segments":[{"lit":"api"},{"lit":"results"}],"select":{"exist":["county","election_id","state"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"result","name__orig":"result","Name":"Result","name_":"result","name-":"result","NAME":"RESULT","index$":2}, {"active":true,"entity":"result","key$":"BasicResultFlow","kind":"basic","name":"BasicResultFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"result_ref01"}}],"index$":0}]}, 'Result')
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
  
