import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { UserStoreService } from '../helpers/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl:string="https://8080-fadbadfaddcabbbeddcbfaafaaacccecffb.premiumproject.examly.io/api";

  constructor(private http:HttpClient,private userStore:UserStoreService) { }

  register(user:User):Observable<any>{
    return this.http.post<User>(this.apiUrl+"/register",user);
  }

  login(login:Login):Observable<any>{
    return this.http.post<Login>(this.apiUrl+"/login",login);
  }
  
  logout():void{
    this.userStore.setUser(null);
    }
}
