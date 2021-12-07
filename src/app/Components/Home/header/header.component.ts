import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: String = '';
  role: String = '';

  fullName = ''
  constructor(private userService: UserService, private router: Router) { }

  avatar: any = "https://haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE.png"

  rep: any = {}
  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(response => {
      console.log(response)
      this.rep = response;
      if (this.rep.username){
        this.avatar = "https://avatar-user-cloud-project.s3.amazonaws.com/" + this.rep.username
        this.fullName = this.rep.firstName + " " + this.rep.middleName + " " + this.rep.lastName + " (" + this.rep.username + ")"
      }
    })
  }

  logoutAccount(){
    localStorage.removeItem('learn');
    this.router.navigate(['auth/login']);
  }

}
