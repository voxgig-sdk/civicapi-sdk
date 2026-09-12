import { CivicapiEntityBase } from '../CivicapiEntityBase';
import type { CivicapiSDK } from '../CivicapiSDK';
import type { Control } from '../types';
import type { Result, ResultListMatch } from '../CivicapiTypes';
declare class ResultEntity extends CivicapiEntityBase<Result> {
    constructor(client: CivicapiSDK, entopts: any);
    make(this: ResultEntity): ResultEntity;
    list(this: any, reqmatch?: ResultListMatch, ctrl?: Control): Promise<ResultEntity[]>;
}
export { ResultEntity };
