import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/Interfaces/Subject';
import { SubjectService } from 'src/app/Services/subject.service';
@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {

  constructor(private actived: ActivatedRoute, private subjectService: SubjectService) { }

  showSpinner: boolean = true;

  subject: Subject= {name: '', id: ''}

  message: string = '';

  allSubjects: any = []

  ngOnInit(): void {
    this.actived.queryParams.subscribe(param => {
      this.subjectService.getAllSubject().subscribe(response => {
        this.allSubjects = response;
        for (let i =0;i<this.allSubjects.length; ++i){
          if (this.allSubjects[i].id == param.id)
            this.subject = this.allSubjects[i]
        }
        this.showSpinner = false;
      })
    })
  }

  getInfor(event: any){
    this.subject.name = event.target.value;
  }

  rep: any = {id: ''}
  editSubject(){
    this.showSpinner = true;
    this.subjectService.editSubject(this.subject).subscribe(response => {
      this.showSpinner = false;
      this.rep = response;
      if (this.rep.id)
        this.message = "Edit Subject Successfully"
      else 
        this.message = "Edit Subject Failed"

      setTimeout(() => {
        this.message = ''
      }, 3000)
    })
  }
}
