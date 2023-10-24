import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  @Input()
  id!: number;
  constructor(private router:Router) {
   }

  ngOnInit(): void {

  }
  logar(){
    this.router.navigate(['/app',this.id]);
  }
}
