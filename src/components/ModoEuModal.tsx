import React, { useState } from 'react';
import { useCivico } from '../context/CivicoContext';
import { ESTADOS_BRASIL, SALARIO_MINIMO_2026 } from '../data/legislativoData';
import { PerfilUsuario, FaixaRenda, TipoMoradia, TipoVinculo, TipoTransporte, TemDependentes } from '../types';
import { X, Check, Info, Users, User, Calculator } from 'lucide-react';

export const ModoEuModal: React.FC = () => {
  const { isModoEuModalAberto, setIsModoEuModalAberto, perfil, atualizarPerfil } = useCivico();

  const [form, setForm] = useState<PerfilUsuario>(perfil);

  if (!isModoEuModalAberto) return null;

  // Cálculo da renda per capita estimada da residência
  const calcularRendaPerCapita = () => {
    let rendaMediaTotal = 2400; // Até 2 SM
    if (form.faixaRenda === '2_a_5sm') rendaMediaTotal = 5600;
    else if (form.faixaRenda === '5_a_10sm') rendaMediaTotal = 12150;
    else if (form.faixaRenda === 'acima_10sm') rendaMediaTotal = 21000;

    const totalPessoas = 1 + (form.dependentes === 'com_filhos' ? (form.quantidadeFilhos || 1) : 0);
    const perCapita = Math.round(rendaMediaTotal / totalPessoas);
    return {
      perCapita,
      totalPessoas,
      smProporcao: (perCapita / SALARIO_MINIMO_2026).toFixed(1)
    };
  };

  const infoCalculo = calcularRendaPerCapita();

  const salvarEFechar = () => {
    atualizarPerfil(form);
    setIsModoEuModalAberto(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header com proteção anti-sobreposição */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 break-words leading-tight">Meu perfil</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 break-words mt-0.5">Ajuste seus dados para ver o impacto exato de cada lei</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsModoEuModalAberto(false)}
            className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Caixa explicativa oficial */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-start gap-2.5 text-xs text-blue-950">
            <Info className="w-4 h-4 shrink-0 text-blue-700 mt-0.5" />
            <p className="leading-relaxed">
              Para que o cidadão consiga saber o tipo de política que mais faz sentido dentro da própria realidade e entender se o Congresso está votando contra ou à favor dele.
            </p>
          </div>

          {/* 1. Faixa de Renda (com Salário Mínimo 2026 de R$ 1.621) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-semibold text-slate-800 text-xs sm:text-sm">
                Faixa de Renda Familiar Mensal:
              </label>
              <span className="text-[10px] font-mono text-slate-400">Salário Mínimo: R$ 1.621,00</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'ate_2sm', label: 'Até 2 SM', sub: 'Até R$ 3.242' },
                { id: '2_a_5sm', label: '2 a 5 SM', sub: 'R$ 3.242 a R$ 8.105' },
                { id: '5_a_10sm', label: '5 a 10 SM', sub: 'R$ 8.105 a R$ 16.210' },
                { id: 'acima_10sm', label: '+ 10 SM', sub: 'Mais de R$ 16.210' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, faixaRenda: item.id as FaixaRenda }))}
                  className={`p-2.5 text-left rounded-xl border transition-all ${
                    form.faixaRenda === item.id
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dependentes e Quantidade de Filhos */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div>
              <label className="block font-semibold text-slate-800 text-xs sm:text-sm mb-1.5">
                Você tem dependentes ou filhos na residência?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'sem_filhos', label: 'Sem Filhos' },
                  { id: 'com_filhos', label: 'Com Filhos / Dependentes' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setForm(f => ({
                      ...f,
                      dependentes: item.id as TemDependentes,
                      quantidadeFilhos: item.id === 'com_filhos' ? (f.quantidadeFilhos || 1) : 0
                    }))}
                    className={`py-2 px-3 text-center rounded-xl border text-xs font-semibold transition-all ${
                      form.dependentes === item.id
                        ? 'border-blue-600 bg-white text-blue-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de quantidade de filhos */}
            {form.dependentes === 'com_filhos' && (
              <div className="pt-2 border-t border-slate-200/80 animate-in fade-in duration-150">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Quantos filhos/dependentes moram com você?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(qtd => (
                    <button
                      key={qtd}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, quantidadeFilhos: qtd }))}
                      className={`flex-1 py-1.5 text-center rounded-lg border text-xs font-bold transition-all ${
                        (form.quantidadeFilhos || 1) === qtd
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {qtd === 5 ? '5+' : qtd}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cálculo automático da Renda Per Capita */}
            <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>Renda estimada por pessoa na casa:</span>
              </div>
              <div className="font-mono font-bold text-slate-900 text-sm">
                R$ {infoCalculo.perCapita.toLocaleString('pt-BR')}
                <span className="text-[10px] text-slate-500 font-normal ml-1">
                  ({infoCalculo.smProporcao} SM/pessoa)
                </span>
              </div>
            </div>
          </div>

          {/* 3. Moradia e Vínculo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 text-xs sm:text-sm mb-1.5">
                Situação da Moradia:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'aluguel', label: 'Aluguel' },
                  { id: 'financiamento', label: 'Financiamento Habitacional' },
                  { id: 'propria_quitada', label: 'Casa Própria Quitada' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, moradia: item.id as TipoMoradia }))}
                    className={`w-full py-2 px-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                      form.moradia === item.id
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 text-xs sm:text-sm mb-1.5">
                Vínculo de Trabalho:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'clt', label: 'CLT (Carteira Assinada)' },
                  { id: 'mei', label: 'MEI / Dono de Negócio' },
                  { id: 'servidor', label: 'Servidor Público' },
                  { id: 'autonomo_informal', label: 'Autônomo / Sem Carteira' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, vinculo: item.id as TipoVinculo }))}
                    className={`w-full py-2 px-3 text-left rounded-xl border text-xs font-semibold transition-all ${
                      form.vinculo === item.id
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Estado UF */}
          <div>
            <label className="block font-semibold text-slate-800 text-xs sm:text-sm mb-1">
              Estado onde você vota (UF):
            </label>
            <select
              value={form.uf}
              onChange={e => setForm(f => ({ ...f, uf: e.target.value }))}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm font-semibold"
            >
              {ESTADOS_BRASIL.map(uf => (
                <option key={uf} value={uf}>{uf} - Deputados e Senadores de {uf}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsModoEuModalAberto(false)}
            className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={salvarEFechar}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-sm transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Salvar Meu Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};
