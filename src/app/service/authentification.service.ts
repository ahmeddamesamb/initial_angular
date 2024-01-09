import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { IAuthentification } from '../model/authentification';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token') || '{}'));
  user$ = this.userSubject.asObservable();

  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http: HttpClient, private router: Router) {
    // You might want to initialize the user when the service is created
    this.initUser();
  }

  private initUser(): void {
    const storedUser = JSON.parse(localStorage.getItem('token') || '{}');
    this.userSubject.next(storedUser);
  }

  login(user: IAuthentification): void {
    console.warn('connexion', user);

    this.http.post<any>(`${environment.url}/authenticate`, user)
      .pipe(
        catchError((error) => {
          console.error('Login failed', error);
          // Handle the error appropriately (e.g., show a message to the user)
          throw error; // Propagate the error further if needed
        })
      )
      .subscribe(
        (data) => {
          console.warn(data.status);

          // Store the token in local storage
          localStorage.setItem('token', data.token);
          // Update the user subject with the received user data
          this.userSubject.next(data.user);
          console.warn(this.userSubject.value); // Log the current user value
          // Navigate to the home page
          this.router.navigateByUrl('/home');
        }
      );}
  logout(): void {
    console.log('deconnexion');
    // Clear the token in local storage
    localStorage.removeItem('token');
    // Update the user subject with a null value
    this.userSubject.next(null);
    // Navigate to the login page or any appropriate route
    this.router.navigateByUrl('/login');
  }
}
