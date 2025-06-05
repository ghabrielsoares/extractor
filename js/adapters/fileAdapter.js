// EN: File Adapter - manages copy and download operations
// PT-BR: Adaptador de Arquivo - gerencia ações de cópia e download

export function bindCopyButton() {
  const copyBtn = document.getElementById("copyBtn");
  copyBtn.addEventListener("click", () => {
    const text = document.getElementById("outputText").textContent;
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
  const text = document.getElementById("outputText").textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// NOVO: Lê conteúdo de arquivo JSON
export function readJsonFile(file, onLoadCallback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    onLoadCallback(event.target.result, file.name);
  };
  reader.readAsText(file);
}
