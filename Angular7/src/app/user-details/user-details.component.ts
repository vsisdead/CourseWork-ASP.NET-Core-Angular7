import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: []
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;
  userRole: any;

  constructor(private router: Router) {
               }

  ngOnInit() {
    this.userRole = localStorage.getItem('Role');

    if (this.userRole == null) {
      this.router.navigate(['/user/login']);
    }
  }

  onLogout() {
    localStorage.removeItem('Role')
    this.router.navigate(['/user/login']);
  }
}
