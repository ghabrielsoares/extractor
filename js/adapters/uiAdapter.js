// EN: UI Adapter - manages DOM interactions and events
// PT-BR: Adaptador de UI - gerencia interações e eventos com o DOM

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

// NOVO: Lógica para upload de arquivo JSON (clique OU arraste)
export function bindJsonFileInput(readCallback) {
  const uploadButton = document.getElementById("uploadJsonButton");
  const fileInput = document.getElementById("jsonFileInput");
  const preview = document.getElementById("filePreviewContainer");
  const dropArea = document.getElementById("jsonTab");

  function showPreview(name) {
    preview.innerHTML = "";
    const item = document.createElement("div");
    item.className = "file-item";

    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = "<>";

    const filename = document.createElement("span");
    filename.textContent = name;

    item.appendChild(icon);
    item.appendChild(filename);
    preview.appendChild(item);
  }

  uploadButton.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    readCallback(file, (content, name) => {
      window.loadedJsonFileContent = content;
      showPreview(name);
    });
  });

  // === DRAG & DROP ===
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

    const file = e.dataTransfer.files?.[0];
    if (!file || !file.name.endsWith(".json")) {
      alert("Please drop a valid .json file.");
      return;
    }

    readCallback(file, (content, name) => {
      window.loadedJsonFileContent = content;
      showPreview(name);
    });
  });
}
