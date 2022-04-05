import { page } from "cypress/support/TodoList.page"


describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    page.nbItemsShouldBe(0);
    page.footerSHouldBePresent(false);
    page.textIputeSouldBePrensent("");
    page.addNewItem("Aghiles");
    page.footerSHouldBePresent(true);
    page.nbItemsShouldBe(1);
    page.textLItodoItemshouldbepresente(" Aghiles ");
    page.addNewItem("def");
    page.nbItemsShouldBe(2);
    page.todoitemRestante(2);
    page.addNewItem("def2");
    page.addNewItem("def3");
    page.addNewItem("def4");
    page.nbItemsShouldBe(5);
    page.todoitemRestante(5);

  })
})
