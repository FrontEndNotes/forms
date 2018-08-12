import { Component, OnInit } from '@angular/core';
import { toggleVertically } from '../animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    animations: [
        toggleVertically
    ]
})
export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
