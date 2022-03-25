import { TodoItem } from './../../src/app/todolist.service';
interface PageTDL {
  nbItemsShouldBe(nb: number): this;
  footerSHouldBePresent(present:boolean): this;
  textIputeSouldBePrensent(chaine :string): this;
  addNewItem(todo:string): this;
}

class PageTDL_C implements PageTDL {
  nbItemsShouldBe(nb: number): this {
    cy.get('li > app-todo-item').should("have.length", nb);
    return this;
  }

  footerSHouldBePresent(present: boolean): this {
    cy.get('footer').should("have.length", present ? 1 : 0);
    return this;
  }

  textIputeSouldBePrensent(chaine : string): this{
    cy.get("form > input").should("have.value","")
    return this;
  }

  addNewItem(todo : string){
    cy.get('.new-todo').type(todo);
    cy.get('.new-todo').type('{enter}');
    return this
  }





}

export const page = new PageTDL_C();
