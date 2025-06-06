<p align="right">
  <a href="#extrator-pt-br">🇧🇷 Português-BR</a> |
  <a href="#extrator-en">🇺🇸 English</a> |
  <a href="#extrator-imgs">IMAGENS / IMAGES</a>
</p>

---

# EXTRATOR — Versão 4.0.0

---

## 🇧🇷 EXTRATOR (PT-BR) <a name="extrator-pt-br"></a>

**EXTRATOR** é uma ferramenta web avançada para extrair de forma inteligente e formatada expressões **PromQL** e dados de coleta **Zabbix** a partir de dashboards exportados do **Grafana**, com suporte multilíngue, filtros otimizados por **labels** e interface interativa.

---

### 🎯 Objetivo do Projeto
Modernizar a auditoria de dashboards Grafana, oferecendo uma experiência fluida, offline, multilíngue e automatizada para extração de métricas Prometheus e Zabbix.

---

### 🛠️ Finalidade
Ideal para:

- Engenheiros de redes
- Equipes NOC/SRE
- Times de observabilidade e infraestrutura crítica

---

### 🆕 Novidades da versão 4.0.0

- 📂 **Suporte a múltiplos arquivos JSON** com navegação entre saídas
- 🧭 **Botões de navegação (⭠ / ⭢)** para alternar entre os resultados gerados
- 🗂 **Cada arquivo gera uma saída separada**, com indicador “Arquivo X de Y”
- 🔒 **Maior controle sobre o fluxo de entrada e saída**, evitando sobrescrições acidentais
- 🔁 Arquitetura mantida: **MVC + Hexagonal**

---

### ⚙️ O que o EXTRATOR faz?

- Lê arquivos JSON exportados do Grafana
- Identifica painéis com datasource `Prometheus` e `Zabbix`
- Extrai:
  - Prometheus: `expr`, `legendFormat`, `refId`
  - Zabbix: `refId`, `group`, `host`, `item`, `setAlias`
- Filtra por **Labels personalizadas**
- Gera relatório formatado com agrupamento por painel
- Exporta como `.txt`, `.md` ou cópia rápida

---

### 🚀 Benefícios Práticos

- Elimina trabalho manual repetitivo
- Facilita auditoria e documentação técnica
- Funciona offline
- Interface responsiva e multilíngue

---

### 🧱 Tecnologias Utilizadas

- HTML5 + CSS3
- JavaScript (ES Modules)
- Arquitetura modular (MVC + Hexagonal)
- Interface multilíngue com `supportLanguages.js`

---

### 📌 Limitações atuais

- Apenas dashboards Grafana (`.json`)
- Datasources suportados:
  - `Prometheus`
  - `Zabbix`

---

### 💡 Exemplos de uso

- Auditoria de coletas e métricas
- Validação de dashboards técnicos
- Padronização de relatórios para NOC/SRE
- Comparativo entre Prometheus e Zabbix

---

## 🇺🇸 EXTRATOR (EN) <a name="extrator-en"></a>

**EXTRATOR** is a powerful web tool for intelligently extracting and formatting **PromQL** and **Zabbix** data from **Grafana dashboards**, now with support for multi-file input and result navigation.

---

### 🎯 Project Goal

Provide a modern, interactive interface for auditing Grafana dashboards with structured Prometheus and Zabbix extraction — fully offline, multilingual, and user-friendly.

---

### 🛠️ Purpose

Designed for:

- Network Engineers
- NOC / SRE teams
- Infrastructure & Observability professionals

---

### 🆕 What's New in Version 4.0.0

- 📂 **Support for multiple JSON files** with separate outputs
- 🔀 **Navigation arrows (⭠ / ⭢)** to move between results
- 🧾 **Each file produces its own report with indicator “File X of Y”**
- 🔒 **Improved input/output flow with better control**
- 🔁 Still powered by a clean **MVC + Hexagonal** architecture

---

### ⚙️ What It Does

- Parses `.json` dashboards exported from Grafana
- Detects Prometheus and Zabbix targets
- Extracts:
  - Prometheus: `expr`, `legendFormat`, `refId`
  - Zabbix: `refId`, `group`, `host`, `item`, `setAlias`
- Filters by custom **labels**
- Outputs grouped and translated reports
- Exportable as `.txt`, `.md`, or copied to clipboard

---

### 🚀 Practical Benefits

- Reduces manual dashboard audits
- Creates consistent technical documentation
- Fully offline and lightweight
- Multilingual interface
- Modern UX, drag-and-drop friendly

---

### 🧱 Built With

- HTML5 + CSS3
- Vanilla JS (ES Modules)
- MVC + Hexagonal Architecture
- `supportLanguages.js` for i18n

---

### 📌 Current Limitations

- Only supports Grafana `.json` dashboards
- Prometheus and Zabbix datasources only

---

### 💡 Use Cases

- Metric auditing
- Zabbix / Prometheus validation
- Technical documentation generation
- Dashboard inspection for critical environments

---

## IMAGENS / IMAGES <a name="extrator-imgs"></a>

### Página JSON
![Pagina JSON](imgs/photography/pg_json.png)

### Página LABEL
![Pagina LABEL](imgs/photography/pg_tag.png)

### Página TÍTULO
![Pagina TÍTULO](imgs/photography/pg_titulo.png)

### Página SAÍDA
![Pagina SAÍDA](imgs/photography/pg_saida.png)

---

🛠 Projeto desenvolvido e mantido por: **@ghabrielsoares**
