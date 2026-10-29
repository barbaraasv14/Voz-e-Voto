import React, { useState, useRef } from 'react';
import { useCivico } from '../context/CivicoContext';
import { QueixaChain } from '../types';
import {
  Scale,
  Users,
  FileCheck2,
  TrendingDown,
  Mail,
  Sparkles,
  Loader2,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const QueixaChainSimulator: React.FC = () => {
  const { queixas, queixaAtiva, setQueixaAtiva, perfil } = useCivico();
  const [etapaAtiva, setEtapaAtiva] = useState<number>(1);
  const [queixaLivre, setQueixaLivre] = useState('');
  const [carregandoIa, setCarregandoIa] = useState(false);
  const [erroIa, setErroIa] = useState<string | null>(null);
  const [sucessoIa, setSucessoIa] = useState(false);

  const containerResultadosRef = useRef<HTMLDivElement>(null);

  const etapasLabels = [
    { num: 1, nome: 'Sentir o Problema', icone: AlertCircle },
    { num: 2, nome: 'Traduzir em Política', icone: Scale },
    { num: 3, nome: 'Localizar a Esfera', icone: Compass },
    { num: 4, nome: 'Nomear Quem Decide', icone: Users },
    { num: 5, nome: 'Mostrar o Que Fizeram', icone: FileCheck2 },
    { num: 6, nome: 'Confrontar Impacto', icone: TrendingDown },
    { num: 7, nome: 'Indicar Ação Possível', icone: Mail },
  ];

  const handleAnalisarQueixaIa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queixaLivre.trim()) return;

    setCarregandoIa(true);
    setErroIa(null);
    setSucessoIa(false);

    try {
      const res = await fetch('/api/civico/analisar-queixa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queixaTexto: queixaLivre, perfil }),
      });

      if (!res.ok) throw new Error('Falha temporária ao analisar. Tentando síntese cívica...');
      const data = await res.json();
      if (data && data.queixa) {
        setQueixaAtiva(data.queixa);
        setEtapaAtiva(1);
        setSucessoIa(true);
        setTimeout(() => setSucessoIa(false), 4000);

        // Rola suavemente para os resultados
        if (containerResultadosRef.current) {
          containerResultadosRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        throw new Error('Não foi possível estruturar as 7 etapas.');
      }
    } catch (err: any) {
      setErroIa(err.message || 'Erro ao conectar à inteligência cívica.');
    } finally {
      setCarregandoIa(false);
    }
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden box-border space-y-5 sm:space-y-8">
      {/* Bloco de Apresentação Conceitual */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm w-full min-w-0 overflow-hidden">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
            A Esteira Cívica de 7 Etapas
          </span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1 mb-2 leading-snug">
            Do Sentimento à Atribuição de Responsabilidade
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
            O cidadão indignado não quer estatística fria, mas também não pode aceitar um bode expiatório populista. Esta ferramenta converte queixas pessoais em responsabilização factual: <strong>substitui o vilão por um endereço acionável</strong>.
          </p>
        </div>

        {/* Seletor de Casos Paradigmáticos */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Casos emblemáticos da vida real (toque para analisar):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {queixas.map(item => {
              const ativo = queixaAtiva.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setQueixaAtiva(item);
                    setEtapaAtiva(1);
                  }}
                  className={`p-3 text-left rounded-xl border text-xs transition-all ${
                    ativo
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <div className="font-semibold leading-snug line-clamp-2">
                    {item.tituloCurto}
                  </div>
                  <div className={`text-[10px] mt-1 ${ativo ? 'text-slate-300' : 'text-slate-500'}`}>
                    {item.categoria}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input para queixa livre com IA */}
        <form onSubmit={handleAnalisarQueixaIa} className="mt-5 pt-4 border-t border-slate-100 w-full min-w-0">
          <label className="block text-xs font-semibold text-slate-800 mb-1.5">
            Ou digite sua queixa pessoal para a IA decompor nas 7 etapas:
          </label>
          <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
            <input
              type="text"
              value={queixaLivre}
              onChange={e => setQueixaLivre(e.target.value)}
              placeholder="Ex: Trabalho autônomo, não tenho creche para minha filha e os impostos aumentaram..."
              className="flex-1 min-w-0 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-800"
            />
            <button
              type="submit"
              disabled={carregandoIa || !queixaLivre.trim()}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl disabled:opacity-50 transition-all whitespace-nowrap shadow-sm active:scale-[0.98]"
            >
              {carregandoIa ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Decompondo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Decompor com IA</span>
                </>
              )}
            </button>
          </div>
          {sucessoIa && (
            <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Queixa decomposta com sucesso nas 7 etapas abaixo!</span>
            </div>
          )}
          {erroIa && <p className="text-xs text-red-600 mt-2">{erroIa}</p>}
        </form>
      </div>

      {/* Navegador das 7 Etapas */}
      <div ref={containerResultadosRef} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm w-full min-w-0">
        {/* Barra de Tabs das Etapas Mobile-Scroll */}
        <div className="border-b border-slate-200 bg-slate-50/70 p-2 overflow-x-auto scrollbar-none w-full min-w-0">
          <div className="flex items-center gap-1 min-w-[720px] sm:min-w-0">
            {etapasLabels.map(etapa => {
              const Icone = etapa.icone;
              const ativa = etapaAtiva === etapa.num;
              const concluida = etapaAtiva > etapa.num;
              return (
                <button
                  key={etapa.num}
                  onClick={() => setEtapaAtiva(etapa.num)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    ativa
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : concluida
                      ? 'text-slate-700 hover:bg-white/60'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      ativa
                        ? 'bg-slate-900 text-white'
                        : concluida
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {etapa.num}
                  </span>
                  <span className="truncate">{etapa.nome}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conteúdo Dinâmico da Etapa Ativa */}
        <div className="p-4 sm:p-6 w-full min-w-0">
          {/* ETAPA 1: Sentir o Problema */}
          {etapaAtiva === 1 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 01 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Sentir o Problema (A Queixa do Cidadão)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Toda cobrança cívica parte de um sentimento concreto de injustiça.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Relato da Queixa:
                </div>
                <blockquote className="text-sm sm:text-lg font-medium text-slate-800 italic leading-relaxed break-words">
                  "{queixaAtiva.etapa1_Sentimento.queixaCidadao}"
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[11px] font-semibold text-slate-500 mb-0.5">Perfil Mais Atingido:</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-800 break-words">
                    {queixaAtiva.etapa1_Sentimento.perfilTipico}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[11px] font-semibold text-slate-500 mb-0.5">A Frustração Comum:</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-800 break-words">
                    {queixaAtiva.etapa1_Sentimento.frustracaoComum}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 2: Traduzir em Política Pública */}
          {etapaAtiva === 2 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 02 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Traduzir em Política Pública (A Engrenagem Real)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Identificar qual lei ou critério institucional produz exatamente esse resultado.
                </p>
              </div>

              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="text-[10px] font-bold text-blue-900 uppercase tracking-wider mb-0.5">
                  Conceito-Chave Institucional:
                </div>
                <div className="text-base sm:text-lg font-bold text-blue-950 break-words">
                  {queixaAtiva.etapa2_PoliticaPublica.conceitoChave}
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Qual regra produz essa situação:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold break-words">
                  {queixaAtiva.etapa2_PoliticaPublica.mecanismoReal}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5 break-words">
                  {queixaAtiva.etapa2_PoliticaPublica.explicacao}
                </p>
              </div>
            </div>
          )}

          {/* ETAPA 3: Localizar a Esfera e o Instrumento */}
          {etapaAtiva === 3 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 03 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Localizar a Esfera (Divisão Constitucional de Poder)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Não há um culpado único quando a Constituição divide as tarefas entre as esferas.
                </p>
              </div>

              {/* Barra Proporcional de Peso */}
              <div>
                <div className="flex flex-wrap items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5 gap-1">
                  <span>Proporção de Competência Legal:</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-700"></span> Federal ({queixaAtiva.etapa3_EsferaEInstrumento.federal.percentual}%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-600"></span> Estadual ({queixaAtiva.etapa3_EsferaEInstrumento.estadual.percentual}%)</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> Municipal ({queixaAtiva.etapa3_EsferaEInstrumento.municipal.percentual}%)</span>
                  </div>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${queixaAtiva.etapa3_EsferaEInstrumento.federal.percentual}%` }}
                    className="bg-blue-700 h-full"
                  />
                  <div
                    style={{ width: `${queixaAtiva.etapa3_EsferaEInstrumento.estadual.percentual}%` }}
                    className="bg-amber-600 h-full"
                  />
                  <div
                    style={{ width: `${queixaAtiva.etapa3_EsferaEInstrumento.municipal.percentual}%` }}
                    className="bg-emerald-600 h-full"
                  />
                </div>
              </div>

              {/* Detalhamento das 3 Esferas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Federal */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-blue-200 bg-blue-50/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-blue-900 uppercase">Esfera Federal</span>
                    <span className="text-xs font-bold text-blue-700 font-mono">
                      {queixaAtiva.etapa3_EsferaEInstrumento.federal.percentual}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                    {queixaAtiva.etapa3_EsferaEInstrumento.federal.descricao}
                  </p>
                </div>

                {/* Estadual */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-amber-200 bg-amber-50/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-amber-900 uppercase">Esfera Estadual</span>
                    <span className="text-xs font-bold text-amber-700 font-mono">
                      {queixaAtiva.etapa3_EsferaEInstrumento.estadual.percentual}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                    {queixaAtiva.etapa3_EsferaEInstrumento.estadual.descricao}
                  </p>
                </div>

                {/* Municipal */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-emerald-900 uppercase">Esfera Municipal</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      {queixaAtiva.etapa3_EsferaEInstrumento.municipal.percentual}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed break-words">
                    {queixaAtiva.etapa3_EsferaEInstrumento.municipal.descricao}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ETAPA 4: Nomear Quem Decide */}
          {etapaAtiva === 4 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 04 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Nomear Quem Decide (Atores e Instituições)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quem tem a caneta para assinar, relatar, pautar e votar a mudança dessa regra.
                </p>
              </div>

              <div className="space-y-2.5">
                {queixaAtiva.etapa4_QuemDecide.map((ator, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {ator.instituicao}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {ator.autoridade}
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 max-w-md break-words">
                      {ator.competencia}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 5: Mostrar o que Fizeram */}
          {etapaAtiva === 5 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 05 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Mostrar o Que Fizeram (Atos Registrados)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Votos nominais registrados, emendas, vetos ou decisões por acordo de líderes.
                </p>
              </div>

              <div className="space-y-2.5">
                {queixaAtiva.etapa5_OQueFizeram.map((ato, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="text-[10px] font-bold font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                        {ato.data}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">{ato.quem}</div>
                        <div className="text-xs text-slate-600 mt-0.5 break-words">{ato.oQueFez}</div>
                      </div>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {ato.tipoRegistro}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ETAPA 6: Confrontar com o Impacto */}
          {etapaAtiva === 6 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 06 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Confrontar com o Impacto (Dado, Não Opinião)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quanto cada fator pesa matematicamente no bolso, embasado em estatísticas oficiais.
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-2.5 shadow-md">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Dado Factual Auditável:
                </div>
                <div className="text-xs sm:text-base font-medium leading-relaxed break-words">
                  {queixaAtiva.etapa6_ConfrontoImpacto.dadoFactual}
                </div>
                <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2.5">
                  Fonte Oficial: <span className="text-slate-200 font-medium">{queixaAtiva.etapa6_ConfrontoImpacto.fonteOficial}</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Diagnóstico Factual:
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium break-words">
                  {queixaAtiva.etapa6_ConfrontoImpacto.analise}
                </p>
              </div>
            </div>
          )}

          {/* ETAPA 7: Indicar a Ação Possível */}
          {etapaAtiva === 7 && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Etapa 07 de 07
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mt-0.5">
                  Indicar a Ação Possível (Cobrança Efetiva)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  A quem cobrar, quando cobrar e qual a reivindicação viável. Cidadania com endereço.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[11px] font-semibold text-slate-500 mb-0.5">A Quem Cobrar:</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 break-words">
                    {queixaAtiva.etapa7_AcaoPossivel.quemCobrar}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[11px] font-semibold text-slate-500 mb-0.5">Momento de Cobrar:</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 break-words">
                    {queixaAtiva.etapa7_AcaoPossivel.quando}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[11px] font-semibold text-slate-500 mb-0.5">O Que Pedir:</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 break-words">
                    {queixaAtiva.etapa7_AcaoPossivel.oQueReivindicar}
                  </div>
                </div>
              </div>

              {/* Canais Oficiais */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Canais Oficiais de Contato Direto:
                </label>
                <div className="space-y-2">
                  {queixaAtiva.etapa7_AcaoPossivel.canaisOficiais.map((canal, idx) => (
                    <a
                      key={idx}
                      href={canal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-xs transition-colors group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                          {canal.nome}
                        </div>
                        <div className="text-slate-500 text-[11px] truncate">{canal.descricao}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navegação entre Etapas */}
          <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100">
            <button
              onClick={() => setEtapaAtiva(e => Math.max(1, e - 1))}
              disabled={etapaAtiva === 1}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              ← Anterior
            </button>

            <span className="text-[11px] font-mono text-slate-400">
              {etapaAtiva} / 7
            </span>

            <button
              onClick={() => setEtapaAtiva(e => Math.min(7, e + 1))}
              disabled={etapaAtiva === 7}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl disabled:opacity-30 disabled:pointer-events-none shadow-sm transition-all"
            >
              <span>Próxima</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
