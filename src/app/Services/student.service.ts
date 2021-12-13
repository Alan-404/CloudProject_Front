import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs'
import { Student } from '../Interfaces/Student';
import { apiurl } from 'src/common/Constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('learn')}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private request: HttpClient) {

  }
  
  //get all students
  getAllStudents():Observable<{}>{
    return this.request.get<{}>(`${apiurl}/student`);
  }

  //add student
  addStudent(student: Student):Observable<{}>{
    return this.request.post<{}>(`${apiurl}/student`,student);
  }


  //modify student
  editStudent(student: Student):Observable<{}>{
    return this.request.put<{}>(`${apiurl}/student`, student)
  }


  //get student by id
  getStudentById(id: string):Observable<{}>{
    return this.request.get<{}>(`${apiurl}/student/${id}`);
  }


  //delete student by id
  deleteStudent(id: string):Observable<any>{
    return this.request.delete<any>(`${apiurl}/student/${id}`);
  }

  //get student by token
  getStudentByToken():Observable<any>{
    return this.request.get<any>(`https://0hay6wqqw6.execute-api.us-east-1.amazonaws.com/dev/student/token`, httpOptions)
  }

  
}
