import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * unsubscribe
 * @param {Subject<T>}subscription
 * @return {void}
 */
export function unsubscribe<T = any>(subscription: Subject<void>): void {
  subscription.next();
  subscription.complete();
}

/**
 * Track ByFn
 * @param index
 * @param item
 * @returns {any}
 */
export function trackByFn(index: number, item: any): any {
  return item.id || index;
}

/**
 * Navigate
 * @param {string}url
 * @param {Router}router
 */
export function navigate(url: string, router: Router): void {
  router.navigate([url]);
}
