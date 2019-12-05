import { Component, OnInit, Directive } from '@angular/core';
import { UserDetailService } from 'src/app/shared/user-detail.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})

export class UserDetailComponent implements OnInit {
userRole;
isReadonly: boolean;
isCoach: boolean;
isMedic: boolean;
isGuest: boolean;

  constructor(private service: UserDetailService,
              private toastr: ToastrService,
              private router: Router) {  }
    
  
  ngOnInit() {
    this.resetForm();
    this.userRole = localStorage.getItem('Role');
    switch(this.userRole){
      case "0":
        this.isReadonly = false;
        this.isMedic = false;
        this.isCoach = false;
        this.isGuest = false;
        break;
      case "1": 
        this.isReadonly = true;
        this.isCoach = true;
        this.isMedic = true;
        this.isGuest = false;
        break;
      case "2":
        this.isReadonly = true;
        this.isCoach = false;
        this.isMedic = true;
        this.isGuest = false;
        break;
      case "3":
        this.isReadonly = true;
        this.isCoach = true;
        this.isMedic = false;
        this.isGuest = false;
        break;
      case "4":
        this.isReadonly = true;
        this.isCoach = true;
        this.isMedic = true;
        this.isGuest = true;
        break;
    }
    if (this.userRole == null) {
      this.router.navigate(['/user/login']);
    }
  }
  
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      UId: null,
      ULogin: '',
      PasswordHash: '',
      PasswordSalt: '',
      URole: null,
      UFullname: '',
      UBdate: '',
      ULastmed: '',
      ULasttran: '',
      UImg: ''
    }
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.UId == null)
      this.toastr.info('You cannot create a new user', 'User Detail Register');
      else
      this.updateRecord(form);
  }

  updateRecord(form: NgForm) {
      this.service.updateAdminsDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'User Detail Register');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
