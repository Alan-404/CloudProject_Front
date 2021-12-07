import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  showAdmin= true
  rep: any = {}
  ngOnInit(): void {
    if (!localStorage.getItem('learn'))
      this.router.navigate(['auth/login']);
    else 
      this.router.navigate(['home/dashboard'])
    this.userService.getUserByToken().subscribe(response => {
      this.rep = response;
      if (this.rep.username){
        this.showAdmin = false;
      }
    })
    
  }

  tempTag: any;

  changeColor(event: any){
    (this.tempTag.target as HTMLInputElement).classList.remove('choose');
    this.tempTag = event;
    (event.target as HTMLInputElement).classList.add('choose');
  }

}
