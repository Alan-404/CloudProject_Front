import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/Services/subject.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.css']
})
export class ListSubjectsComponent implements OnInit {

  constructor(private subjectService: SubjectService, private router: Router) { }

  infoResponse: any = []

  showSpinner = false;

  ngOnInit(): void {
    this.showSpinner = true;
    this.subjectService.getAllSubject().subscribe(response => {
      this.infoResponse = response;
      console.log(response)
      this.showSpinner = false;
    })
  }

  async deleteSubject(id: string){
    this.showSpinner = true;
    await this.subjectService.removeSubject(id).subscribe(async (response) => {
      console.log(response)
      await this.subjectService.getAllSubject().subscribe(response => {
        this.infoResponse = response;
        this.showSpinner = false;
      })
      
    })
  }


  goToEditPage(id: string){
    this.router.navigate(['home/admin/edit-subject'], {queryParams: {id}})
  }


}
