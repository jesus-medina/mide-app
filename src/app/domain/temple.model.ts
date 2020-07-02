import { Reunion } from './reunion.model';

export interface Temple {
    readonly name: string;
    readonly reunions: Reunion[];
}
