import { Page, Locator } from '@playwright/test';

export default class BrasilCacauElements {
  constructor(readonly page: Page) {}

  // --- Home ---
  get logo(): Locator {
    return this.page.locator('img[alt*="Brasil Cacau"]');
  }

  get menuFaleConosco(): Locator {
    return this.page.locator('a[href*="fale-conosco"]');
  }

  // --- Fale Conosco ---
  get nomeInput(): Locator {
    return this.page.locator('input[name="nome"], input[id*="nome"]');
  }

  get emailInput(): Locator {
    return this.page.locator('input[name="email"], input[id*="email"]');
  }

  get mensagemTextArea(): Locator {
    return this.page.locator('textarea[name="mensagem"], textarea[id*="mensagem"]');
  }

  get assuntoSelect(): Locator {
    return this.page.locator('select[name="assunto"], select[id*="assunto"]');
  }

  get enviarButton(): Locator {
    return this.page.locator('button[type="submit"], button:has-text("Enviar")');
  }

  get feedbackMessage(): Locator {
    return this.page.locator('text=/Obrigado|mensagem enviada/i');
  }
}
