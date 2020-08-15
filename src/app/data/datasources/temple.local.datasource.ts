import { Temple } from 'src/app/domain/temple.model';
import { Places } from 'src/app/domain/places.model';

export interface TempleLocalDataSource {
    findTemple(): Temple;
}

export class TempleLocalDataSourceImpl implements TempleLocalDataSource {
    findTemple(): Temple {
        return {
            name: '',
            reunions: [],
            places: [new Places(50, 0, 0, 0, 0, '', '')]
        };
    }
}
