// EN: UI Adapter - manages DOM interactions and events
// PT-BR: Adaptador de UI - gerencia interações e eventos com o DOM

// uiAdapter.js
import { readMultipleJsonFiles } from './fileAdapter.js';

export function getUserInput() {
  return {
    json: document.getElementById("jsonInput").value.trim(),
    labels: document.getElementById("labelsInput").value.trim(),
    template: document.getElementById("titleInput").value.trim(),
    hideEmpty: document.getElementById("hideEmpty").checked
  };
}

export function showOutputModal() {
  document.getElementById("outputModal").classList.remove("hidden");
}

export function closeOutputModal() {
  document.getElementById("outputModal").classList.add("hidden");
}

export function setOutputText(content) {
  document.getElementById("outputText").textContent = content;
}

export function bindTabEvents() {
  document.querySelectorAll('.tab-button').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
}

export function bindModalClose() {
  document.getElementById("closeModal").addEventListener("click", closeOutputModal);
}

export function bindGenerateButton(callback) {
  document.getElementById("generateBtn").addEventListener("click", callback);
}

export function bindJsonFileInput() {
  const uploadButton = document.getElementById("uploadJsonButton");
  const fileInput = document.getElementById("jsonFileInput");
  const preview = document.getElementById("filePreviewContainer");
  const dropArea = document.getElementById("jsonTab");

  uploadButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const files = fileInput.files;
    if (!files || files.length === 0) return;
    showPreview(files);
    readMultipleJsonFiles(files);
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragging");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragging");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragging");

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    const jsonFiles = Array.from(files).filter(file => file.name.endsWith(".json"));
    if (jsonFiles.length === 0) {
      alert("Por favor, arraste apenas arquivos .json.");
      return;
    }

    showPreview(jsonFiles);
    readMultipleJsonFiles(jsonFiles);
  });

  function showPreview(files) {
    preview.innerHTML = "";
    Array.from(files).forEach(file => {
      const item = document.createElement("div");
      item.className = "file-item";

      const icon = document.createElement("span");
      icon.className = "icon";
      icon.textContent = "<>";

      const filename = document.createElement("span");
      filename.textContent = file.name;

      item.appendChild(icon);
      item.appendChild(filename);
      preview.appendChild(item);
    });
  }
}
