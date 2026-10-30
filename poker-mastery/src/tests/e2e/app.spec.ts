import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Poker Mastery/);
  });

  test('should have main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toContainText('Domina el Poker Profesional');
  });

  test('should have CTA buttons', async ({ page }) => {
    const startBtn = page.locator('a[href="/curso/fase-0/modulo-1/leccion-1"]');
    const toolsBtn = page.locator('a[href="/herramientas"]');
    await expect(startBtn).toBeVisible();
    await expect(toolsBtn).toBeVisible();
  });

  test('should have phase cards', async ({ page }) => {
    const phases = page.locator('a[href^="/curso/fase-"]');
    await expect(phases).toHaveCount(6);
  });

  test('should have tools section', async ({ page }) => {
    const toolsSection = page.locator('text=Herramientas Profesionales Incluidas');
    await expect(toolsSection).toBeVisible();
  });

  test('should navigate to course page', async ({ page }) => {
    await page.click('a[href="/curso"]');
    await expect(page).toHaveURL(/\/curso/);
  });

  test('should navigate to tools page', async ({ page }) => {
    await page.click('a[href="/herramientas"]');
    await expect(page).toHaveURL(/\/herramientas/);
  });
});

test.describe('Course Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/curso');
  });

  test('should load course overview', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Currículo|Curso/);
  });

  test('should have phase links', async ({ page }) => {
    const phaseLinks = page.locator('a[href^="/curso/fase-"]');
    await expect(phaseLinks.first()).toBeVisible();
  });
});

test.describe('Lesson Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/curso/fase-0/modulo-1/leccion-1');
  });

  test('should load lesson content', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have lesson content', async ({ page }) => {
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });
});

test.describe('Tools Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas');
  });

  test('should load tools landing page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Herramientas/);
  });

  test('should have calculator cards', async ({ page }) => {
    const equityCard = page.locator('a[href="/herramientas/equity"]');
    await expect(equityCard).toBeVisible();
  });
});

test.describe('Equity Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas/equity');
  });

  test('should load equity calculator', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Equity/);
  });

  test('should have range inputs', async ({ page }) => {
    const rangeInput = page.locator('input[placeholder*="range" i], input[placeholder*="Range" i]');
    await expect(rangeInput.first()).toBeVisible();
  });
});

test.describe('Pot Odds Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas/pot-odds');
  });

  test('should load pot odds calculator', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Pot Odds/);
  });

  test('should calculate pot odds', async ({ page }) => {
    await page.fill('input[id="pot-size"]', '100');
    await page.fill('input[id="bet-size"]', '50');
    await page.fill('input[id="equity"]', '30');
    await page.click('button[id="calculate-btn"]');

    await expect(page.locator('#req-equity')).not.toHaveText('--');
    await expect(page.locator('#decision')).toContainText(/CALL|FOLD/);
  });
});

test.describe('ICM Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas/icm');
  });

  test('should load ICM calculator', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/ICM/);
  });

  test('should calculate ICM', async ({ page }) => {
    await page.click('button[id="calculate-icm"]');
    await expect(page.locator('#icm-body tr')).toHaveCount(6);
  });
});

test.describe('Range Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas/range-builder');
  });

  test('should load range builder', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Range Builder/);
  });

  test('should have matrix grid', async ({ page }) => {
    const matrix = page.locator('#range-matrix');
    await expect(matrix).toBeVisible();
  });

  test('should load preset', async ({ page }) => {
    await page.selectOption('select[id="preset-select"]', 'btn-rfi');
    await expect(page.locator('#total-combos')).not.toHaveText('0');
  });

  test('should select hands on click', async ({ page }) => {
    await page.click('td[data-hand="AA"]');
    await expect(page.locator('td[data-hand="AA"]')).toHaveClass(/bg-poker-gold/);
  });
});

test.describe('Trainers Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas/trainers');
  });

  test('should load trainers page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Trainers/);
  });

  test('should have trainer cards', async ({ page }) => {
    const preflopTrainer = page.locator('a[href="/herramientas/trainers/preflop"]');
    await expect(preflopTrainer).toBeVisible();
  });
});

test.describe('Bankroll Simulator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/herramientas/bankroll');
  });

  test('should load bankroll simulator', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Bankroll/);
  });

  test('should calculate analytic results', async ({ page }) => {
    await page.fill('input[id="winrate"]', '5');
    await page.fill('input[id="stddev"]', '100');
    await page.fill('input[id="bankroll"]', '5000');
    await expect(page.locator('#ror-analytic')).not.toHaveText('--');
  });

  test('should run Monte Carlo simulation', async ({ page }) => {
    await page.fill('input[id="winrate"]', '5');
    await page.fill('input[id="stddev"]', '100');
    await page.fill('input[id="bankroll"]', '5000');
    await page.fill('input[id="sims"]', '50');
    await page.click('button[id="run-simulation"]');
    await expect(page.locator('#mc-avg')).not.toHaveText('--', { timeout: 30000 });
  });
});

test.describe('Diplomas Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diplomas');
  });

  test('should load diplomas page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Diplomas|Verificar/);
  });
});

test.describe('Accessibility', () => {
  test('home page should have skip link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
  });

  test('pages should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    for (const img of await images.all()) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('forms should have labels', async ({ page }) => {
    await page.goto('/herramientas/pot-odds');
    const inputs = page.locator('input[type="number"]');
    for (const input of await inputs.all()) {
      const id = await input.getAttribute('id');
      const label = page.locator(`label[for="${id}"]`);
      await expect(label).toBeVisible();
    }
  });
});

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('home page should load within budget', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000); // 5 seconds max
  });
});