export class NavigationPage {
  _groupMenuClick(groupName) {
    cy.contains("a", groupName).then((menu) => {
      cy.wrap(menu)
        .find(".expand-state g g")
        .invoke("attr", "data-name")
        .then((attr) => {
          if (attr.includes("left")) {
            cy.wrap(menu).click();
          }
        });
    });
  }

  formLayoutsPage() {
    this._groupMenuClick("Form");
    cy.contains("Form Layouts").click();
  }

  datepickerPage() {
    this._groupMenuClick("Form");
    cy.contains("Datepicker").click();
  }

  toasterPage() {
    this._groupMenuClick("Modal & Overlays");
    cy.contains("Toastr").click();
  }

  smartTablePage() {
    this._groupMenuClick("Tables & Data");
    cy.contains("Smart Table").click();
  }

  tooltipPage() {
    this._groupMenuClick("Modal & Overlays");
    cy.contains("Tooltip").click();
  }
}

export const navigateTo = new NavigationPage();
