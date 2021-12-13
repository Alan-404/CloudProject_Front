import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';
import { ExamService } from 'src/app/Services/exam.service';
@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  constructor(private studentService: StudentService, private  examService: ExamService) { }

  exams:any = []

  showSpinner = true;
  
  allExams: any
  ngOnInit(): void {
    this.studentService.getStudentByToken().subscribe(response => {
      this.examService.getAllExams().subscribe(rep => {
        this.allExams = rep;
        for (let exam of this.allExams){
          if (exam.studentId == response.id){
            this.exams.push(exam)
          }
        }
        this.showSpinner = false
      })
    })
  }

}
