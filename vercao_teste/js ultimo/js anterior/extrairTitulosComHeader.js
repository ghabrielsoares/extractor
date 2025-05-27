const fs = require('fs');
const path = require('path');

const entrada = path.join(__dirname, 'dash.json');
const saida = path.join(__dirname, 'saida.txt');

function encontrarTimeseriesComPromQL(obj, resultado = []) {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      encontrarTimeseriesComPromQL(item, resultado);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.type === 'timeseries' && obj.title) {
      const painel = {
        titulo: obj.title,
        expr1: null,
        expr2: null,
      };

      if (Array.isArray(obj.targets)) {
        for (const target of obj.targets) {
          if (target.expr && target.legendFormat) {
            if (target.legendFormat === 'median') {
              painel.expr1 = target.expr;
            } else if (target.legendFormat === '%loss') {
              painel.expr2 = target.expr;
            }
          }
        }
      }

      resultado.push(painel);
    }

    for (const key in obj) {
      encontrarTimeseriesComPromQL(obj[key], resultado);
    }
  }

  return resultado;
}

function encontrarTituloDashboard(obj) {
  // Busca no nível raiz ou próximo ao final da estrutura
  if (obj && typeof obj === 'object') {
    if (obj.title && typeof obj.title === 'string') {
      return obj.title;
    }

    for (const key in obj) {
      const encontrado = encontrarTituloDashboard(obj[key]);
      if (encontrado) return encontrado;
    }
  }

  return 'DASHBOARD SEM TÍTULO';
}

try {
  const conteudoJson = fs.readFileSync(entrada, 'utf-8');
  const jsonData = JSON.parse(conteudoJson);

  const tituloDashboard = encontrarTituloDashboard(jsonData);
  const paineis = encontrarTimeseriesComPromQL(jsonData);

  const cabecalho = `${tituloDashboard}
Este dashboard capta as informações obtidas pelo "PROMETHEUS".
Obtém a "Media Last" em ms, e "%Loss Last" ambos da latência, dos seguintes serviços e operadoras:
`;

  const blocos = paineis.map(p => {
    let bloco = `${p.titulo}`;
    if (p.expr1) {
      bloco += `\nPromQL 1 Media:\n\`\`\`PromQL\n${p.expr1}\n\`\`\``;
    }
    if (p.expr2) {
      bloco += `\nPromQL 2 Loss:\n\`\`\`PromQL\n${p.expr2}\n\`\`\``;
    }
    bloco += `\n---`;
    return bloco;
  });

  const conteudoFinal = `${cabecalho}\n${blocos.join('\n\n')}\n`;

  fs.writeFileSync(saida, conteudoFinal, 'utf-8');
  console.log(`✅ Exportado para saida.txt com ${paineis.length} painel(is).`);
} catch (erro) {
  console.error('❌ Erro ao processar o arquivo:', erro.message);
}
