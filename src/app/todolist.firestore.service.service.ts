import { user } from '@angular/fire/auth';
//import { firebase } from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subscription, combineLatest, switchMap, map, of, shareReplay } from 'rxjs';
import { TodoList} from './todolist.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


//type TodoListState = { user: undefined} | {user: firebase.user, TDL : TodoList }

@Injectable({
  providedIn: 'root'
})
export class TodolistFirestoreServiceService {
 //readonly observable : Observable<TodoListState>;
 private subscriptionState !:Subscription

  constructor(private afs :AngularFirestore , private afa : AngularFireAuth) {
  //  this.observable = combineLatest([
      afa.authState,
      afa.authState.pipe(
        switchMap( U => {
          if(U){
            return afs.doc<TodoList>(`/${U.uid}/default`).valueChanges().pipe(
              map(L => L ?? {label : "Défaul",items: []})
            );
          }
          else {
            return of({label: "unlogged", items:[]})
          }
        })
     // )]).pipe(
       // map(([user,TDL]) => !!user ? {user,TDL} : {user:undefined}),
        //shareReplay(1)
      )
   }
  }
