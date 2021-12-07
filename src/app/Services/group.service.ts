import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Group } from '../Interfaces/Group';
import { apiurl } from 'src/common/Constants';

const httpOptions = {
  header: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private request: HttpClient) { }

  //get all groups
  getAllGroups():Observable<{}>{
    return this.request.get<{}>(`${apiurl}/group`);
  }

  //add group
  addGroup(group: Group):Observable<{}>{
    return this.request.post<{}>(`${apiurl}/group`, group)
  }

  //get all information ny group id
  getInfor():Observable<{}>{
    return this.request.get<{}>(`${apiurl}/listteachergroups`)
  }
}
