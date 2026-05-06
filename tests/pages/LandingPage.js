const { expect } = require("@playwright/test")
//Estrutura de Page Objects
export class LandingPage {
  constructor(page) {
    this.page = page
  }

  async visit() {
    await this.page.goto("http://localhost:3000")
  }

  async openModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click()

    await expect(
      this.page.getByTestId("modal").getByRole("heading"),
    ).toHaveText("Fila de espera")
  }

  async submitLeadForm(name, email) {
    await this.page.getByPlaceholder("Informe seu nome").fill(name)
    await this.page.getByPlaceholder("Informe seu email").fill(email)

    // Técnica de checkpoint: valida se os campos foram preenchidos corretamente
    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila")
      .click()
  }

  // Exemplo de método para validar o toast, aproveitado no components.
  //#region
  /*async toastHaveText(message) {
    const toast = this.page.locator(".toast")
    // Truque para validar se o toast desapareceu após alguns segundos
    await expect(toast).toHaveText(message)
    await expect(toast).not.toBeHidden({ timeout: 5000 })
  }*/
  //#endregion

  async alertHaveText(target) {
    await expect(this.page.locator(".alert")).toHaveText(target)
  }
}
// Definição de page object: classe que representa a página e seus elementos, encapsulando as interações com a página em métodos reutilizáveis.