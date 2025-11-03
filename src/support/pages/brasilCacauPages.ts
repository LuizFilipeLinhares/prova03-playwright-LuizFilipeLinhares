import { Page, expect } from '@playwright/test';
import BrasilCacauElements from './brasilCacauElements';

export default class BrasilCacauPages {
  readonly page: Page;
  readonly elements: BrasilCacauElements;

  constructor(page: Page) {
    this.page = page;
    this.elements = new BrasilCacauElements(page);
  }

  // --------------------
  // 🏠 HOME PAGE
  // --------------------
  async openHome(): Promise<void> {
    await this.page.goto('https://www.brasilcacau.com.br/');
  }

  async verifyHomeLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('https://www.brasilcacau.com.br/');
    await expect(this.elements.logo).toBeVisible();
  }

  async goToFaleConosco(): Promise<void> {
    await this.elements.menuFaleConosco.click();
  }

  // --------------------
  // 💬 FALE CONOSCO PAGE
  // --------------------
  async openFaleConosco(): Promise<void> {
    await this.page.goto('https://www.brasilcacau.com.br/fale-conosco');
  }

  async fillForm(nome: string, email: string, mensagem: string, assunto?: string): Promise<void> {
    await this.elements.nomeInput.fill(nome);
    await this.elements.emailInput.fill(email);
    await this.elements.mensagemTextArea.fill(mensagem);

    if (assunto && (await this.elements.assuntoSelect.count()) > 0) {
      await this.elements.assuntoSelect.selectOption({ label: assunto }).catch(() => {});
    }
  }

  async submitForm(): Promise<void> {
    await this.elements.enviarButton.click();
  }

  async verifySuccessMessage(): Promise<void> {
    await this.elements.feedbackMessage.waitFor({ state: 'visible', timeout: 10000 });
  }
}
