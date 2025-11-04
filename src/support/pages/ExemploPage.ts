import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import ExemploElements from '../elements/ExemploElements';
import BasePage from './BasePage';

export default class ExemploPage extends BasePage {
  readonly exemploElements: ExemploElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.exemploElements = new ExemploElements(page);
  }

  /**
   * Preenche o formulário com dados válidos gerados automaticamente.
   */
  async preencherCamposValidos(
    nome?: string,
    sobrenome?: string,
    email?: string,
    telefone?: string,
    assunto?: string,
    mensagem?: string
  ): Promise<void> {
    const el = this.exemploElements;

    await el.getCampoNome().fill(nome || faker.person.firstName());
    await el.getCampoSobrenome().fill(sobrenome || faker.person.lastName());
    await el.getCampoEmail().fill(email || faker.internet.email());
    await el.getCampoTelefone().fill(telefone || faker.phone.number());

    const campoAssunto = el.getCampoAssunto();
    const opcoes = await campoAssunto.locator('option').allTextContents();
    const opcoesValidas = opcoes.filter(opt => opt.trim() && opt.trim() !== 'Assunto');

    if (assunto && opcoesValidas.includes(assunto)) {
      await campoAssunto.selectOption({ label: assunto });
    } else if (opcoesValidas.length > 0) {
      const aleatoria = faker.helpers.arrayElement(opcoesValidas);
      await campoAssunto.selectOption({ label: aleatoria });
    }

    await el.getCampoMensagem().fill(mensagem || faker.lorem.sentences(2));
  }

  async preencherCampos(campos: {
    nome?: string;
    sobrenome?: string;
    email?: string;
    telefone?: string;
    assunto?: string;
    mensagem?: string;
  }): Promise<void> {
    const el = this.exemploElements;

    if (campos.nome !== undefined) await el.getCampoNome().fill(campos.nome);
    if (campos.sobrenome !== undefined) await el.getCampoSobrenome().fill(campos.sobrenome);
    if (campos.email !== undefined) await el.getCampoEmail().fill(campos.email);
    if (campos.telefone !== undefined) await el.getCampoTelefone().fill(campos.telefone);
    if (campos.assunto !== undefined) await el.getCampoAssunto().fill(campos.assunto);
    if (campos.mensagem !== undefined) await el.getCampoMensagem().fill(campos.mensagem);
  }

  async enviarFormulario(): Promise<void> {
    const botao = this.exemploElements.getBotaoEnviar();
    await botao.scrollIntoViewIfNeeded();
    await botao.click();
  }

  async validarMapaVisivel(): Promise<void> {
    const mapa = this.page.locator('img[src="/img/layout/mapa.png"]');
    await expect(mapa).toBeVisible({ timeout: 10000 });
  }
  

  async validarPaginaCarregada(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

 
  

