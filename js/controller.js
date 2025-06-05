// EN: Controller - orchestrates app logic between UI and Core
// PT-BR: Controlador - orquestra a lógica entre a interface e o núcleo

import { DashboardService } from './core/dashboardService.js';
import * as UI from './adapters/uiAdapter.js';
import * as File from './adapters/fileAdapter.js';
import { translations } from './core/supportLanguages.js';

// EN: Initialize app and bind events
// PT-BR: Inicializa o app e conecta os eventos
export function initApp() {
  UI.bindTabEvents();
  UI.bindModalClose();
  File.bindCopyButton();
  File.bindDownloadButtons();
  UI.bindGenerateButton(handleGenerate);
  UI.bindJsonFileInput(File.readJsonFile); // NOVO
}

function handleGenerate() {
  const input = UI.getUserInput();

  let jsonData;
  try {
    // Se arquivo foi carregado, usar ele, senão usar textarea
    const rawJson = window.loadedJsonFileContent?.trim() || input.json;
    jsonData = JSON.parse(rawJson);
  } catch (e) {
    alert("Invalid JSON input.");
    return;
  }

  const lang = document.getElementById("langSelect").value;
  const outputLabels = translations[lang].outputLabels;

  const service = new DashboardService(outputLabels);

  const labels = service.parseLabels(input.labels, jsonData);
  const panels = service.extractPanels(jsonData);
  const dashboardTitle = service.findDashboardTitle(jsonData) || "<empty>";

  const output = service.buildOutput(
    panels,
    labels,
    input.hideEmpty,
    input.template,
    dashboardTitle
  );

  UI.setOutputText(output);
  UI.showOutputModal();
}
