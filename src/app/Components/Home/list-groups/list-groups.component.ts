
import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/Services/group.service';
@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.css']
})
export class ListGroupsComponent implements OnInit {

  constructor(private groupService: GroupService) { }
  showSpinner= true;

  allGroups: any = []

  info: any

  show: any = []

  ngOnInit(): void {
    /* this.groupService.getAllGroups().subscribe(response => {
      this.showSpinner =false
      this.allGroups = response
    }) */

    this.groupService.getInfor().subscribe(respone => {
      this.info = respone
      this.showSpinner = false
      for (let group of this.info){
        if (group.listSubject.length!=0){
          this.show.push(group);
        }
      }

      console.log(this.show)
    })
  }

}
