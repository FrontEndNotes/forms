import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { StrengthValidation } from './strength-validation';

@Component({
    selector: 'app-password-strength',
    templateUrl: './password-strength.component.html'
})
export class PasswordStrengthComponent implements OnChanges {

    @Input() passwordToCheck: string;
    @Output() validation: EventEmitter<StrengthValidation> = new EventEmitter();

    bar0: string;
    bar1: string;
    bar2: string;
    bar3: string;
    bar4: string;

    textLabel = '';
    private colors = ['bg-danger', 'bg-danger', 'bg-warning', 'bg-info', 'bg-success'];

    private measureStrength(p) {
        let force = 0;
        const regex = /[!-\/:-@\[-`\{-~]/g; // Covers all special characters on keyboard

        const lowerLetters = /[a-z]+/.test(p);
        const upperLetters = /[A-Z]+/.test(p);
        const numbers = /[0-9]+/.test(p);
        const symbols = regex.test(p);

        const flags = [lowerLetters, upperLetters, numbers, symbols];

        let passedMatches = 0;
        for (const flag of flags) {
            passedMatches += flag === true ? 1 : 0;
        }

        force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        force += passedMatches * 10;

        force = (p.length <= 6) ? Math.min(force, 10) : force;

        force = (passedMatches === 1) ? Math.min(force, 10) : force;
        force = (passedMatches === 2) ? Math.min(force, 20) : force;
        force = (passedMatches === 3) ? Math.min(force, 40) : force;

        this.validation.emit(<StrengthValidation> {
            hasLowerCase: lowerLetters,
            hasUpperCase: upperLetters,
            hasNumber: numbers,
            hasSpecialChar: symbols,
            strength: force
        });

        return force;
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        const password = changes['passwordToCheck'].currentValue;
        this.setBarColors(5, 'password-strength__bar-none');

        if (password) {
            const strength = this.measureStrength(password);
            const color = this.getColor(strength);
            this.textLabel = color.label;

            this.setBarColors(color.level, color.value);
        } else
            this.textLabel = '';
    }

    private getColor(strength) {
        let level = 0;
        let label = '';

        if (strength <= 10) {
            level = 0;
            label = 'Bardzo słabe';
        } else if (strength <= 20) {
            level = 1;
            label = 'Bardzo słabe';
        } else if (strength <= 30) {
            level = 2;
            label = 'Słabe';
        } else if (strength <= 40) {
            level = 3;
            label = 'Silne';
        } else {
            level = 4;
            label = 'Bardzo silne';
        }

        return {
            level: level + 1,
            value: this.colors[level],
            label: label
        };
    }

    private setBarColors(count, color) {
        for (let i = 0; i < count; i++) {
            this['bar' + i] = color;
        }
    }

}
