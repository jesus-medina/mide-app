export interface ReunionDate {
    day: Day;
    hours: string;
    minutes: string;
    isToday: boolean;
    timeToNowTime: number;
    hourWithMeridian: string;
    isSameDayThan(otherDate: ReunionDate): boolean;
    dayDescriptionFrom(otherDate: ReunionDate): string;
}

export class ReunionDateImpl implements ReunionDate {
    day: Day;
    hours: string;
    minutes: string;

    constructor(day: Day, time: string) {
        this.day = day;
        const values = time.split(':');
        this.hours = values[0];
        this.minutes = values[1];
    }

    get isToday(): boolean {
        return this.day.valueOf() === this.today();
    }

    private today() {
        const today = new Date();
        return today.getDay();
    }

    get timeToNowTime(): number {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const actualTime = hours + '' + minutes;
        return Math.abs(parseInt(actualTime, 10) - parseInt(this.hours + this.minutes, 10));
    }

    get hourWithMeridian(): string {
        let hours = parseInt(this.hours, 10);
        const isAfterMeridian = hours >= 12;
        let meridian = 'a.m.';
        if (isAfterMeridian) {
            meridian = 'p.m.';
            hours -= 12;
        }
        return hours + ':' + this.minutes + ' ' + meridian;
    }

    isSameDayThan(otherDate: ReunionDate): boolean {
        return this.day === otherDate.day;
    }

    dayDescriptionFrom(otherDate: ReunionDate): string {
        if (!this.isSameDayThan(otherDate)) {
            return 'Date not supported';
        }
        return daysOfWeek.get(this.day) + ' de ' + this.hourWithMeridian + ' a ' + otherDate.hourWithMeridian;
    }
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
