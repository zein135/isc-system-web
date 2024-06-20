// cypress/support/commands.js
const email = 'paulwilkerlf@gmail.com';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.contains('Login').click();
});
  
// cypress/e2e/your_test_file.cy.js
describe('Create new student', () => {   
    beforeEach(() => {
      cy.login(email, password);
    });
  
    it('Should create a new student successfully', () => {
        cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
        cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
    });
});
  