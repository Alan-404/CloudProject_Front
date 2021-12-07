import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Teacher } from '../Interfaces/Teacher';
import { apiurl } from 'src/common/Constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('learn')}`
  })
}
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private request: HttpClient) { }



  //get all teachers
  getAllTeachers():Observable<{}>{
    return this.request.get<{}>(`${apiurl}/teacher`)
  }

  //add teacher
  addTeacher(teacher: Teacher):Observable<{}>{
    return this.request.post<{}>(`${apiurl}/teacher`, teacher);
  }

  //modify teacher
  editTeacher(teacher: Teacher):Observable<{}>{
    return this.request.put<{}>(`${apiurl}/teacher`, teacher);
  }

  //get teacher by id
  getTeacherById(id: string): Observable<{}>{
    return this.request.get<{}>(`${apiurl}/teacher/${id}`)
  }

  //delete teacher by id
  deleteTeacher(id: string):Observable<{}>{
    return this.request.delete<{}>(`${apiurl}/teacher/${id}`)
  }

  //get teacher by token
  getTeacherByToken():Observable<{}>{
    return this.request.get<{}>(``, httpOptions)
  }
}
