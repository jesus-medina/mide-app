import { ReunionImpl } from './../domain/reunion.model';
import { Temple } from './../domain/temple.model';
import { TempleLocalDataSourceImpl } from './../data/datasources/temple.local.datasource';
import { TempleRepository, TempleRepositoryImpl } from './../data/repositories/temple.repository';
import { Injectable } from '@angular/core';
import { TempleFirestoreDataSource } from '../data/datasources/temple.firestore.datasource';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reunion } from '../domain/reunion.model';
import { Day, ReunionDateImpl } from '../domain/reunion.date.model';

@Injectable({
  providedIn: 'root'
})
export class TempleService {

  temple: Temple;

  private templeRepository: TempleRepository;

  constructor(private readonly afs: AngularFirestore) {
    this.templeRepository = new TempleRepositoryImpl(
      new TempleLocalDataSourceImpl(),
      new TempleFirestoreDataSource(this.afs)
    );
  }

  get occupiedPlaces() {
    if (this.temple === undefined) {
      return 0;
    }
    return this.temple.places.occupied;
  }

  get availablePlaces() {
    if (this.temple === undefined) {
      return 0;
    }
    return this.temple.places.available;
  }

  get isThereAReunionToday() {
    if (this.temple === undefined) {
      return false;
    }
    const index = this.reunions.findIndex(reunion => reunion.isToday);
    return index !== -1;
  }

  get reunions(): Reunion[] {
    if (this.temple === undefined) {
      return [];
    }
    return this.temple.reunions;
  }

  fetchTempleByName(name: string) {
    this.templeRepository.findTempleByName(name).subscribe({
      next: (temple) => {
        temple.reunions = this.staticReunions();
        this.temple = temple;
        console.log(this.temple);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('findTempleByName completed');
      },
    });
  }

  private staticReunions(): ReunionImpl[] {
    return [
      new ReunionImpl(
        new ReunionDateImpl(
          Day.friday,
          '10:00'
        ),
        new ReunionDateImpl(
          Day.friday,
          '11:00'
        ),
      ),
      new ReunionImpl(
        new ReunionDateImpl(
          Day.friday,
          '12:00'
        ),
        new ReunionDateImpl(
          Day.friday,
          '13:00'
        ),
      ),
      new ReunionImpl(
        new ReunionDateImpl(
          Day.friday,
          '14:00'
        ),
        new ReunionDateImpl(
          Day.friday,
          '15:00'
        ),
      )
    ];
  }
}
