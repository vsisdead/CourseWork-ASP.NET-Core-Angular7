import { UserDetail } from './../../shared/user-detail.model';
import { UserDetailService } from './../../shared/user-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail-list',
  templateUrl: './user-detail-list.component.html',
  styles: []
})
export class UserDetailListComponent implements OnInit {
  userRole;
  isReadonly: boolean;
  isGuest: boolean;
  searchText;

  constructor(private service: UserDetailService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
    this.userRole = localStorage.getItem('Role');
    switch(this.userRole){
      case "0":
        this.isReadonly = false;
        this.isGuest = false;
        break;
      case "1": 
        this.isReadonly = true;
        this.isGuest = false;
        break;
      case "2":
        this.isReadonly = true;
        this.isGuest = false;
        break;
      case "3":
        this.isReadonly = true;
        this.isGuest = false;
        break;
      case "4":
        this.isReadonly = true;
        this.isGuest = true;
        break;
    }
  }

  populateForm(ud: UserDetail) {
    this.service.formData = Object.assign({}, ud);
  }
  roleForm(value) {
    debugger;
    if (value == "5"){
      this.service.refreshList();
    }
    else {
    this.service.getUserRoles(value);
    }
  }
  fullnameForm(value){
    
    debugger;
  }

  onDelete(UId) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteUserDetail(UId)
        .subscribe(res => {
          this.service.refreshList();
          this.toastr.warning('Deleted successfully', 'User Detail Register');
        },
          err => {
            console.log(err);
          })
    }
  }
}
