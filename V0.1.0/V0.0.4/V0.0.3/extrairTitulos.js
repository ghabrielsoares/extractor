const fs = require('fs');
const path = require('path');

const entrada = path.join(__dirname, 'dash.json');
const saida = path.join(__dirname, 'saida.txt');

// Função recursiva para buscar todos os títulos do tipo "timeseries"
function encontrarTitulosTimeseries(obj, resultado = []) {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      encontrarTitulosTimeseries(item, resultado);
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.type === 'timeseries' && obj.title) {
      resultado.push(obj.title);
    }

    for (const key in obj) {
      encontrarTitulosTimeseries(obj[key], resultado);
    }
  }

  return resultado;
}

try {
  const conteudoJson = fs.readFileSync(entrada, 'utf-8');
  const jsonData = JSON.parse(conteudoJson);

  const titulos = encontrarTitulosTimeseries(jsonData);

  if (titulos.length === 0) {
    console.log('Nenhum título do tipo "timeseries" encontrado.');
  } else {
    const conteudoSaida = titulos.join('\n');
    fs.writeFileSync(saida, conteudoSaida, 'utf-8');
    console.log(`✅ ${titulos.length} título(s) exportado(s) para saida.txt`);
  }
} catch (erro) {
  console.error('❌ Erro ao processar o arquivo:', erro.message);
}
