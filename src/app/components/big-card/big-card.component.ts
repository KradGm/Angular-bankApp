import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/models/User';
import { MyapiService } from 'src/app/services/myapi.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css','./big-card.componentresolution.css']
})
export class BigCardComponent implements OnInit {
  @Input()
  imgCover:string=""
  id!:number;
  accountValue!:number;
  account:Account;
  accountTotal!:number;
  constructor(
    private service:MyapiService,
    private route:ActivatedRoute,
    ){
    const idParam = this.route.snapshot.paramMap.get('id');
    if(idParam){
    this.id=+idParam
    }
    this.account = {
      id:0,
      number:"",
      agency:"",
      balance:0,
      limit:0
    }
   }

  ngOnInit(): void {
   this.getAccount(this.id)
    }

  getAccount(userId:number){
    this.service.getUser(userId).subscribe({
      next: (res) =>{
      this.account=res.account;
      this.accountValue=res.account.balance;
      this.accountTotal=res.account.balance + res.account.limit;
      console.log(res)
      }
    });
  }
}
