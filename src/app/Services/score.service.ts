import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Score } from '../Interfaces/Score';
import { apiurl } from 'src/common/Constants';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private request: HttpClient) { }

  addScore(score: Score):Observable<any>{
    return this.request.post<any>(`${apiurl}/score`, score)
  }

  getAllScores():Observable<any>{
    return this.request.get<any>(`${apiurl}/score`);
  }

  updateScore(score: Score):Observable<any>{
    return this.request.put<any>(`${apiurl}/score`, score)
  }

  deleteScore(id: string):Observable<any>{
    return this.request.delete<any>(`${apiurl}/score/${id}`)
  }

}
