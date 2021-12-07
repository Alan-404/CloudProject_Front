import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/Services/teacher.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.css']
})
export class ListTeachersComponent implements OnInit {

  constructor(private teacherService: TeacherService, private router: Router) { }

  inforListTeachers: any = [];

  showProcess = true;

  showSpinner = false;

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(response => {
      this.inforListTeachers = response;
      this.showProcess = false;
    })
  }


  deleteTeacher(id: string){
    this.showProcess = true;
    this.teacherService.deleteTeacher(id).subscribe(response => {
      this.teacherService.getAllTeachers().subscribe(response => {
        this.inforListTeachers = response;
        this.showProcess = false;
      })
    })
  }

  editTeacher(id: string){
    this.router.navigate(['home/admin/edit-teacher'], {queryParams: {id}})
  }

}
