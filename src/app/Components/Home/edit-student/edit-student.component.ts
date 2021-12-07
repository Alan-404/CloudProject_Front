import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/Services/student.service';
import { Student } from 'src/app/Interfaces/Student';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UserService } from 'src/app/Services/user.service';
import { config } from 'src/common/Constants';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {


  constructor(private activedRoute: ActivatedRoute, private studentService: StudentService, private userService: UserService) { }

  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config);

  imageShow: any

  studentId: string = '';

  changeImage = 0;

  showSpinner = true;

  message: string = ''

  inforPage: any = {firstName: '', middleName: '', lastName: '', id: '', phone: '', address: '', gmail: '', bDate: ''}


  student: Student = {firstName: '', middleName: '', lastName: '', phone: '', address: '', gmail: '', bDate: '', userId: ''}

  inforUser: any = {avatar: '', username: ''}
  ngOnInit(): void {
    this.activedRoute.queryParams.subscribe(params => {
      this.studentId = params.id;
      this.studentService.getStudentById(this.studentId).subscribe(response => {
        this.inforPage = response;
        console.log(response)
        this.student.userId = this.inforPage.userId;
        this.student.firstName = this.inforPage.firstName
        this.student.middleName = this.inforPage.middleName
        this.student.lastName = this.inforPage.lastName;
        this.student.phone = this.inforPage.phone;
        this.student.address = this.inforPage.address;
        this.student.gmail = this.inforPage.gmail;
        this.student.bDate = this.inforPage.bDate;
        this.userService.getUserById(this.inforPage.userId).subscribe(response => {
          console.log(response)
          this.inforUser = response;
          this.imageShow = this.inforUser.avatar;
          console.log(this.imageShow)
          this.showSpinner = false;
        })
      })
    })


  }

  file: any;
  uploadImage(event: any){
    this.changeImage++;
    this.file = event.target.files[0]
    console.log(this.file.type)
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imageShow = reader.result;
    }
  }


  getInfor(event: any){
    const name = event.target.name;
    const value = event.target.value;
    if (name == "firstName")
      this.student.firstName = value;
    else if (name == "middleName")
      this.student.middleName = value;
    else if (name == "lastName")
      this.student.lastName = value;
    else if (name == "phone")
      this.student.phone = value;
    else if (name == "gmail")
      this.student.gmail = value;
    else if (name == "address")
      this.student.address = value;

  }

  inforResponse: any = {id: ''}
  async editStudent(){
    this.showSpinner = true;
    this.student.id = this.inforPage.id;
    await this.studentService.editStudent(this.student).subscribe(async (response) => {
      this.inforResponse = response;
      if (this.inforResponse.id){
        if (this.changeImage!=0)
        {
          await this.S3CustomClient.uploadFile(this.file, this.file.type, undefined, this.inforUser.username, "public-read")
            .then(data => console.log(data))
            .catch(data => console.log(data))
        }
        console.log("ok")
        this.showSpinner = false;
        this.message = "Edit Student Successfully"
      }
      else 
      {
        this.showSpinner = false
        this.message = 'Edit Student Failed'
      }

      setTimeout(() => {
        this.message = ''
      }, 2000)
    })
  }

}
