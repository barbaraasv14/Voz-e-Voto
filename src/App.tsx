import React from 'react';
import { CivicoProvider, useCivico } from './context/CivicoContext';
import { TopBar } from './components/TopBar';
import { ModoEuModal } from './components/ModoEuModal';
import { MetodologiaModal } from './components/MetodologiaModal';
import { LegislativoFeed } from './components/LegislativoFeed';
import { QueixaChainSimulator } from './components/QueixaChainSimulator';
import { BoletimAudioPlayer } from './components/BoletimAudioPlayer';
import { TradutorIaModal } from './components/TradutorIaModal';
import { NavCaixasRolaveis } from './components/NavCaixasRolaveis';
import {
  Compass,
  FileSpreadsheet,
  Headphones,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { tabAtiva, setTabAtiva } = useCivico();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Bar seguindo o contrato de 3 zonas adaptado para Celular */}
      <TopBar />

      {/* Conteúdo Principal Mobile-First */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
        {/* Banner Hero Cívico Compacto para Celular & KPIs Factuais */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200 text-[11px] font-semibold tracking-wide mb-2.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Transparência Legislativa sem Rodeios
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Informação Verídica para o Cidadão Tirar as Próprias Conclusões.
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 sm:mt-3 leading-relaxed">
              O <strong>Voz & Voto</strong> traduz os projetos do Congresso Nacional em linguagem simples, mostra o voto de cada deputado e aponta quem realmente tem o poder de mudar as regras que afetam sua vida.
            </p>

            {/* Ações Rápidas no Hero adaptadas para Touch */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <button
                onClick={() => setTabAtiva('queixas')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
              >
                <Compass className="w-4 h-4 text-blue-700" />
                <span>Simulador: Onde dói o seu calo?</span>
              </button>

              <button
                onClick={() => setTabAtiva('boletim')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all whitespace-nowrap active:scale-[0.98]"
              >
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span>Ouvir Boletim da Semana (3 min)</span>
              </button>
            </div>
          </div>

          {/* Faixa de KPIs Estruturados (Sem o texto de viés) */}
          <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-2 sm:gap-4 text-xs">
            <div>
              <div className="text-lg sm:text-2xl font-extrabold font-mono text-white tabular-nums">
                513
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-tight">Deputados Federais</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold font-mono text-white tabular-nums">
                81
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-tight">Senadores da República</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-extrabold font-mono text-emerald-400 tabular-nums">
                100%
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-tight">Dados Abertos Oficiais</div>
            </div>
          </div>
        </div>

        {/* Trilho de Caixas Roláveis Deslizável para Celular (Swipeable) */}
        <NavCaixasRolaveis />

        {/* Visualização Ativa */}
        <div>
          {tabAtiva === 'radar' && <LegislativoFeed />}
          {tabAtiva === 'queixas' && <QueixaChainSimulator />}
          {tabAtiva === 'boletim' && <BoletimAudioPlayer />}
          {tabAtiva === 'tradutor' && <TradutorIaModal />}
        </div>
      </main>

      {/* Modais Globais */}
      <ModoEuModal />
      <MetodologiaModal />

      {/* Rodapé Institucional Compacto */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Voz & Voto</span>
            <span aria-hidden="true">·</span>
            <span>Inteligência e Transparência Cívica</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://dadosabertos.camara.leg.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>Dados Abertos da Câmara</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www12.senado.leg.br/dados-abertos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <span>Dados Abertos do Senado</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CivicoProvider>
      <AppContent />
    </CivicoProvider>
  );
}
