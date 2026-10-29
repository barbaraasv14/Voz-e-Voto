import React, { useRef, useEffect } from 'react';
import { useCivico } from '../context/CivicoContext';
import {
  FileSpreadsheet,
  Compass,
  Headphones,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface CaixaItem {
  id: 'radar' | 'queixas' | 'boletim' | 'tradutor';
  titulo: string;
  tag: string;
  subtitulo: string;
  icone: React.ComponentType<{ className?: string }>;
  corDestaque: string;
  bgIcone: string;
}

const CAIXAS: CaixaItem[] = [
  {
    id: 'radar',
    titulo: 'Votações & Propostas',
    tag: 'Placar Oficial',
    subtitulo: 'Veja como cada deputado votou, partidos e status de PECs',
    icone: FileSpreadsheet,
    corDestaque: 'text-blue-600',
    bgIcone: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'queixas',
    titulo: 'Cadeia da Queixa',
    tag: '7 Etapas',
    subtitulo: 'Do sentimento de revolta ao endereço certo de quem decide',
    icone: Compass,
    corDestaque: 'text-indigo-600',
    bgIcone: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 'boletim',
    titulo: 'Boletim em Áudio',
    tag: 'Podcast 3 min',
    subtitulo: 'Resumo semanal em voz feminina humanizada com pautas atuais',
    icone: Headphones,
    corDestaque: 'text-emerald-600',
    bgIcone: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'tradutor',
    titulo: 'Tradutor Cívico IA',
    tag: 'Sem Juridiquês',
    subtitulo: 'Pesquise qualquer lei: prós, contras e impacto no bolso',
    icone: Sparkles,
    corDestaque: 'text-amber-600',
    bgIcone: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];

export const NavCaixasRolaveis: React.FC = () => {
  const { tabAtiva, setTabAtiva } = useCivico();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Garante que o card ativo fique visível e centralizado ao mudar de aba
  useEffect(() => {
    const activeEl = cardRefs.current[tabAtiva];
    if (activeEl && scrollContainerRef.current) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [tabAtiva]);

  const rolarPara = (direcao: 'esquerda' | 'direita') => {
    if (scrollContainerRef.current) {
      const offset = direcao === 'esquerda' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden space-y-2">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
          <span>Selecione uma das ferramentas</span>
        </div>

        {/* Botões de seta para rolar em telas maiores ou suporte touch */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => rolarPara('esquerda')}
            aria-label="Rolar caixas para a esquerda"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => rolarPara('direita')}
            aria-label="Rolar caixas para a direita"
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center justify-center transition-all shadow-xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trilho de Caixas Roláveis (Mobile-Swipeable Carousel com Snap) */}
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label="Ferramentas cívicas principais"
        className="flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory py-1 px-1 -mx-1"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollPadding: '0 8px',
        }}
      >
        {CAIXAS.map(caixa => {
          const ativo = tabAtiva === caixa.id;
          const Icone = caixa.icone;

          return (
            <button
              key={caixa.id}
              ref={el => {
                cardRefs.current[caixa.id] = el;
              }}
              role="tab"
              aria-selected={ativo}
              onClick={() => setTabAtiva(caixa.id)}
              className={`snap-start shrink-0 text-left rounded-2xl p-3.5 sm:p-4.5 transition-all select-none active:scale-[0.98] cursor-pointer flex flex-col justify-between ${
                // Largura adaptada para mobile: ocupa cerca de 78% da tela do celular para indicar que há mais caixas ao lado
                'w-[76vw] sm:w-[260px] md:w-[280px] min-w-[240px] max-w-[320px]'
              } ${
                ativo
                  ? 'bg-slate-900 text-white shadow-md ring-2 ring-slate-900 ring-offset-2'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70 shadow-xs'
              }`}
            >
              {/* Topo do Card */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                      ativo
                        ? 'bg-white/10 text-white border-white/20'
                        : `${caixa.bgIcone}`
                    }`}
                  >
                    <Icone className="w-4.5 h-4.5" />
                  </div>

                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      ativo
                        ? 'bg-white/20 text-slate-100'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {caixa.tag}
                  </span>
                </div>

                <h3
                  className={`text-sm sm:text-base font-extrabold tracking-tight leading-snug break-words ${
                    ativo ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {caixa.titulo}
                </h3>

                <p
                  className={`text-xs mt-1 leading-relaxed line-clamp-2 break-words ${
                    ativo ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {caixa.subtitulo}
                </p>
              </div>

              {/* Rodapé do Card com Status de Seleção */}
              <div
                className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] font-bold ${
                  ativo ? 'border-white/15' : 'border-slate-100'
                }`}
              >
                <span
                  className={
                    ativo
                      ? 'text-emerald-400 flex items-center gap-1'
                      : 'text-slate-500 group-hover:text-slate-700'
                  }
                >
                  {ativo ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ativo no painel</span>
                    </>
                  ) : (
                    <span>Toque para abrir</span>
                  )}
                </span>

                <span
                  className={`text-xs font-mono ${
                    ativo ? 'text-slate-400' : 'text-slate-400'
                  }`}
                >
                  {caixa.id === 'radar'
                    ? '01'
                    : caixa.id === 'queixas'
                    ? '02'
                    : caixa.id === 'boletim'
                    ? '03'
                    : '04'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Marcadores de página / bolinhas indicadoras para celular */}
      <div className="flex items-center justify-center gap-1.5 pt-1 sm:hidden">
        {CAIXAS.map(caixa => (
          <button
            key={caixa.id}
            type="button"
            onClick={() => setTabAtiva(caixa.id)}
            aria-label={`Ir para ${caixa.titulo}`}
            className={`h-1.5 rounded-full transition-all ${
              tabAtiva === caixa.id
                ? 'w-6 bg-slate-900'
                : 'w-1.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
