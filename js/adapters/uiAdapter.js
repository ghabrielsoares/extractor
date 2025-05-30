// EN: UI Adapter - manages DOM interactions and events
// PT-BR: Adaptador de UI - gerencia interações e eventos com o DOM

export function getUserInput() {
  return {
    json: document.getElementById("jsonInput").value.trim(),
    tags: document.getElementById("tagsInput").value.trim(),
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
