
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  constructor(private studentService: StudentService, private router: Router) { }

  class: string = "";

  showProcess = true;
  showSpinner = false;

  allStudents: any = []

  message: string = ''

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(response => {
      this.allStudents = response
      this.showProcess = false;
    })
  }


  checkRemove: any


  getClass (event: any){
    this.class = event.target.value;
  }

  async deleteStudent(id: string){
    this.showProcess = true;
    await this.studentService.deleteStudent(id).subscribe(async (response) => {
      await this.studentService.getAllStudents().subscribe(async (response) => {
        this.allStudents = response
        this.showProcess = false;
      })

    })

  }


  editStudent(id: string){
    this.router.navigate(['home/admin/edit-student'], {queryParams: {id}})
  }

}
