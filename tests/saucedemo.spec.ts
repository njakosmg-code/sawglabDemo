import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //verifier le titre du site
  await expect(page).toHaveTitle(/Swag Labs/);

  //se connecter sans remplir les champs
  const btn_login = page.locator('//*[@id="login-button"]');
  await btn_login.click();

  //vérifier le msg d'erreur si champ vide
  await expect (page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText('Epic sadface: Username is required');

  //utilisateur non validé
  await page.getByPlaceholder('Username').fill('test');
  await page.getByPlaceholder('Password').fill('test');
  await btn_login.click();
  await expect (page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3')).toHaveText('Epic sadface: Username and password do not match any user in this service');

  //utilisateur validé
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await btn_login.click();
  
  //verifier la page d'après login
  //*Parcours produit*
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Products');

  
  //ajouter un produit au panier
  const btn_addtocart = page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]');
  await btn_addtocart.click();
  //vérifier que le panier est à 1
  await expect(page.locator('//*[@id="shopping_cart_container"]/a/span')).toHaveText('1');
  //aller au panier
  await page.locator('//*[@id="shopping_cart_container"]/a').click();
  //vérifier la page panier
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Your Cart');
  //supprimer le produit du panier
  const btn_remove = page.locator('//*[@id="remove-sauce-labs-backpack"]');
  await btn_remove.click();

  //vérifier que le panier est à 0
  await expect  (page.locator('//*[@id="shopping_cart_container"]/a/span')).toHaveCount(0);
  
  //retourner à la page produit
  const btn_continueshopping = page.locator('//*[@id="continue-shopping"]');
  await btn_continueshopping.click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  //ajouter 2 produits au panier
  const btn_addtocart_1 = page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]');
  await btn_addtocart_1.click();
  const btn_addtocart_2 = page.locator('//*[@id="add-to-cart-sauce-labs-bike-light"]');
  await btn_addtocart_2.click();
  //vérifier que le panier est à 2
  await expect(page.locator('//*[@id="shopping_cart_container"]/a/span')).toHaveText('2');
  //aller au panier
  await page.locator('//*[@id="shopping_cart_container"]/a').click();
  //vérifier la page panier
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Your Cart');

  //passer la commande
  const btn_checkout = page.locator('//*[@id="checkout"]');
  await btn_checkout.click();
  //vérifier la page checkout
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Your Information');

  //remplir les infos
  await page.getByPlaceholder('First Name').fill('test');
  await page.getByPlaceholder('Last Name').fill('test');
  await page.getByPlaceholder('Zip/Postal Code').fill('12345');
  const btn_continue = page.locator('//*[@id="continue"]');
  await btn_continue.click();

  //vérifier la page checkout step two
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Overview');

  //terminer la commande
  const btn_finish = page.locator('//*[@id="finish"]');
  await btn_finish.click();


  //vérifier la page checkout complete
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Complete!');

  //retourner à la page produit
  const btn_backhome = page.locator('//*[@id="back-to-products"]');
  await btn_backhome.click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Products');



});
