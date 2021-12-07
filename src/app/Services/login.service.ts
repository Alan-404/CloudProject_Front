import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import {account} from '../Interfaces/Account'
import {Response} from '../Interfaces/Response';
import { apiurl } from 'src/common/Constants';

const httpOptions = {
  header: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private request: HttpClient) { }

  loginAccount(info: account):Observable<Response>{
    return this.request.post<Response>(`${apiurl}/user/login`, JSON.stringify(info));
  }
}
