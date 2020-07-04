import { Reunion } from './reunion.model';
import { Places } from './places.model';

export interface Temple {
    readonly name: string;
    places: Places;
    reunions: Reunion[];
}
