/// <reference types="cypress" />

/* What are we doing here? */
describe("Our first suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // by tag name
    cy.get("input");

    // by Id
    cy.get("#inputEmail1");

    // by class name
    cy.get(".input-full-width");

    // by attribute name (without value)
    cy.get("[placeholder]");

    // by attribute name (with value)
    cy.get('[placeholder="Email"]');

    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by tag name with email atributte with value
    cy.get('input[placeholder="Email"]');

    // by two different attributes
    cy.get('[placeholder="Email"][type="email"]');

    // The most recommended way in cypress
    cy.get('[data-cy="imputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    /* Explain what each of these instructions do */
    cy.get('[data-cy="signInButton"');
    cy.contains("Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  /* What are we doing here? */
  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Instead of doing this:
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputEmail1"]')
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    // You can do this:
    const firstForm = cy
      .contains("nb-card", "Using the Grid")
      .then((firstForm) => {
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
        const passwordLabelFirst = firstForm
          .find('[for="inputPassword2"]')
          .text();

        expect(emailLabelFirst).to.equal("Email");
        expect(passwordLabelFirst).to.equal("Password");

        // or

        cy.wrap(firstForm)
          .find('[for="inputEmail1"]')
          .should("contain", "Email");
      });
  });

  /**  Explain how to the invoke command does in this example */
  it.only("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2 (using then)
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
    });

    //3 (using invoke)
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      .should("contain", "checked");
  });

  // Another example
  it.only("assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-cell").contains("17").click();
        cy.wrap(input).invoke("prop", "value").should("equal", "Dec 17, 2022");
      });
  });
});
