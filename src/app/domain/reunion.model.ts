import { ReunionDate, ReunionDateImpl } from './reunion.date.model';
export interface Reunion {
    startDate: ReunionDate;
    endDate: ReunionDate;
    startHourWithMeridian: string;
    endHourWithMeridian: string;
    isToday: boolean;
    description: string;
    timeToNowTime: number;
    isEndTimeAfterNow: boolean;
}

export class ReunionImpl implements Reunion {
    startDate: ReunionDate;
    endDate: ReunionDate;

    constructor(startDate: ReunionDate, endDate: ReunionDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    get startHourWithMeridian(): string {
        return this.startDate.hourWithMeridian;
    }

    get endHourWithMeridian(): string {
        return this.endDate.hourWithMeridian;
    }

    get isToday(): boolean {
        return this.startDate.isToday;
    }

    get description(): string {
        return this.startDate.dayDescriptionFrom(this.endDate);
    }

    get timeToNowTime(): number {
        return this.startDate.timeToNowTime;
    }

    get isEndTimeAfterNow(): boolean {
        return this.endDate.isTimeAfterNow;
    }
}

export enum Order {
    first = 'Primera',
    second = 'Segunda',
    third = 'Tercera',
}

export const orderByIndex: Map<number, Order> = new Map<number, Order>();
orderByIndex.set(0, Order.first);
orderByIndex.set(1, Order.second);
orderByIndex.set(2, Order.third);


