import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private isValidEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  public registroForm: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.registroForm = this.fb.group({
      nick: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  isValidField(field: string){
    return ((this.registroForm.get(field).touched || this.registroForm.get(field).dirty) && !this.registroForm.get(field).valid);
  }
  validarPassword(): boolean {
    const pass1 = this.registroForm.get('password').value;
    const pass2 = this.registroForm.get('password2').value;
    if (pass1 === pass2) {
      return false;
    } else {
      return true;
    }
  }
  async onRegistro() {
    const { email, password, nick } = this.registroForm.value;
    try {
      const result = await this.authService.register(email, password, nick);
      if(result) {
        this.router.navigateByUrl('/home');
      }
    } catch (error) {
      console.log(error)
    }
  }
}
