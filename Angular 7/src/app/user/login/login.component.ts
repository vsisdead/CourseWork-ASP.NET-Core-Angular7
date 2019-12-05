import { ToastrService } from 'ngx-toastr';
import { UserDetailService } from './../../shared/user-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: UserDetailService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const body: any = { 
      Login: form.value.UserName,
      Password: form.value.Password
    }
    this.service.login(body).subscribe((res: any) => {
        localStorage.setItem('Role', res.role)
        localStorage.setItem('Fullname',res.fullname);
        console.log(res.role, res.fullname);
        this.router.navigateByUrl('/home');
      },
      err => {
        if (err.status == 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          console.log(err);
      }
    );
  }
}
