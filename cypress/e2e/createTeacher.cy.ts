/// <reference types="cypress" />

const email = 'paulwilkerlf@gmail.com';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.contains('Login').click();
});
  

describe('Create new student', () => {   
    const code = Math.floor(Math.random() * 100000);
    const name = `Student${code}`;
    const lastname = `Student${code}`;
    const testEmail = `testEmail${code}@gmail.com`;
    
    

    beforeEach(() => {
      cy.login(email, password);
    });
  
    it('Should create a new teacherwith the position of a licensed successfully', () => {
        cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
        cy.get('[data-testid="SupervisorAccountIcon"]').should('be.visible').click();
        cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root').should('be.visible').click();
        // insert data
        cy.get('#name').should('be.visible').type(name);
        cy.get('#lastname').should('be.visible').type(lastname);
        cy.get('#code').should('be.visible').type(code);
        cy.get('#degree').should('be.visible').click();
        cy.get('[data-value="licenciado"]').should('be.visible').click();
        cy.get('#email').should('be.visible').type(testEmail);
        cy.get('#phone').should('be.visible').type(code);
        cy.get('.MuiButtonBase-root.MuiButton-root.MuiButton-containedPrimary').should('be.visible').click();
        cy.get('.MuiAlert-message.css-1pxa9xg-MuiAlert-message').should('be.visible').and('contain', 'Profesor creado con éxito');
    });
});
  