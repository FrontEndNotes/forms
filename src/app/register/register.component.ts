import { toggleVertically } from '../animations';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { equalValueValidator } from '../equal-value-validator';
import { Router } from '@angular/router';


@Component({
    templateUrl: './register.component.html',
    animations: [
        toggleVertically
    ]
})
export class RegisterComponent implements OnInit {

    registrationForm: FormGroup;
    isRegistered: boolean = false;
    passwordMinLength = 8;
    showPasswordHint: boolean = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {

        this.registrationForm = this.fb.group({
                'email': ['', [Validators.required, Validators.email]],
                'password1': ['', [Validators.required, Validators.minLength( this.passwordMinLength )]],
                'password2': ['', Validators.required]
            },
            {validator: equalValueValidator('password1', 'password2')}
        );
    }

    onSubmit() {

    }

    isFieldValid(field: string): boolean {
        return !this.registrationForm.get(field).valid && this.registrationForm.get(field).touched;
    }
}
