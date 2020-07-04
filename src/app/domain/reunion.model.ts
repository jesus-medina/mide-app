import { ReunionDate, ReunionDateImpl } from './reunion.date.model';
export interface Reunion {
    startDate: ReunionDate;
    endDate: ReunionDate;
    isToday: boolean;
    description: string;
}

export class ReunionImpl implements Reunion {
    startDate: ReunionDate;
    endDate: ReunionDate;

    constructor(startDate: ReunionDate, endDate: ReunionDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    get isToday(): boolean {
        return this.startDate.isToday;
    }

    get description(): string {
        return this.startDate.dayDescriptionFrom(this.endDate);
    }
}
