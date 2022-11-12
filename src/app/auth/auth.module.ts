import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    RecuperarPasswordComponent
  ],
  exports: [
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class AuthModule { }
