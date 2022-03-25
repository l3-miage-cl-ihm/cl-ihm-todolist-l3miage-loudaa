import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';


export interface History<T> {
    canUndo: boolean;
    canRedo: boolean;
    history: T[];
    currentIndex: number;
    current: T;

  }

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() { }
}
