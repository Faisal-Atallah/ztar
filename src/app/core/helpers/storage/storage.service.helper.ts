import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Save Data
   * @param {string}key
   * @param {any}value
   * @returns {void}
   * @public
   */
  public saveData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get Data
   * @param {string}key
   * @returns {string | null}
   * @public
   */
  public getData(key: string): string | null {
    return JSON.parse(localStorage.getItem(key)!);
  }

  /**
   * Remove Data
   * @param {string}key
   * @returns {void}
   * @public
   */
  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear Data
   * @returns {void}
   * @public
   */
  public clearData(): void {
    localStorage.clear();
  }
}
