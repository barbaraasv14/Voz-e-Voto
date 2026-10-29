import React from 'react';
import { useCivico } from '../context/CivicoContext';
import { ShieldCheck, User, Search } from 'lucide-react';
import { SALARIO_MINIMO_2026 } from '../data/legislativoData';

export const TopBar: React.FC = () => {
  const {
    tabAtiva,
    setTabAtiva,
    perfil,
    setIsModoEuModalAberto,
    setIsMetodologiaModalAberto,
  } = useCivico();

  const getRendaLabel = (r: string) => {
    switch (r) {
      case 'ate_2sm': return 'Até 2 SM (Até R$ 3.242)';
      case '2_a_5sm': return '2 a 5 SM (Até R$ 8.105)';
      case '5_a_10sm': return '5 a 10 SM';
      default: return '+10 SM';
    }
  };

  const getVinculoLabel = (v: string) => {
    switch (v) {
      case 'clt': return 'CLT';
      case 'mei': return 'MEI';
      case 'servidor': return 'Servidor';
      default: return 'Autônomo';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Bar Contract (Adaptado para Celular & Desktop) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-8">
        {/* Zona 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm">
            V
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-none whitespace-nowrap">
              Voz & Voto
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide uppercase mt-0.5 whitespace-nowrap">
              Radar do Congresso
            </span>
          </div>
        </div>

        {/* Zona 2: Navegação Principal Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setTabAtiva('radar')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              tabAtiva === 'radar'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Votações & Radar
          </button>

          <button
            onClick={() => setTabAtiva('queixas')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              tabAtiva === 'queixas'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Cadeia da Queixa (7 Etapas)
          </button>

          <button
            onClick={() => setTabAtiva('boletim')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              tabAtiva === 'boletim'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Boletim em Áudio (3 min)
          </button>

          <button
            onClick={() => setTabAtiva('tradutor')}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              tabAtiva === 'tradutor'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Tradutor Cívico IA
          </button>
        </nav>

        {/* Zona 3: Ação Primária "Seu perfil" com Ícone de Boneco */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsMetodologiaModalAberto(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors whitespace-nowrap"
            title="Metodologia auditável e fontes oficiais"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Método Auditável</span>
          </button>

          <button
            onClick={() => setIsModoEuModalAberto(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-sm transition-all whitespace-nowrap"
          >
            <User className="w-4 h-4 text-blue-300" />
            <span>Seu perfil ({perfil.uf})</span>
          </button>
        </div>
      </div>

      {/* Faixa de Informação do Perfil Ativo (Compacta para Mobile) */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-3 sm:px-6 lg:px-8 py-1.5 sm:py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              Perfil:
            </span>
            <span>Renda {getRendaLabel(perfil.faixaRenda)}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{perfil.dependentes === 'com_filhos' ? `${perfil.quantidadeFilhos || 1} filho(s)` : 'Sem filhos'}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{getVinculoLabel(perfil.vinculo)}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-semibold text-slate-800">Estado: {perfil.uf}</span>
          </div>

          <button
            onClick={() => setIsModoEuModalAberto(true)}
            className="text-blue-700 hover:text-blue-900 font-semibold underline underline-offset-2 transition-colors whitespace-nowrap shrink-0 text-[11px] sm:text-xs"
          >
            Ajustar
          </button>
        </div>
      </div>
    </header>
  );
};
