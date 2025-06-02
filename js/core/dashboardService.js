// EN: Main dashboard service (implements DashboardPort)
// PT-BR: Serviço principal do dashboard (implementa DashboardPort)

import { extractPrometheusTargets } from './extractors/prometheus.js';
import { extractZabbixTargets } from './extractors/zabbix.js';
import { DashboardPort } from '../ports/dashboardPort.js';

export class DashboardService extends DashboardPort {
  parseLabels(rawLabels, jsonData) {
    const isAll = /<todos>|<all>/i.test(rawLabels);
    if (isAll) {
      const panels = this.extractPanels(jsonData);
      const prometheusLabels = panels.flatMap(panel =>
        panel.prometheus.flatMap(p => [p.legendFormat, p.refId])
      );
      const zabbixLabels = panels.flatMap(panel =>
        panel.zabbix.flatMap(z => [z.alias, z.refId])
      );
      return Array.from(new Set([...prometheusLabels, ...zabbixLabels]));
    }

    return rawLabels
      .split(/[\n,\s,]+/)
      .map(label => {
        const lower = label.trim().toLowerCase();
        return lower === "<v>" || lower === "<vazio>" || lower === "<empty>"
          ? "__auto"
          : label.trim();
      })
      .filter(Boolean);
  }

  extractPanels(obj, results = []) {
    if (Array.isArray(obj)) {
      obj.forEach(item => this.extractPanels(item, results));
    } else if (typeof obj === 'object' && obj !== null) {
      if (obj.targets && Array.isArray(obj.targets)) {
        results.push({
          panelTitle: obj.title || "<empty>",
          prometheus: extractPrometheusTargets(obj.targets),
          zabbix: extractZabbixTargets(obj.targets)
        });
      }

      for (const key in obj) {
        this.extractPanels(obj[key], results);
      }
    }
    return results;
  }

  findDashboardTitle(jsonData) {
    if (typeof jsonData !== 'object' || jsonData === null) return null;
    if (jsonData.title) return jsonData.title;
    for (const key in jsonData) {
      const found = this.findDashboardTitle(jsonData[key]);
      if (found) return found;
    }
    return null;
  }

  buildOutput(panels, labels, hideEmpty, template, dashboardTitle) {
    // AGRUPAMENTO PARA <tag>
    const prometheusTitles = [];
    const prometheusLegends = [];
    const zabbixTitles = [];
    const zabbixAliases = [];

    panels.forEach(panel => {
      panel.prometheus.forEach(p => {
        if (p.refId && p.refId !== "<empty>") prometheusTitles.push(p.refId);
        if (p.legendFormat && p.legendFormat !== "<empty>") prometheusLegends.push(p.legendFormat);
      });

      panel.zabbix.forEach(z => {
        if (z.refId && z.refId !== "<empty>") zabbixTitles.push(z.refId);
        if (z.alias && z.alias !== "<empty>") zabbixAliases.push(z.alias);
      });
    });

    const tagSection = [
      "ZABBIX",
      "TITLES FOUND:",
      zabbixTitles.join(', ') || "<none>",
      "",
      "setAlias FOUND:",
      zabbixAliases.join(', ') || "<none>",
      "",
      "PROMETHEUS",
      "TITLES FOUND:",
      prometheusTitles.join(', ') || "<none>",
      "",
      "LEGENDS FOUND:",
      prometheusLegends.join(', ') || "<none>"
    ].join("\n");

    const header = template
      .replace('<dashboard name>', dashboardTitle)
      .replace('<inputs>', labels.join(', '))
      .replace('<label>', tagSection);

    const outputBlocks = panels.map(panel => {
      let section = [`Panel: ${panel.panelTitle}`];

      // ZABBIX SECTION
      panel.zabbix.forEach(zbx => {
        const labelMatches = labels.includes(zbx.refId) || labels.includes(zbx.alias);
        const allEmpty = [zbx.refId, zbx.group, zbx.host, zbx.item, zbx.alias]
          .every(value => value === "<empty>");
        if (hideEmpty && allEmpty) return;
        if (!labelMatches && labels.length > 0) return;

        section.push([
          "- ZABBIX DATA ITEM -",
          `Title:\n\`\`\`\n${zbx.refId}\n\`\`\``,
          `Group:\n\`\`\`\n${zbx.group}\n\`\`\``,
          `Host:\n\`\`\`\n${zbx.host}\n\`\`\``,
          `Item:\n\`\`\`\n${zbx.item}\n\`\`\``,
          `setAlias:\n\`\`\`\n${zbx.alias}\n\`\`\``,
          "---"
        ].join("\n"));
      });

      // PROMETHEUS SECTION
      panel.prometheus.forEach(pmt => {
        const labelMatches = labels.includes(pmt.legendFormat) || labels.includes(pmt.refId);
        const expr = pmt.expr?.trim() || "- -";
        if (hideEmpty && expr === "- -") return;
        if (!labelMatches && labels.length > 0) return;

        section.push([
          "- PROMETHEUS DATA ITEM -",
          `Title:\n\`\`\`\n${pmt.refId}\n\`\`\``,
          `Legenda:\n\`\`\`\n${pmt.legendFormat}\n\`\`\``,
          `PromQL:\n\`\`\`PromQL\n${expr}\n\`\`\``,
          "---"
        ].join("\n\n"));
      });

      return section.length > 1 ? section.join("\n\n") : null;
    }).filter(Boolean);

    return `${header}\n\n${outputBlocks.join('\n\n')}`;
  }
}
