import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/Interfaces/Student';
import { User } from 'src/app/Interfaces/User';
import { StudentService } from 'src/app/Services/student.service';
import { UserService } from 'src/app/Services/user.service';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import {config} from 'src/common/Constants'
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService: StudentService, private userService: UserService) { }




  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config);


  file: any = '';
  image: any;
  urlImage:any = "https://image.flaticon.com/icons/png/512/67/67902.png";


  showProcess = false;

  fakeDate: string = 'T14:05:15.953'

  date = new Date();
  
  user: User = {username: '', avatar: ''}

  student: Student = {firstName: '', middleName: '', lastName: '', bDate: '', address: '', phone: '', userId: '', gmail: ''}
  
  avatar: any = '';

  message: string = '';

  ngOnInit(): void {

  }

  getDate(event:any){
    this.student.bDate = event.target.value
  }

  getInfor(event: any){
    var name = event.target.name;
    var value = event.target.value;
    if (name == "fName")
      this.student.firstName = value;
    else if (name == "mName")
      this.student.middleName = value;
    else if (name == "lName")
      this.student.lastName = value;
    else if (name == "address")
      this.student.address = value;
    else if (name == "phone")
      this.student.phone = value;
    else if (name = "gmail")
      this.student.gmail = value
  }

  uintArray: any;

  upImage(event: any){
    this.file = event.target.files[0];

    this.image = this.file;

    console.log(this.file)


    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.urlImage = reader.result;
    }

  }


  rep: any = {username: ''}
  responseUser: any = {}
  async addStudent(){
      this.showProcess = true;
      await this.studentService.addStudent(this.student).subscribe(async (response) => {
        this.rep = response;
        if (this.file){
          await this.S3CustomClient.uploadFile(this.file, this.file.type, undefined, this.rep.username, "public-read")
            .then(data => {
              console.log(data);
              
              this.message = 'Add Student Successfully. Username: ' + this.rep.username;
            })
            .catch(data => {
              console.log(data)
              this.message = 'Add Student Failed.'
            })
            .finally(() => {
              this.showProcess = false
              setTimeout(() => {
                this.message = ''
              }, 5000)
            })
        }
      })
  }


  

  

}
