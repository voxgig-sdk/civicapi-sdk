

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date","h":"Date","n":"date","r":false,"sh":"Election date","t":"`$STRING`","key$":"date","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique election identifier","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Election name","t":"`$STRING`","key$":"name","index$":2},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"State or jurisdiction","t":"`$STRING`","key$":"state","index$":3},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Current status of the election","t":"`$STRING`","key$":"status","index$":4},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of election","t":"`$STRING`","key$":"type","index$":5}},"id":{"field":"id","name":"id"},"name":"election","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/elections","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"CA","k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":2024,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/elections","q":{"exist":["state","type","year"]},"r":{},"s":[{"lit":"api"},{"lit":"elections"}],"t":{"req":"`reqdata`","res":"`body.elections`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"election","name__orig":"election","Name":"Election","name_":"election","name-":"election","NAME":"ELECTION","index$":0}, {"active":true,"entity":"election","key$":"BasicElectionFlow","kind":"basic","name":"BasicElectionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"election_ref01"}}],"index$":0}]}, 'Election', {"GET /api/elections":{"protocol":"http","operationId":"getElections","responses":{"200":{"description":"Successful response with election information","content":{"application/json":{"schema":{"type":"object","properties":{"elections":{"items":{"properties":{"date":{"description":"Election date","format":"date","type":"string","key$":"date"},"id":{"description":"Unique election identifier","type":"string","key$":"id"},"name":{"description":"Election name","type":"string","key$":"name"},"state":{"description":"State or jurisdiction","type":"string","key$":"state"},"status":{"description":"Current status of the election","enum":["upcoming","ongoing","completed"],"type":"string","key$":"status"},"type":{"description":"Type of election","type":"string","key$":"type"}},"type":"object","index$":0},"key$":"elections","type":"array"}}}}}},"400":{"description":"Bad request - invalid parameters"},"500":{"description":"Internal server error"}},"parameters":[{"name":"year","in":"query","description":"Filter elections by year","required":false,"schema":{"type":"integer","example":2024},"index$":0},{"name":"state","in":"query","description":"Filter elections by state","required":false,"schema":{"type":"string","example":"CA"},"index$":1},{"name":"type","in":"query","description":"Type of election (e.g., presidential, congressional, local)","required":false,"schema":{"type":"string","enum":["presidential","congressional","gubernatorial","local"]},"index$":2}],"securitySource":"unspecified"}})
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
  
