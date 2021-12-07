import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { StudentService } from 'src/app/Services/student.service';
@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor(private accoutService: AccountService, private router: Router, private userService: UserService, private studentService: StudentService) { }


  date: string = '';

  strDate= []

  showSpinner = true;

  infor: any = {};

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(response => {
      this.showSpinner = false;
      this.infor = response;
      console.log(this.infor)
    })
  }

  goToEditProfile(){
    this.router.navigate(['home/edit_profile']);
  }

}
