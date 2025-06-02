// EN: App Entry Point
// PT-BR: Ponto de Entrada da Aplicação

import { initApp } from './controller.js';
import { applyLanguage } from './core/supportLanguages.js';

// EN: Wait for DOM to be fully loaded before initializing
// PT-BR: Espera o carregamento completo do DOM antes de iniciar
document.addEventListener('DOMContentLoaded', () => {
  initApp();

  // Set default language
  applyLanguage('en');

  // Language dropdown handler
  document.getElementById('langSelect').addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });
});