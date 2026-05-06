
const { test, expect } = require("../support")
const { faker } = require('@faker-js/faker')


test("deve cadastrar um lead na fila de espera", async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()
  // Estrutura de Page Objects: instanciando a classe LandingPage para reutilizar os métodos definidos nela
  await page.landing.visit()
  await page.landing.openModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!"
  await page.toast.containText(message)
})

test("não deve cadastrar quando o email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  const newLead = await request.post("http://localhost:3333/leads", {
    data: {
      name: leadName,
      email: leadEmail
    }
  })// Pré-condição: criar um lead diretamente via API para garantir que o email já exista no sistema

  expect(newLead.ok()).toBeTruthy()// Valida se a criação do lead via API foi bem-sucedida

  await page.landing.visit()
  await page.landing.openModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera."
  await page.toast.containText(message)
})

test("não deve cadastrar com email incorreto", async ({ page }) => {
  // Estrutura de Page Objects: instanciando a classe LandingPage para reutilizar os métodos definidos nela
  await page.landing.visit()
  await page.landing.openModal()
  await page.landing.submitLeadForm("Erlan Lima", "erlanlima.gmail.com")

  //#region estrutura sem Page Object
  /*await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // Técnica de checkpoint: valida se o modal de fila de espera foi aberto
  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera",
  );

  await page.getByPlaceholder("Informe seu nome").fill("Erlan Lima");
  await page.getByPlaceholder("Informe seu email").fill("erlan.com.br");


  // Técnica de checkpoint: valida se os campos foram preenchidos corretamente
  await page.getByTestId("modal").getByText("Quero entrar na fila").click();
  */
  //#endregion

  // Técnica de checkpoint: valida se a mensagem de erro é exibida
  await page.landing.alertHaveText("Email incorreto")
})

test("não deve cadastrar quando o nome não é preenchido", async ({ page }) => {
  // Estrutura de Page Objects: instanciando a classe LandingPage para reutilizar os métodos definidos nela
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm("", "erlanlima@gmail.com")

  //#region estrutura sem Page Object
  /*
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // Técnica de checkpoint: valida se o modal de fila de espera foi aberto
  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera",
  );

  await page.getByPlaceholder("Informe seu email").fill("erlanlima@gmail.com");

  // Técnica de checkpoint: valida se os campos foram preenchidos corretamente
  await page.getByTestId("modal").getByText("Quero entrar na fila").click();
*/
  //#endregion

  // Técnica de checkpoint: valida se a mensagem de erro é exibida
  await page.landing.alertHaveText("Campo obrigatório")
})

test("não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  // Estrutura de Page Objects: instanciando a classe LandingPage para reutilizar os métodos definidos nela
  await page.landing.visit()
  await page.landing.openModal()
  await page.landing.submitLeadForm("Erlan Lima", "")

  //#region estrutura sem Page Object
  /*await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // Técnica de checkpoint: valida se o modal de fila de espera foi aberto
  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera",
  );

  await page.getByPlaceholder("Informe seu nome").fill("Erlan Lima");

  // Técnica de checkpoint: valida se os campos foram preenchidos corretamente
  await page.getByTestId("modal").getByText("Quero entrar na fila").click();

  */
  //#endregion

  // Técnica de checkpoint: valida se a mensagem de erro é exibida
  await page.landing.alertHaveText("Campo obrigatório")
})

test("não deve cadastrar quando nenhum campo é preenchido", async ({
  page,
}) => {
  // Estrutura de Page Objects: instanciando a classe LandingPage para reutilizar os métodos definidos nela
  await page.landing.visit()
  await page.landing.openModal()
  await page.landing.submitLeadForm("", "")

  //#region estrutura sem Page Object
  /*
  await page.goto("http://localhost:3000");

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // Técnica de checkpoint: valida se o modal de fila de espera foi aberto
  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera",
  );

  // Técnica de checkpoint: valida se os campos foram preenchidos corretamente
  await page.getByTestId("modal").getByText("Quero entrar na fila").click();

  //Técnica de checkpoint: valida se a mensagem de erro é exibida
  //await expect(page.locator(".alert")).toHaveText("Campo obrigatório");

  */
  //#endregion
  // Truque para validar se a mensagem de erro é exibida para ambos os campos
  await page.landing.alertHaveText(["Campo obrigatório", "Campo obrigatório"])
})

// Definição de page object: classe que representa a página e seus elementos, encapsulando as interações com a página em métodos reutilizáveis.