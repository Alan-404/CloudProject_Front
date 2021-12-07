import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { User } from '../Interfaces/User';
import { apiurl } from 'src/common/Constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('learn')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  
  constructor(private request: HttpClient) { }

  //get user
  getUser():Observable<{}>{
    return this.request.get<{}>(`${apiurl}/user`);
  }

  //add user
  addUser(user: User):Observable<{}>{
    return this.request.post<{}>(`${apiurl}/user`, user);
  }


  //get user by id
  getUserById(id: string):Observable<{}>{
    return this.request.get<{}>(`${apiurl}/user/${id}`);
  }

  //get user by token
  getUserByToken():Observable<{}>{
    return this.request.get<{}>(`https://0hay6wqqw6.execute-api.us-east-1.amazonaws.com/dev/user/token`, httpOptions)
  }

  //update
  updateUser(user: User):Observable<{}>{
    return this.request.put<{}>(`${apiurl}/user`, user)
  }
}
