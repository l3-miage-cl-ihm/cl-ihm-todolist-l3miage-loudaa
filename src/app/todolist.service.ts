import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore}  from '@angular/fire/compat/firestore'

import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, observable, Subscription } from 'rxjs';

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


@Injectable({
  providedIn: 'root'
})
export class TodolistService  implements OnInit{

 // private abo!: Subscription
  //private subj = new BehaviorSubject<TodoList>(
  //       {label : 'default', items : []}
//);
//  readonly observable = this.subj.asObservable();
  items !: Observable<TodoList>;
  todolist : TodoList = {label: 'L3 MIAGE', items:[]};
  id='';
  constructor(private afs: AngularFirestore, private auth:AngularFireAuth) {
    // this.abo = this.observable.subscribe(L => localStorage.setItem(savedListName,JSON.stringify(L)))
    this.auth.onAuthStateChanged(
      (user) => {
        console.log(user?.uid);
        if(user){
          this.id = user.uid;
          this.items = this.afs.doc<TodoList>(`/${this.id}/default`).valueChanges().pipe(
            map(L => this.todolist = L ?? {label : 'default', items : []}));
            console.log(this.items);
        }
      }
    )
  }
  ngOnInit(): void {
  }

  get obsItems(){
    return this.items;
  }

  

  create(...labels: readonly string[]): this {
    this.afs.doc<TodoList>(`/${this.id}/default`).set({
      ...this.todolist,
      items: [
        ...this.todolist.items,
        ...labels.filter( l => l !== '').map(
            label => ({label, isDone: false, id: idItem++})
          )
      ]
    })
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = {
      ...this.todolist,
      items: this.todolist.items.filter(item => items.indexOf(item) === -1 )
    } ;
    this.afs.doc<TodoList>(`/${this.id}/default`).update(
      L)
    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    if(data.label !== "") {
      this.afs.doc<TodoList>(`/${this.id}/default`).update({
        ...this.todolist,
        items: this.todolist.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
      } )
    } else {
      this.delete(...items);
    }
    return this;
  }



}
