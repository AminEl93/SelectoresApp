import { Injectable } from '@angular/core';
import { Region } from '../interfaces/country.interfaces';

@Injectable({
    providedIn: 'root'
})

export class CountriesService {
    
    private regions: Region[] = [
        Region.Africa, Region.America, Region.Asia, Region.Europe, Region.Oceania
    ];

    constructor() { }

    get continents(): Region[] {
        return [...this.regions];
    }
}