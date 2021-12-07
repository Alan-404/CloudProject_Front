import { Component, OnInit } from '@angular/core';
import {account} from '../../../Interfaces/Account';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService) { }

  info: account = {username: '', password: ''}
  targetName: String = '';

  onKey(event: any){
    this.targetName = event.target.name;
    if (this.targetName == "username")
      this.info.username = event.target.value;
    else 
      this.info.password = event.target.value;
  }

  ngOnInit(): void {
  }

  register() {
    this.registerService.registerAccount(this.info).subscribe(data => console.log(data));
  }

}
