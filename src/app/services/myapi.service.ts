import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Account } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyapiService {
  private baseURL: string = environment.myApi;
  private postURL: string = environment.APIregister;

  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.postURL, user, { headers });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/users/${id}`);
  }

  update(record: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseURL}/${record.id}`, record);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/users/${id}`);
  }
  put(id: number, user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.baseURL}/users/${id}`, user, { headers });
  }

}
