import { Component, Input, OnInit } from '@angular/core';
import { MyapiService } from 'src/app/services/myapi.service';
import { User, Account } from 'src/app/models/User';
import { ActivatedRoute, Route } from '@angular/router';
import { AccountDataService } from 'src/app/services/account-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css', './user-info.componentresolution.css']
})
export class UserInfoComponent implements OnInit {
  id!: number;
  userName: string = ''; // Variável para armazenar o nome do usuário
  accountNumber: string = ''; // Variável para armazenar o número da conta
  agency: string = ''; // Variável para armazenar a agência
  constructor(
    private service: MyapiService,
    private route: ActivatedRoute,
    private accountService: AccountDataService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam
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

        this.accountService.setBalance(res.account.balance);
        console.log(res)
      },
    });
  }

}
