import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {account} from '../Interfaces/Account';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private request: HttpClient) { }

  registerAccount(info: account):Observable<account>{
    return this.request.post<account>('http://localhost:5000/account/register', info);
  }
}
