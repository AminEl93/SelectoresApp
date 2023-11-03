import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country, Region, SpecificDataCountry } from '../interfaces/country.interfaces';
import { Observable, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CountriesService {
    
    private baseUrl: string = 'https://restcountries.com/v3.1';
    private regions: Region[] = [
        Region.Africa, Region.America, Region.Asia, Region.Europe, Region.Oceania
    ];

    constructor(private _http: HttpClient) { }

    get continents(): Region[] {
        return [...this.regions];
    }

    // Petición HTTP al backend para obtener todos los países por continente
    getCountriesByContinent(continent: Region): Observable<SpecificDataCountry[]> {
        if (!continent) return of([]);    
        const url: string = `${this.baseUrl}/region/${continent}?fields=name,cca3,borders`;
    
        return this._http.get<Country[]>(url)
            .pipe(
                map(countries => countries
                    .map(country => ({
                        name: country.name.common,
                        cca3: country.cca3,
                        borders: country.borders ?? []
                    }))
                )
            )
    }
}