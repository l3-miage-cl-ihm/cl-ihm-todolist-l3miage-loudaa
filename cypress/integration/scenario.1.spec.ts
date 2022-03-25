import { page } from "cypress/support/TodoList.page"


describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    page.nbItemsShouldBe(0);
    page.footerSHouldBePresent(false);
    page.textIputeSouldBePrensent("");
    page.addNewItem("Aghiles");

  })
})
