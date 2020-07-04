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
                next(snapshotAction) {
                    const templeData = snapshotAction.payload.data();
                    const placesData = templeData[Constants.FIRESTORE_KEY_PLACES];
                    const min = placesData[Constants.FIRESTORE_KEY_MIN];
                    const max = placesData[Constants.FIRESTORE_KEY_MAX];
                    const occupied = placesData[Constants.FIRESTORE_KEY_OCCUPIED];
                    const places = new Places(min, max, occupied);
                    subscriber.next({
                        name,
                        reunions: [],
                        places,
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

    updateOccupiedPlacesForTempleByName(name: string, occupied: number): Observable<any> {
        return new Observable(subscriber => {
            const docRef = this.afs.collection('temples').doc(name);
            docRef.get().toPromise().then(snapshotAction => {
                const templeData = snapshotAction.data();
                const placesData = templeData[Constants.FIRESTORE_KEY_PLACES];
                placesData[Constants.FIRESTORE_KEY_OCCUPIED] = occupied;
                docRef.update({
                    [Constants.FIRESTORE_KEY_PLACES]: placesData,
                }).then(() => {
                    subscriber.complete();
                }).catch(error => {
                    subscriber.error(error);
                });
            });
        });
    }
}
