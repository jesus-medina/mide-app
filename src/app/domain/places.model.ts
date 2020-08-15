export class Places {
    max: number;
    min: number;
    occupied: number;
    reserved: number;
    reunionDayOfWeek: number;
    startTime: string;
    endTime: string;
    name: string;

    constructor(
        max: number,
        min: number,
        occupied: number,
        reserved: number,
        reunionDayOfWeek: number,
        startTime: string,
        endTime: string
    ) {
        if (min >= max) {
            throw new RangeError('Min should be lower than max');
        }
        if (occupied < min || occupied > max) {
            throw new RangeError('Occupied should be between min and max');
        }
        this.max = max;
        this.min = min;
        this.occupied = occupied;
        this.reserved = reserved;
        this.reunionDayOfWeek = reunionDayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = `Reunion de ${DaysOfWeek[reunionDayOfWeek].toString()} de ${startTime} a ${endTime}`;
    }

    takeAPlace() {
        if (!this.areTherePlacesAvailable) {
            return;
        }
        this.occupied++;
    }

    leaveAPlace() {
        if (this.areTherePlacesAvailable) {
            return;
        }
        this.occupied--;
    }

    reserveAPlace() {
        if (!this.areTherePlacesAvailable) {
            return;
        }
        this.reserved++;
    }

    leaveAReservedPlace() {
        if (this.areTherePlacesAvailable) {
            return;
        }
        this.reserved--;
    }

    get available() {
        return this.max - this.occupied - this.reserved;
    }

    private get areTherePlacesAvailable() {
        return this.available > 0;
    }
}

enum DaysOfWeek {
    Domingo,
    Lunes,
    Martes,
    Miércoles,
    Jueves,
    Viernes
}
