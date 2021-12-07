import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SubjectService } from 'src/app/Services/subject.service';
import { TeacherService } from 'src/app/Services/teacher.service';
import { Group } from 'src/app/Interfaces/Group';
import { GroupService } from 'src/app/Services/group.service';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  constructor(private subjectService: SubjectService, private teacherService: TeacherService, private groupService: GroupService, private studentService: StudentService) { }

  public Editor = ClassicEditor;
  showSpinner = false
  file: string = '';
  fileName: string = '';
  image: any;
  urlImage:any;

  inforPage: any = []

  listTeachers: any = []

  arrLessions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  group: Group = {subjectId: '', teacherId: '', studentId: '', lession: 0}

  allStudents: any = []

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe(response => {
      this.inforPage = response
    })

    this.teacherService.getAllTeachers().subscribe(response => {
      this.listTeachers = response;
    })
    
    this.studentService.getAllStudents().subscribe(response => {
      this.allStudents = response;
    })
  }
  


  getIdStudent: string = '';

  getInfor(event:any){
    this.getIdStudent = event.target.value
  }

  getInforOfOption(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "subject")
      this.group.subjectId = value;
    else if (name == "teacher")
      this.group.teacherId = value;
    else if (name == "lession")
      this.group.lession = value;
  }


  async addGroup(){
    this.showSpinner = true
    const arr = this.getIdStudent.split(',')
    for (let item of arr){
      this.group.studentId = item.trim();
      await this.groupService.addGroup(this.group).subscribe(response => {
        this.showSpinner = false;
        console.log(response)
      })
    }
  }
  
}
