/**
 * Tipos centrais da plataforma Voz & Voto
 */

export type FaixaRenda = 'ate_2sm' | '2_a_5sm' | '5_a_10sm' | 'acima_10sm';
export type TipoMoradia = 'aluguel' | 'financiamento' | 'propria_quitada';
export type TipoVinculo = 'clt' | 'mei' | 'servidor' | 'autonomo_informal';
export type TipoTransporte = 'publico' | 'carro' | 'moto_app';
export type TemDependentes = 'com_filhos' | 'sem_filhos';

export interface PerfilUsuario {
  faixaRenda: FaixaRenda;
  moradia: TipoMoradia;
  vinculo: TipoVinculo;
  transporte: TipoTransporte;
  dependentes: TemDependentes;
  quantidadeFilhos: number;
  uf: string;
}

export type TipoVotacao = 'nominal' | 'simbolica' | 'tramitacao_comissao';

export interface VotoDeputado {
  nome: string;
  partido: string;
  uf: string;
  voto: 'Sim' | 'Não' | 'Abstenção' | 'Obstrução';
  cargo: 'Deputado Federal' | 'Senador';
}

export interface PlacarPartidario {
  partido: string;
  sim: number;
  nao: number;
  abstencao: number;
}

export interface PlacarNominal {
  totalSim: number;
  totalNao: number;
  totalAbstencao: number;
  resultado: string;
  dataVotacao: string;
  partidos: PlacarPartidario[];
  deputados: VotoDeputado[];
}

export interface MateriaLegislativa {
  id: string;
  sigla: string;
  titulo: string;
  casa: 'Câmara dos Deputados' | 'Senado Federal' | 'Congresso Nacional';
  tema: 'Tributos' | 'Trabalho' | 'Moradia' | 'Segurança' | 'Saúde' | 'Renda e Custo de Vida' | 'Meio Ambiente';
  autor: string;
  partidoAutor: string;
  relator: string;
  partidoRelator: string;
  status: string;
  dataAtualizacao: string;
  tipoVotacao: TipoVotacao;
  explicacaoSimbolica?: string;
  impactoPrimeiroSegundo: string;
  oQueMudaNaPratica: string;
  artigosCitados: string[];
  pros: string[];
  contras: string[];
  impactoNoBolso: string;
  impactoPorPerfil: {
    condicao: string;
    impacto: string;
  }[];
  linkOficial: string;
  placarNominal?: PlacarNominal;
}

export interface EsferaCompetencia {
  percentual: number;
  descricao: string;
  leisOuRegras: string[];
  instrumentos: string[];
}

export interface QueixaChain {
  id: string;
  tituloCurto: string;
  categoria: string;
  etapa1_Sentimento: {
    queixaCidadao: string;
    perfilTipico: string;
    frustracaoComum: string;
  };
  etapa2_PoliticaPublica: {
    mecanismoReal: string;
    explicacao: string;
    conceitoChave: string; // Ex: "Linha de Corte / Efeito Penhasco", "Indexação Selic"
  };
  etapa3_EsferaEInstrumento: {
    federal: EsferaCompetencia;
    estadual: EsferaCompetencia;
    municipal: EsferaCompetencia;
  };
  etapa4_QuemDecide: {
    instituicao: string;
    autoridade: string;
    competencia: string;
  }[];
  etapa5_OQueFizeram: {
    data: string;
    quem: string;
    oQueFez: string;
    tipoRegistro: 'Voto Nominal' | 'Emenda Orçamentária' | 'Resolução Regulamentar' | 'Omissão/Votação Simbólica';
  }[];
  etapa6_ConfrontoImpacto: {
    dadoFactual: string;
    fonteOficial: string;
    analise: string;
  };
  etapa7_AcaoPossivel: {
    quemCobrar: string;
    quando: string;
    oQueReivindicar: string;
    canaisOficiais: {
      nome: string;
      url: string;
      descricao: string;
    }[];
  };
}

export interface CapituloBoletim {
  minuto: string;
  materia: string;
  destaque: string;
  detalhe: string;
  quemApoiou: string;
  quemCriticou: string;
  statusVotacao: string;
}

export interface BoletimSemanal {
  id: string;
  edicao: string;
  data: string;
  titulo: string;
  duracaoTotal: string;
  chamadaCurta: string;
  capitulos: CapituloBoletim[];
  roteiroCompleto: string;
  textoWhatsApp: string;
}
