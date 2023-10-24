import { Component, Input, OnInit } from '@angular/core';
import { AccountDataService } from 'src/app/services/account-data.service';


@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent implements OnInit {

  accountValue!:number;
  constructor(private accountService:AccountDataService) { }

  ngOnInit(): void {
    this.accountService.getBalance().subscribe((balance) => {
      this.accountValue = balance;
      console.log(this.accountValue);
    });
  }

}
