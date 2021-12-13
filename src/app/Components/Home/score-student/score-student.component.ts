import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/Services/group.service';
import { ScoreService } from 'src/app/Services/score.service';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-score-student',
  templateUrl: './score-student.component.html',
  styleUrls: ['./score-student.component.css']
})
export class ScoreStudentComponent implements OnInit {

  constructor(private groupService: GroupService, private scoreService :ScoreService, private studentService: StudentService) { }



  studentShow: any

  allScore = 0
  average = 0
  count = 0;

  showProcess = true
  getScore(){
    this.studentService.getStudentByToken().subscribe(response => {
      this.groupService.getGroups().subscribe(rep => {
        this.scoreService.getAllScores().subscribe(res => {
          for (let student of rep){
            if (student.student.id == response.id){
              this.studentShow = student;
              for (let score of res){
                for (let subject of this.studentShow.listSubject){
                  if (score.subjectId == subject.id && score.studentId == student.student.id){
                    this.allScore += score.score;
                    this.count++;
                    subject.score = score.score
                  }
                }
              }
              this.average = this.allScore/this.count
              this.showProcess = false
              break;
            }
          }
        })
        
      })
    })
  }
  ngOnInit(): void {
    this.getScore()
  }

  


}
