# Voz & Voto — Filtro de Temas em Dropdown, Lista Completa de Deputados e Correção de Layout no Celular

Plano de resolução para os pontos apontados: **menu suspenso (dropdown) de temas no celular**, **disponibilização da lista integral de todos os deputados por partido** (com busca nominal, filtro por UF e voto Sim/Não) e **eliminação do botão "X" sobreposto ao texto** no modal de votação.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões Confirmadas com o Usuário:**
> 1. **Navegação de Deputados**: Lista completa com campo de busca em tempo real por nome do parlamentar, filtro por estado (UF) e filtro de voto (*Todos*, *Sim*, *Não*, *Abstenção*).
> 2. **Seleção de Temas no Celular**: Menu suspenso (*dropdown* / `<select>`) exibindo com clareza todos os temas disponíveis (*Todos*, *Tributos*, *Trabalho*, *Moradia*, *Segurança*, *Renda e Custo de Vida*, *Meio Ambiente*), sem cortes ou rolagem escondida.
> 3. **Correção do Botão "X" no Modal**: Reestruturação do cabeçalho do modal com `flex items-start justify-between` e `pr-2`, separando o título do botão de fechar para garantir que o "X" nunca fique em cima do texto em telas de 360px a 430px.

---

## 1. Visão Geral das Melhorias

```
┌─────────────────────────────────────────────────────────────┐
│                 RADAR DE VOTAÇÕES & PROPOSTAS               │
├─────────────────────────────────────────────────────────────┤
│ 🔍 Busca por número ou palavra-chave                        │
│ 📱 Mobile: Dropdown de Temas (Tributos, Trabalho, etc.)     │
│ 🖥 Desktop: Filtros segmentados em pills                    │
├─────────────────────────────────────────────────────────────┤
│ 🗳️ PEC 45/2019 — Reforma Tributária                        │
│   [PL: 20 Sim / 75 Não] [PT: 68 Sim] [União: 48 Sim / 9 Não]│
├─────────────────────────────────────────────────────────────┤
│ 📋 MODAL DE VOTAÇÃO NOMINAL COMPLETA (Anti-Sobreposição X)  │
│ ┌──────────────────────────────────────────────┬──────────┐ │
│ │ Título da Votação (Quebra segura de texto)   │ [  X  ]  │ │
│ └──────────────────────────────────────────────┴──────────┘ │
│ 🔍 Busca: "Digite o nome do deputado..."                    │
│ 📍 Filtro UF: [Todas as UFs ▾]  |  Voto: [Todos ▾]          │
│ 👥 Exibindo 95 de 95 deputados do PL:                       │
│    • Dep. Eduardo Bolsonaro (SP) ── NÃO                     │
│    • Dep. Bia Kicis (DF) ────────── NÃO                     │
│    • Dep. Rosana Valle (SP) ─────── SIM                     │
│    • Dep. Zucco (RS) ────────────── NÃO                     │
│    ... (todos os 95 deputados cadastrados e pesquisáveis)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Experiência do Usuário & Mudanças Visuais

### A. Seletor de Temas Mobile (Dropdown)
- No layout mobile (`sm:hidden`), substituir a barra cortada por um `<select>` nativo customizado com ícone de filtro, garantindo que o cidadão veja e selecione imediatamente qualquer um dos temas com conforto de toque (`min-h-[44px]`).
- Em telas maiores (`sm:flex`), manter os botões segmentados limpos.

### B. Lista Completa de Deputados por Partido (PEC 45/2019 e Matérias Oficiais)
- **Base de Dados Integral**: Expandir `MATERIAS_LEGISLATIVAS` para incluir nominalmente todos os parlamentares que compõem o placar partidário (para o PL: todos os 95 deputados, detalhando os 75 que votaram "Não" e os 20 que votaram "Sim"; para o PT: todos os 68 "Sim"; União Brasil: 48 "Sim" e 9 "Não", etc.).
- **Controles de Busca e Filtragem**:
  - Campo de busca instantânea pelo nome do parlamentar.
  - Dropdown de filtro por Unidade Federativa (UF).
  - Filtro rápido por voto (*Todos*, *Sim*, *Não*, *Abstenção*).
  - Contador dinâmico: *"Exibindo {X} de {Total} deputados do partido"*.

### C. Eliminação da Sobreposição do Botão "X" no Modal de Votação
- **Diagnóstico**: O botão de fechar utilizava posicionamento absoluto (`absolute top-3 right-3`) enquanto o título ocupava `w-full` sem margem à direita, fazendo o botão "X" cobrir as últimas palavras do título no celular.
- **Solução**: 
  - Usar container flexível `flex items-start justify-between gap-3`.
  - Aplicar `flex-1 min-w-0 pr-1` no título com quebra suave `break-words`.
  - Isolar o botão de fechar como elemento flex independente com área de toque mínima de `44x44px` (`shrink-0`).

---

## 3. Arquitetura Técnica & Dados

### Arquivos Envolvidos:
1. `src/data/legislativoData.ts`:
   - Cadastramento da lista completa nominal de deputados da PEC 45/2019, contemplando os 95 deputados do PL (75 "Não" e 20 "Sim") e as bancadas completas dos demais partidos.
2. `src/components/LegislativoFeed.tsx`:
   - Implementação do dropdown de temas para telas mobile (`<select className="sm:hidden ...">`).
   - Ajuste do modal de detalhamento da votação: cabeçalho com espaçamento correto contra sobreposição do botão "X".
   - Adição dos filtros de busca por nome, UF e tipo de voto na lista de deputados do partido selecionado.

---

## 4. Plano de Execução

1. **Atualizar `src/data/legislativoData.ts`**:
   - Inserir a lista de todos os 95 deputados federais do PL e demais bancadas com nome, partido, UF e voto nominal real.
2. **Atualizar `src/components/LegislativoFeed.tsx`**:
   - Adicionar dropdown mobile para seleção de temas.
   - Corrigir o cabeçalho do modal de votação (eliminar sobreposição do "X").
   - Adicionar barra de busca e filtros de UF/voto na visualização de candidatos do partido.
3. **Verificação de Compilação & Lint**:
   - Rodar `lint_applet` e `compile_applet` para assegurar build 100% livre de erros.
