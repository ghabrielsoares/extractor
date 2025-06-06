import { initApp } from './controller.js';
import { applyLanguage } from './core/supportLanguages.js';
import { translations } from './core/supportLanguages.js';

let outputList = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  applyLanguage('en');

  document.getElementById('langSelect').addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });

  document.getElementById('prevBtn')?.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      showOutputAt(currentIndex);
    }
  });

  document.getElementById('nextBtn')?.addEventListener('click', () => {
    if (currentIndex < outputList.length - 1) {
      currentIndex++;
      showOutputAt(currentIndex);
    }
  });
});

export function showMultipleOutputs(outputs) {
  outputList = outputs;
  currentIndex = 0;
  showOutputAt(currentIndex);
  document.getElementById('outputModal')?.classList.remove('hidden');
}

function showOutputAt(index) {
  const outputText = document.getElementById("outputText");
  const fileIndicator = document.getElementById("fileIndicator");

  if (outputText && outputList[index]) {
    outputText.innerText = outputList[index];
  }

  if (fileIndicator) {

    const langSelect = document.getElementById('langSelect');
    const currentLang = langSelect ? langSelect.value : 'en';
    

    const t = translations[currentLang].fileIndicator;
    

    fileIndicator.innerText = `${t.file} ${index + 1} ${t.of} ${outputList.length}`;
  }
}

