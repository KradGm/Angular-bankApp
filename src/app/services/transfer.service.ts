import { Injectable } from '@angular/core';
import { MyapiService } from './myapi.service';
import { Observable } from 'rxjs';
import { History, User } from 'src/app/models/User'; // Removendo Account, pois não é necessário neste contexto

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  constructor(private myApiService: MyapiService) {}

  transferValueWithHistory(remetenteId: number, destinatarioId:number, destinatario: User, valor: number, historicoSaida: History, historicoEntrada:History): Observable<User> {
    return new Observable((observer) => {
      if (destinatario.account && typeof valor === 'number') {
        this.myApiService.getUser(remetenteId).subscribe((remetente) => {
          if (remetente && remetente.account) {
            remetente.account.balance -= valor;
            destinatario.account.balance += valor;

            // Adicionando historico do remetente
            if (!remetente.history) {
              remetente.history = [];
            }

            remetente.history.push(historicoSaida);


            // Atualizar as informações na API
            this.myApiService.put(remetenteId, remetente).subscribe({
              next: (res) => {
                observer.next(res);
                observer.complete();
              },
              error: (error) => {
                console.error('Erro ao atualizar o remetente:', error);
                observer.error(error);
              }
            });
          } else {
            observer.error('Erro ao obter os dados do remetente.');
          }
        });

        this.myApiService.getUser(destinatarioId).subscribe((destinatario) =>{

          destinatario.account.balance += valor;

          if (!destinatario.history) {
            destinatario.history = [];
          }
          // Adicionando historico do destinatario(recebimento)
          destinatario.history.push(historicoEntrada);
          this.myApiService.put(destinatarioId, destinatario).subscribe({
            next: (res) => {
              observer.next(res);
              observer.complete();
            },
            error: (error) => {
              console.error('Erro ao atualizar o remetente:', error);
              observer.error(error);
            }
          });
        })
      } else {
        observer.error('Remetente ou destinatário não possui uma conta válida ou o valor de transferência não é um número válido.');
      }
    });
  }
}
