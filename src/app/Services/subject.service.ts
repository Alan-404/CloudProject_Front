import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Subject } from '../Interfaces/Subject';
import { apiurl } from 'src/common/Constants';

const httpOptions = {
  header: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private request: HttpClient) { }

  //get all subject
  getAllSubject():Observable<{}>{
    return this.request.get<{}>(`${apiurl}/subject`);
  }

  //add subject
  addSubject(subject: Subject):Observable<{}>{
    return this.request.post<{}>(`${apiurl}/subject`, subject);
  }

  //delete subject
  removeSubject(id: string):Observable<{}>{
    return this.request.delete(`${apiurl}/subject/${id}`)
  }

  //get subject by id
  getSubjectById(id: string):Observable<{}>{
    return this.request.get<{}>(`${apiurl}/subject/${id}`);
  }

  //edit subject
  editSubject(subject: Subject):Observable<{}>{
    return this.request.put<{}>(`${apiurl}/subject`, subject);
  }
}
