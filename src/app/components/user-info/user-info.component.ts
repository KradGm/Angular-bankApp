import { Component, Input, OnInit } from '@angular/core';
import { MyapiService } from 'src/app/services/myapi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css', './user-info.componentresolution.css']
})
export class UserInfoComponent implements OnInit {
  @Input() id!: number;
  userName: string = '';
  accountNumber: string = '';
  agency: string = '';

  constructor(
    private service: MyapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    }
  }

  ngOnInit(): void {
    this.getUser(this.id);
  }

  getUser(userId: number) {
    this.service.getUser(userId).subscribe({
      next: (res) => {
        this.userName = res.name;
        this.accountNumber = res.account.number;
        this.agency = res.account.agency;
      },
    });
  }

  goToAdminPage() {
    this.router.navigate(['/app', this.id, 'adm-login'], { queryParams: { id: this.id } });
  }
}
