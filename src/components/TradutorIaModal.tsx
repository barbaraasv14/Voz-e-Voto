import React, { useState } from 'react';
import { useCivico } from '../context/CivicoContext';
import { MateriaLegislativa } from '../types';
import {
  Sparkles,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const TradutorIaModal: React.FC = () => {
  const [termoBusca, setTermoBusca] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<{ fonte: string; materia: MateriaLegislativa } | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const sugestoes = [
    'Isenção do IRPF até R$ 5.000 (Lei 15.270/2025)',
    'PEC da Escala 6x1 (Semana de 4 Dias)',
    'Regulamentação da Reforma Tributária (IBS e CBS)',
    'Taxação de compras importadas (Remessa Conforme)',
    'Regulamentação de Motoristas de Aplicativo',
  ];

  const buscarMateriaIa = async (termo: string) => {
    if (!termo.trim()) return;
    setCarregando(true);
    setErro(null);

    try {
      const res = await fetch('/api/civico/traduzir-materia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ termo }),
      });

      if (!res.ok) throw new Error('Não foi possível realizar a tradução da matéria.');
      const data = await res.json();
      if (data && data.materia) {
        setResultado(data);
      } else {
        throw new Error('Resposta incompleta da inteligência cívica.');
      }
    } catch (e: any) {
      setErro(e.message || 'Erro ao traduzir proposta.');
    } finally {
      setCarregando(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    buscarMateriaIa(termoBusca);
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden box-border space-y-4 sm:space-y-6">
      {/* Apresentação do Tradutor */}
      <div className="w-full max-w-full min-w-0 overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
        <div className="w-full min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Tradução Simples & Sem Viés</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Tradutor de Leis & PECs para Linguagem Cidadã
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed break-words">
            Pesquise qualquer proposta de lei, PEC ou assunto em debate no Congresso. A inteligência explica em português simples o que a lei muda, os argumentos a favor e contra, e se o seu bolso será afetado.
          </p>
        </div>

        {/* Formulário de Busca Mobile-First */}
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-5 w-full min-w-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
            <div className="relative flex-1 min-w-0 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={termoBusca}
                onChange={e => setTermoBusca(e.target.value)}
                placeholder="Ex: Lei 15.270, escala 6x1, taxação de compras..."
                className="w-full min-w-0 max-w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-800"
              />
            </div>
            <button
              type="submit"
              disabled={carregando || !termoBusca.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl disabled:opacity-50 transition-all shadow-sm whitespace-nowrap active:scale-[0.98]"
            >
              {carregando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consultando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-300" />
                  <span>Traduzir Proposta</span>
                </>
              )}
            </button>
          </div>

          {/* Sugestões Rápidas que não quebram tela */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs w-full min-w-0">
            <span className="font-semibold text-slate-500 text-[11px] shrink-0">Sugestões:</span>
            {sugestoes.map(sug => (
              <button
                key={sug}
                type="button"
                onClick={() => {
                  setTermoBusca(sug);
                  buscarMateriaIa(sug);
                }}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-[11px] font-medium max-w-full truncate"
              >
                {sug}
              </button>
            ))}
          </div>
        </form>

        {erro && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 break-words">
            {erro}
          </div>
        )}
      </div>

      {/* Exibição do Resultado Traduzido com Proteção Anti-Corte */}
      {resultado && (
        <div className="w-full max-w-full min-w-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm animate-in fade-in duration-200">
          {/* Header do Card */}
          <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/70">
            <div className="flex flex-wrap items-center justify-between gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-slate-900">{resultado.materia.casa}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">{resultado.fonte}</span>
              </div>

              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  resultado.materia.tipoVotacao === 'nominal'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-800'
                }`}>
                  {resultado.materia.tipoVotacao === 'nominal' ? 'Votação Nominal' : 'Ainda em Trâmite / Simbólica'}
                </span>
              </div>
            </div>

            <h3 className="text-base sm:text-xl font-extrabold text-slate-900 leading-snug break-words">
              {resultado.materia.sigla} — {resultado.materia.titulo}
            </h3>

            {resultado.materia.autor && (
              <div className="text-[11px] sm:text-xs text-slate-600 mt-1.5 break-words">
                Autor: <strong className="text-slate-800">{resultado.materia.autor}</strong> ({resultado.materia.partidoAutor})
              </div>
            )}
          </div>

          {/* Corpo do Resultado */}
          <div className="p-4 sm:p-6 space-y-4 w-full min-w-0">
            {/* O Que Muda na Prática */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                O que a Proposta Muda na Prática (Sem Juridiquês):
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium break-words">
                {resultado.materia.oQueMudaNaPratica}
              </p>
            </div>

            {/* Impacto no Bolso */}
            <div className="p-3.5 sm:p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                Impacto no seu Bolso e Trabalho:
              </div>
              <p className="text-xs sm:text-sm text-blue-950 font-semibold leading-relaxed break-words">
                {resultado.materia.impactoNoBolso}
              </p>
            </div>

            {/* Balanço de Argumentos: Prós vs Contras */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Prós */}
              <div className="p-3.5 bg-white border border-emerald-200 rounded-xl space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Argumentos a Favor (Prós)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {resultado.materia.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5 break-words">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contras */}
              <div className="p-3.5 bg-white border border-rose-200 rounded-xl space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Argumentos Contrários (Contras)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {resultado.materia.contras.map((contra, i) => (
                    <li key={i} className="flex items-start gap-1.5 break-words">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>{contra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alerta de Transparência Simbólica */}
            {resultado.materia.explicacaoSimbolica && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 break-words leading-relaxed">
                <strong>Situação:</strong> {resultado.materia.explicacaoSimbolica}
              </div>
            )}

            {/* Link Oficial */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-slate-100">
              <span className="text-slate-500">
                Análise fundamentada sem viés partidário.
              </span>
              <a
                href={resultado.materia.linkOficial || 'https://www.camara.leg.br'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold underline underline-offset-2"
              >
                <span>Consultar no portal oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
