import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailService } from '../shared/user-detail.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styles: []
})
export class AdminPanelComponent implements OnInit {
  userDetails;
  userRole: any;
  userFullname: any;
  isAdmin: boolean;
  isPlayer: boolean;
  isCoach: boolean;
  isMedic: boolean;
  isGuest: boolean;
  isReadonly: boolean;

  constructor(private router: Router, private service: UserDetailService) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('Role');
    this.userFullname = localStorage.getItem('Fullname');

    if (this.userRole == null) {
      this.router.navigate(['/user/login']);
    }
  }

  onLogout() {
    localStorage.removeItem('Role')
    this.router.navigate(['/user/login']);
  }
}
