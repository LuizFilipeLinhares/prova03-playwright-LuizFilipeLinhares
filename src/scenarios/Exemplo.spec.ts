import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import ExemploPage from '../support/pages/ExemploPage';

test.describe('Testes funcionais no site da Giassi Construção', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let exemploPage: ExemploPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.exemplo')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    exemploPage = new ExemploPage(page);
    await page.goto(BASE_URL);
  });

  test('Validar funcionalidade de contato para falar com eles', async () => {
    await exemploPage.preencherCamposValidos();
    await exemploPage.enviarFormulario();
    await exemploPage.validarEnvio();
  });
});
