import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/Services/subject.service';
import { StudentService } from 'src/app/Services/student.service';
import { Exam } from 'src/app/Interfaces/Exam';
import { ExamService } from 'src/app/Services/exam.service';
@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {

  constructor(private subjectService: SubjectService, private studentService: StudentService, private examService: ExamService) { }

  allSubjects: any

  allStudents :any
  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe(response => {
      this.allSubjects = response
    })

    this.studentService.getAllStudents().subscribe(response => {
      this.allStudents = response
    })
  }

  exam: Exam = {subjectId: '', studentId: '', room: ''}
  idStudents: string = ''

  getSubject(event: any){
    this.exam.subjectId = event.target.value;
  }

  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "room")
      this.exam.room = value;
    else if (name == "student")
      this.idStudents = value;
  }


  async addExam(){
    const arr = this.idStudents.split(',');
    for (let item of arr){
      this.exam.studentId = item.trim();
      await this.examService.addExam(this.exam).subscribe(response => {
        console.log(response)
      })
    }
  }

}
