<p align="right">
  <a href="#ex-trator-promql-pt-br">🇧🇷 Português-BR</a> |
  <a href="#ex-trator-promql-en">🇺🇸 English</a> |
  <a href="#ex-trator-promql-imgs">IMAGENS / IMAGES</a>
</p>

---

## 🇧🇷 EXTRATOR PromQL (PT-BR) <a name="ex-trator-promql-pt-br"></a>

Ferramenta web criada para extrair de forma inteligente e formatada todas as expressões **PromQL** de dashboards do **Grafana** que utilizam **datasource do tipo Prometheus**.

### 🎯 Objetivo do Projeto
Desenvolver uma interface simples, leve e funcional para extrair automaticamente as expressões PromQL usadas em painéis de dashboards Grafana...

### 🛠️ Finalidade
Ideal para engenheiros de redes, analistas de observabilidade...

### ⚙️ O que faz?
- Lê arquivos JSON exportados do Grafana
- Filtra painéis com Prometheus
- Extrai expressões PromQL (expr)
- Filtra por TAGs (como `%loss`, `median`, etc.)
- Gera relatórios em texto e Markdown

### 🚀 Benefícios Práticos
- Economiza tempo
- Padroniza saídas
- Zero dependências externas
- Interface responsiva

### 🧱 Tecnologias
HTML5, CSS3, JS puro (Vanilla)

### 📌 Limitações
- Apenas Grafana
- Apenas Prometheus

### 💡 Exemplos de uso
- Auditar dashboards
- Compartilhar PromQLs com equipes

---

## IMAGENS / IMAGES <a name="ex-trator-promql-imgs"></a>

![Pagina JSON](imgs/pg_json.png)

![Pagina TAG](imgs/pg_tag.png)

![Pagina TÍTULO](imgs/pg_titulo.png)

![Pagina SAÍDA](imgs/pg_saida.png)

---

## 🇺🇸 EXTRATOR PromQL (EN) <a name="ex-trator-promql-en"></a>

Web-based tool designed to intelligently and cleanly extract **PromQL** expressions from **Grafana** dashboards using **Prometheus** datasources.

### 🎯 Project Goal
Simple, lightweight UI to extract PromQL for auditing, reporting...

### 🛠️ Purpose
For network engineers, SREs, and observability analysts.

### ⚙️ What it does:
- Parses Grafana JSON
- Filters Prometheus panels
- Extracts PromQL `expr`s
- Filters by TAGs (e.g., `%loss`, `median`)
- Generates Markdown and plain text reports

### 🚀 Benefits
- Saves time
- Standardizes output
- Works offline (no backend)
- Clean, responsive UI

### 🧱 Built With
HTML5 + CSS3 + Vanilla JS

### 📌 Limitations
- Grafana only
- Prometheus only

### 💡 Use Cases
- Share PromQL with teams
- Audit metric configurations

---
