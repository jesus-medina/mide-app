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
            const reunions = this.afs.collection('temples').doc(name).collection('reunions');
            reunions.snapshotChanges().subscribe({
                next: (documentChangeActions) => {
                    const reunions = documentChangeActions.map(documentChangeAction => {
                        return this.createReunionPlacesFromReunionData(documentChangeAction.payload.doc.data());
                    });

                    subscriber.next({
                        name,
                        reunions: [],
                        places: reunions,
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
        const reserved = reunionData[Constants.FIRESTORE_KEY_RESERVED];
        const reunionDayOfWeek = reunionData[Constants.FIRESTORE_KEY_DAY_OF_WEEK];
        const startTime = reunionData[Constants.FIRESTORE_KEY_START_TIME];
        const endTime = reunionData[Constants.FIRESTORE_KEY_END_TIME];
        return new Places(max, min, occupied, reserved, reunionDayOfWeek, startTime, endTime);
    }

    updateOccupiedPlacesForTempleByName(name: string, occupied: number): Observable<any> {
        return new Observable(subscriber => {
        });
    }
}
