import { Observable, BehaviorSubject, filter, combineLatest, map } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from './../todolist.service';
import { Component, OnInit, ChangeDetectionStrategy, IterableDiffers } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';



type fctfilter = (item:TodoItem)=> boolean;

export interface TodoListPlus extends TodoList {
  remaining : number,
  filter: fctfilter,
  displayedItems : readonly TodoItem[],//
  allDone : boolean
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  readonly filterAll : fctfilter = () => true;
  readonly filterActives: fctfilter = (item) => !item.isDone;
  readonly filterCompleted : fctfilter = (item) => item.isDone

  private fc = new BehaviorSubject<fctfilter>(this.filterAll);
  tdlobs !:Observable<TodoListPlus>;

  obs !: Observable<TodoList>
  constructor(private tds : TodolistService,public auth:AngularFireAuth) {
    this.auth.onAuthStateChanged(
      (user) => {
        console.log(user?.uid);
        if(user){
            this.obs = this.tds.items; 
            this.tdlobs  = combineLatest([this.tds.obsItems,this.fc]).pipe(
              map(([L,f]) => ({
                ...L,
                remaining : L.items.reduce((nb,item) => item.isDone ? nb : nb+1,0), // remaining c pour calculer le nb de todo restant à faire
                filter : f,//
                displayedItems : L.items.filter(f),// displayedItems va filtrer les items avec le filter f
        
              })),
              map( inter => ({
                ...inter,
                allDone: inter.remaining === 0// dans le cas tout est coché (remainign ===0)true
              }))
            )  
        }
      }
    )
    
  }
  ngOnInit(): void {
  }

  get Obs(){
    return this.obs;
  }

  get ObsTdl(): Observable<TodoList>{
    return this.tds.obsItems;
  }

ajouter(s:string): void {
  this.tds.create(s);
}

update(up: Partial<TodoItem>, ...items: TodoItem[] ): void{
  this.tds.update(up, ...items);
}

delete(item:TodoItem):void{
  this.tds.delete(item);
}

updateAllDone(done:boolean, L:readonly TodoItem[]):void{
  this.update({isDone:done}, ...L);
}


setfilter(f :fctfilter){
  this.fc.next(f);
}


deleteAll(items : readonly TodoItem[]){
  let itemSup = items.filter(x => x.isDone)
  this.tds.delete(...itemSup)
  
}

}




