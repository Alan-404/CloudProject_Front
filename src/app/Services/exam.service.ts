import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { apiurl } from 'src/common/Constants';
import { Exam } from '../Interfaces/Exam';
@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private request: HttpClient) { }

  addExam(exam: Exam):Observable<any>{
    return this.request.post<any>(`${apiurl}/exam`, exam)
  }

  getAllExams():Observable<any>{
    return this.request.get<any>(`${apiurl}/exam`)
  }
}
