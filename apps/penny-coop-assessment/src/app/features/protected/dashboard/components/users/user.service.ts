import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../../core/types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/users/all`);
  }
}
