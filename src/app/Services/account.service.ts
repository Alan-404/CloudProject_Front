import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('learn')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }


  getStudentByToken():Observable<{}>{
    return this.http.get<{}>(``, httpOptions);
  }
}
