import { navigateTo } from "../support/page_objects/navigationPage";

describe.only("Test with page Objects", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verify navigations across pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });
});
