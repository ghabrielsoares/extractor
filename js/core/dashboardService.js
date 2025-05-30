// EN: Main dashboard service (implements DashboardPort)
// PT-BR: Serviço principal do dashboard (implementa DashboardPort)

import { extractPrometheusTargets } from './extractors/prometheus.js';
import { extractZabbixTargets } from './extractors/zabbix.js';
import { DashboardPort } from '../ports/dashboardPort.js';

export class DashboardService extends DashboardPort {
  parseTags(rawTags, jsonData) {
    const isAll = /<todos>|<all>/i.test(rawTags);
    if (isAll) {
      const panels = this.extractPanels(jsonData);
      return Array.from(
        new Set(
          panels.flatMap(panel =>
            panel.prometheus.map(t => t.legendFormat || "- -")
          )
        )
      );
    }

    return rawTags
      .split(/[\n,\s,]+/)
      .map(tag => {
        const lower = tag.trim().toLowerCase();
        return lower === "<v>" || lower === "<vazio>" || lower === "<empty>"
          ? "__auto"
          : tag.trim();
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

  buildOutput(panels, tags, hideEmpty, template, dashboardTitle) {
    const header = template
      .replace('<dashboard name>', dashboardTitle)
      .replace('<inputs>', tags.join(', '))
      .replace('<tag>', tags.join(', '));

    const outputBlocks = panels.map(panel => {
      let section = [`Panel: ${panel.panelTitle}`];

      // ZABBIX SECTION
      panel.zabbix.forEach(zbx => {
        const allEmpty = [zbx.refId, zbx.group, zbx.host, zbx.item, zbx.alias]
          .every(value => value === "<empty>");
        if (hideEmpty && allEmpty) return;

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
      tags.forEach(tag => {
        const match = panel.prometheus.find(p => p.legendFormat === tag);
        const expr = match?.expr?.trim() || "- -";

        if (hideEmpty && expr === "- -") return;

        section.push([
          "- PROMETHEUS DATA ITEM -",
          `PromQL ${tag}:\n\`\`\`PromQL\n${expr}\n\`\`\``,
          "---"
        ].join("\n\n"));
      });

      return section.length > 1 ? section.join("\n\n") : null;
    }).filter(Boolean);

    return `${header}\n\n${outputBlocks.join('\n\n')}`;
  }
}
