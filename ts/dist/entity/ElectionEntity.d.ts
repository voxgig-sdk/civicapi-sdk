import { CivicapiEntityBase } from '../CivicapiEntityBase';
import type { CivicapiSDK } from '../CivicapiSDK';
import type { Control } from '../types';
import type { Election, ElectionListMatch } from '../CivicapiTypes';
declare class ElectionEntity extends CivicapiEntityBase<Election> {
    constructor(client: CivicapiSDK, entopts: any);
    make(this: ElectionEntity): ElectionEntity;
    list(this: any, reqmatch?: ElectionListMatch, ctrl?: Control): Promise<ElectionEntity[]>;
}
export { ElectionEntity };
