import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/Services/group.service';
import { ScoreService } from 'src/app/Services/score.service';
import { Score } from 'src/app/Interfaces/Score';
@Component({
  selector: 'app-show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.css']
})
export class ShowScoreComponent implements OnInit {

  constructor(private groupService: GroupService, private scoreService: ScoreService) { }

  allStudents: any

  score: any

  showProcess = true

  loadScore(){
    this.groupService.getGroups().subscribe(response => {
      this.allStudents = response
      if (response.length > 0){
        this.scoreService.getAllScores().subscribe(rep => {
          for (let student of this.allStudents){
            for (let score of rep){
              if (student.student.id == score.studentId){
                for (let subject of student.listSubject){
                  if (score.subjectId == subject.id)
                  {
                    subject.score = score.score
                    subject.scoreId = score.id
                  }
                }
              }
            }
          }
          this.showProcess = false;
        })
      }
    })
  }
  ngOnInit(): void {
    this.loadScore()
  }

  


  getScore(event: any){
    this.score = event.target.value;
  }

  requestScore: Score = {studentId: '', subjectId: '', score:''}
  addScore(studentId: string, subjectId: string){
    this.requestScore.studentId = studentId;
    this.requestScore.subjectId = subjectId;
    this.requestScore.score = this.score
    this.scoreService.addScore(this.requestScore).subscribe(response => {
      this.loadScore();
      this.score = ''
    })
  }

  updateScoreRequest: Score = {id: '',studentId: '', subjectId: '', score:''}
  updateScore(studentId: string, subjectId: string, scoreId: string){
    this.updateScoreRequest.studentId = studentId;
    this.updateScoreRequest.subjectId = subjectId;
    this.updateScoreRequest.score = this.score
    this.updateScoreRequest.id = scoreId
    this.scoreService.updateScore(this.updateScoreRequest).subscribe(rep => {
      this.loadScore();
      this.score = ''
    })
  }


  deleteScore(id: string){
    this.scoreService.deleteScore(id).subscribe(respone => {
      this.loadScore();
    })
  }

}
