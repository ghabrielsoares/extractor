// EN: Zabbix extractor utility
// PT-BR: Utilitário para extrair dados do Zabbix

/**
 * EN: Extracts Zabbix targets from a list of targets
 * PT-BR: Extrai targets do Zabbix de uma lista de targets
 */
export function extractZabbixTargets(targets) {
  return (targets || [])
    .filter(t => {
      const type = t?.datasource?.type?.toLowerCase() || "";
      return type.includes("zabbix");
    })
    .map(t => ({
      refId: t.refId || "<empty>",
      group: t.group?.filter?.trim() || "<empty>",
      host: t.host?.filter?.trim() || "<empty>",
      item: t.item?.filter?.trim() || "<empty>",
      alias: t.functions?.[0]?.params?.[0] || "<empty>"
    }));
}
