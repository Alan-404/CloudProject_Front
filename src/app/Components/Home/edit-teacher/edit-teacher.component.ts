import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/Services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/Interfaces/Teacher';
import { UserService } from 'src/app/Services/user.service';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { config } from 'src/common/Constants';
@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css']
})
export class EditTeacherComponent implements OnInit {

  constructor(private teacherService: TeacherService, private activedRoute: ActivatedRoute, private userService: UserService) { }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config);
  changeImage = 0;

  showSpinner = false;
  responseTeacher: any = {id: '', firstName: '', middleName: '', lastName: '', gmail: '', address: '', phone: ''}

  message: string = '';

  teacher: Teacher = {id: '', firstName: '', middleName: '', lastName: '', gmail: '', address: '', phone: '', userId: ''}

  inforUser: any = {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.activedRoute.queryParams.subscribe(params => {
      this.teacherService.getTeacherById(params.id).subscribe(response => {
        console.log(response)
        this.responseTeacher = response;
        this.teacher.userId = this.responseTeacher.userId;
        this.teacher.id = this.responseTeacher.id;
        this.teacher.firstName = this.responseTeacher.firstName;
        this.teacher.middleName = this.responseTeacher.middleName;
        this.teacher.lastName = this.responseTeacher.lastName;
        this.teacher.gmail = this.responseTeacher.gmail;
        this.teacher.address = this.responseTeacher.address;
        this.teacher.phone = this.responseTeacher.phone;

        this.userService.getUserById(this.responseTeacher.userId).subscribe(response => {
          this.inforUser = response;
          this.showSpinner = false;
        })
        
      })
    })
  }


  file: any;
  upLoadImage(event: any){
    this.changeImage++;
    this.file = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.inforUser.avatar = reader.result;
    }
  }


  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "firstName")
      this.teacher.firstName = value;
    else if (name == "middleName")
      this.teacher.middleName = value;
    else if (name == "lastName")
      this.teacher.lastName = value;
    else if (name == "phone")
      this.teacher.phone = value;
    else if (name == "gmail")
      this.teacher.gmail = value;
    else if (name == "address")
      this.teacher.address = value;

  }

  rep: any = {id: ''}
  async editTeacher(){
    this.showSpinner = true;
    await this.teacherService.editTeacher(this.teacher).subscribe(async (response) => {
      if (this.changeImage!= 0){
        await this.S3CustomClient.uploadFile(this.file, this.file.type,undefined, this.inforUser.username, "public-read" )
      }
      this.showSpinner = false;
      this.rep = response;
      if (this.rep.id)
        this.message = "Edit Information of Teacher Successfully"
      else
        this.message = "Edit Information of Teacher Failed"
      setTimeout(() => {
        this.message = ''
      }, 2000)
    })
  }

}
