export interface ReunionDate {
    day: Day;
    hour: string;
    isToday: boolean;
    isSameDayThan(otherDate: ReunionDate): boolean;
    dayDescriptionFrom(otherDate: ReunionDate): string;
}

export class ReunionDateImpl implements ReunionDate {
    day: Day;
    hour: string;

    constructor(day: Day, hour: string) {
        this.day = day;
        this.hour = hour;
    }

    get isToday(): boolean {
        return this.day.valueOf() === this.today();
    }

    private today() {
        const today = new Date();
        console.log('today.getDay(): ' + today.getDay());
        return today.getDay();
    }

    isSameDayThan(otherDate: ReunionDate): boolean {
        return this.day === otherDate.day;
    }

    dayDescriptionFrom(otherDate: ReunionDate): string {
        if (!this.isSameDayThan(otherDate)) {
            return 'Date not supported';
        }
        return daysOfWeek.get(this.day) + ' de ' + this.hour + ' a ' + otherDate.hour;
    }
}

export enum Order {
    first = 'Primera',
    second = 'Segunda',
    third = 'Tercera',
}

export enum Day {
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
    sunday = 7,
}

const daysOfWeek: Map<Day, string> = new Map<Day, string>();
daysOfWeek.set(Day.monday, 'Lunes');
daysOfWeek.set(Day.tuesday, 'Martes');
daysOfWeek.set(Day.wednesday, 'Miércoles');
daysOfWeek.set(Day.thursday, 'Jueves');
daysOfWeek.set(Day.friday, 'Viernes');
daysOfWeek.set(Day.saturday, 'Sábado');
daysOfWeek.set(Day.sunday, 'Domingo');
