import { UserDetail } from './user-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  formData: UserDetail;
  readonly rootURL = 'http://localhost:52250/api';
  list : UserDetail[];

  constructor(private http: HttpClient) { }

  updateAdminsDetail() {
    return this.http.put(this.rootURL + '/AdminsDetails/'+ this.formData.UId, this.formData);
  }

  deleteUserDetail(id) {
    return this.http.delete(this.rootURL + '/AdminsDetails/'+ id);
  }

  refreshList(){ 
    this.http.get(this.rootURL + '/AdminsDetails')
    .toPromise()
    .then(res => this.list = res as UserDetail[]);;
  }
  getUserRoles(role) { 
    this.http.get(this.rootURL + '/AdminsDetails/GetUserByRole?=' + role)
    .toPromise()
    .then(res => this.list = res as UserDetail[]);
  }
  register(form) { 
    var body = {
      Login: form.Login,
      Bday: form.Bday,
      Image: form.Image,
      FullName: form.FullName,
      Password: form.Password
    };
    return this.http.post(this.rootURL + '/auth/register', body);
  }

  login(formData) {
    return this.http.post(this.rootURL + '/auth/login', formData);
  }
}
