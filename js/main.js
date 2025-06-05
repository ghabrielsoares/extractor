import { initApp } from './controller.js';
import { applyLanguage } from './core/supportLanguages.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  applyLanguage('en');

  document.getElementById('langSelect').addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });
});
