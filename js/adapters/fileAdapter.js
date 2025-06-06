// EN: File Adapter - manages copy and download operations
// PT-BR: Adaptador de Arquivo - gerencia ações de cópia e download

import { showMultipleOutputs } from '../main.js';

export function bindCopyButton() {
  const copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", () => {
    const text = document.getElementById("outputText").innerText;
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.src = "imgs/icons/copy_verde.png";
      setTimeout(() => {
        copyBtn.src = "imgs/icons/copy_azul.png";
      }, 2000);
    });
  });
}

export function bindDownloadButtons() {
  document.getElementById("downloadTxt").addEventListener("click", () => {
    downloadFile("output.txt");
  });

  document.getElementById("downloadMd").addEventListener("click", () => {
    downloadFile("output.md");
  });
}

function downloadFile(filename) {
  const text = document.getElementById("outputText").innerText;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function readJsonFile(file, onLoadCallback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    onLoadCallback(event.target.result, file.name);
  };
  reader.readAsText(file);
}

export function readMultipleJsonFiles(fileList) {
  window.loadedJsonFiles = [];

  Array.from(fileList).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      window.loadedJsonFiles.push({ name: file.name, content });
      // Geração da saída agora controlada pelo botão "GERAR"
    };
    reader.readAsText(file);
  });
}
