// EN: DashboardPort defines the contract for extracting dashboard data
// PT-BR: DashboardPort define o contrato para extração de dados do dashboard

export class DashboardPort {
  // EN: Parses tags from the input
  // PT-BR: Faz o parsing das tags informadas no input
  parseTags(rawTags, jsonData) {
    throw new Error("parseTags() must be implemented");
  }

  // EN: Extracts panels and organizes Prometheus/Zabbix targets
  // PT-BR: Extrai os painéis e organiza os targets do Prometheus e Zabbix
  extractPanels(jsonData) {
    throw new Error("extractPanels() must be implemented");
  }

  // EN: Finds the dashboard title
  // PT-BR: Encontra o título do dashboard
  findDashboardTitle(jsonData) {
    throw new Error("findDashboardTitle() must be implemented");
  }

  // EN: Builds the final formatted output
  // PT-BR: Constrói a saída final formatada
  buildOutput(panels, tags, hideEmpty, template, dashboardTitle) {
    throw new Error("buildOutput() must be implemented");
  }
}
