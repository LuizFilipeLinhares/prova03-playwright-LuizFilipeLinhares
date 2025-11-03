// tests/findProduct.spec.ts

import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import BrasilCacauPage from '../support/pages/brasilCacauPages';

test.describe('Busca de Produtos - Brasil Cacau', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let brasilCacauPage: BrasilCacauPage;

  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.base_url')
    .retrieveData();

  const USER_AGENT = TheConfig.fromFile(CONFIG)
    .andPath('application.user_agent')
    .retrieveData();

  test.use({
    userAgent: USER_AGENT,
    bypassCSP: true
  });

  test.beforeEach(async ({ page }) => {
    brasilCacauPage = new BrasilCacauPage(page);
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Brasil Cacau/i);
  });

  test('Deve buscar um produto pelo nome e exibi-lo na listagem', async () => {
    const termoBusca = 'Trufa';

    await brasilCacauPage.searchProductByName(termoBusca);
    await brasilCacauPage.checkProductVisible();
    await brasilCacauPage.checkNameContainsRelevantTerm(termoBusca);
  });
});
