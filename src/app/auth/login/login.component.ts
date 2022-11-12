import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isValidEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  public loginForm: FormGroup;
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('email') !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  isValidField(field: string): boolean {
    return ((this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid);
  }

  async onLogin() {
    const { email,password } = this.loginForm.value;
    try {
      const result = await this.authService.login(email, password);
      if(result) {
        this.router.navigateByUrl('/home');
      }
    } catch (error) {
      // console.log(error);
    }
  }
  async onTermino() {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Términos y condiciones y Política de privacidad y protección de datos.',
      inputPlaceholder: 'Los presentes Términos y condiciones de uso y la Política de privacidad rigen el uso del sitio web.\n POLÍTICA DE PRIVACIDAD Y USO DE DATOS:\n  Se es responsable por el uso de la información personal de los usuarios recogida directamente a través de diversos medios. La aplicación se compromete a poner en práctica las medidas técnicas y organizativas adecuadas para proteger los datos personales de sus usuarios contra pérdida accidental, modificación, divulgación o acceso no autorizado.',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      Swal.fire(text)
    }
  }


}
