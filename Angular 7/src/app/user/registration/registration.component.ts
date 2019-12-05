import { UserDetailService } from './../../shared/user-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(
    public service: UserDetailService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  profileForm: FormGroup; 

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      Login: new FormControl('', Validators.required),
      Bday: new FormControl('', Validators.required),  
      Image: new FormControl(''), 
      FullName: new FormControl('', Validators.required),  
      Password:new FormControl('', Validators.required),  
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.toastr.error('Ошибка!', 'Форма заполнена не верно.');
      return;
    }

    this.service.register(this.profileForm.value).subscribe(
      (res: any) => {
        this.toastr.success('New user created!', 'Registration successful.');
        this.router.navigate(['/user/login']);
      },
      err => {
        console.log(err);
        this.toastr.error('Form is invalid', 'Registration error.');
      }
    );
  }
}
