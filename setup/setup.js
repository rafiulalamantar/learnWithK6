import { browser } from 'k6/browser';

export async function setupBrowser() {
  return await browser.newPage();
}
