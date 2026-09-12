import { ElectionEntity } from './entity/ElectionEntity';
import { PollingEntity } from './entity/PollingEntity';
import { ResultEntity } from './entity/ResultEntity';
export type * from './CivicapiTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CivicapiEntityBase } from './CivicapiEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CivicapiSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Election(entopts?: Record<string, any>): ElectionEntity;
    Polling(entopts?: Record<string, any>): PollingEntity;
    Result(entopts?: Record<string, any>): ResultEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CivicapiSDK;
    tester(testopts?: any, sdkopts?: any): CivicapiSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CivicapiSDK;
export { stdutil, config, BaseFeature, CivicapiEntityBase, CivicapiSDK, SDK, };
