// cypress/support/index.d.ts
/// <reference types="cypress" />
import './commands';

const email = 'paulwilkerlf@gmail.com';
const password = '123456';

Cypress.Commands.add('login', (email, password) => {
    if (typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Email and password must be strings');
    }

    cy.visit('http://localhost:5173/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.contains('Login').click();
});

describe('Create new student', () => {   
    const code = Math.floor(Math.random() * 100000);
    const name = `Student${code}`;
    const lastname = `Student${code}`;
    

    beforeEach(() => {
      cy.login(email, password);
    });
  
    it('Should create a new student successfully', () => {
        cy.get('[data-testid="MenuIcon"]').should('be.visible').click();
        cy.get('[data-testid="SchoolOutlinedIcon"]').should('be.visible').click();
        cy.get('.MuiButton-containedSecondary.css-kcsbbo-MuiButtonBase-root-MuiButton-root').should('be.visible').click();
        // insert data
        cy.get('#name').should('be.visible').type(name);
        cy.get('#lastname').should('be.visible').type(lastname);
        cy.get('#code').should('be.visible').type(code.toString());
        cy.get('#degree').should('be.visible').click();
        cy.get('[data-value="licenciado"]').should('be.visible').click();

    });
});
  