import { TempleLocalDataSource } from './../datasources/temple.local.datasource';
import { TempleRemoteDataSource } from './../datasources/temple.firestore.datasource';
import { Temple } from 'src/app/domain/temple.model';
import { Observable } from 'rxjs';

export interface TempleRepository {
    findTempleByName(name: string): Observable<Temple>;
    updateOccupiedPlacesForTempleByName(name: string, occupied: number): Observable<any>;
}

export class TempleRepositoryImpl implements TempleRepository {
    templeLocalDataSource: TempleLocalDataSource;
    templeRemoteDataSource: TempleRemoteDataSource;

    constructor(
        templeLocalDataSource: TempleLocalDataSource,
        templeRemoteDataSource: TempleRemoteDataSource,
        ) {
        this.templeLocalDataSource = templeLocalDataSource;
        this.templeRemoteDataSource = templeRemoteDataSource;
    }

    findTempleByName(name: string): Observable<Temple> {
        return this.templeRemoteDataSource.findTempleByName(name);
    }

    updateOccupiedPlacesForTempleByName(name: string, occupied: number): Observable<any> {
        return this.templeRemoteDataSource.updateOccupiedPlacesForTempleByName(name, occupied);
    }
}
