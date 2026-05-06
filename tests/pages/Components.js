const { expect } = require("@playwright/test")

export class Toast{

constructor(page) {
    this.page = page
}

     async containText(message) {
        const toast = this.page.locator(".toast")
        // Truque para validar se o toast desapareceu após alguns segundos
        await expect(toast).toContainText(message)
        await expect(toast).not.toBeVisible({ timeout: 5000 })
    }
}