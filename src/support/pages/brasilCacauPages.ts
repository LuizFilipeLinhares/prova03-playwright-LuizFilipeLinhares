import { Page, expect } from '@playwright/test';
import brasilCacauElements from '../elements/brasilCacauElements';

export default class BrasilCacauPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Ação: buscar produto pelo nome
  async searchProductByName(name: string) {
    await this.page.fill(brasilCacauElements.searchInput, name);
    await this.page.keyboard.press('Enter');

    // Aguarda até os produtos aparecerem
    await this.page.waitForSelector(brasilCacauElements.productCard, { timeout: 10000 });
  }

  // Validação: produtos visíveis
  async checkProductVisible() {
    const products = await this.page.locator(brasilCacauElements.productCard).all();
    expect(products.length).toBeGreaterThan(0);
  }

  // Validação: nome do produto contém o termo buscado
  async checkNameContainsRelevantTerm(term: string) {
    const firstProductName = await this.page.locator(brasilCacauElements.productCard).first().innerText();
    expect(firstProductName.toLowerCase()).toContain(term.toLowerCase());
  }
}
