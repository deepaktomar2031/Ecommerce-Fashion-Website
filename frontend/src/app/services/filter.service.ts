import { Injectable } from '@angular/core';
import { Filters } from '../interfaces/filters';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // hold current filters
  private filters = new BehaviorSubject<Filters | null>(null);

  // change in component listner (subscriber)
  filters$: Observable<Filters | null> = this.filters.asObservable();

  // Set current Filters
  setFilters(options: Filters) {
    this.filters.next(options);
  }
}
