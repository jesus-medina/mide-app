import { Temple } from './../domain/temple.model';
import { TempleLocalDataSourceImpl } from './../data/datasources/temple.local.datasource';
import { TempleRepository, TempleRepositoryImpl } from './../data/repositories/temple.repository';
import { Injectable } from '@angular/core';
import { TempleFirestoreDataSource } from '../data/datasources/temple.firestore.datasource';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reunion } from '../domain/reunion.model';

@Injectable({
  providedIn: 'root'
})
export class TempleService {

  private temple: Temple;

  private templeRepository: TempleRepository;

  constructor(private readonly afs: AngularFirestore) {
    this.templeRepository = new TempleRepositoryImpl(
      new TempleLocalDataSourceImpl(),
      new TempleFirestoreDataSource(this.afs)
      );
  }

  get templeName() {
    if (this.temple === undefined) {
      return '';
    }
    return this.temple.name;
  }

  get occupiedPlaces() {
    if (this.temple === undefined) {
      return 0;
    }
    return 0;
  }

  get availablePlaces() {
    if (this.temple === undefined) {
      return 0;
    }
    return this.temple.places;
  }

  get isThereAReunionToday() {
    if (this.temple === undefined) {
      return false;
    }
    const index = this.reunions.findIndex(reunion => reunion.isToday);
    return index !== -1 && this.isEndTimeAfterNow;
  }

  private get isEndTimeAfterNow(): boolean {
    const reunions = this.reunions;
    const lastReunion = reunions[reunions.length - 1];
    return lastReunion.isEndTimeAfterNow;
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
}
