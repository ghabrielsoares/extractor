<p align="right">
  <a href="#extrator-pt-br">🇧🇷 Português-BR</a> |
  <a href="#extrator-en">🇺🇸 English</a> |
  <a href="#extrator-imgs">IMAGENS / IMAGES</a>
</p>

---

# EXTRATOR — Versão 2.0.0

---

## 🇧🇷 EXTRATOR (PT-BR) <a name="extrator-pt-br"></a>

**EXTRATOR** é uma ferramenta web avançada para extrair de forma inteligente e formatada expressões **PromQL** e dados de coleta **Zabbix** a partir de dashboards exportados do **Grafana**.

---

### 🎯 Objetivo do Projeto
Proporcionar uma experiência moderna e automatizada para leitura e auditoria de dashboards Grafana, permitindo a extração de dados estruturados para Prometheus e Zabbix com extrema facilidade.

---

### 🛠️ Finalidade
Ideal para:

- Engenheiros de redes
- Analistas de observabilidade
- Equipes NOC/SRE que mantêm dashboards em ambientes críticos

---

### 🆕 Novidades da versão 2.0.0

- 🧠 **Suporte completo a Zabbix Datasource**
- 🔬 Extração dos campos: `refId`, `host`, `group`, `item`, `setAlias`
- 📌 Exibição agrupada por **painel**
- 🧼 Saída padronizada para **Prometheus** e **Zabbix**
- 🔎 Ignora campos vazios com opção via checkbox
- ✍️ Identificação clara do nome do painel no início de cada bloco
- 🗂️ Arquitetura modular Hexagonal
- 🌐 Interface responsiva, moderna e sem dependências externas

---

### ⚙️ O que o EXTRATOR faz?

- Lê arquivos JSON exportados do Grafana
- Detecta e separa painéis por tipo de datasource:
  - `Prometheus`
  - `Zabbix`
- Extrai expressões `expr` (Prometheus) e dados `refId`, `group`, `host`, `item`, `setAlias` (Zabbix)
- Permite busca por **TAGs**
- Gera relatório final limpo, formatado e exportável
- Botões para copiar, baixar `.txt` e `.md`

---

### 🚀 Benefícios Práticos

- **Economiza tempo**
- **Padroniza relatórios**
- **Facilita auditoria de dashboards**
- **Funciona localmente, offline**
- **Interface moderna e responsiva**

---

### 🧱 Tecnologias Utilizadas

- HTML5 + CSS3 (responsivo via Viewport Units)
- JavaScript Vanilla
- Arquitetura em camadas (MVC + Hexagonal)
- Layout inspirado em UI/UX modernos (Figma)

---

### 📌 Limitações atuais

- Apenas dashboards do Grafana (`.json` exportado)
- Suporte apenas a datasources:
  - `Prometheus`
  - `Zabbix`

---

### 💡 Exemplos de uso

- Auditoria de métricas e coletas
- Documentação técnica para equipes
- Validação de configurações Prometheus e Zabbix
- Compartilhamento de relatórios de coleta

---

## 🇺🇸 EXTRATOR (EN) <a name="extrator-en"></a>

**EXTRATOR** is a powerful web tool for intelligently extracting and formatting **PromQL** and **Zabbix collection** data from exported **Grafana dashboards**.

---

### 🎯 Project Goal

Deliver a modern, automated way to review and audit Grafana dashboards, enabling structured data extraction for both Prometheus and Zabbix.

---

### 🛠️ Purpose

Designed for:

- Network Engineers
- Observability / SRE Teams
- NOC analysts managing critical dashboards

---

### 🆕 What's New in Version 2.0.0

- 🧠 **Full support for Zabbix datasource**
- 🔍 Extracts fields: `refId`, `host`, `group`, `item`, `setAlias`
- 📌 Outputs grouped by **panel name**
- 🧼 Unified formatting for **Prometheus** and **Zabbix**
- 🔎 Option to hide empty values
- ✍️ Panel title included in each output block
- 🗂️ Hexagonal architecture for scalability
- 🌐 Offline, responsive, dependency-free UI

---

### ⚙️ What It Does

- Parses Grafana-exported JSON files
- Detects and separates Prometheus and Zabbix datasources
- Extracts structured expressions for:
  - `expr` (Prometheus)
  - `setAlias`, `refId`, `host`, `group`, `item` (Zabbix)
- Filters by provided TAGs
- Outputs well-formatted reports
- Supports download (`.md`, `.txt`) and copy with visual feedback

---

### 🚀 Practical Benefits

- Saves hours of manual auditing
- Clean standardized reports
- Offline usage (no backend/server)
- Mobile and desktop-friendly interface

---

### 🧱 Built With

- HTML5 + CSS3
- Pure Vanilla JS
- Modular & scalable architecture (MVC + Hexagonal)

---

### 📌 Current Limitations

- Works only with Grafana dashboards
- Supports only Prometheus and Zabbix datasources

---

### 💡 Use Cases

- Auditing collection metrics
- Standardized technical documentation
- Comparing Prometheus vs Zabbix metrics
- Exporting data to share with your team

---

## IMAGENS / IMAGES <a name="extrator-imgs"></a>

### Página JSON
![Pagina JSON](imgs/photography/pg_json.png)

### Página TAG
![Pagina TAG](imgs/photography/pg_tag.png)

### Página TÍTULO
![Pagina TÍTULO](imgs/photography/pg_titulo.png)

### Página SAÍDA
![Pagina SAÍDA](imgs/photography/pg_saida.png)

---

🛠 Projeto desenvolvido e mantido por **@ghabrielsoares**
