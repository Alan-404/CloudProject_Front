import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  inforPage: any = {firstName: '', middleName: '', lastName: '', id: ''}

  ngOnInit(): void {
    this.accountService.getStudentByToken().subscribe(response => {
      this.inforPage = response;
    })
  }
}
