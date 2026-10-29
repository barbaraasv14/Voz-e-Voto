import React, { createContext, useContext, useState, useEffect } from 'react';
import { PerfilUsuario, MateriaLegislativa, QueixaChain } from '../types';
import { PERFIL_PADRAO, MATERIAS_LEGISLATIVAS, CADEIAS_QUEIXAS } from '../data/legislativoData';

interface CivicoContextType {
  perfil: PerfilUsuario;
  atualizarPerfil: (novo: Partial<PerfilUsuario>) => void;
  tabAtiva: 'radar' | 'queixas' | 'boletim' | 'tradutor';
  setTabAtiva: (tab: 'radar' | 'queixas' | 'boletim' | 'tradutor') => void;
  pesquisaGlobal: string;
  setPesquisaGlobal: (termo: string) => void;
  materiaDetalhe: MateriaLegislativa | null;
  setMateriaDetalhe: (materia: MateriaLegislativa | null) => void;
  queixaAtiva: QueixaChain;
  setQueixaAtiva: (queixa: QueixaChain) => void;
  isModoEuModalAberto: boolean;
  setIsModoEuModalAberto: (aberto: boolean) => void;
  isMetodologiaModalAberto: boolean;
  setIsMetodologiaModalAberto: (aberto: boolean) => void;
  materias: MateriaLegislativa[];
  queixas: QueixaChain[];
}

const CivicoContext = createContext<CivicoContextType | undefined>(undefined);

export const CivicoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [perfil, setPerfil] = useState<PerfilUsuario>(() => {
    try {
      const salvo = localStorage.getItem('vozevoto_perfil_usuario');
      if (salvo) return JSON.parse(salvo);
    } catch (e) {
      // Ignorar fallback
    }
    return PERFIL_PADRAO;
  });

  const [tabAtiva, setTabAtiva] = useState<'radar' | 'queixas' | 'boletim' | 'tradutor'>('radar');
  const [pesquisaGlobal, setPesquisaGlobal] = useState('');
  const [materiaDetalhe, setMateriaDetalhe] = useState<MateriaLegislativa | null>(null);
  const [queixaAtiva, setQueixaAtiva] = useState<QueixaChain>(CADEIAS_QUEIXAS[0]);
  const [isModoEuModalAberto, setIsModoEuModalAberto] = useState(false);
  const [isMetodologiaModalAberto, setIsMetodologiaModalAberto] = useState(false);

  const materias = MATERIAS_LEGISLATIVAS;
  const queixas = CADEIAS_QUEIXAS;

  const atualizarPerfil = (novo: Partial<PerfilUsuario>) => {
    setPerfil(prev => {
      const atualizado = { ...prev, ...novo };
      try {
        localStorage.setItem('vozevoto_perfil_usuario', JSON.stringify(atualizado));
      } catch (e) {
        // Ignorar
      }
      return atualizado;
    });
  };

  return (
    <CivicoContext.Provider
      value={{
        perfil,
        atualizarPerfil,
        tabAtiva,
        setTabAtiva,
        pesquisaGlobal,
        setPesquisaGlobal,
        materiaDetalhe,
        setMateriaDetalhe,
        queixaAtiva,
        setQueixaAtiva,
        isModoEuModalAberto,
        setIsModoEuModalAberto,
        isMetodologiaModalAberto,
        setIsMetodologiaModalAberto,
        materias,
        queixas,
      }}
    >
      {children}
    </CivicoContext.Provider>
  );
};

export const useCivico = () => {
  const context = useContext(CivicoContext);
  if (!context) {
    throw new Error('useCivico deve ser usado dentro de um CivicoProvider');
  }
  return context;
};
