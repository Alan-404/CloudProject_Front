import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/Services/student.service';
import { GroupService } from 'src/app/Services/group.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private router: Router, private studentService: StudentService, private groupService: GroupService) { }

  showProcess = true
  studentShow: any
  ngOnInit(): void {
    this.studentService.getStudentByToken().subscribe(response => {
      if (response.id){
        this.groupService.getGroups().subscribe(rep => {
          for (let obj of rep){
            if (response.id == obj.student.id){
              this.studentShow = obj.listSubject;
              this.showProcess = false
            }
          }
        })
      }
      
    })

  }


  goCoursePage(){
    this.router.navigate(['home/course'])
  }

}
