import { Temple } from '../domain/temple.model';

export interface TempleService {
    getTemple(): Temple;
}
