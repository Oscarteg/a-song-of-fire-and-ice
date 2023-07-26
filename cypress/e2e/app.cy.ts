/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  it("should navigate to the houses page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new page should contain an h1 of "Houses"
    cy.get("h1").contains("Houses");

    cy.get('[data-testid="houses"]').children().should("have.length", 10);
  });

  it("should be able to filter the houses", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get('input[name="has-titles"]').check();

    cy.get('[data-testid="houses"]').should("not.contain", "House Algood");
  });

  it("should be able to change page size", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get('select[name="page-size"]').select("100");

    cy.get('[data-testid="houses"]').children().should("have.length", 50);
  });

  it("should navigate to a house detail page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing houses 2 and click it
    cy.get('a[href*="houses/2"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/houses/2");

    // The new page should contain an h1 with "About page"
    cy.get("h3").contains("House Allyrion of Godsgrace");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
