import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SpecificDataCountry } from '../../interfaces/country.interfaces';

@Component({
    selector: 'app-selector-page',
    templateUrl: './selector-page.component.html'
})

export class SelectorPageComponent implements OnInit {

    public countriesByContinent: SpecificDataCountry[] = [];
    public borders: SpecificDataCountry[] = [];

    public selectForm: FormGroup = this._fb.group({
        continent : ['', Validators.required],
        country   : ['', Validators.required],
        border    : ['', Validators.required]
    });

    constructor(private _fb: FormBuilder, private _countriesService: CountriesService) { }
    
    ngOnInit(): void {
        this.onContinentChanged();
        this.onCountryChanged();
    }

    // Obtener todos los continentes a partir del servicio
    get continents(): Region[] {
        return this._countriesService.continents;
    }

    // Petición HTTP cada vez que cambia el valor de un continente seleccionado 
    onContinentChanged(): void {
        this.selectForm.get('continent')!.valueChanges
            .pipe(
                tap( () => this.selectForm.get('country')!.setValue('') ),
                tap( () => this.borders = [] ),
                switchMap( (continent) => this._countriesService.getCountriesByContinent(continent) )
            )
            .subscribe(countries => {
                this.countriesByContinent = countries;
            });
    }

    // Petición HTTP cada vez que cambia el valor de un país seleccionado
    onCountryChanged(): void {
        this.selectForm.get('country')!.valueChanges
        .pipe(
            tap( () => this.selectForm.get('border')!.setValue('') ),
            filter( (value: string) => value.length > 0 ),
            switchMap( (alphaCode) => this._countriesService.getCountryByAlphaCode(alphaCode) ),
            switchMap( (country) => this._countriesService.getCountriesBordersByCodes(country.borders) )
        )
        .subscribe(countries => {
            this.borders = countries;
        });
    }    
}
