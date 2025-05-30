// EN: Controller - orchestrates app logic between UI and Core
// PT-BR: Controlador - orquestra a lógica entre a interface e o núcleo

import { DashboardService } from './core/dashboardService.js';
import * as UI from './adapters/uiAdapter.js';
import * as File from './adapters/fileAdapter.js';

// EN: Initialize app and bind events
// PT-BR: Inicializa o app e conecta os eventos
export function initApp() {
  UI.bindTabEvents();
  UI.bindModalClose();
  File.bindCopyButton();
  File.bindDownloadButtons();
  UI.bindGenerateButton(handleGenerate);
}

function handleGenerate() {
  const input = UI.getUserInput();

  let jsonData;
  try {
    jsonData = JSON.parse(input.json);
  } catch (e) {
    alert("Invalid JSON input.");
    return;
  }

  const service = new DashboardService();

  const tags = service.parseTags(input.tags, jsonData);
  const panels = service.extractPanels(jsonData);
  const dashboardTitle = service.findDashboardTitle(jsonData) || "<empty>";

  const output = service.buildOutput(
    panels,
    tags,
    input.hideEmpty,
    input.template,
    dashboardTitle
  );

  UI.setOutputText(output);
  UI.showOutputModal();
}
