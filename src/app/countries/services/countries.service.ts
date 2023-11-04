import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country, Region, SpecificDataCountry } from '../interfaces/country.interfaces';
import { combineLatest, Observable, map, of } from 'rxjs';

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

    /* Peticiones HTTP al Backend */
    // Obtener todos los países por su continente
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
                        })
                    )
                )
            )
    }

    // Obtener todos los países por su código
    getCountryByAlphaCode(alphaCode: string): Observable<SpecificDataCountry> {
        const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`;
        return this._http.get<Country>(url)
            .pipe(
                map(country => ({
                        name: country.name.common,
                        cca3: country.cca3,
                        borders: country.borders ?? []
                    })
                )
            )
    }

    // Obtener todas las fronteras por su código
    getCountriesBordersByCodes(borders: string[]): Observable<SpecificDataCountry[]> {
        if (!borders || borders.length === 0) return of([]);    
        const countriesRequests: Observable<SpecificDataCountry>[] = [];    
        borders.forEach(code => {
            const request = this.getCountryByAlphaCode(code);
            countriesRequests.push(request);
        });        
        return combineLatest(countriesRequests);
    }
}