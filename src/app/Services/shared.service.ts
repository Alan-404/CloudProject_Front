import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { SharedData } from '../Interfaces/SharedData';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `Bearer ${localStorage.getItem('learn')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private request: HttpClient) { }

  

  

  getNameOfAccount():Observable<SharedData>{
    console.log(httpOptions.headers);
    return this.request.get<SharedData>('', httpOptions);
  }



}
