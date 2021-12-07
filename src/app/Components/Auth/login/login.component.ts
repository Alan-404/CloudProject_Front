import { Component, OnInit } from '@angular/core';
import {account} from '../../../Interfaces/Account'
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService) { }

  info: account = {username: '', password: ''}
  targetName: String = '';

  auth:any = {success: false, token: String}

  showSpinner = false;
  message= ''

  onKey(event: any){

    this.targetName = event.target.name;
    if (this.targetName == "username")
      this.info.username = event.target.value;
    else
      this.info.password = event.target.value;
  }

  checkRadioBox(event: any){
    //this.info.role = event.target.value;
  }

  login(){
    this.showSpinner = true
    this.loginService.loginAccount(this.info).subscribe(response => {
      this.auth = response;
      if (this.auth.token)
      {
        this.showSpinner = false;
        localStorage.setItem('learn', this.auth.token);
        this.router.navigate(['home/dashboard']).then(() => {
          window.location.reload();
        });
      }
        
    },error => {console.log(error)});
  }

  ngOnInit(): void {
  }

}
