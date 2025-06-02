// EN: Prometheus extractor utility
// PT-BR: Utilitário para extrair dados do Prometheus

/**
 * EN: Extracts Prometheus targets from a list of targets
 * PT-BR: Extrai targets do Prometheus de uma lista de targets
 */
export function extractPrometheusTargets(targets) {
  return (targets || [])
    .filter(t => {
      const type = t?.datasource?.type?.toLowerCase() || "";
      return !type.includes("zabbix");
    })
    .map(t => ({
      refId: t.refId || "<empty>",
      legendFormat: t.legendFormat || "<empty>",
      expr: t.expr || "<empty>"
    }));
}

