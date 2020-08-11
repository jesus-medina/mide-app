export class Places {
    min: number;
    max: number;
    occupied: number;
    name: string;

    constructor(min: number, max: number, occupied: number, name: string) {
        if (min >= max) {
            throw new RangeError('Min should be lower than max');
        }
        if (occupied < min || occupied > max) {
            throw new RangeError('Occupied should be between min and max');
        }
        this.min = min;
        this.max = max;
        this.occupied = occupied;
        this.name = name;
    }

    takeAPlace() {
        if (this.occupied === this.max) {
            return;
        }
        this.occupied++;
    }

    lessAPlace() {
        if (this.occupied === this.min) {
            return;
        }
        this.occupied--;
    }

    get available() {
        return this.max - this.occupied;
    }
}
