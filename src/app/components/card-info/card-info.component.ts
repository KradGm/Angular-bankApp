import { Component, OnInit } from '@angular/core';
import { User, Account, Card } from 'src/app/models/User';
import { AccountDataService } from 'src/app/services/account-data.service';
import { MyapiService } from 'src/app/services/myapi.service';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css','./card-info.componentresolution.css']
})
export class CardInfoComponent implements OnInit {

  id!: number;
  card: Card;
  cardNumber!: string;
  lastFourDigits!:string;
  constructor(
    private accountService: AccountDataService,
    private service: MyapiService,
    private route: ActivatedRoute,
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam
    }
    this.card = {
      id: 0,
      number: "",
      limit: 1
    }
  }

  ngOnInit(): void {

    this.getCard(this.id)
  }

  getCard(userId: number) {
    this.service.getUser(userId).subscribe({
      next: (res) => {
        this.card = res.card;
        this.cardNumber = res.card.number;

        this.lastFourDigits = this.extractLastFourDigits(this.cardNumber);
        console.log(res)
      }
    });
  }
  extractLastFourDigits(cardNumber: string): string {
    if (cardNumber.includes('-')) {
      // Se o número do cartão possui hífens, divida a string em partes e pegue a última parte
      const parts = cardNumber.split('-');
      return parts[parts.length - 1].slice(-4);
    } else {
      // Se o número do cartão não possui hífens, apenas pegue os 4 últimos dígitos
      return cardNumber.slice(-4);
    }
  }
}
