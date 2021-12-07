import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/Interfaces/Teacher';
import { User } from 'src/app/Interfaces/User';
import { UserService } from 'src/app/Services/user.service';
import { TeacherService } from 'src/app/Services/teacher.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import {config} from 'src/common/Constants'
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {

  constructor(private userService: UserService, private teacherService: TeacherService, private storage: AngularFireStorage) { }


  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config);

  file: any = '';
  fileName: string = '';
  image: any;
  urlImage:any = "https://i.pinimg.com/474x/a5/6a/ca/a56aca44fc75a03b54bce61db7d5ee55.jpg";


  showProcess = false;

  teacher: Teacher = {firstName: '', middleName: '', lastName: '', phone: '', address: '', status: 1, gmail: '', userId: ''}

  user: User = {username: '', avatar: ''}

  infoResponseUser: any = {id: ''}

  message: string = ''

  ngOnInit(): void {
  }


  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "fName")
      this.teacher.firstName = value;
    else if (name == "mName")
      this.teacher.middleName = value
    else if (name == "lName")
      this.teacher.lastName = value;
    else if (name == "address")
      this.teacher.address = value;
    else if (name == "gmail")
      this.teacher.gmail = value;
    else if (name == "phone")
      this.teacher.phone = value
  }


  responseUser: any = {}

  


  upImage(event: any){
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    this.image = this.file;

    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.urlImage = reader.result;
    }
  }

  async addTeacher(){
    this.showProcess = true;

    await this.teacherService.addTeacher(this.teacher).subscribe(async (response) => {
      this.infoResponseUser = response;
      this.showProcess = false;
      await this.S3CustomClient.uploadFile(this.file, this.file.type, undefined, this.infoResponseUser.username, "public-read")
        .then(data => {
          console.log(data)
          this.message = 'Add Teacher Successfully. Username: ' + this.infoResponseUser.username;
        })
        .catch(data => console.log(data))
    })

    
  }

}
