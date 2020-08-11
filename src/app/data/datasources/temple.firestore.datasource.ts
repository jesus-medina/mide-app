import { Temple } from 'src/app/domain/temple.model';
import { Places } from 'src/app/domain/places.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Constants from 'src/app/utils/constants';

export interface TempleRemoteDataSource {
    findTempleByName(name: string): Observable<Temple>;
    updateOccupiedPlacesForTempleByName(name: string, occupied: number): Observable<any>;
}

export class TempleFirestoreDataSource implements TempleRemoteDataSource {
    constructor(private readonly afs: AngularFirestore) {}

    findTempleByName(name: string): Observable<Temple> {
        return new Observable(subscriber => {
            this.afs.collection('temples').doc(name).snapshotChanges().subscribe({
                next: (snapshotAction) => {
                    const templeData = snapshotAction.payload.data();
                    const primeraReunionData = templeData[Constants.FIRESTORE_KEY_PRIMERA_REUNION];
                    const primeraReunionPlaces = this.createReunionPlacesFromReunionData(primeraReunionData);
                    const segundaReunionData = templeData[Constants.FIRESTORE_KEY_SEGUNDA_REUNION];
                    const segundaReunionPlaces = this.createReunionPlacesFromReunionData(segundaReunionData);
                    subscriber.next({
                        name,
                        reunions: [],
                        places: [
                            primeraReunionPlaces,
                            segundaReunionPlaces
                        ],
                    });
                },
                error(err) {
                    subscriber.error(err);
                },
                complete() {
                    subscriber.complete();
                }
            });
        });
    }

    private createReunionPlacesFromReunionData(reunionData: any): Places {
        const min = reunionData[Constants.FIRESTORE_KEY_MIN];
        const max = reunionData[Constants.FIRESTORE_KEY_MAX];
        const occupied = reunionData[Constants.FIRESTORE_KEY_OCCUPIED];
        const name = reunionData[Constants.FIRESTORE_KEY_NAME];
        return new Places(min, max, occupied, name);
    }

    updateOccupiedPlacesForTempleByName(name: string, occupied: number): Observable<any> {
        return new Observable(subscriber => {
        });
    }
}
