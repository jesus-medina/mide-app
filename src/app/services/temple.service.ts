import { ReunionImpl, orderByIndex } from './../domain/reunion.model';
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

  get closestReunionDescription(): string {
    const closestReunion = this.closestReunion;
    const closestReunionIndex = this.closestReunionIndex;
    return orderByIndex.get(closestReunionIndex).valueOf() + ' reunión - ' + closestReunion.startHourWithMeridian;
  }

  get nextReunionDescription(): string {
    const max = this.reunions.length - 1;
    const nextReunionIndex = this.nextReunionIndex;
    if (nextReunionIndex < max) {
      return '';
    }
    const nextReunion = this.nextReunion;
    return 'Nuestra siguiente reunión reunión - ' + nextReunion.startHourWithMeridian;
  }

  private get closestReunionIndex(): number {
    if (this.temple === undefined) {
      return;
    }
    const reunions = this.reunions;
    const reunionsTimes = reunions.map(reunion => reunion.timeToNowTime);
    const minValue = Math.min(...reunionsTimes);
    return reunions.findIndex(reunion => reunion.timeToNowTime === minValue);
  }

  private get nextReunionIndex(): number {
    const max = this.reunions.length - 1;
    let nextIndex = 0;
    const closestReunionIndex = this.closestReunionIndex;
    if (closestReunionIndex < max) {
      nextIndex = closestReunionIndex + 1;
    }
    return nextIndex;
  }

  private get closestReunion(): Reunion {
    const reunions = this.reunions;
    return reunions[this.closestReunionIndex];
  }

  private get nextReunion(): Reunion {
    const reunions = this.reunions;
    return reunions[this.nextReunionIndex];
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
