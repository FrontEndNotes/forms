import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LostPasswordComponent } from './lost-password/lost-password.component';
import { HeaderComponent } from './layout/header/header.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        LostPasswordComponent,
        HeaderComponent,
        PasswordStrengthComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
