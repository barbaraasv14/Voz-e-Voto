import React, { useState, useEffect, useRef } from 'react';
import { useCivico } from '../context/CivicoContext';
import { BoletimSemanal } from '../types';
import { BOLETIM_SEMANAL_DEFAULT } from '../data/legislativoData';
import {
  Play,
  Pause,
  RotateCcw,
  Share2,
  Check,
  Headphones,
  Sparkles,
  FileText,
  Loader2,
  Volume2
} from 'lucide-react';

export const BoletimAudioPlayer: React.FC = () => {
  const [boletim, setBoletim] = useState<BoletimSemanal>(BOLETIM_SEMANAL_DEFAULT);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progresso, setProgresso] = useState(0); // 0 a 100
  const [velocidade, setVelocidade] = useState<number>(1);
  const [capituloAtivoIdx, setCapituloAtivoIdx] = useState(0);
  const [copiado, setCopiado] = useState(false);
  const [mostrarTranscricao, setMostrarTranscricao] = useState(false);
  const [atualizandoIa, setAtualizandoIa] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);
  const audioHtmlRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      pararTudo();
    };
  }, []);

  const pararTudo = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioHtmlRef.current) {
      audioHtmlRef.current.pause();
      audioHtmlRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  // Pesquisar pautas da semana em tempo real com IA
  const pesquisarPautasSemanaIa = async () => {
    setAtualizandoIa(true);
    pararTudo();
    try {
      const res = await fetch('/api/civico/pesquisar-pautas-semana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data && data.boletim) {
        setBoletim(data.boletim);
        setProgresso(0);
        setCapituloAtivoIdx(0);
      }
    } catch (e) {
      console.warn('Erro ao pesquisar pautas da semana:', e);
    } finally {
      setAtualizandoIa(false);
    }
  };

  // Iniciar áudio com voz feminina humanizada
  const iniciarAudio = async () => {
    pararTudo();

    // 1. Tentar áudio sintetizado no servidor com voz Kore (Gemini TTS)
    try {
      const res = await fetch('/api/civico/gerar-audio-boletim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: boletim.roteiroCompleto }),
      });
      const data = await res.json();

      if (data && data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        audio.playbackRate = velocidade;
        audioHtmlRef.current = audio;

        audio.onended = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setProgresso(100);
          if (timerRef.current) clearInterval(timerRef.current);
        };

        audio.play();
        setIsPlaying(true);
        setIsPaused(false);
        iniciarTimerProgresso();
        return;
      }
    } catch (e) {
      console.log('Utilizando Web Speech com voz feminina humanizada.');
    }

    // 2. Fallback: Web Speech API com voz feminina brasileira suave e sem enganchar
    if (!synthRef.current) return;

    // Higienizar texto para fala fluida (evitar caracteres que engasgam o sintetizador)
    const textoLimpo = boletim.roteiroCompleto
      .replace(/[#*_~`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(textoLimpo);
    utterance.lang = 'pt-BR';
    utterance.rate = velocidade * 0.95; // Cadência suave para não tropeçar
    utterance.pitch = 1.05; // Tom feminino natural

    // Localizar voz feminina em língua portuguesa
    const voices = synthRef.current.getVoices();
    const vozFeminina = voices.find(v =>
      (v.lang.includes('pt-BR') || v.lang.includes('pt')) &&
      (v.name.toLowerCase().includes('female') ||
       v.name.toLowerCase().includes('luciana') ||
       v.name.toLowerCase().includes('maria') ||
       v.name.toLowerCase().includes('francisca') ||
       v.name.toLowerCase().includes('google português do brasil') ||
       v.name.toLowerCase().includes('leticia'))
    ) || voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt'));

    if (vozFeminina) {
      utterance.voice = vozFeminina;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgresso(100);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
    iniciarTimerProgresso();
  };

  const pausarAudio = () => {
    if (audioHtmlRef.current) {
      audioHtmlRef.current.pause();
    } else if (synthRef.current) {
      synthRef.current.pause();
    }
    setIsPlaying(false);
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const retomarAudio = () => {
    if (audioHtmlRef.current) {
      audioHtmlRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
      iniciarTimerProgresso();
    } else if (synthRef.current && synthRef.current.paused) {
      synthRef.current.resume();
      setIsPlaying(true);
      setIsPaused(false);
      iniciarTimerProgresso();
    } else {
      iniciarAudio();
    }
  };

  const alternarPlayPause = () => {
    if (isPlaying) {
      pausarAudio();
    } else {
      retomarAudio();
    }
  };

  const reiniciarAudio = () => {
    pararTudo();
    setProgresso(0);
    setCapituloAtivoIdx(0);
    iniciarAudio();
  };

  const iniciarTimerProgresso = () => {
    const duracaoSegundos = 192 / velocidade;
    const passo = 100 / duracaoSegundos;

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgresso(prev => {
        const prox = prev + passo;
        if (prox < 33) setCapituloAtivoIdx(0);
        else if (prox < 66) setCapituloAtivoIdx(1);
        else setCapituloAtivoIdx(2);

        if (prox >= 100) {
          clearInterval(timerRef.current);
          return 100;
        }
        return prox;
      });
    }, 1000);
  };

  const alterarVelocidade = (novaVel: number) => {
    setVelocidade(novaVel);
    if (audioHtmlRef.current) {
      audioHtmlRef.current.playbackRate = novaVel;
    } else if (isPlaying) {
      iniciarAudio();
    }
  };

  const copiarParaWhatsApp = () => {
    navigator.clipboard.writeText(boletim.textoWhatsApp);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden box-border space-y-4 sm:space-y-6">
      {/* Card Principal do Player */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm w-full min-w-0 overflow-hidden">
        {/* Header do Boletim com Botão de Pesquisa por IA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex-wrap">
              <Headphones className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{boletim.edicao}</span>
              <span aria-hidden="true">·</span>
              <span>Voz Feminina Humanizada</span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug break-words">
              {boletim.titulo}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed break-words">
              {boletim.chamadaCurta}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            {/* Botão de Pesquisa Ativa com IA */}
            <button
              onClick={pesquisarPautasSemanaIa}
              disabled={atualizandoIa}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-xl transition-all whitespace-nowrap active:scale-[0.98]"
            >
              {atualizandoIa ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Pesquisando Pautas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Atualizar Pautas com IA</span>
                </>
              )}
            </button>

            {/* Botão Encaminhar */}
            <button
              onClick={copiarParaWhatsApp}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-all whitespace-nowrap active:scale-[0.98]"
            >
              {copiado ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Encaminhar no WhatsApp</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Console do Player de Áudio Mobile-First */}
        <div className="mt-5 p-4 sm:p-6 bg-slate-900 text-white rounded-2xl shadow-inner w-full min-w-0">
          {/* Visualizador de Onda Sonora Simulado */}
          <div className="flex items-center justify-center gap-1 h-10 sm:h-12 mb-4">
            {[40, 65, 25, 90, 45, 75, 30, 85, 95, 60, 40, 70, 80, 50, 65, 35, 90, 55, 40, 75, 85, 30].map(
              (altura, i) => (
                <div
                  key={i}
                  style={{
                    height: isPlaying ? `${altura}%` : isPaused ? '35%' : '15%',
                    transition: 'height 0.2s ease',
                  }}
                  className={`w-1 sm:w-1.5 rounded-full ${
                    isPlaying ? 'bg-blue-400' : isPaused ? 'bg-amber-400' : 'bg-slate-700'
                  }`}
                />
              )
            )}
          </div>

          {/* Barra de Progresso */}
          <div className="space-y-1 mb-4">
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${progresso}%` }}
                className={`h-full rounded-full transition-all duration-300 ${isPaused ? 'bg-amber-400' : 'bg-blue-500'}`}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>{Math.floor((progresso * 192) / 100 / 60)}:{(Math.floor((progresso * 192) / 100) % 60).toString().padStart(2, '0')}</span>
              <span>{boletim.duracaoTotal}</span>
            </div>
          </div>

          {/* Controles Centrais com Botão de Pausa Claro */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Botão Play / Pause Gigante e Intuitivo */}
              <button
                onClick={alternarPlayPause}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-lg ${
                  isPlaying
                    ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
                title={isPlaying ? 'Pausar áudio' : 'Ouvir agora'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={reiniciarAudio}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="Reiniciar do começo"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {isPaused && (
                <span className="text-xs text-amber-300 font-semibold animate-pulse">
                  Pausado
                </span>
              )}
            </div>

            {/* Controle de Velocidade */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl text-xs font-semibold">
              <span className="text-slate-400 px-1.5 text-[10px]">Velocidade:</span>
              {[1, 1.25, 1.5].map(v => (
                <button
                  key={v}
                  onClick={() => alterarVelocidade(v)}
                  className={`px-2 py-0.5 rounded-lg transition-colors text-[11px] ${
                    velocidade === v
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {v}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Capítulos Síncronos do Boletim (Minuto a Minuto) */}
        <div className="mt-6 space-y-2.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Capítulos do Boletim Semanal:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {boletim.capitulos.map((cap, idx) => {
              const ativo = capituloAtivoIdx === idx;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    ativo
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-slate-500">{cap.minuto}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {cap.statusVotacao}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug break-words">
                    {cap.materia}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed break-words">
                    {cap.destaque}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transcrição Completa */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setMostrarTranscricao(t => !t)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{mostrarTranscricao ? 'Ocultar Transcrição' : 'Ler Roteiro Completo do Boletim'}</span>
          </button>

          {mostrarTranscricao && (
            <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 font-normal whitespace-pre-line animate-in fade-in duration-150 break-words">
              {boletim.roteiroCompleto}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
