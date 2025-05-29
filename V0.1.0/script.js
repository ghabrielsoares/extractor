document.getElementById("processBtn").addEventListener("click", () => {
  const rawJson = document.getElementById("jsonInput").value.trim();
  const keywords = document.getElementById("keywordsInput").value
    .split(',')
    .map(k => k.trim())
    .filter(k => k !== '');

  const showDashName = document.getElementById("showDashboardName").checked;
  const showPanelName = document.getElementById("showPanelName").checked;

  const template = document.getElementById("headerTemplate").value;

  let json;
  try {
    json = JSON.parse(rawJson);
  } catch (e) {
    return alert("❌ JSON inválido");
  }

  const dashboardTitle = findDashboardTitle(json) || "- -";
  const panels = extractPanels(json);

  const filteredPanels = panels.map(panel => {
    const matches = panel.targets.filter(t =>
      keywords.includes(t.legendFormat)
    );

    // Se achou alguma, usa. Se não achou nenhuma, cria com - -
    const targets = matches.length > 0
      ? matches
      : keywords.map(k => ({ legendFormat: k, expr: "- -" }));

    return {
      title: panel.title || "- -",
      targets
    };
  });

  const header = template
    .replace("<nome do dashboard>", dashboardTitle)
    .replace("<inputs>", keywords.join(", "));

  const body = filteredPanels.map(panel => {
    let bloco = showPanelName ? `${panel.title}\n` : '';
    panel.targets.forEach(target => {
      bloco += `${target.legendFormat}:\n\`\`\`PromQL\n${target.expr}\n\`\`\`\n`;
    });
    return bloco + "---";
  }).join("\n\n");

  const finalOutput = showDashName ? `${header}\n\n${body}` : body;

  document.getElementById("outputText").textContent = finalOutput;
  document.getElementById("outputModal").classList.remove("hidden");
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("outputModal").classList.add("hidden");
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("outputText").textContent;
  navigator.clipboard.writeText(text)
    .then(() => {
      document.getElementById("copyBtn").textContent = "✅ Copiado!";
      setTimeout(() => {
        document.getElementById("copyBtn").textContent = "📋 Copiar";
      }, 2000);
    })
    .catch(err => alert("Erro ao copiar: " + err));
});

function findDashboardTitle(obj) {
  if (typeof obj === 'object' && obj !== null) {
    if (obj.title && typeof obj.title === 'string') {
      return obj.title;
    }
    for (const key in obj) {
      const found = findDashboardTitle(obj[key]);
      if (found) return found;
    }
  }
  return null;
}

function extractPanels(obj, results = []) {
  if (Array.isArray(obj)) {
    obj.forEach(item => extractPanels(item, results));
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.targets && Array.isArray(obj.targets)) {
      results.push({
        title: obj.title || "- -",
        targets: obj.targets.map(t => ({
          legendFormat: t.legendFormat || "- -",
          expr: t.expr || "- -"
        }))
      });
    }
    for (const key in obj) {
      extractPanels(obj[key], results);
    }
  }
  return results;
}
