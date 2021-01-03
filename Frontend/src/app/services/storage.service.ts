import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getAuthToken(): string {
    return localStorage.getItem('auth');
  }
  removeAuthToken(): void {
    localStorage.removeItem('auth');
  }
  setAuthToken(token: string): void {
    localStorage.setItem('auth', token);
  }
}
