import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Region, SpecificDataCountry } from '../../interfaces/country.interfaces';

@Component({
    selector: 'app-selector-page',
    templateUrl: './selector-page.component.html'
})

export class SelectorPageComponent implements OnInit {

    public countriesByContinent: SpecificDataCountry[] = [];

    public selectForm: FormGroup = this._fb.group({
        continent : ['', Validators.required],
        country   : ['', Validators.required],
        border    : ['', Validators.required]
    });

    constructor(private _fb: FormBuilder, private _countriesService: CountriesService) { }
    
    ngOnInit(): void {
        this.onContinentChanged();
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
                switchMap( (continent) => this._countriesService.getCountriesByContinent(continent) )
            )
            .subscribe(countries => {
                this.countriesByContinent = countries;
            });
      }
}
