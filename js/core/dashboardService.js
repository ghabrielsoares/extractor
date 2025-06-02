import { extractPrometheusTargets } from './extractors/prometheus.js';
import { extractZabbixTargets } from './extractors/zabbix.js';
import { DashboardPort } from '../ports/dashboardPort.js';

export class DashboardService extends DashboardPort {
  constructor(outputLabels) {
    super();
    this.outputLabels = outputLabels;
  }

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
    const {
      panel,
      title,
      legend,
      group,
      host,
      item,
      zabbixTitles,
      zabbixAliases,
      prometheusTitles,
      prometheusLegends
    } = this.outputLabels;

    const prometheusTitlesArr = [];
    const prometheusLegendsArr = [];
    const zabbixTitlesArr = [];
    const zabbixAliasesArr = [];

    panels.forEach(panel => {
      panel.prometheus.forEach(p => {
        if (p.refId && p.refId !== "<empty>") prometheusTitlesArr.push(p.refId);
        if (p.legendFormat && p.legendFormat !== "<empty>") prometheusLegendsArr.push(p.legendFormat);
      });

      panel.zabbix.forEach(z => {
        if (z.refId && z.refId !== "<empty>") zabbixTitlesArr.push(z.refId);
        if (z.alias && z.alias !== "<empty>") zabbixAliasesArr.push(z.alias);
      });
    });

    // === NOVA LÓGICA: OCULTAR CAMPOS VAZIOS NO BLOCO <label> ===
    const zabbixLines = [];
    const prometheusLines = [];

    const zabbixTitlesSet = [...new Set(zabbixTitlesArr)];
    const zabbixAliasesSet = [...new Set(zabbixAliasesArr)];

    if (zabbixTitlesSet.length > 0 || zabbixAliasesSet.length > 0) {
      zabbixLines.push("ZABBIX");

      if (zabbixTitlesSet.length > 0) {
        zabbixLines.push(`${zabbixTitles}:`);
        zabbixLines.push(zabbixTitlesSet.join(', '));
        zabbixLines.push("");
      }

      if (zabbixAliasesSet.length > 0) {
        zabbixLines.push(`${zabbixAliases}:`);
        zabbixLines.push(zabbixAliasesSet.join(', '));
        zabbixLines.push("");
      }
    }

    const prometheusTitlesSet = [...new Set(prometheusTitlesArr)];
    const prometheusLegendsSet = [...new Set(prometheusLegendsArr)];

    if (prometheusTitlesSet.length > 0 || prometheusLegendsSet.length > 0) {
      prometheusLines.push("PROMETHEUS");

      if (prometheusTitlesSet.length > 0) {
        prometheusLines.push(`${prometheusTitles}:`);
        prometheusLines.push(prometheusTitlesSet.join(', '));
        prometheusLines.push("");
      }

      if (prometheusLegendsSet.length > 0) {
        prometheusLines.push(`${prometheusLegends}:`);
        prometheusLines.push(prometheusLegendsSet.join(', '));
        prometheusLines.push("");
      }
    }

    const labelSection = [...zabbixLines, ...prometheusLines].join("\n").trim();

    const header = template
      .replace('<dashboard name>', dashboardTitle)
      .replace('<inputs>', labels.join(', '))
      .replace('<label>', labelSection);

    const outputBlocks = panels.map(panel => {
      let section = [`${panel ? panel.panelTitle ? `${panel}: ${panel.panelTitle}` : `${panel}: <empty>` : "<empty>"}`];

      // ZABBIX
      panel.zabbix.forEach(zbx => {
        const labelMatches = labels.includes(zbx.refId) || labels.includes(zbx.alias);
        const allEmpty = [zbx.refId, zbx.group, zbx.host, zbx.item, zbx.alias]
          .every(v => v === "<empty>" || v === "<none>");
        if (hideEmpty && allEmpty) return;
        if (!labelMatches && labels.length > 0) return;

        const itemBlock = ["- ZABBIX DATA ITEM -"];

        if (!hideEmpty || zbx.refId !== "<empty>") {
          itemBlock.push(`${title}:\n\`\`\`\n${zbx.refId}\n\`\`\``);
        }

        if (!hideEmpty || zbx.group !== "<empty>") {
          itemBlock.push(`${group}:\n\`\`\`\n${zbx.group}\n\`\`\``);
        }

        if (!hideEmpty || zbx.host !== "<empty>") {
          itemBlock.push(`${host}:\n\`\`\`\n${zbx.host}\n\`\`\``);
        }

        if (!hideEmpty || zbx.item !== "<empty>") {
          itemBlock.push(`${item}:\n\`\`\`\n${zbx.item}\n\`\`\``);
        }

        if (!hideEmpty || zbx.alias !== "<empty>") {
          itemBlock.push(`setAlias:\n\`\`\`\n${zbx.alias}\n\`\`\``);
        }

        itemBlock.push("---");
        section.push(itemBlock.join("\n\n"));
      });

      // PROMETHEUS
      panel.prometheus.forEach(pmt => {
        const labelMatches = labels.includes(pmt.legendFormat) || labels.includes(pmt.refId);
        const expr = pmt.expr?.trim() || "<empty>";
        const isExprEmpty = expr === "<empty>";
        const isLegendEmpty = pmt.legendFormat === "<empty>";
        const isTitleEmpty = pmt.refId === "<empty>";

        const shouldHideAll = hideEmpty && isExprEmpty && isLegendEmpty && isTitleEmpty;
        if (shouldHideAll) return;
        if (!labelMatches && labels.length > 0) return;

        const itemBlock = ["- PROMETHEUS DATA ITEM -"];

        if (!hideEmpty || !isTitleEmpty) {
          itemBlock.push(`${title}:\n\`\`\`\n${pmt.refId}\n\`\`\``);
        }

        if (!hideEmpty || !isLegendEmpty) {
          itemBlock.push(`${legend}:\n\`\`\`\n${pmt.legendFormat}\n\`\`\``);
        }

        if (!hideEmpty || !isExprEmpty) {
          itemBlock.push(`PromQL:\n\`\`\`PromQL\n${expr}\n\`\`\``);
        }

        itemBlock.push("---");
        section.push(itemBlock.join("\n\n"));
      });

      return section.length > 1 ? section.join("\n\n") : null;
    }).filter(Boolean);

    return `${header}\n\n${outputBlocks.join('\n\n')}`;
  }
}
