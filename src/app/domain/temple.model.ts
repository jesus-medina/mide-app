import { Reunion } from './reunion.model';
import { Places } from './places.model';

export interface Temple {
    name: string;
    places: Places;
    reunions: Reunion[];
}
