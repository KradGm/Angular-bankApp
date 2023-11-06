import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'; // Substitua pelo seu serviço real
import { User } from 'src/app/models/User';
import { MyapiService } from 'src/app/services/myapi.service';


@Component({
  selector: 'app-adm-login-page',
  templateUrl: './adm-login-page.component.html',
  styleUrls: ['./adm-login-page.component.css']
})
export class AdmLoginPageComponent {
  username: string = '';
  password: string = '';



  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private service:MyapiService
    ) {}

  ngOnInit():void{

  }

  isValidForm():boolean{
    return this.username.length>0 && this.password.length>0;
  }
  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/register']);
    }
  }
}
