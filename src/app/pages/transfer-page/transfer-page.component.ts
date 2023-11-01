import { Component, OnInit } from '@angular/core';
import { TransferService } from 'src/app/services/transfer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Account, History } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { MyapiService } from 'src/app/services/myapi.service';

@Component({
  selector: 'app-transfer-page',
  templateUrl: './transfer-page.component.html',
  styleUrls: ['./transfer-page.component.css']
})
export class TransferPageComponent implements OnInit {
  pessoas: User[] = [];
  id!: number;
  destinatarioId!: number;
  name!: string;
  accountValue!: number;
  account: Account;
  pessoaSelecionada: User | null = null;
  valorTransferencia: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private transferService: TransferService,
    private route: ActivatedRoute,
    private service: MyapiService
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
    }
    this.account = {
      id: 0,
      number: "",
      agency: "",
      balance: 0,
      limit: 0
    };
  }

  ngOnInit(): void {
    this.getAccount(this.id);
    this.service.getUsers().subscribe((data: User[]) => {
      this.pessoas = data;
    });
  }

  /*
  Esse metodo serve para selecionar um usuario da minha lista completa de usuarios
  */
  selecionarPessoa(pessoa: User) {
    this.pessoaSelecionada = pessoa;
    if (pessoa.id !== undefined)
      this.destinatarioId = pessoa.id;
  }
  /*
  Esse metodo é a consolidação da transferencia, fazendo as verificações de valores
  Montando o historico de transferencia tanto de saida(Remetente)
  Montando o historico de transferencia de recebimento(Destinatario)
  */
  realizarTransferencia() {
    if (this.pessoaSelecionada && this.valorTransferencia <= this.account.balance) {
      if (this.valorTransferencia <= 0) {
        console.log('O valor de transferência deve ser maior que zero.');
        return;
      }

      if (this.valorTransferencia > this.accountValue) {
        console.log('Saldo insuficiente para realizar a transferência.');
        return;
      }

      const valorTransferencia = this.valorTransferencia;
      const destinatario = this.pessoaSelecionada;

      this.account.balance -= valorTransferencia;

      const historicoSaida: History = {
        value: -valorTransferencia, // Valor negativo para saída
        userName: destinatario.name, // Nome do destinatário
        transactionDate: new Date(), // Data atual
        description: 'Transferência para ' + destinatario.name,
      };

      destinatario.account.balance += valorTransferencia;

      const historicoEntrada: History = {
        value: valorTransferencia,
        userName: this.pessoaSelecionada.name, // Seu nome (ou quem está fazendo a transferência)
        transactionDate: new Date(),
        description: 'Recebido de ' + this.name,
      };

      this.transferService.transferValueWithHistory(this.id, this.destinatarioId, destinatario, valorTransferencia, historicoSaida, historicoEntrada)
        .subscribe({
          next: (hist) => {
            console.log('Transferência registrada no histórico com sucesso.', hist);
          },
          error: (histError) => {
            console.error('Erro ao registrar a transferência no histórico:', histError);
          }
        });
    }
  }

  getAccount(userId: number) {
    this.service.getUser(userId).subscribe({
      next: (res) => {
        this.name = res.name
        this.account = res.account;
        this.accountValue = res.account.balance;
      }
    });
  }
}
