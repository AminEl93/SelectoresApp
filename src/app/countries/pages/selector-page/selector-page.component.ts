import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interfaces';

@Component({
    selector: 'app-selector-page',
    templateUrl: './selector-page.component.html'
})

export class SelectorPageComponent {

    public selectForm: FormGroup = this._fb.group({
        continent : ['', Validators.required],
        country: ['', Validators.required],
        border : ['', Validators.required]
    });

    constructor(private _fb: FormBuilder, private _countriesService: CountriesService) { }

    get continents(): Region[] {
        return this._countriesService.continents;
    }
}
