import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  id:number =0;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
   }

  ngOnInit(): void {
    console.log(this.id)
  }
  goToAdminPage() {
    this.router.navigate(['/app', this.id, 'adm-login']);
  }
}
