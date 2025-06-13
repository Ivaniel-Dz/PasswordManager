import { Injectable } from '@angular/core';
import { Tarjeta } from '../interfaces/tarjeta';

const CARD_KEY = 'demo-tarjetas';
const DB_URL = '/data/database.json';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private initialized = false;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    if (!localStorage.getItem(CARD_KEY)) {
      const res = await fetch(DB_URL);
      const db = await res.json();
      localStorage.setItem(CARD_KEY, JSON.stringify(db.tarjetas));
    }
    this.initialized = true;
  }

  private getStoredTarjetas(): Tarjeta[] {
    return JSON.parse(localStorage.getItem(CARD_KEY) || '[]');
  }

  private saveTarjetas(tarjetas: Tarjeta[]): void {
    localStorage.setItem(CARD_KEY, JSON.stringify(tarjetas));
  }

  getAll(): Tarjeta[] {
    return this.getStoredTarjetas();
  }

  getById(id: number): Tarjeta | undefined {
    return this.getStoredTarjetas().find((t) => t.id === id);
  }

  add(tarjeta: Tarjeta): void {
    const tarjetas = this.getStoredTarjetas();
    tarjeta.id = Date.now();
    tarjetas.push(tarjeta);
    this.saveTarjetas(tarjetas);
  }

  update(tarjeta: Tarjeta): void {
    const tarjetas = this.getStoredTarjetas().map((t) =>
      t.id === tarjeta.id ? tarjeta : t
    );
    this.saveTarjetas(tarjetas);
  }

  delete(id: number): void {
    const tarjetas = this.getStoredTarjetas().filter((t) => t.id !== id);
    this.saveTarjetas(tarjetas);
  }
}
