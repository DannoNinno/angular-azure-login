import { Injectable } from '@angular/core';
import { msalInstance } from './msal.config';
import { AuthenticationResult } from '@azure/msal-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$: Observable<any> = this.userProfileSubject$.asObservable();

  private accessTokenSubject$ = new BehaviorSubject<string>('');
  accessToken$ = this.accessTokenSubject$.asObservable();

  private samPerfilSubject$ = new BehaviorSubject<any>(null);
  samPerfil$: Observable<any> = this.samPerfilSubject$.asObservable();

  login() {
    msalInstance.loginRedirect({
      scopes: ['openid', 'profile', 'email'], // Asegúrate de que los scopes coincidan
      redirectUri: 'http://localhost:4200/', // Asegúrate de que esta URL coincida con la configuración de tu aplicación
    });
  }
  logout() {
    msalInstance.logoutRedirect();
  }

  isLoggedIn(): boolean {
    return msalInstance.getAllAccounts().length > 0;
  }
  async getToken(): Promise<string> {
    const account = msalInstance.getAllAccounts()[0];
    if (account) {
      const result: AuthenticationResult = await msalInstance.acquireTokenSilent({
        scopes: ['user.read'],
        account: account,
      });
      return result.accessToken;
    }
    throw new Error('No account found');
  }
}
