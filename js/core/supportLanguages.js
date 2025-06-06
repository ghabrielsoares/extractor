export const translations = {
  en: {
    jsonPlaceholder:"Paste the exported Grafana JSON here",
    uploadJSON: "Upload JSON file",
    titleLabel: "TITLE",
    titleHelper: `You can use:<br><code>&lt;dashboard name&gt;</code>, <code>&lt;label&gt;</code>`,
    titlePlaceholder: "Ex: <dashboard name> This dashboard provides metrics on <label>.",
    labelLabel: "LABEL",
    labelHelper: `Use comma, space or line break to separate.<br>
Use <code>&lt;v&gt;</code> or <code>&lt;empty&gt;</code> to match "__auto".<br>
Use <code>&lt;all&gt;</code> or <code>&lt;todos&gt;</code> to auto-include all labels.`,
    hideEmpty: "Do not display empty values",
    generate: "GENERATE",
    modalLabels: {
      md: "MD",
      txt: "TXT"
    },
    fileIndicator: {
      file: "File",
      of: "of"
    },
    outputLabels: {
      panel: "Panel",
      title: "Title",
      legend: "Legend",
      group: "Group",
      host: "Host",
      item: "Item",
      zabbixTitles: "TITLES FOUND",
      zabbixAliases: "setAlias FOUND",
      prometheusTitles: "TITLES FOUND",
      prometheusLegends: "LEGENDS FOUND"
    }
  },
  pt: {
    jsonPlaceholder:"Cole o JSON exportado do Grafana aqui.",
    uploadJSON: "Carregar arquivo JSON",
    titleLabel: "TÍTULO",
    titleHelper: `Você pode usar:<br><code>&lt;dashboard name&gt;</code>, <code>&lt;label&gt;</code>`,
    titlePlaceholder: "Ex: <dashboard name> Este dashboard apresenta métricas de <label>.",
    labelLabel: "LABEL",
    labelHelper: `Use vírgula, espaço ou quebra de linha para separar.<br>
Use <code>&lt;v&gt;</code> ou <code>&lt;empty&gt;</code> para corresponder com "__auto".<br>
Use <code>&lt;all&gt;</code> ou <code>&lt;todos&gt;</code> para incluir todos automaticamente.`,
    hideEmpty: "Ocultar valores vazios",
    generate: "GERAR",
    modalLabels: {
      md: "MD",
      txt: "TXT"
    },
    fileIndicator: {
      file: "Arquivo",
      of: "de"
    },
    outputLabels: {
      panel: "PAINEL",
      title: "Título",
      legend: "Legenda",
      group: "Grupo",
      host: "Host",
      item: "Item",
      zabbixTitles: "TÍTULOS ENCONTRADOS",
      zabbixAliases: "setAlias ENCONTRADOS",
      prometheusTitles: "TÍTULOS ENCONTRADOS",
      prometheusLegends: "LEGENDAS ENCONTRADAS"
    }
  }
};

export function applyLanguage(lang = "en") {
  const t = translations[lang];

  // TITLE tab
  document.querySelector('#titleTab label').textContent = t.titleLabel;
  document.querySelector('#titleTab .helper-text').innerHTML = t.titleHelper;

  // LABEL tab
  document.querySelector('#labelTab label').textContent = t.labelLabel;
  document.querySelector('#labelTab .helper-text').innerHTML = t.labelHelper;

  // Tab button TITLE
  document.querySelector('[data-tab="titleTab"]').textContent = t.titleLabel;

  // Checkbox
  document.querySelector('.checkbox-label').innerHTML = `
    <input type="checkbox" id="hideEmpty"> ${t.hideEmpty}
  `;

  // Placeholders
  document.getElementById('titleInput').placeholder = t.titlePlaceholder;
  document.getElementById('jsonInput').placeholder = t.jsonPlaceholder; 

  // Botão de upload JSON
  document.getElementById('uploadJsonButton').textContent = t.uploadJSON; 

  // Modal labels
  document.querySelector('.modal-header .icon-label:nth-child(1)').textContent = t.modalLabels.md;
  document.querySelector('.modal-header .icon-label:nth-child(3)').textContent = t.modalLabels.txt;
}

