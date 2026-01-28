# 📊 CSV Analyzer Dashboard

**🌐 [Acesse o projeto online](https://csv-analyzer-dashboard-5mg8skczn-danera1903s-projects.vercel.app)**

Ferramenta web para análise e visualização de dados CSV, desenvolvida em React com foco em análise estatística e visualização interativa.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![Recharts](https://img.shields.io/badge/Recharts-2.x-8884D8)

## 📋 Sobre o Projeto

Dashboard interativo para análise de dados em formato CSV, permitindo upload de arquivos, cálculo automático de estatísticas descritivas e geração de visualizações gráficas. Desenvolvido como parte do portfólio pessoal combinando conhecimentos em **Biomedicina** e **Sistemas de Informação**.

## ✨ Funcionalidades

- ✅ **Upload de arquivos CSV** com validação de tipo e tamanho
- ✅ **Detecção automática** de colunas numéricas vs texto
- ✅ **Estatísticas descritivas** completas:
  - Média, Mediana, Mínimo, Máximo
  - Desvio Padrão
  - Contagem de valores únicos
- ✅ **Visualizações interativas:**
  - Gráfico de barras para dados numéricos
  - Gráfico de pizza para distribuição de categorias
- ✅ **Tabela de dados** com preview das primeiras 10 linhas
- ✅ **Interface responsiva** e moderna
- ✅ **Tratamento de erros** robusto

## 🎯 Casos de Uso

- Análise de dados financeiros (receitas, despesas)
- Dados de pesquisas e questionários
- Resultados de experimentos laboratoriais
- Dados de vendas e e-commerce
- Análise exploratória de qualquer dataset CSV

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Danera1903/csv-analyzer-dashboard.git
```

2. Entre na pasta do projeto:
```bash
cd csv-analyzer-dashboard
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm start
```

O aplicativo abrirá automaticamente em `http://localhost:3000`

## 💡 Exemplo de Uso

1. Prepare um arquivo CSV com seus dados
2. Clique na área de upload ou arraste o arquivo
3. Visualize automaticamente:
   - Estatísticas por coluna
   - Gráficos interativos
   - Tabela com os dados

### Exemplo de CSV:
```csv
data,categoria,valor,tipo
2025-01-01,Alimentação,150.50,saída
2025-01-02,Salário,5000.00,entrada
2025-01-03,Transporte,45.00,saída
```

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Recharts** - Biblioteca de gráficos para React
- **PapaParse** - Parser robusto de CSV
- **Lucide React** - Ícones modernos

## 📊 Estatísticas Calculadas

### Para Colunas Numéricas:
- **Count**: Quantidade de valores
- **Mean**: Média aritmética
- **Median**: Valor central
- **Min/Max**: Menor e maior valor
- **Std Dev**: Desvio padrão (dispersão dos dados)

### Para Colunas de Texto:
- **Count**: Quantidade de valores
- **Unique**: Quantidade de valores únicos
- **Sample Values**: Exemplos dos valores encontrados

## 📝 Estrutura do Projeto
```
src/
├── App.js          # Componente principal com toda a lógica
├── index.js        # Ponto de entrada da aplicação
└── index.css       # Configuração do Tailwind
```

## 🎓 Sobre o Desenvolvedor

Projeto desenvolvido por Daniel, graduado em **Biomedicina** e graduando em **Sistemas de Informação**, com interesse em análise de dados, visualização e desenvolvimento de ferramentas para ciência de dados.

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!