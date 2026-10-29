import React from 'react';
import { useCivico } from '../context/CivicoContext';
import { ShieldCheck, X, Scale, Database, CheckCircle2 } from 'lucide-react';

export const MetodologiaModal: React.FC = () => {
  const { isMetodologiaModalAberto, setIsMetodologiaModalAberto } = useCivico();

  if (!isMetodologiaModalAberto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header com proteção anti-sobreposição */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 break-words leading-tight">Metodologia Pública & Fontes Auditáveis</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 break-words mt-0.5">Neutralidade não se promete; comprova-se com método aberto</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsMetodologiaModalAberto(false)}
            className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Princípio 1: Neutralidade por Método Aberto */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-slate-700" />
              1. Por que não prometemos "isenção", mas sim "auditabilidade"?
            </h3>
            <p>
              Qualquer escolha de pautas possui um componente editorial. Para blindar a plataforma contra acusações de parcialidade ou viés partidário, o <strong>Voz & Voto</strong> adota um critério estritamente público:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Todas as matérias são ancoradas no texto oficial da proposição e parecer do relator.</li>
              <li>Apresentação simétrica e obrigatória de <strong>Argumentos Favoráveis (Prós)</strong> e <strong>Argumentos Contrários (Contras)</strong>.</li>
              <li>Nunca afirmamos "a culpa é de X ou Y"; apontamos a linha de corte da lei, a emenda orçamentária e a divisão constitucional de competências.</li>
            </ul>
          </div>

          {/* Princípio 2: Votação Nominal vs Simbólica */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Transparência sobre Limites: Votação Nominal vs. Simbólica
            </h3>
            <p>
              Muitas ferramentas prometem mostrar "como cada deputado votou", mas omitem um fato regimental: <strong>a maior parte das decisões do Congresso ocorre por votação simbólica ou acordo de lideranças</strong>, sem registro eletrônico individual de voto.
            </p>
            <p>
              O Voz & Voto é a única ferramenta que explicita claramente na interface quando houve votação nominal auditável e quando a decisão foi tomada por acordo de líderes, construindo autoridade com o cidadão.
            </p>
          </div>

          {/* Princípio 3: Fontes Oficiais Utilizadas */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              3. Fontes de Dados Primárias Integradas
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div>
                <strong>Câmara dos Deputados:</strong> API v2 de Dados Abertos (Proposições, Autores, Votações e Deputados).
              </div>
              <div>
                <strong>Senado Federal:</strong> API de Dados Abertos Legislativos e Sistema Siga Brasil.
              </div>
              <div>
                <strong>Constituição Federal de 1988:</strong> Artigos 21 a 30 (Repartição Constitucional de Competências entre União, Estados e Municípios).
              </div>
              <div>
                <strong>Banco Central do Brasil e IBGE:</strong> Séries históricas de Selic, IPCA e Pesquisa Nacional por Amostra de Domicílios (PNAD Contínua).
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={() => setIsMetodologiaModalAberto(false)}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
