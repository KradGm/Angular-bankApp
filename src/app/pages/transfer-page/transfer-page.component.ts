import { Component, OnInit } from '@angular/core';
import { MyapiService } from 'src/app/services/myapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent implements OnInit {
  pessoas: any [] = [];
  id!:number;
  accountValue!:number;
  account:Account;
  constructor(
    private http: HttpClient,
    private router:Router,
    private service:MyapiService,
    private route:ActivatedRoute
    ) {
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
    this.http.get('https://santanderapi-production.up.railway.app/users').subscribe((data: any)=>{
      this.pessoas =data;
    })
  }

  selecionarPessoa(pessoa: any) {
    // Aqui você pode adicionar a lógica para fazer a transferência bancária para a pessoa selecionada.
    console.log('Pessoa selecionada:', pessoa);
    // Adicione a lógica para iniciar a transferência aqui.
  }
  getAccount(userId:number){
    this.service.getUser(userId).subscribe({
      next: (res) =>{
      this.account=res.account;
      this.accountValue=res.account.balance;
      console.log(res)
      }
    });
  }
}
