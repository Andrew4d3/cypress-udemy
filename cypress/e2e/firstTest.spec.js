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
  it("invoke command", () => {
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
  it("assert property", () => {
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

  // Explain what we're doing here to interact with radio buttons
  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");

        cy.wrap(radioButtons).first().should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  // And here to interact with checkboxes
  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').check({ force: true });

    cy.get('[type="checkbox"]').first().click({ force: true });
    cy.get('[type="checkbox"]').first().check({ force: true });
  });

  it.only("list and dropdowns", () => {
    cy.visit("/");
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");
    cy.get("nb-layout-header nav").should(
      "have.css",
      "background-color",
      "rgb(34, 43, 69)"
    );

    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem) => {
        const itemText = listItem.text().trim();

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.wrap(dropdown).click();
      });
    });
  });
});
