

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


describe('ElectionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIVICAPI_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIVICAPI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CivicapiSDK.test()
    const ent = testsdk.Election()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIVICAPI_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'election.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"date","req":false,"short":"Election date","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique election identifier","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Election name","type":"`$STRING`","index$":2},{"active":true,"name":"state","req":false,"short":"State or jurisdiction","type":"`$STRING`","index$":3},{"active":true,"name":"status","req":false,"short":"Current status of the election","type":"`$STRING`","index$":4},{"active":true,"name":"type","req":false,"short":"Type of election","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"election","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"CA","kind":"query","name":"state","orig":"state","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":2024,"kind":"query","name":"year","orig":"year","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /api/elections","json":"{\"operationId\":\"getElections\",\"parameters\":[{\"description\":\"Filter elections by year\",\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"example\":2024,\"type\":\"integer\"}},{\"description\":\"Filter elections by state\",\"in\":\"query\",\"name\":\"state\",\"required\":false,\"schema\":{\"example\":\"CA\",\"type\":\"string\"}},{\"description\":\"Type of election (e.g., presidential, congressional, local)\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"presidential\",\"congressional\",\"gubernatorial\",\"local\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"elections\":{\"items\":{\"properties\":{\"date\":{\"description\":\"Election date\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique election identifier\",\"type\":\"string\"},\"name\":{\"description\":\"Election name\",\"type\":\"string\"},\"state\":{\"description\":\"State or jurisdiction\",\"type\":\"string\"},\"status\":{\"description\":\"Current status of the election\",\"enum\":[\"upcoming\",\"ongoing\",\"completed\"],\"type\":\"string\"},\"type\":{\"description\":\"Type of election\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with election information\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/elections","segments":[{"lit":"api"},{"lit":"elections"}],"select":{"exist":["state","type","year"]},"transform":{"req":"`reqdata`","res":"`body.elections`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"election","name__orig":"election","Name":"Election","name_":"election","name-":"election","NAME":"ELECTION","index$":0}, {"active":true,"entity":"election","key$":"BasicElectionFlow","kind":"basic","name":"BasicElectionFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"election_ref01"}}],"index$":0}]}, 'Election')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let election_ref01_data = Object.values(setup.data.existing.election)[0] as any

    // LIST
    const election_ref01_ent = client.Election()
    const election_ref01_match: any = {}

    const election_ref01_list = (await election_ref01_ent.list(election_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/election/ElectionTestData.json')

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
    ['election01','election02','election03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIVICAPI_TEST_ELECTION_ENTID': idmap,
    'CIVICAPI_TEST_LIVE': 'FALSE',
    'CIVICAPI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CIVICAPI_TEST_ELECTION_ENTID']

  const live = 'TRUE' === env.CIVICAPI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIVICAPI_TEST_ELECTION_ENTID']
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
  
