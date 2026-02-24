import { test, expect } from '@playwright/test';

test.describe('ログインページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('headerタイトルが正しく表示される', async ({ page }) => {
    // Headerは<div>タグなので、getByTextを使用
    await expect(page.getByText('Mini-Kintai')).toBeVisible();
  });

  test('ログインフォームが表示される', async ({ page }) => {
    // メールアドレス入力欄が存在する
    const emailInput = page.getByPlaceholder('email');
    await expect(emailInput).toBeVisible();

    // パスワード入力欄が存在する
    const passwordInput = page.getByPlaceholder('password');
    await expect(passwordInput).toBeVisible();

    // ログインボタンが存在する
    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await expect(loginButton).toBeVisible();
  });

  test('空フォームのままログインボタンをクリックするとエラーが表示される', async ({
    page,
  }) => {
    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await loginButton.click();

    const errorMessage = page.getByText(/ログインに失敗しました。/i);
    await expect(errorMessage).toBeVisible();
  });

  test('正しい認証情報でログインすると、トップページに遷移する', async ({
    page,
  }) => {
    await page.getByPlaceholder('email').fill('test_user02@example.com');
    await page.getByPlaceholder('password').fill('user02_password');

    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await loginButton.click();

    // トップページへの遷移を確認
    await expect(page).toHaveURL('/top');

    // トップページの要素が表示されることを確認
    await expect(page.getByText(/打刻/)).toBeVisible();
  });

  test('間違った認証情報でログインするとエラーが表示される', async ({
    page,
  }) => {
    await page.getByPlaceholder('email').fill('test_user00@example.com');
    await page.getByPlaceholder('password').fill('user00_password');

    const loginButton = page.getByRole('button', { name: 'ログイン' });
    await loginButton.click();

    const errorMessage = page.getByText(/ログインに失敗しました/i);
    await expect(errorMessage).toBeVisible();
  });
});
