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

  const tags = rawTags
    .split(/[\n,\s,]+/)
    .map(tag => {
      const lower = tag.trim().toLowerCase();
      return (lower === "<v>" || lower === "<vazio>") ? "__auto" : tag.trim();
    })
    .filter(Boolean);

  let json;
  try {
    json = JSON.parse(rawJson);
  } catch {
    alert("JSON inválido.");
    return;
  }

  const dashTitle = findDashboardTitle(json) || "- -";
  const panels = extractPanels(json);

  const outputBlocks = panels.map(panel => {
    const lines = [`${panel.title}`];
    tags.forEach(tag => {
      const match = panel.targets.find(t => t.legendFormat === tag);
      lines.push(`PromQL ${tag}:\n\`\`\`PromQL\n${match ? match.expr : '- -'}\n\`\`\``);
    });
    return lines.join('\n') + '\n---';
  });

  const header = template
    .replace('<nome do dashboard>', dashTitle)
    .replace('<inputs>', tags.join(', '))
    .replace('<tag>', tags.join(', '));

  const finalOutput = `${header}\n\n${outputBlocks.join('\n\n')}`;
  document.getElementById("outputText").textContent = finalOutput;
  document.getElementById("outputModal").classList.remove("hidden");
});

// Modal
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
