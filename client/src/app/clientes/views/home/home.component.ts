import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userAuth!: string;

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(){
    this.userAuth = this.userService.getUserName() as string;

    this.linkVisible();
  }
 
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    location.reload();
  }

  linkVisible(){
    return this.userService.getAdmin();
  }
  
}
