import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserService) { }
  showProcess = true
  response: any = []
  ngOnInit(): void {
    this.userService.getUser().subscribe(respones => {
      this.showProcess = false
      this.response = respones
    })
  }

}
