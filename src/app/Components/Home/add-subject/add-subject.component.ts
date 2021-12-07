import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/Interfaces/Subject';
import { SubjectService } from 'src/app/Services/subject.service';
import { config } from 'src/common/Constants';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }

  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(config)


  showProcess = false;
  message = '';

  ngOnInit(): void {
  }

  subject: Subject = {name: ''}


  getInfor(event: any){
    this.subject.name = event.target.value
  }

  response: any = {}
  addSubject(){
    this.showProcess = true;
    this.subjectService.addSubject(this.subject).subscribe(response => {
      this.showProcess = false
      console.log(response)
      this.response = response;
      if (this.response.id){
        this.message = "Thêm môn học thành công"
        setTimeout(() => {
          this.message = '';
        }, 3000)
      }
    }, error => {
      this.showProcess = false
      this.message = "Thêm môn học không thành công";
      setTimeout(() => {
        this.message = ''
      }, 3000)
      console.log(error)
    })
  }

}
