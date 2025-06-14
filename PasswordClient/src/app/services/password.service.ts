import { Injectable } from '@angular/core';
import { Password } from '../interfaces/password';

const PASSWORD_KEY = 'demo-password';
const DB_URL = '/data/database.json';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private initialized = false;

 async init(): Promise<void> {
    if (!localStorage.getItem(PASSWORD_KEY)) {
      const res = await fetch(DB_URL);
      const db = await res.json();
      localStorage.setItem(PASSWORD_KEY, JSON.stringify(db.passwords));
    }
    this.initialized = true;
  }

  private getStoredPasswords(): Password[] {
    return JSON.parse(localStorage.getItem(PASSWORD_KEY) || '[]');
  }

  private savePasswords(passwords: Password[]): void {
    localStorage.setItem(PASSWORD_KEY, JSON.stringify(passwords));
  }

  getAll(): Password[] {
    return this.getStoredPasswords();
  }

  getById(id: number): Password | undefined {
    return this.getStoredPasswords().find((p) => p.id === id);
  }

  add(password: Password): void {
    const passwords = this.getStoredPasswords();
    password.id = Date.now();
    passwords.push(password);
    this.savePasswords(passwords);
  }

  update(password: Password): void {
    const passwords = this.getStoredPasswords().map((p) =>
      p.id === password.id ? password : p
    );
    this.savePasswords(passwords);
  }

  delete(id: number): void {
    const passwords = this.getStoredPasswords().filter((p) => p.id !== id);
    this.savePasswords(passwords);
  }
}
