import { CivicapiEntityBase } from '../CivicapiEntityBase';
import type { CivicapiSDK } from '../CivicapiSDK';
import type { Control } from '../types';
import type { Polling, PollingListMatch } from '../CivicapiTypes';
declare class PollingEntity extends CivicapiEntityBase<Polling> {
    constructor(client: CivicapiSDK, entopts: any);
    make(this: PollingEntity): PollingEntity;
    list(this: any, reqmatch?: PollingListMatch, ctrl?: Control): Promise<PollingEntity[]>;
}
export { PollingEntity };
