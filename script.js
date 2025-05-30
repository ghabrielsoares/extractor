// Tab switching
document.querySelectorAll('.tab-button').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.getElementById("generateBtn").addEventListener("click", () => {
  const rawJson = document.getElementById("jsonInput").value.trim();
  const rawTags = document.getElementById("tagsInput").value.trim();
  const template = document.getElementById("titleInput").value.trim();
  const hideEmpty = document.getElementById("hideEmpty").checked;

  let tags;
  const isAll = /<todos>|<all>/i.test(rawTags);

  let json;
  try {
    json = JSON.parse(rawJson);
  } catch {
    alert("JSON inválido.");
    return;
  }

  if (isAll) {
    tags = Array.from(
      new Set(
        extractPanels(json).flatMap(panel =>
          panel.prometheus.map(t => t.legendFormat || '- -')
        )
      )
    );
  } else {
    tags = rawTags
      .split(/[\n,\s]+/)
      .map(tag => {
        const lower = tag.trim().toLowerCase();
        return (lower === "<v>" || lower === "<vazio>") ? "__auto" : tag.trim();
      })
      .filter(Boolean);
  }

  const dashTitle = findDashboardTitle(json) || "- -";
  const panels = extractPanels(json);

const outputBlocks = panels.map(panel => {
  let blocos = [];

  blocos.push(`Painel: ${panel.painel}`);

  // ZABBIX
  panel.zabbix.forEach(zbx => {
    if (
      hideEmpty &&
      zbx.refId === "<vazio>" &&
      zbx.group === "<vazio>" &&
      zbx.host === "<vazio>" &&
      zbx.item === "<vazio>" &&
      zbx.alias === "<vazio>"
    ) return;

    const zabbixBloco = [
      `- ITEM DE COLETA ZABBIX -`,
      `Titulo:\n\`\`\`\n${zbx.refId}\n\`\`\``,
      `Group:\n\`\`\`\n${zbx.group}\n\`\`\``,
      `Host:\n\`\`\`\n${zbx.host}\n\`\`\``,
      `Item:\n\`\`\`\n${zbx.item}\n\`\`\``,
      `setAlias:\n\`\`\`\n${zbx.alias}\n\`\`\``,
      `---`
    ].join('\n');
    blocos.push(zabbixBloco);
  });

  // PROMETHEUS
  tags.forEach(tag => {
    const match = panel.prometheus.find(t => t.legendFormat === tag);
    const expr = match?.expr?.trim() || "- -";

    if (hideEmpty && expr === "- -") return;

    const blocoPrometheus = [
      `- ITEM DE COLETA PROMETHEUS -`,
      `PromQL ${tag}:\n\`\`\`PromQL\n${expr}\n\`\`\``,
      `---`
    ].join('\n\n');

    blocos.push(blocoPrometheus);
  });

  return blocos.length ? blocos.join('\n\n') : null;
}).filter(Boolean);


  const header = template
    .replace('<nome do dashboard>', dashTitle)
    .replace('<inputs>', tags.join(', '))
    .replace('<tag>', tags.join(', '));

  const finalOutput = `${header}\n\n${outputBlocks.join('\n\n')}`;
  document.getElementById("outputText").textContent = finalOutput;
  document.getElementById("outputModal").classList.remove("hidden");
});

// Modal controls
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("outputModal").classList.add("hidden");
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("outputText").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    btn.src = "icons/copy_verde.png";
    setTimeout(() => {
      btn.src = "icons/copy_azul.png";
    }, 2000);
  });
});

document.getElementById("downloadTxt").addEventListener("click", () => {
  downloadFile("output.txt");
});

document.getElementById("downloadMd").addEventListener("click", () => {
  downloadFile("output.md");
});

function downloadFile(filename) {
  const text = document.getElementById("outputText").textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function findDashboardTitle(obj) {
  if (typeof obj !== 'object' || obj === null) return null;
  if (obj.title) return obj.title;
  for (const key in obj) {
    const found = findDashboardTitle(obj[key]);
    if (found) return found;
  }
  return null;
}

// 🔍 Detecta e separa PROMETHEUS e ZABBIX
function extractPanels(obj, results = []) {
  if (Array.isArray(obj)) {
    obj.forEach(item => extractPanels(item, results));
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.targets && Array.isArray(obj.targets)) {
      const prometheusTargets = [];
      const zabbixTargets = [];

      obj.targets.forEach(target => {
        const type = (target?.datasource?.type || '').toLowerCase();
        if (type.includes("zabbix")) {
          zabbixTargets.push({
            refId: target.refId || "<vazio>",
            group: target.group?.filter?.trim() || "<vazio>",
            host: target.host?.filter?.trim() || "<vazio>",
            item: target.item?.filter?.trim() || "<vazio>",
            alias: target.functions?.[0]?.params?.[0] || "<vazio>"
          });
        } else {
          prometheusTargets.push({
            legendFormat: target.legendFormat || "- -",
            expr: target.expr || "- -"
          });
        }
      });

      results.push({
        painel: obj.title || "<vazio>",
        prometheus: prometheusTargets,
        zabbix: zabbixTargets
      });
    }

    for (const key in obj) {
      extractPanels(obj[key], results);
    }
  }

  return results;
}

