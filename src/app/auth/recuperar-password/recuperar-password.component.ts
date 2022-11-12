import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  public email = new FormControl('');
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }
  async onReset() {
    try {
      const email = this.email.value;
      await this.authService.resetPassword(email);
      Swal.fire('Éxito','Se le ha enviado un mensaje a su correo para su cambio de su contraseña.','success');
      this.email.reset();
      /**redirect */
      // this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }
  }


}
