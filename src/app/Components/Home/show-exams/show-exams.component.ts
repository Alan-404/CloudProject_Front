import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/Services/exam.service';
@Component({
  selector: 'app-show-exams',
  templateUrl: './show-exams.component.html',
  styleUrls: ['./show-exams.component.css']
})
export class ShowExamsComponent implements OnInit {

  constructor(private examService: ExamService) { }

  exams: any = []
  temp: any = []
  count = 0
  countTemp = 0

  infor : any = []
  rooms: any = []

  showProcess = true;
  ngOnInit(): void {
    this.examService.getAllExams().subscribe(response => {
      response.push({room:"s"})
      this.infor = response
      
      for (var i = 0; i<this.infor.length-1; ++i){
        this.temp.push(this.infor[i]);
        if (this.infor[i].room != this.infor[i+1].room){
          this.rooms.push(this.infor[i].room)
          this.exams.push(this.temp)
          this.temp = []
        }
          
      }
      this.showProcess = false
    })
  }

}
