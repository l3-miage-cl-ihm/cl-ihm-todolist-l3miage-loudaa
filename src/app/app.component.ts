import { TodoList, TodolistService, TodoItem } from './todolist.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
   constructor(private todoListeService: TodolistService ){
   }

   


  create(tache:string){
    this.todoListeService.create(tache);
   }

   update(up:Partial<TodoItem>,data:TodoItem){
     this.todoListeService.update(up,data);
   }


  delete(data : TodoItem){
    this.todoListeService.delete(data);
  }


  ajouter(tache:string){
      this.create(tache)
  }

trackById(i: number, item: TodoItem): number {
  return item.id;
}

}
