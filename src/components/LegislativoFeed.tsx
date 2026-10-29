import React, { useState, useMemo } from 'react';
import { useCivico } from '../context/CivicoContext';
import { MateriaLegislativa, VotoDeputado } from '../types';
import { ESTADOS_BRASIL } from '../data/legislativoData';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  AlertCircle,
  HelpCircle,
  X,
  Users,
  Filter
} from 'lucide-react';

export const LegislativoFeed: React.FC = () => {
  const { materias, perfil, setTabAtiva } = useCivico();

  const [busca, setBusca] = useState('');
  const [temaFiltro, setTemaFiltro] = useState<string>('todos');
  const [tipoVotacaoFiltro, setTipoVotacaoFiltro] = useState<string>('todos');
  const [apenasMeuEstado, setApenasMeuEstado] = useState<boolean>(false);
  const [materiaExpandidaId, setMateriaExpandidaId] = useState<string | null>('pec-45-2019');

  // Estado para a explicação didática de "Relatoria Pendente"
  const [modalRelatoriaPendenteAberto, setModalRelatoriaPendenteAberto] = useState(false);

  // Estado da Caixa Clicável de Partidos: Partido selecionado para inspecionar candidatos
  const [partidoSelecionado, setPartidoSelecionado] = useState<string>('PL');
  const [buscaDeputado, setBuscaDeputado] = useState<string>('');
  const [filtroVotoDeputado, setFiltroVotoDeputado] = useState<string>('todos');
  const [filtroUfDeputado, setFiltroUfDeputado] = useState<string>('todas');

  const temasDisponiveis = ['todos', 'Tributos', 'Trabalho', 'Moradia', 'Segurança', 'Renda e Custo de Vida', 'Meio Ambiente'];

  const materiasFiltradas = useMemo(() => {
    return materias.filter(m => {
      const matchTexto =
        busca.trim() === '' ||
        m.sigla.toLowerCase().includes(busca.toLowerCase()) ||
        m.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        m.impactoPrimeiroSegundo.toLowerCase().includes(busca.toLowerCase()) ||
        m.oQueMudaNaPratica.toLowerCase().includes(busca.toLowerCase());

      const matchTema = temaFiltro === 'todos' || m.tema === temaFiltro;
      const matchTipo = tipoVotacaoFiltro === 'todos' || m.tipoVotacao === tipoVotacaoFiltro;

      return matchTexto && matchTema && matchTipo;
    });
  }, [materias, busca, temaFiltro, tipoVotacaoFiltro]);

  const encaminharWhatsAppMateria = (m: MateriaLegislativa) => {
    const texto = `🇧🇷 *${m.sigla}* — ${m.titulo}\n\n` +
      `⚡ *Impacto no seu bolso:* ${m.impactoPrimeiroSegundo}\n\n` +
      `🏛 *Onde está:* ${m.casa} · *Status:* ${m.status}\n` +
      (m.tipoVotacao === 'nominal' && m.placarNominal
        ? `📊 *Votação com nomes dos deputados:* ${m.placarNominal.totalSim} Sim vs ${m.placarNominal.totalNao} Não\n`
        : `⚠️ *Situação:* ${m.tipoVotacao === 'simbolica' ? 'Votação rápida de líderes partidários (sem voto individual no painel)' : 'Ainda em trâmite na comissão'}\n`) +
      `\nVeja os detalhes de quem votou a favor ou contra: ${m.linkOficial}`;

    navigator.clipboard.writeText(texto);
    alert('Resumo pronto para encaminhar! O texto foi copiado. Cole agora no seu grupo de WhatsApp.');
  };

  return (
    <div className="space-y-5">
      {/* Cabeçalho de Controle & Busca Rápida (Adaptado para Mobile) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Radar de Votações & Propostas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Veja em linguagem simples o que o Congresso está votando e se é contra ou a favor de você.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTabAtiva('tradutor')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Tradutor Cívico IA</span>
            </button>
          </div>
        </div>

        {/* Input de Busca */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por número (PEC 45, 6x1, Lei 15.270) ou tema (imposto, aluguel, jornada)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-800"
          />
        </div>

        {/* Barra de Filtros Segmentados */}
        <div className="mt-3 space-y-2.5 pt-3 border-t border-slate-100 text-xs">
          {/* Menu Suspenso (Dropdown) de Temas para Celular */}
          <div className="w-full sm:hidden">
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">
              Tema da Proposta:
            </label>
            <div className="relative">
              <select
                value={temaFiltro}
                onChange={e => setTemaFiltro(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
              >
                {temasDisponiveis.map(t => (
                  <option key={t} value={t}>
                    {t === 'todos' ? 'Todos os Temas' : t}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Filtro por Tema para Telas Maiores (Desktop/Tablet) */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto w-auto scrollbar-none py-1">
              <span className="font-semibold text-slate-500 shrink-0">Tema:</span>
              {temasDisponiveis.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTemaFiltro(t)}
                  className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                    temaFiltro === t
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t === 'todos' ? 'Todos' : t}
                </button>
              ))}
            </div>

            {/* Filtro de Tipo de Registro */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
              <span className="font-semibold text-slate-500 shrink-0">Registro:</span>
              <select
                value={tipoVotacaoFiltro}
                onChange={e => setTipoVotacaoFiltro(e.target.value)}
                className="flex-1 sm:flex-none px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold text-xs focus:outline-none"
              >
                <option value="todos">Todas as Situações</option>
                <option value="nominal">Com Votos Nominais dos Deputados</option>
                <option value="simbolica">Votação Rápida de Líderes</option>
                <option value="tramitacao_comissao">Ainda em Trâmite / Comissão</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Matérias */}
      <div className="space-y-4">
        {materiasFiltradas.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">Nenhuma proposta encontrada</h3>
            <p className="text-xs text-slate-500 mt-1">Tente pesquisar com outras palavras ou limpar os filtros.</p>
          </div>
        ) : (
          materiasFiltradas.map(materia => {
            const expandida = materiaExpandidaId === materia.id;
            const relatorPendente = materia.relator.toLowerCase().includes('pendente');

            return (
              <div
                key={materia.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                {/* Cabeçalho do Cartão */}
                <div className="p-4 sm:p-6">
                  {/* Metadados Limpos e Unboxed */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-bold text-slate-900">{materia.casa}</span>
                      <span aria-hidden="true">·</span>
                      <span>{materia.tema}</span>
                      <span aria-hidden="true">·</span>
                      <span>Atualizado em {materia.dataAtualizacao}</span>
                    </div>

                    <div>
                      {materia.tipoVotacao === 'nominal' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          Votação Nominal Aberta
                        </span>
                      ) : materia.tipoVotacao === 'simbolica' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3" />
                          Votação Rápida de Líderes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          Ainda em Trâmite
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Título e Consequência no Primeiro Segundo */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                      {materia.sigla} — {materia.titulo}
                    </h3>

                    {/* A Consequência Imediata */}
                    <div className="p-3 sm:p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl">
                      <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        O que muda na sua vida na prática:
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                        {materia.impactoPrimeiroSegundo}
                      </div>
                    </div>
                  </div>

                  {/* Detalhe de Autoria e Relatoria com Alerta Clicável */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-3 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <div>
                        <span className="text-slate-400">Autor:</span>{' '}
                        <strong className="text-slate-800">{materia.autor}</strong> ({materia.partidoAutor})
                      </div>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">Relatoria:</span>{' '}
                        <strong className="text-slate-800">{materia.relator}</strong>
                        {relatorPendente && (
                          <button
                            type="button"
                            onClick={() => setModalRelatoriaPendenteAberto(true)}
                            className="inline-flex items-center gap-0.5 text-amber-600 hover:text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ml-1"
                            title="Clique para entender o que é relatoria pendente"
                          >
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>O que significa?</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Botões de Ação com Destaques Solicitados */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {/* Botão Encaminhar em Verde */}
                      <button
                        onClick={() => encaminharWhatsAppMateria(materia)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all"
                        title="Encaminhar para contatos no WhatsApp"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span>Encaminhar</span>
                      </button>

                      {/* Botão Ver votação e ficha em Azul */}
                      <button
                        onClick={() => setMateriaExpandidaId(expandida ? null : materia.id)}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
                      >
                        <span>{expandida ? 'Recolher' : 'Ver votação e ficha'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandida ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Área Expandida: Votos, Prós/Contras e Caixa Clicável de Partidos */}
                {expandida && (
                  <div className="border-t border-slate-200 bg-slate-50/70 p-4 sm:p-6 space-y-6">
                    {/* Alerta de Transparência Simbólica / Trâmite em Linguagem Simples */}
                    {materia.explicacaoSimbolica && (
                      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="block font-bold mb-0.5 text-amber-900">Atenção cidadão:</strong>
                          {materia.explicacaoSimbolica}
                        </div>
                      </div>
                    )}

                    {/* O que muda na prática */}
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        Explicação Simples da Lei:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {materia.oQueMudaNaPratica}
                      </p>
                    </div>

                    {/* Prós vs Contras em Linguagem Direta */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Prós */}
                      <div className="p-4 bg-white border border-emerald-200 rounded-xl space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          Quem é a Favor Diz Que:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {materia.pros.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contras */}
                      <div className="p-4 bg-white border border-rose-200 rounded-xl space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-rose-800">
                          Quem é Contra Alerta Que:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {materia.contras.map((c, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-600 font-bold">✗</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CAIXA CLICÁVEL: Como votou cada candidato de cada partido */}
                    {materia.placarNominal && (
                      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm">
                        <div className="border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <h4 className="text-sm font-bold text-slate-900">
                              Como votou cada candidato de cada partido
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Clique em um partido abaixo para abrir a lista completa dos parlamentares e ver o voto individual de cada um.
                          </p>
                        </div>

                        {/* Seletor Clicável de Partidos */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {materia.placarNominal.partidos.map(p => {
                            const ativo = partidoSelecionado === p.partido;
                            return (
                              <button
                                key={p.partido}
                                type="button"
                                onClick={() => setPartidoSelecionado(p.partido)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  ativo
                                    ? 'bg-slate-900 text-white shadow-md ring-2 ring-blue-500'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                                }`}
                              >
                                <span>{p.partido}</span>
                                <span className={`text-[10px] ml-1.5 font-mono ${ativo ? 'text-slate-300' : 'text-slate-500'}`}>
                                  ({p.sim} Sim / {p.nao} Não)
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Painel do Partido Selecionado com Busca de Candidatos */}
                        {/* Painel do Partido Selecionado com Busca e Filtros de Candidatos */}
                        {(() => {
                          const deputadosDoPartido = materia.placarNominal.deputados.filter(d => d.partido === partidoSelecionado);
                          const deputadosFiltrados = deputadosDoPartido
                            .filter(d => !apenasMeuEstado || d.uf === perfil.uf)
                            .filter(d => filtroUfDeputado === 'todas' || d.uf === filtroUfDeputado)
                            .filter(d => filtroVotoDeputado === 'todos' || d.voto === filtroVotoDeputado)
                            .filter(d => buscaDeputado.trim() === '' || d.nome.toLowerCase().includes(buscaDeputado.toLowerCase()));

                          return (
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-3">
                              {/* Cabeçalho do Partido com Contadores */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                                <div>
                                  <div className="text-xs font-bold text-slate-800">
                                    Bancada do <span className="text-blue-700 font-extrabold">{partidoSelecionado}</span>:
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-medium">
                                    Exibindo <strong>{deputadosFiltrados.length}</strong> de <strong>{deputadosDoPartido.length}</strong> deputados registrados
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <button
                                    type="button"
                                    onClick={() => setFiltroVotoDeputado('todos')}
                                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                                      filtroVotoDeputado === 'todos'
                                        ? 'bg-slate-800 text-white'
                                        : 'bg-white text-slate-600 border border-slate-200'
                                    }`}
                                  >
                                    Todos ({deputadosDoPartido.length})
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFiltroVotoDeputado('Sim')}
                                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                                      filtroVotoDeputado === 'Sim'
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white text-emerald-700 border border-emerald-200'
                                    }`}
                                  >
                                    Sim ({deputadosDoPartido.filter(d => d.voto === 'Sim').length})
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setFiltroVotoDeputado('Não')}
                                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                                      filtroVotoDeputado === 'Não'
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-white text-rose-700 border border-rose-200'
                                    }`}
                                  >
                                    Não ({deputadosDoPartido.filter(d => d.voto === 'Não').length})
                                  </button>
                                </div>
                              </div>

                              {/* Filtros: Busca Nominal + Estado */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div className="sm:col-span-2 relative">
                                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input
                                    type="text"
                                    value={buscaDeputado}
                                    onChange={e => setBuscaDeputado(e.target.value)}
                                    placeholder="Buscar por nome do deputado..."
                                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                                  />
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <select
                                    value={filtroUfDeputado}
                                    onChange={e => setFiltroUfDeputado(e.target.value)}
                                    className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none"
                                  >
                                    <option value="todas">Todos os Estados (UF)</option>
                                    {ESTADOS_BRASIL.map(uf => (
                                      <option key={uf} value={uf}>{uf}</option>
                                    ))}
                                  </select>

                                  <label className="flex items-center gap-1 text-[11px] text-slate-600 font-medium cursor-pointer whitespace-nowrap bg-white border border-slate-200 px-2 py-1.5 rounded-lg">
                                    <input
                                      type="checkbox"
                                      checked={apenasMeuEstado}
                                      onChange={e => setApenasMeuEstado(e.target.checked)}
                                      className="rounded border-slate-300 text-slate-900"
                                    />
                                    <span>Só {perfil.uf}</span>
                                  </label>
                                </div>
                              </div>

                              {/* VISÃO MOBILE: Cartões Fluidos sem Aperto ou Sobreposição */}
                              <div className="block sm:hidden max-h-72 overflow-y-auto border border-slate-200 rounded-lg bg-white divide-y divide-slate-100">
                                {deputadosFiltrados.map((dep, idx) => (
                                  <div key={idx} className="p-2.5 flex items-center justify-between gap-2.5 hover:bg-slate-50 transition-colors">
                                    <div className="min-w-0 flex-1">
                                      <div className="font-bold text-slate-900 text-xs truncate">
                                        {dep.nome}
                                      </div>
                                      <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                                        {dep.partido} · {dep.uf}
                                      </div>
                                    </div>

                                    <div className="shrink-0">
                                      <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-extrabold text-[11px] whitespace-nowrap ${
                                          dep.voto === 'Sim'
                                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                            : dep.voto === 'Não'
                                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                            : 'bg-slate-200 text-slate-700 border border-slate-300'
                                        }`}
                                      >
                                        {dep.voto === 'Sim' ? '✓ SIM (A FAVOR)' : dep.voto === 'Não' ? '✗ NÃO (CONTRA)' : dep.voto}
                                      </span>
                                    </div>
                                  </div>
                                ))}

                                {deputadosFiltrados.length === 0 && (
                                  <div className="p-4 text-center text-xs text-slate-400">
                                    Nenhum deputado encontrado com os filtros atuais.
                                  </div>
                                )}
                              </div>

                              {/* VISÃO DESKTOP: Tabela Estruturada */}
                              <div className="hidden sm:block overflow-x-auto max-h-64 overflow-y-auto border border-slate-200 rounded-lg bg-white">
                                <table className="w-full text-xs text-left">
                                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
                                    <tr>
                                      <th className="py-2 px-3">Candidato / Deputado</th>
                                      <th className="py-2 px-3">Estado</th>
                                      <th className="py-2 px-3 text-right">Como Votou</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 font-medium">
                                    {deputadosFiltrados.map((dep, idx) => (
                                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-2 px-3 font-bold text-slate-900">
                                          {dep.nome}
                                        </td>
                                        <td className="py-2 px-3 text-slate-600 font-mono">
                                          {dep.uf}
                                        </td>
                                        <td className="py-2 px-3 text-right">
                                          <span
                                            className={`inline-block px-2.5 py-0.5 rounded font-bold text-[11px] ${
                                              dep.voto === 'Sim'
                                                ? 'bg-emerald-100 text-emerald-800'
                                                : dep.voto === 'Não'
                                                ? 'bg-rose-100 text-rose-800'
                                                : 'bg-slate-200 text-slate-700'
                                            }`}
                                          >
                                            {dep.voto === 'Sim' ? '✓ A FAVOR (SIM)' : dep.voto === 'Não' ? '✗ CONTRA (NÃO)' : dep.voto}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}

                                    {deputadosFiltrados.length === 0 && (
                                      <tr>
                                        <td colSpan={3} className="py-4 text-center text-slate-400">
                                          Nenhum deputado encontrado com os filtros atuais.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Link Oficial de Tramitação */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
                      <span className="text-slate-500">
                        Fonte: Dados Abertos da {materia.casa}
                      </span>
                      <a
                        href={materia.linkOficial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold underline underline-offset-2"
                      >
                        <span>Ver no site oficial da {materia.casa}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* MODAL DIDÁTICO: O que é Relatoria Pendente? */}
      {modalRelatoriaPendenteAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-amber-700 flex-1 min-w-0 pr-1">
                <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base break-words leading-snug">
                  O que é Relatoria Pendente?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalRelatoriaPendenteAberto(false)}
                className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                Significa que a proposta de lei já foi entregue para a comissão do Congresso, mas o presidente dessa comissão <strong>ainda não escolheu qual deputado ou senador será o relator</strong>.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                <strong>O que faz o relator?</strong>
                <p className="text-slate-600">
                  O relator é o parlamentar encarregado de estudar a lei a fundo e escrever o parecer final dizendo aos outros deputados se recomenda aprovar ou reprovar o projeto.
                </p>
              </div>
              <p className="text-slate-500 text-xs">
                Enquanto a relatoria estiver pendente, o projeto fica parado aguardando essa definição política.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setModalRelatoriaPendenteAberto(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
