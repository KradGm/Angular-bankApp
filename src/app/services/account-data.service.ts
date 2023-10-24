// account.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  private balanceSource = new BehaviorSubject<number>(0);
  balance$ = this.balanceSource.asObservable();

  setBalance(balance: number) {
    this.balanceSource.next(balance);
  }

  getBalance(): Observable<number> {
    return this.balance$;
  }
}
