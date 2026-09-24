"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PollingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CIVICAPI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CIVICAPI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CivicapiSDK.test();
        const ent = testsdk.Polling();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CIVICAPI_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'polling.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "endDate": { "a": true, "fo": "date", "h": "End Date", "n": "endDate", "r": false, "sh": "Poll end date", "t": "`$STRING`", "key$": "endDate", "index$": 0 }, "marginOfError": { "a": true, "fo": "float", "h": "Margin Of Error", "n": "marginOfError", "r": false, "sh": "Margin of error percentage", "t": "`$NUMBER`", "key$": "marginOfError", "index$": 1 }, "pollId": { "a": true, "h": "Poll Id", "n": "pollId", "r": false, "sh": "Unique poll identifier", "t": "`$STRING`", "key$": "pollId", "index$": 2 }, "pollster": { "a": true, "h": "Pollster", "n": "pollster", "r": false, "sh": "Organization conducting the poll", "t": "`$STRING`", "key$": "pollster", "index$": 3 }, "results": { "a": true, "h": "Results", "n": "results", "r": false, "t": "`$ARRAY`", "key$": "results", "index$": 4 }, "sampleSize": { "a": true, "h": "Sample Size", "n": "sampleSize", "r": false, "sh": "Number of respondents", "t": "`$INTEGER`", "key$": "sampleSize", "index$": 5 }, "startDate": { "a": true, "fo": "date", "h": "Start Date", "n": "startDate", "r": false, "sh": "Poll start date", "t": "`$STRING`", "key$": "startDate", "index$": 6 } }, "name": "polling", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/polling", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "2024-presidential", "k": "query", "n": "election_id", "or": "election_id", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2024-12-31", "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2024-01-01", "k": "query", "n": "start_date", "or": "start_date", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "CA", "k": "query", "n": "state", "or": "state", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/api/polling", "q": { "exist": ["election_id", "end_date", "start_date", "state"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "polling" }], "t": { "req": "`reqdata`", "res": "`body.polls`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "polling", "name__orig": "polling", "Name": "Polling", "name_": "polling", "name-": "polling", "NAME": "POLLING", "index$": 1 }, { "active": true, "entity": "polling", "key$": "BasicPollingFlow", "kind": "basic", "name": "BasicPollingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "polling_ref01" } }], "index$": 0 }] }, 'Polling', { "GET /api/polling": { "protocol": "http", "operationId": "getPollingData", "responses": { "200": { "description": "Successful response with polling data", "content": { "application/json": { "schema": { "type": "object", "properties": { "polls": { "items": { "properties": { "endDate": { "description": "Poll end date", "format": "date", "type": "string", "key$": "endDate" }, "marginOfError": { "description": "Margin of error percentage", "format": "float", "type": "number", "key$": "marginOfError" }, "pollId": { "description": "Unique poll identifier", "type": "string", "key$": "pollId" }, "pollster": { "description": "Organization conducting the poll", "type": "string", "key$": "pollster" }, "results": { "items": { "properties": { "candidate": { "description": "Candidate name", "type": "string" }, "party": { "description": "Political party", "type": "string" }, "percentage": { "description": "Polling percentage", "format": "float", "type": "number" } }, "type": "object" }, "type": "array", "key$": "results" }, "sampleSize": { "description": "Number of respondents", "type": "integer", "key$": "sampleSize" }, "startDate": { "description": "Poll start date", "format": "date", "type": "string", "key$": "startDate" } }, "type": "object", "index$": 0 }, "key$": "polls", "type": "array" } } } } } }, "400": { "description": "Bad request - invalid parameters" }, "500": { "description": "Internal server error" } }, "parameters": [{ "name": "electionId", "in": "query", "description": "Unique identifier for the election", "required": false, "schema": { "type": "string", "example": "2024-presidential" }, "index$": 0 }, { "name": "state", "in": "query", "description": "Filter polling data by state", "required": false, "schema": { "type": "string", "example": "CA" }, "index$": 1 }, { "name": "startDate", "in": "query", "description": "Start date for polling data range", "required": false, "schema": { "type": "string", "format": "date", "example": "2024-01-01" }, "index$": 2 }, { "name": "endDate", "in": "query", "description": "End date for polling data range", "required": false, "schema": { "type": "string", "format": "date", "example": "2024-12-31" }, "index$": 3 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let polling_ref01_data = Object.values(setup.data.existing.polling)[0];
        // LIST
        const polling_ref01_ent = client.Polling();
        const polling_ref01_match = {};
        const polling_ref01_list = (await polling_ref01_ent.list(polling_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/polling/PollingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CivicapiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['polling01', 'polling02', 'polling03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CIVICAPI_TEST_POLLING_ENTID': idmap,
        'CIVICAPI_TEST_LIVE': 'FALSE',
        'CIVICAPI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CIVICAPI_TEST_POLLING_ENTID'];
    const live = 'TRUE' === env.CIVICAPI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CIVICAPI_TEST_POLLING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CivicapiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=PollingEntity.test.js.map