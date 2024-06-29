import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN= 'JWT_TOKEN';
  loggedUSer: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private http = inject(HttpClient);

  constructor() { }

  login(user:{
    username: string, password: string
  }): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/api/token/', user)
    .pipe(
      tap((response: any)=>this.doLoginUser(user.username, response.access))
    )
  }

  doLoginUser(username: string, token: any){
    this.loggedUSer = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);

  }

  private storeJwtToken(jwt: string){
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout(){
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(){
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
}
