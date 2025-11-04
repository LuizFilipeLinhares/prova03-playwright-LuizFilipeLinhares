import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ExemploElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome(): Locator {
    return this.page.locator('input[name="data[Contato][nome]"]');
  }

  getCampoSobrenome(): Locator {
    return this.page.locator('input[name="data[Contato][sobrenome]"]');
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[name="data[Contato][email]"]');
  }

  getCampoTelefone(): Locator {
    return this.page.locator('input[name="data[Contato][fone]"]');
  }

  getCampoAssunto(): Locator {
    return this.page.locator('input[name="data[Contato][assunto]"]');
  }

  getCampoMensagem(): Locator {
  return this.page.locator('textarea[name="data[Contato][msg]"]');
}   
  getBotaoEnviar(): Locator {
  return this.page.locator('.btn_enviar');
}

  getFlashMessage(): Locator {
    return this.page.locator('#flashMessage');
}
  getMapaIframe(): Locator {
    return this.page.locator('iframe[src*="google.com/maps"]');
}
  getCampoNomeError(): Locator {
    return this.page.locator('input[name="data[Contato][nome]"]');
  }

}