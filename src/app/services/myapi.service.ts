import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {
  private baseURL: string = ""
  private userInfo: User | any

  constructor(private http: HttpClient) {
    this.baseURL = environment.myApi;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL} ${id}`);
  }
}
