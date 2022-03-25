
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}

export interface TodoList {
  readonly label: string;
  readonly items: readonly TodoItem[];
}

let idItem = 0;
const savedListName  = 'TODOLIST MIAGE';
const defaultList : TodoList = {label: 'L3 MIAGE', items:[]};

@Injectable({
  providedIn: 'root'
})
export class TodolistService  implements OnDestroy{

  private abo!: Subscription
  private subj = new BehaviorSubject<TodoList>(
    localStorage.getItem(savedListName) ? JSON.parse(localStorage.getItem(savedListName)!): defaultList
  );

  readonly observable = this.subj.asObservable();


  constructor()  {
    this.abo = this.observable.subscribe(L => localStorage.setItem(savedListName,JSON.stringify(L)))
  }


  ngOnDestroy(){
    this.abo.unsubscribe();
  }

  create(...labels: readonly string[]): this {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        ...labels.filter( l => l !== '').map(
            label => ({label, isDone: false, id: idItem++})
          )
      ]
    } );
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    if(data.label !== "") {
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
      } );
    } else {
      this.delete(...items);
    }
    return this;
  }



}
