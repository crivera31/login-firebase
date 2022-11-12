import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: any;

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    if(localStorage.getItem('email') == null) {
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }
    
    this.user = await this.authService.getCurrentUser();
    if (this.user) {
      // console.log('Usuairo logueado')
    } else {
      // console.log('Usuairo no logueado')
    }
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error)
    }
  }

}
