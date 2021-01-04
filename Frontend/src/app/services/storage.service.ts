import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  static getAuthToken(): string {
    return localStorage.getItem('auth');
  }
  static removeAuthToken(): void {
    localStorage.removeItem('auth');
  }
  static setAuthToken(token: string): void {
    localStorage.setItem('auth', token);
  }
}
