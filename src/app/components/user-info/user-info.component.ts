import { Component, Input, OnInit } from '@angular/core';
import { MyapiService } from 'src/app/services/myapi.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Route } from '@angular/router';
import { AccountDataService } from 'src/app/services/account-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  id!:number;
  user:User;
  constructor(
    private service:MyapiService,
    private route:ActivatedRoute,
    private accountService:AccountDataService
    ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
    this.id=+idParam
    }
    this.user =
    {
      id:0,
      name: "",
      account: {
        id: 0,
        number: "",
        agency: "",
        balance: 0,
        limit: 0,
      }, card: {
        id: 0,
        number: "",
        limit: 0,
      },
        features: [],
        news: [],
        };
      }
        ngOnInit(): void {

          this.getUser(this.id);
        }
  getUser(userId:number){
    this.service.getUser(userId).subscribe({
      next: (res) =>{
        this.user=res;
        this.accountService.setBalance(this.user.account.balance);
        console.log(res)
      },
    });
  }

}
