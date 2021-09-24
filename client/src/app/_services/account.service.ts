import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  baseUrl='https://localhost:44335/api';

  private currentUserSource=new ReplaySubject<User|null>(1);
  currentUser$=this.currentUserSource.asObservable();


  constructor(private http: HttpClient){}

  
  login(model: any) {
    return this.http.post<User>(this.baseUrl + '/Account/Login', model).pipe
    (
      map((response : User) => {

       const users = response;

        if (users) {
          localStorage.setItem('user', JSON.stringify(users));
          this .currentUserSource.next(users);
        }
      }
      )
      
    )
  }

register(model:any){

  return this.http.post<User>(this.baseUrl + '/Account/Register', model).pipe
  (
    map((response : User) => {

     const users = response;

      if (users) {
        localStorage.setItem('user', JSON.stringify(users));
        this .currentUserSource.next(users);
      }
      return users;
    }
    )
    
  )

}

  setCurrentUser(users: User) {
    this.currentUserSource.next(users);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }



}
