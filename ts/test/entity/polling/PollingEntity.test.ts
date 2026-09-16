

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


describe('PollingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVICAPI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVICAPI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivicapiSDK.test()
    const ent = testsdk.Polling()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVICAPI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'polling.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"endDate","req":false,"short":"Poll end date","type":"`$STRING`","index$":0},{"active":true,"format":"float","name":"marginOfError","req":false,"short":"Margin of error percentage","type":"`$NUMBER`","index$":1},{"active":true,"name":"pollId","req":false,"short":"Unique poll identifier","type":"`$STRING`","index$":2},{"active":true,"name":"pollster","req":false,"short":"Organization conducting the poll","type":"`$STRING`","index$":3},{"active":true,"name":"results","req":false,"type":"`$ARRAY`","index$":4},{"active":true,"name":"sampleSize","req":false,"short":"Number of respondents","type":"`$INTEGER`","index$":5},{"active":true,"format":"date","name":"startDate","req":false,"short":"Poll start date","type":"`$STRING`","index$":6}],"name":"polling","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"2024-presidential","kind":"query","name":"election_id","orig":"election_id","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"2024-12-31","kind":"query","name":"end_date","orig":"end_date","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"2024-01-01","kind":"query","name":"start_date","orig":"start_date","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"CA","kind":"query","name":"state","orig":"state","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /api/polling","json":"{\"operationId\":\"getPollingData\",\"parameters\":[{\"description\":\"Unique identifier for the election\",\"in\":\"query\",\"name\":\"electionId\",\"required\":false,\"schema\":{\"example\":\"2024-presidential\",\"type\":\"string\"}},{\"description\":\"Filter polling data by state\",\"in\":\"query\",\"name\":\"state\",\"required\":false,\"schema\":{\"example\":\"CA\",\"type\":\"string\"}},{\"description\":\"Start date for polling data range\",\"in\":\"query\",\"name\":\"startDate\",\"required\":false,\"schema\":{\"example\":\"2024-01-01\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"End date for polling data range\",\"in\":\"query\",\"name\":\"endDate\",\"required\":false,\"schema\":{\"example\":\"2024-12-31\",\"format\":\"date\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"polls\":{\"items\":{\"properties\":{\"endDate\":{\"description\":\"Poll end date\",\"format\":\"date\",\"type\":\"string\"},\"marginOfError\":{\"description\":\"Margin of error percentage\",\"format\":\"float\",\"type\":\"number\"},\"pollId\":{\"description\":\"Unique poll identifier\",\"type\":\"string\"},\"pollster\":{\"description\":\"Organization conducting the poll\",\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"candidate\":{\"description\":\"Candidate name\",\"type\":\"string\"},\"party\":{\"description\":\"Political party\",\"type\":\"string\"},\"percentage\":{\"description\":\"Polling percentage\",\"format\":\"float\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"sampleSize\":{\"description\":\"Number of respondents\",\"type\":\"integer\"},\"startDate\":{\"description\":\"Poll start date\",\"format\":\"date\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with polling data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/polling","segments":[{"lit":"api"},{"lit":"polling"}],"select":{"exist":["election_id","end_date","start_date","state"]},"transform":{"req":"`reqdata`","res":"`body.polls`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"polling","name__orig":"polling","Name":"Polling","name_":"polling","name-":"polling","NAME":"POLLING","index$":1}, {"active":true,"entity":"polling","key$":"BasicPollingFlow","kind":"basic","name":"BasicPollingFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"polling_ref01"}}],"index$":0}]}, 'Polling')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let polling_ref01_data = Object.values(setup.data.existing.polling)[0] as any

    // LIST
    const polling_ref01_ent = client.Polling()
    const polling_ref01_match: any = {}

    const polling_ref01_list = (await polling_ref01_ent.list(polling_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/polling/PollingTestData.json')

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
    ['polling01','polling02','polling03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVICAPI_TEST_POLLING_ENTID': idmap,
    'CIVICAPI_TEST_LIVE': 'FALSE',
    'CIVICAPI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CIVICAPI_TEST_POLLING_ENTID']

  const live = 'TRUE' === env.CIVICAPI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVICAPI_TEST_POLLING_ENTID']
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
  
