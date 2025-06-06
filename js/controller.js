// EN: Controller - orchestrates app logic between UI and Core
// PT-BR: Controlador - orquestra a lógica entre a interface e o núcleo

import { DashboardService } from './core/dashboardService.js';
import * as UI from './adapters/uiAdapter.js';
import * as File from './adapters/fileAdapter.js';
import { translations } from './core/supportLanguages.js';
import { showMultipleOutputs } from './main.js';

export function initApp() {
  UI.bindTabEvents();
  UI.bindModalClose();
  File.bindCopyButton();
  File.bindDownloadButtons();
  UI.bindGenerateButton(handleGenerate);
  UI.bindJsonFileInput();
}

function handleGenerate() {
  const input = UI.getUserInput();
  const lang = document.getElementById("langSelect").value;
  const outputLabels = translations[lang].outputLabels;
  const service = new DashboardService(outputLabels);


  if (window.loadedJsonFiles?.length > 0) {
    gerarSaidasParaArquivos(window.loadedJsonFiles);
    return;
  }


  let jsonData;
  try {
    const rawJson = window.loadedJsonFileContent?.trim() || input.json;
    jsonData = JSON.parse(rawJson);
  } catch (e) {
    alert("Invalid JSON input.");
    return;
  }

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


export function gerarSaidasParaArquivos(fileArray) {
  const input = UI.getUserInput();
  const lang = document.getElementById("langSelect").value;
  const outputLabels = translations[lang].outputLabels;
  const service = new DashboardService(outputLabels);

  const outputs = [];

  for (const file of fileArray) {
    try {
      const jsonData = JSON.parse(file.content);
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
      outputs.push(output);
    } catch (e) {
      outputs.push(`Erro ao processar ${file.name}: JSON inválido.`);
    }
  }

  showMultipleOutputs(outputs);
}
