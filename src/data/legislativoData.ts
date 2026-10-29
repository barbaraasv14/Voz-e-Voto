import { MateriaLegislativa, QueixaChain, BoletimSemanal, PerfilUsuario } from '../types';
import { DEPUTADOS_PEC_45_COMPLETO } from './votacaoPec45Deputados';

export const PERFIL_PADRAO: PerfilUsuario = {
  faixaRenda: '2_a_5sm',
  moradia: 'aluguel',
  vinculo: 'clt',
  transporte: 'publico',
  dependentes: 'sem_filhos',
  quantidadeFilhos: 0,
  uf: 'SP',
};

export const SALARIO_MINIMO_2026 = 1621.00;


export const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const MATERIAS_LEGISLATIVAS: MateriaLegislativa[] = [
  {
    id: 'pec-45-2019',
    sigla: 'PEC 45/2019 (EC 132/2023 e PLP 68/2024)',
    titulo: 'Reforma Tributária sobre o Consumo (IBS e CBS)',
    casa: 'Câmara dos Deputados',
    tema: 'Tributos',
    autor: 'Dep. Baleia Rossi (MDB-SP) e Lideranças',
    partidoAutor: 'MDB',
    relator: 'Dep. Aguinaldo Ribeiro (PP-PB)',
    partidoRelator: 'PP',
    status: 'Promulgada como EC 132/2023; Leis Complementares em deliberação',
    dataAtualizacao: '15/12/2024',
    tipoVotacao: 'nominal',
    impactoPrimeiroSegundo: 'Unifica 5 tributos em 2 impostos sobre consumo, isenta a cesta básica nacional e cria devolução (cashback) para famílias de baixa renda.',
    oQueMudaNaPratica: 'Substitui PIS, Cofins e IPI (federais), ICMS (estadual) e ISS (municipal) por uma alíquota única estimada em ~27% sobre produtos e serviços, cobrada no local de consumo.',
    artigosCitados: ['Art. 156-A da CF', 'Art. 195, V da CF', 'PLP 68/2024'],
    pros: [
      'Fim da guerra fiscal entre estados e simplificação drástica das obrigações fiscais das empresas.',
      'Cesta básica nacional com alíquota zero para arroz, feijão, leite, carnes e itens essenciais.',
      'Cashback que devolve parte do imposto pago na conta de luz e gás para famílias inscritas no CadÚnico.'
    ],
    contras: [
      'Alíquota geral de ~27% pode se tornar uma das maiores do mundo sobre valor agregado.',
      'Setor de serviços (advogados, escolas, tecnologia, saúde privada) sofrerá aumento de carga em comparação ao modelo anterior.',
      'Regime de transição longo de 2026 até 2033, gerando convivência temporária de dois sistemas fiscais.'
    ],
    impactoNoBolso: 'Quem gasta quase tudo em alimentação básica verá alívio de preços; quem contrata muitos serviços privados (escolas particulares, academias, reformas) terá pressão de reajustes.',
    impactoPorPerfil: [
      {
        condicao: 'Renda de 2 a 5 SM',
        impacto: 'Alívio imediato no supermercado (cesta básica isenta), mas serviços escolares e de saúde podem subir.'
      },
      {
        condicao: 'Paga Aluguel',
        impacto: 'Contratos imobiliários com imobiliárias podem ter taxa de intermediação ajustada pela nova tributação de serviços.'
      },
      {
        condicao: 'Trabalhador CLT',
        impacto: 'Maior transparência nos preços com imposto destacado na nota fiscal.'
      }
    ],
    linkOficial: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2196833',
    placarNominal: {
      totalSim: 371,
      totalNao: 121,
      totalAbstencao: 3,
      resultado: 'Aprovado em 2º turno na Câmara',
      dataVotacao: '15/12/2023',
      partidos: [
        { partido: 'PL', sim: 20, nao: 75, abstencao: 1 },
        { partido: 'PT', sim: 68, nao: 0, abstencao: 0 },
        { partido: 'União Brasil', sim: 48, nao: 9, abstencao: 0 },
        { partido: 'PP', sim: 40, nao: 7, abstencao: 0 },
        { partido: 'MDB', sim: 38, nao: 3, abstencao: 1 },
        { partido: 'PSD', sim: 40, nao: 2, abstencao: 0 },
        { partido: 'Republicanos', sim: 36, nao: 4, abstencao: 0 },
        { partido: 'PSOL', sim: 13, nao: 0, abstencao: 0 },
        { partido: 'Novo', sim: 0, nao: 4, abstencao: 0 }
      ],
      deputados: DEPUTADOS_PEC_45_COMPLETO
    }
  },
  {
    id: 'pec-escala-6x1',
    sigla: 'PEC da Escala 6x1',
    titulo: 'Redução da Jornada Máxima para 36 Horas em 4 Dias',
    casa: 'Câmara dos Deputados',
    tema: 'Trabalho',
    autor: 'Dep. Erika Hilton (PSOL-SP) e Movimento VAT (Rick Azevedo)',
    partidoAutor: 'PSOL',
    relator: 'Relatoria Pendente',
    partidoRelator: 'Pendente',
    status: 'Ainda em trâmite na Comissão de Constituição e Justiça',
    dataAtualizacao: 'Outubro/2026',
    tipoVotacao: 'tramitacao_comissao',
    explicacaoSimbolica: 'Ainda em trâmite: a proposta está no começo da discussão na comissão e ainda não foi para votação geral de todos os deputados no plenário. O registro público atual é a lista de quem assinou para abrir a discussão da PEC.',
    impactoPrimeiroSegundo: 'Acaba com o regime de 6 dias de trabalho por 1 de folga, fixando o teto semanal em 36h com 3 dias de descanso sem redução salarial.',
    oQueMudaNaPratica: 'Altera o artigo 7º da Constituição para diminuir a jornada máxima de 44 para 36 horas semanais, permitindo trabalhar 4 dias e descansar 3 dias.',
    artigosCitados: ['Art. 7º, XIII da CF/88'],
    pros: [
      'Mais tempo para a família, descanso, lazer e saúde física e mental do trabalhador.',
      'Incentiva empresas a contratarem mais turnos de funcionários para manter as atividades.',
      'Segue a tendência internacional de semanas de 4 dias com aumento de produtividade.'
    ],
    contras: [
      'Pequenos comércios, bares e restaurantes apontam que o custo de funcionários pode subir até 25%.',
      'Risco de contratações informais (sem carteira) se não houver corte de impostos para as empresas.',
      'Dificuldade de escala em hospitais, hotéis e transporte público.'
    ],
    impactoNoBolso: 'Para quem trabalha de carteira assinada (CLT): mesmo salário com mais tempo livre. Para quem tem microempresa: precisará organizar novas escalas.',
    impactoPorPerfil: [
      {
        condicao: 'Trabalhador CLT',
        impacto: 'Impacto direto: mais 1 dia inteiro de folga toda semana sem perder R$ 1 do salário.'
      },
      {
        condicao: 'MEI / Dono de Negócio',
        impacto: 'Alerta: precisará de mais pessoal para cobrir todos os dias da semana.'
      }
    ],
    linkOficial: 'https://www.camara.leg.br/noticias/1114565-proposta-que-reduz-jornada-de-trabalho-para-36-horas-semanais-obtem-apoio-para-tramitar/'
  },
  {
    id: 'pl-1904-2024',
    sigla: 'PL 1904/2024',
    titulo: 'Regime de Urgência do Projeto sobre Aborto e Código Penal',
    casa: 'Câmara dos Deputados',
    tema: 'Segurança',
    autor: 'Dep. Sóstenes Cavalcante (PL-RJ) e outros 32 deputados',
    partidoAutor: 'PL',
    relator: 'Relatoria Pendente',
    partidoRelator: 'Pendente',
    status: 'Ainda em trâmite: parado em comissão especial',
    dataAtualizacao: 'Outubro/2026',
    tipoVotacao: 'simbolica',
    explicacaoSimbolica: 'Transparência de verdade: esta proposta NÃO teve voto individual no painel. Foi aprovada em votação rápida de lideranças pelo Presidente da Câmara (Arthur Lira), onde os líderes falaram pelos seus partidos sem os deputados apertarem o botão de Sim ou Não.',
    impactoPrimeiroSegundo: 'Equipara o aborto após 22 semanas de gestação a homicídio simples, com penas de 6 a 20 anos de prisão, inclusive em casos de estupro.',
    oQueMudaNaPratica: 'Altera o Código Penal para punir interrupções tardias de gravidez com cadeia maior do que a pena do próprio crime de estupro (que é de 6 a 10 anos).',
    artigosCitados: ['Art. 124 a 128 do Código Penal'],
    pros: [
      'Defensores afirmam proteger a vida do feto já formado após 5 meses de gestação.',
      'Busca evitar procedimentos de interrupção em estágio gestacional avançado.'
    ],
    contras: [
      'A vítima de estupro (muitas vezes crianças abusadas) pode pegar mais cadeia que o próprio estuprador.',
      'Contraria recomendações médicas da Organização Mundial da Saúde.'
    ],
    impactoNoBolso: 'Não altera tributos, mas atinge diretamente o atendimento médico nos hospitais do SUS.',
    impactoPorPerfil: [
      {
        condicao: 'Com Filhos / Mulheres',
        impacto: 'Alerta sobre acesso à saúde pública e criminalização de mulheres e crianças em situação de vulnerabilidade.'
      }
    ],
    linkOficial: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2434514'
  },
  {
    id: 'irpf-tabela-linha-de-corte',
    sigla: 'Lei nº 15.270/2025 (Novo IRPF em Vigor)',
    titulo: 'Isenção do Imposto de Renda até R$ 5.000 e Novas Regras de 2026',
    casa: 'Congresso Nacional',
    tema: 'Renda e Custo de Vida',
    autor: 'Governo Federal e Congresso Nacional',
    partidoAutor: 'Pluripartidário',
    relator: 'Comissão de Orçamento / Plenário',
    partidoRelator: 'Aprovado',
    status: 'Em vigor em todo o Brasil desde 2026',
    dataAtualizacao: 'Outubro/2026',
    tipoVotacao: 'nominal',
    impactoPrimeiroSegundo: 'Quem ganha até R$ 5.000 por mês agora tem isenção total de Imposto de Renda na folha. Quem ganha acima de R$ 5.000 conta com novas regras progressivas.',
    oQueMudaNaPratica: 'Baseada na Lei nº 15.270/2025 em vigor em 2026, a nova tabela isenta rendimentos mensais de até R$ 5.000,00 (mais de 3 salários mínimos atuais de R$ 1.621,00). Para salários acima de R$ 5.000,00, a lei aplica deduções graduais sem o antigo "salto" brusco de imposto.',
    artigosCitados: ['Lei nº 15.270/2025', 'Art. 153, III da CF/88'],
    pros: [
      'Isenção total de IR no contracheque de mais de 10 milhões de trabalhadores da classe média que ganham até R$ 5.000.',
      'Mais dinheiro no bolso todo mês para quem trabalha de carteira assinada, pequeno servidor ou MEI.',
      'Compensação fiscal com imposto mínimo para super-ricos com rendas anuais acima de R$ 600 mil.'
    ],
    contras: [
      'Quem ganha a partir de R$ 5.001 precisa acompanhar as novas faixas graduais de retenção.',
      'Governo precisou cortar benefícios de grandes empresas para compensar a renúncia de arrecadação.'
    ],
    impactoNoBolso: 'Salários até R$ 5.000: R$ 0,00 de desconto de IR na folha. Salários acima de R$ 5.000: novas regras de desconto calculadas desde janeiro de 2026.',
    impactoPorPerfil: [
      {
        condicao: 'Renda de 2 a 5 SM (Até R$ 8.105)',
        impacto: 'Você é o maior beneficiado da Lei 15.270/2025: quem ganha até R$ 5.000 não paga nada e quem ganha entre R$ 5.001 e R$ 8.105 tem alíquota muito menor.'
      },
      {
        condicao: 'Trabalhador CLT',
        impacto: 'Alívio no holerite todo fim de mês.'
      }
    ],
    linkOficial: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2422774',
    placarNominal: {
      totalSim: 425,
      totalNao: 18,
      totalAbstencao: 2,
      resultado: 'Aprovada com ampla maioria na Câmara e Senado',
      dataVotacao: 'Dezembro/2025 (Validade 2026)',
      partidos: [
        { partido: 'PT', sim: 68, nao: 0, abstencao: 0 },
        { partido: 'PL', sim: 88, nao: 8, abstencao: 1 },
        { partido: 'União Brasil', sim: 55, nao: 2, abstencao: 0 },
        { partido: 'PP', sim: 46, nao: 2, abstencao: 0 },
        { partido: 'MDB', sim: 42, nao: 0, abstencao: 0 },
        { partido: 'PSD', sim: 42, nao: 0, abstencao: 0 },
        { partido: 'Republicanos', sim: 41, nao: 0, abstencao: 0 },
        { partido: 'PSOL', sim: 13, nao: 0, abstencao: 0 },
        { partido: 'Novo', sim: 1, nao: 3, abstencao: 0 }
      ],
      deputados: [
        { nome: 'Tabata Amaral', partido: 'PSB', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Eduardo Bolsonaro', partido: 'PL', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Guilherme Boulos', partido: 'PSOL', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Nikolas Ferreira', partido: 'PL', uf: 'MG', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Kim Kataguiri', partido: 'União Brasil', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Gleisi Hoffmann', partido: 'PT', uf: 'PR', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Marcel van Hattem', partido: 'Novo', uf: 'RS', voto: 'Não', cargo: 'Deputado Federal' },
        { nome: 'Arthur Lira', partido: 'PP', uf: 'AL', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Hugo Motta', partido: 'Republicanos', uf: 'PB', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Carla Zambelli', partido: 'PL', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Erika Hilton', partido: 'PSOL', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Ricardo Salles', partido: 'Novo', uf: 'SP', voto: 'Não', cargo: 'Deputado Federal' }
      ]
    }
  },
  {
    id: 'marco-temporal-terras-indigenas',
    sigla: 'Lei 14.701/2023 (Marco Temporal)',
    titulo: 'Critério de Ocupação de Terras Indígenas em 05/10/1988',
    casa: 'Congresso Nacional',
    tema: 'Meio Ambiente',
    autor: 'Dep. Homero Pereira (in memoriam) e Bancada Ruralista',
    partidoAutor: 'FPA',
    relator: 'Sen. Marcos Rogério (PL-RO) e Dep. Arthur Oliveira Maia (União-BA)',
    partidoRelator: 'PL / União',
    status: 'Veto Presidencial derrubado pelo Congresso; Matéria em mediação no STF',
    dataAtualizacao: '14/12/2023',
    tipoVotacao: 'nominal',
    impactoPrimeiroSegundo: 'Determina que indígenas só têm direito a terras que já ocupavam fisicamente na data da promulgação da Constituição de 1988.',
    oQueMudaNaPratica: 'Exige comprovação documental ou fática de posse em 5 de outubro de 1988 para novas demarcações e abre áreas demarcadas para exploração econômica.',
    artigosCitados: ['Lei 14.701/2023', 'Art. 231 da CF/88'],
    pros: [
      'Segurança jurídica para proprietários rurais e cooperativas agrícolas que possuem títulos de boa-fé.',
      'Estabilidade para investimentos no agronegócio, principal motor das exportações brasileiras.'
    ],
    contras: [
      'Ignora que milhares de etnias foram expulsas à força de seus territórios durante a Ditadura Militar antes de 1988.',
      'Agrava conflitos agrários e ameaça a preservação de biomas como Amazônia e Cerrado.'
    ],
    impactoNoBolso: 'Impacto indireto em preços de commodities agrícolas e na imagem de sustentabilidade do comércio exterior brasileiro.',
    impactoPorPerfil: [
      {
        condicao: 'Geral',
        impacto: 'Tensão entre expansão da fronteira agrícola de exportação e conservação socioambiental.'
      }
    ],
    linkOficial: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=345311',
    placarNominal: {
      totalSim: 321,
      totalNao: 137,
      totalAbstencao: 1,
      resultado: 'Veto do Presidente Lula derrubado pelo Congresso',
      dataVotacao: '14/12/2023',
      partidos: [
        { partido: 'PL', sim: 91, nao: 2, abstencao: 0 },
        { partido: 'PT', sim: 1, nao: 65, abstencao: 0 },
        { partido: 'União Brasil', sim: 49, nao: 5, abstencao: 0 },
        { partido: 'PP', sim: 42, nao: 4, abstencao: 0 },
        { partido: 'MDB', sim: 33, nao: 8, abstencao: 0 },
        { partido: 'PSD', sim: 32, nao: 7, abstencao: 1 },
        { partido: 'Republicanos', sim: 37, nao: 2, abstencao: 0 },
        { partido: 'PSOL', sim: 0, nao: 13, abstencao: 0 }
      ],
      deputados: [
        { nome: 'Arthur Oliveira Maia', partido: 'União Brasil', uf: 'BA', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Célia Xakriabá', partido: 'PSOL', uf: 'MG', voto: 'Não', cargo: 'Deputado Federal' },
        { nome: 'Ricardo Salles', partido: 'Novo', uf: 'SP', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Erika Hilton', partido: 'PSOL', uf: 'SP', voto: 'Não', cargo: 'Deputado Federal' },
        { nome: 'Pedro Lupion', partido: 'PP', uf: 'PR', voto: 'Sim', cargo: 'Deputado Federal' },
        { nome: 'Lindbergh Farias', partido: 'PT', uf: 'RJ', voto: 'Não', cargo: 'Deputado Federal' }
      ]
    }
  }
];

export const CADEIAS_QUEIXAS: QueixaChain[] = [
  {
    id: 'dor-classe-media-penhasco',
    tituloCurto: 'Trabalho muito, mas fico fora de tudo (Efeito Penhasco)',
    categoria: 'Renda e Custo de Vida',
    etapa1_Sentimento: {
      queixaCidadao: 'Passei a vida toda trabalhando duro mas não consigo ascender socialmente. Ganho um pouco acima da linha da pobreza (R$ 3.000 a R$ 5.000) e por isso nenhuma política pública me alcança: não tenho tarifa social, não consigo vaga em creche, não ganho subsídio do Minha Casa Minha Vida e ainda tenho o salário mordido pelo Imposto de Renda. Para onde vai o meu esforço?',
      perfilTipico: 'Trabalhador CLT ou pequeno MEI com renda entre 2 e 5 salários mínimos.',
      frustracaoComum: 'Sensação de que o Estado só cobra e nunca devolve nada para quem está na faixa intermediária.'
    },
    etapa2_PoliticaPublica: {
      mecanismoReal: 'Regras de elegibilidade binárias ("teste de meios linear") sem curva suave de transição (efeito penhasco) somadas ao congelamento inflacionário das faixas do IRPF.',
      explicacao: 'Quando você ganha R$ 1 acima da linha de corte (ex: R$ 2.824 do IRPF ou os tetos do CadÚnico), você perde 100% da isenção ou do subsídio, em vez de pagar uma taxa proporcional. Isso pune quem faz hora extra ou tem pequeno aumento.',
      conceitoChave: 'Linha de Corte Rígida & Tabela do IRPF Defasada'
    },
    etapa3_EsferaEInstrumento: {
      federal: {
        percentual: 65,
        descricao: 'O Congresso Nacional e o Governo Federal fixam a tabela do IRPF, o teto de faturamento do MEI (Lei Complementar 123) e as regras do Minha Casa Minha Vida.',
        leisOuRegras: ['Art. 153, III da CF', 'Lei 14.663/2023 (IRPF)', 'Lei 14.620/2023 (MCMV)'],
        instrumentos: ['Lei Ordinária Federal', 'Medida Provisória', 'Orçamento Geral da União']
      },
      estadual: {
        percentual: 20,
        descricao: 'O Governo do Estado e os Deputados Estaduais cobram ICMS (17% a 22%) sobre gasolina, energia elétrica, telecomunicações e produtos industrializados, encarecendo o custo de vida.',
        leisOuRegras: ['Lei Kandir', 'Leis Estaduais de ICMS'],
        instrumentos: ['Decretos Estaduais', 'Assembleia Legislativa']
      },
      municipal: {
        percentual: 15,
        descricao: 'A Prefeitura e os Vereadores definem critérios de acesso a creches municipais e postos de saúde, muitas vezes usando renda como critério eliminatório.',
        leisOuRegras: ['Leis Orgânicas Municipais', 'Portarias da Secretaria de Educação'],
        instrumentos: ['Plano Municipal de Educação', 'IPTU']
      }
    },
    etapa4_QuemDecide: [
      {
        instituicao: 'Câmara dos Deputados e Senado Federal',
        autoridade: 'Deputados Federais e Senadores da sua bancada',
        competencia: 'Votam a alteração da tabela do IRPF e criam faixas de dedução orçamentária.'
      },
      {
        instituicao: 'Ministério da Fazenda e Presidência da República',
        autoridade: 'Presidente e Ministro da Economia',
        competencia: 'Envia a proposta de Lei Orçamentária e define espaço fiscal para isenções.'
      },
      {
        instituicao: 'Assembleia Legislativa Estadual (ALESP, ALERJ, ALMG, etc.)',
        autoridade: 'Deputados Estaduais e Governador',
        competencia: 'Podem reduzir a alíquota de ICMS sobre alimentos processados e contas de energia.'
      }
    ],
    etapa5_OQueFizeram: [
      {
        data: '1996 a 2023',
        quem: 'Governos sucessivos e Legislativo',
        oQueFez: 'Mantiveram a tabela do IRPF congelada, acumulando 134% de defasagem enquanto os salários corrigiam apenas a inflação nominal.',
        tipoRegistro: 'Omissão/Votação Simbólica'
      },
      {
        data: 'Agosto/2023',
        quem: 'Câmara dos Deputados',
        oQueFez: 'Aprovou com 401 votos a isenção de 2 salários mínimos, mas deixou sem correção as faixas da classe média (7,5% a 27,5%).',
        tipoRegistro: 'Voto Nominal'
      },
      {
        data: '2024',
        quem: 'Comissão de Finanças e Tributação',
        oQueFez: 'Segura o projeto que amplia a isenção para R$ 5.000 sob alegação de falta de receita compensatória de R$ 35 bilhões.',
        tipoRegistro: 'Resolução Regulamentar'
      }
    ],
    etapa6_ConfrontoImpacto: {
      dadoFactual: 'Um trabalhador que ganha R$ 3.800 brutos deixa R$ 145/mês de IR retido na fonte e gasta cerca de R$ 980 em impostos indiretos (ICMS, PIS, Cofins embutidos nos preços). Carga total: ~30% da sua renda.',
      fonteOficial: 'Instituto Brasileiro de Planejamento e Tributação (IBPT) e Dados Abertos da Receita Federal (2024)',
      analise: 'Não é "falta de sorte": é uma equação fiscal desenhada para arrecadar no meio da pirâmide salarial, onde há o maior número de trabalhadores formais registrados.'
    },
    etapa7_AcaoPossivel: {
      quemCobrar: 'Os 3 Senadores e a bancada de Deputados Federais do seu estado, e o Relator do Orçamento Anual.',
      quando: 'Durante a tramitação da Lei Orçamentária Anual (LOA) e dos Projetos de Lei de ampliação da tabela do IRPF.',
      oQueReivindicar: 'Aprovação do reajuste integral das 5 faixas da tabela do IRPF e criação de regras de rampa progressiva nos benefícios (para não perder tudo ao ganhar R$ 1 a mais).',
      canaisOficiais: [
        {
          nome: 'Fale com o Deputado (Câmara)',
          url: 'https://www.camara.leg.br/deputados/quem-sao',
          descricao: 'Localize os deputados federais eleitos pelo seu estado e envie mensagem via e-mail oficial de gabinete.'
        },
        {
          nome: 'Portal e-Cidadania (Senado)',
          url: 'https://www12.senado.leg.br/ecidadania',
          descricao: 'Vote e apoie ideias legislativas e consulte as consultas públicas abertas sobre a tabela do IR.'
        }
      ]
    }
  },
  {
    id: 'dor-moradia-aluguel-caro',
    tituloCurto: 'Trabalho de sol a sol e não consigo comprar casa nem sair do aluguel',
    categoria: 'Moradia',
    etapa1_Sentimento: {
      queixaCidadao: 'O aluguel consome 40% a 50% do meu salário todo mês. Fui tentar financiar um apartamento simples de 2 quartos e o banco pediu entrada que não tenho e a parcela ficou em R$ 2.400 por causa dos juros. Parece impossível ter o próprio teto.',
      perfilTipico: 'Trabalhador urbano que aluga imóvel na periferia ou região metropolitana.',
      frustracaoComum: 'Achar que o preço da casa depende apenas da "ganância" do proprietário, sem ver os juros e as leis urbanas.'
    },
    etapa2_PoliticaPublica: {
      mecanismoReal: 'Taxa básica de juros (Selic) que encarece o Sistema Financeiro da Habitação (SFH), escassez de fundos do FGTS/Poupança, somados a Planos Diretores municipais que encarecem o solo urbano e taxas de ITBI.',
      explicacao: 'O valor da prestação da casa própria é composto por: 60% custo do financiamento (juros e amortização), 25% custo do terreno (zoneamento e oferta de solo) e 15% materiais e tributos (ITBI, cartórios, alvarás).',
      conceitoChave: 'Juros de Financiamento Habitacional + Zoneamento Municipal'
    },
    etapa3_EsferaEInstrumento: {
      federal: {
        percentual: 50,
        descricao: 'O Conselho Monetário Nacional (CMN), Banco Central (Selic) e Conselho Curador do FGTS definem o teto de juros dos financiamentos habitacionais e subsídios do Minha Casa Minha Vida.',
        leisOuRegras: ['Resoluções do CMN', 'Lei 4.380/1964 (SFH)', 'Lei 14.620/2023'],
        instrumentos: ['Taxa Selic', 'Normas do Bacen', 'Orçamento do FGTS']
      },
      estadual: {
        percentual: 15,
        descricao: 'Custas de cartório de registro de imóveis (tabeladas pelos Tribunais de Justiça estaduais) e política estadual de infraestrutura urbana/saneamento.',
        leisOuRegras: ['Leis de Emolumentos Cartorários dos TJs Estaduais'],
        instrumentos: ['Tabelas de Emolumentos', 'Companhias de Habitação (CDHU, COHABs)']
      },
      municipal: {
        percentual: 35,
        descricao: 'A Câmara de Vereadores e o Prefeito votam o Plano Diretor, a Lei de Zoneamento, o Coeficiente de Aproveitamento do Solo e a alíquota do ITBI (2% a 4% do valor do imóvel à vista).',
        leisOuRegras: ['Plano Diretor Municipal', 'Lei de Uso e Ocupação do Solo', 'Código Tributário Municipal (ITBI)'],
        instrumentos: ['Plano Diretor', 'Outorga Onerosa', 'Alvarás de Construção']
      }
    },
    etapa4_QuemDecide: [
      {
        instituicao: 'Câmara Municipal (Sua Cidade)',
        autoridade: 'Vereadores e Prefeito',
        competencia: 'Aprovam o Plano Diretor e alíquota do ITBI. Se restringirem a construção de prédios, o metro quadrado dispara.'
      },
      {
        instituicao: 'Banco Central do Brasil e CMN',
        autoridade: 'Diretoria do Bacen e Ministério da Fazenda',
        competencia: 'Fixam a taxa Selic e as regras de direcionamento dos depósitos da poupança para a habitação.'
      },
      {
        instituicao: 'Conselho Curador do FGTS',
        autoridade: 'Representantes de Trabalhadores, Empregadores e Governo Federal',
        competencia: 'Aprovam o orçamento de subsídios a fundo perdido para famílias de menor renda.'
      }
    ],
    etapa5_OQueFizeram: [
      {
        data: '2023-2024',
        quem: 'Bacen / Copom',
        oQueFez: 'Manteve a taxa de juros básica em dois dígitos (10,5% a 12,25%), o que faz um financiamento habitacional de R$ 200 mil custar mais de R$ 500 mil no somatório das parcelas de 30 anos.',
        tipoRegistro: 'Resolução Regulamentar'
      },
      {
        data: '2023',
        quem: 'Câmara e Senado Federal',
        oQueFez: 'Aprovaram a recriação do Minha Casa Minha Vida (Lei 14.620/2023), elevando o teto do imóvel financiado para R$ 350 mil.',
        tipoRegistro: 'Voto Nominal'
      },
      {
        data: 'Recorrente',
        quem: 'Câmaras Municipais',
        oQueFez: 'Aprovação de taxas de ITBI elevadas cobradas à vista na escritura, sem parcelamento para primeiros compradores.',
        tipoRegistro: 'Resolução Regulamentar'
      }
    ],
    etapa6_ConfrontoImpacto: {
      dadoFactual: 'Em um financiamento Caixa de R$ 220.000 em 360 meses a uma taxa de 9,5% a.a. + TR, a parcela inicial é de cerca de R$ 2.100. Se a taxa caísse para 6,5% a.a., a parcela cairia para R$ 1.450 (economia de R$ 650/mês, viabilizando o crédito para quem ganha 3 SM).',
      fonteOficial: 'Simulador Habitacional da Caixa Econômica Federal e Relatório de Inflação do Bacen (2024)',
      analise: 'Não é só o preço do tijolo: a taxa de juros ditada pelas decisões fiscais federais é o maior pedágio que impede o trabalhador de comprar o próprio teto.'
    },
    etapa7_AcaoPossivel: {
      quemCobrar: 'Os Vereadores da sua cidade (para isentar ou parcelar ITBI para quem compra o 1º imóvel) e o Governo Federal (para ampliar o subsídio do FGTS).',
      quando: 'Nas audiências públicas de revisão do Plano Diretor Municipal e nas votações da Lei Orçamentária.',
      oQueReivindicar: 'Criação de isenção de ITBI para imóveis populares de até R$ 250 mil e incentivo a habitação social perto de corredores de ônibus/metrô.',
      canaisOficiais: [
        {
          nome: 'Câmara Municipal da sua Cidade',
          url: 'https://interlegis.leg.br',
          descricao: 'Acesse o portal da Câmara de Vereadores do seu município para acompanhar as sessões da comissão de urbanismo.'
        },
        {
          nome: 'Ouvidoria do Ministério das Cidades',
          url: 'https://www.gov.br/cidades/pt-br/canais_atendimento/ouvidoria',
          descricao: 'Envie manifestações e sugestões sobre regras de enquadramento do programa habitacional federal.'
        }
      ]
    }
  },
  {
    id: 'dor-escala-6x1-cansaco',
    tituloCurto: 'A escala 6x1 me esgota e não me dá tempo para viver',
    categoria: 'Trabalho',
    etapa1_Sentimento: {
      queixaCidadao: 'Trabalho 6 dias por semana no comércio/mercado e tenho apenas 1 domingo ou dia de folga no meio da semana. Passo a folga dormindo exausto, lavando roupa ou fazendo comida para a semana. Não vejo meus filhos crescerem e não consigo estudar para tentar um emprego melhor.',
      perfilTipico: 'Trabalhador CLT do comércio, supermercados, call centers, restaurantes e hotelaria.',
      frustracaoComum: 'Sensação de aprisionamento na rotina sem tempo para descanso ou ascensão profissional.'
    },
    etapa2_PoliticaPublica: {
      mecanismoReal: 'Texto do Artigo 7º, inciso XIII da Constituição Federal de 1988 e Artigo 58 da CLT, que autorizam a jornada de 8 horas diárias e 44 horas semanais.',
      explicacao: 'A escala 6x1 é legal porque a lei divide as 44 horas em 7h20 por 6 dias ou 8h de segunda a sexta + 4h no sábado. Mudar isso exige uma Emenda à Constituição (308 votos favoráveis na Câmara em dois turnos).',
      conceitoChave: 'Jornada Constitucional de 44 Horas'
    },
    etapa3_EsferaEInstrumento: {
      federal: {
        percentual: 100,
        descricao: 'A competência para legislar sobre Direito do Trabalho é PRIVATIVA da União (Constituição Federal, Art. 22, I). Nem o Prefeito nem o Governador podem criar uma jornada semanal diferente para o setor privado.',
        leisOuRegras: ['Art. 7º, XIII da CF/88', 'Art. 22, I da CF/88', 'CLT (Decreto-Lei 5.452/1943)'],
        instrumentos: ['Proposta de Emenda à Constituição (PEC)', 'Leis Federais']
      },
      estadual: {
        percentual: 0,
        descricao: 'Nenhuma competência sobre regime de trabalho CLT no setor privado. (Estados só regulam servidores públicos estaduais).',
        leisOuRegras: [],
        instrumentos: []
      },
      municipal: {
        percentual: 0,
        descricao: 'Nenhuma competência sobre jornada de trabalho do trabalhador celetista. (Municípios só regulam horário de funcionamento do comércio local, mas não a carga semanal do empregado).',
        leisOuRegras: [],
        instrumentos: []
      }
    },
    etapa4_QuemDecide: [
      {
        instituicao: 'Congresso Nacional (Câmara e Senado)',
        autoridade: '513 Deputados Federais e 81 Senadores',
        competencia: 'São os ÚNICOS que possuem poder legal para alterar a Constituição e reduzir o teto de 44h para 36h semanais.'
      },
      {
        instituicao: 'Comissão de Constituição e Justiça (CCJC)',
        autoridade: 'Deputados membros da CCJ e seu Presidente',
        competencia: 'Decidem se a PEC é admissível e se deve ser votada ou engavetada.'
      }
    ],
    etapa5_OQueFizeram: [
      {
        data: '1988',
        quem: 'Assembleia Nacional Constituinte',
        oQueFez: 'Reduziu a jornada de 48h para 44h semanais, mas manteve a possibilidade da divisão em 6 dias de trabalho.',
        tipoRegistro: 'Voto Nominal'
      },
      {
        data: 'Novembro/2024',
        quem: 'Deputada Erika Hilton e 216 Deputados',
        oQueFez: 'Assinaram a PEC da Escala 6x1 para dar início à tramitação legislativa.',
        tipoRegistro: 'Resolução Regulamentar'
      },
      {
        data: 'Novembro/2024',
        quem: 'Lideranças Partidárias de Oposição e Centro',
        oQueFez: 'Resistência pública ou silêncio, apontando risco de aumento de custo para o comércio.',
        tipoRegistro: 'Omissão/Votação Simbólica'
      }
    ],
    etapa6_ConfrontoImpacto: {
      dadoFactual: 'Segundo dados da PNAD Contínua (IBGE), cerca de 14,2 milhões de brasileiros trabalham sob escala 6x1, predominantemente no comércio e serviços, com rendimento médio de 1,6 salário mínimo.',
      fonteOficial: 'IBGE / PNAD Contínua e RAIS - Ministério do Trabalho e Emprego (2024)',
      analise: 'Essa pauta depende 100% de deputados federais e senadores. Reclamar com o prefeito ou governador sobre escala de trabalho CLT não gera nenhum efeito legal.'
    },
    etapa7_AcaoPossivel: {
      quemCobrar: 'Os deputados federais eleitos pelo seu estado, cobrando se eles já assinaram a PEC e como votarão na CCJ.',
      quando: 'Agora, durante o processo de designação de relator na Comissão de Constituição e Justiça da Câmara.',
      oQueReivindicar: 'Aprovação da PEC que reduz a jornada máxima para 36h em escala 4x3 sem corte salarial.',
      canaisOficiais: [
        {
          nome: 'Lista de Deputados que Assinaram a PEC',
          url: 'https://www.camara.leg.br',
          descricao: 'Verifique no site oficial da Câmara dos Deputados se o deputado em quem você votou subscreveu a PEC.'
        }
      ]
    }
  },
  {
    id: 'dor-combustivel-preco-bomba',
    tituloCurto: 'Por que a gasolina e os alimentos estão sempre caros?',
    categoria: 'Renda e Custo de Vida',
    etapa1_Sentimento: {
      queixaCidadao: 'O preço da gasolina subiu de novo na bomba e o quilo do frango ou arroz dispara no mercado. O Presidente culpa os governadores e os postos; os governadores culpam a Petrobras e os impostos federais. Afinal, quem é que manda no preço?',
      perfilTipico: 'Trabalhador que usa moto/carro ou que sofre com o repasse do frete nos preços da comida.',
      frustracaoComum: 'Ficar no meio do fogo cruzado de discursos políticos onde cada lado culpa o adversário.'
    },
    etapa2_PoliticaPublica: {
      mecanismoReal: 'Composição de preços do combustível: Petróleo internacional em dólar + Margem da Petrobras + Alíquota fixa de ICMS estadual (Ad Rem) + PIS/Cofins e Cide federais + Etanol anidro e margem dos postos.',
      explicacao: 'O combustível encarece toda a cadeia alimentar (frete rodoviário transporta 65% das cargas brasileiras). O preço na bomba é uma composição matemática de 5 componentes distintos divididos entre União e Estados.',
      conceitoChave: 'Preço Paridade de Importação + ICMS Fixo por Litro'
    },
    etapa3_EsferaEInstrumento: {
      federal: {
        percentual: 55,
        descricao: 'Preço da refinaria da Petrobras (dependente de câmbio e cotação internacional), tributos federais (PIS, Cofins e Cide) e regulação da ANP.',
        leisOuRegras: ['Lei 9.478/1997 (Lei do Petróleo)', 'Medidas Provisórias Tributárias'],
        instrumentos: ['Política de Preços da Petrobras', 'Alíquotas Federais de PIS/Cofins']
      },
      estadual: {
        percentual: 25,
        descricao: 'Cobrança do ICMS em valor fixo por litro (definido em reunião conjunta de todos os governadores no Confaz). Hoje gira em torno de R$ 1,37 a R$ 1,47 por litro de gasolina.',
        leisOuRegras: ['Lei Complementar 192/2022', 'Convênios do Confaz'],
        instrumentos: ['Convênios do Confaz', 'Decretos Estaduais']
      },
      municipal: {
        percentual: 0,
        descricao: 'Municípios não cobram imposto sobre combustível (apenas alvará do posto e IPTU do terreno, com impacto inferior a 1%).',
        leisOuRegras: [],
        instrumentos: []
      }
    },
    etapa4_QuemDecide: [
      {
        instituicao: 'Diretoria Executiva da Petrobras e Conselho de Administração',
        autoridade: 'Presidente da Petrobras e Acionistas',
        competencia: 'Definem a política comercial de preços do refino nas refinarias brasileiras.'
      },
      {
        instituicao: 'CONFAZ (Conselho Nacional de Política Fazendária)',
        autoridade: 'Secretários de Fazenda dos 26 Estados e DF',
        competencia: 'Votam periodicamente o reajuste do valor em reais do ICMS cobrado em cada litro vendido.'
      },
      {
        instituicao: 'Congresso Nacional e Presidência da República',
        autoridade: 'Deputados, Senadores e Presidente',
        competencia: 'Decidem a reoneração ou desoneração de tributos federais (PIS/Cofins).'
      }
    ],
    etapa5_OQueFizeram: [
      {
        data: '2022',
        quem: 'Congresso Nacional',
        oQueFez: 'Aprovou a LC 194 e LC 192 limitando o ICMS e criando alíquota única em reais (Ad Rem) por litro.',
        tipoRegistro: 'Voto Nominal'
      },
      {
        data: '2023',
        quem: 'Ministério da Fazenda',
        oQueFez: 'Reonerou gradualmente o PIS/Cofins sobre combustíveis para recompor arrecadação orçamentária.',
        tipoRegistro: 'Resolução Regulamentar'
      },
      {
        data: '2024',
        quem: 'Confaz (Governadores)',
        oQueFez: 'Reajustou o ICMS da gasolina em R$ 0,15 por litro em todo o país simultaneamente.',
        tipoRegistro: 'Resolução Regulamentar'
      }
    ],
    etapa6_ConfrontoImpacto: {
      dadoFactual: 'Em um litro de gasolina a R$ 6,10 na bomba: R$ 2,20 vai para a Petrobras; R$ 1,37 vai para o Governo do seu Estado (ICMS); R$ 0,68 vai para o Governo Federal (PIS/Cofins); R$ 0,85 é custo do etanol obrigatório e R$ 1,00 é margem de transporte e do posto revendedor.',
      fonteOficial: 'Boletim Semanal de Preços da ANP e Composição Petrobras (Dezembro/2024)',
      analise: 'Não existe um culpado exclusivo: 36% do que você paga na bomba são tributos diretos (estados e união somados) e 36% é petróleo/refino.'
    },
    etapa7_AcaoPossivel: {
      quemCobrar: 'Cobrar o Governador do seu Estado sobre a votação do ICMS no Confaz, e a Bancada Federal sobre a tributação de combustíveis fósseis.',
      quando: 'Antes das deliberações anuais do Confaz.',
      oQueReivindicar: 'Transparência nas margens dos postos pelo Procon municipal e congelamento de alíquotas do ICMS.',
      canaisOficiais: [
        {
          nome: 'Painel de Preços da ANP',
          url: 'https://www.gov.br/anp/pt-br/assuntos/precos-e-defesa-da-concorrencia',
          descricao: 'Consulte os preços médios, mínimos e máximos praticados por posto em cada bairro da sua cidade.'
        }
      ]
    }
  }
];

export const BOLETIM_SEMANAL_DEFAULT: BoletimSemanal = {
  id: 'boletim-semanal-atual',
  edicao: 'Edição Semanal (Atualizada de acordo com a data da pesquisa)',
  data: 'Atualizada de acordo com a data da pesquisa',
  titulo: 'Reforma Tributária, Escala 6x1 e o Teto do IRPF: O Que Decide Seu Fim de Mês',
  duracaoTotal: '3 min 12 seg',
  chamadaCurta: 'O que o Congresso votou esta semana que mexe direto com seu aluguel, sua jornada de trabalho e o desconto no seu holerite.',
  capitulos: [
    {
      minuto: '00:00 - 01:05',
      materia: 'PEC da Escala 6x1 na Câmara',
      destaque: 'Pressão popular faz proposta avançar para análise na CCJ',
      detalhe: 'A proposta que reduz a carga de trabalho de 44 para 36 horas semanais atingiu 216 assinaturas e será distribuída para relatoria.',
      quemApoiou: 'Bancadas de esquerda e parlamentares ligados a movimentos de trabalhadores jovens.',
      quemCriticou: 'Entidades empresariais do comércio (CNC, Abrasel) e bancadas liberais, alegando risco de custos na folha.',
      statusVotacao: 'Tramitação em Comissão (Ainda não há votação nominal de plenário)'
    },
    {
      minuto: '01:06 - 02:10',
      materia: 'Regulamentação da Reforma Tributária (PLP 68/2024)',
      destaque: 'Senado conclui votação da cesta básica com alíquota zero',
      detalhe: 'Itens essenciais como carnes, leite, feijão e arroz ficam livres de imposto estadual e federal no novo modelo IBS/CBS.',
      quemApoiou: 'Maioria ampla de 68 votos a favor no Senado após acordo com a bancada do agronegócio.',
      quemCriticou: 'Setor de serviços e oposição, alertando para a alíquota geral de ~27% sobre outras categorias.',
      statusVotacao: 'Votação Nominal Registrada'
    },
    {
      minuto: '02:11 - 03:12',
      materia: 'Tabela do Imposto de Renda e Orçamento',
      destaque: 'Disputa sobre expansão da isenção para quem ganha até R$ 5.000',
      detalhe: 'Equipe econômica e líderes partidários negociam medidas de compensação fiscal para cumprir a promessa de alívio da classe média.',
      quemApoiou: 'Governo e bancadas trabalhistas defendem taxação de super-ricos como contrapartida.',
      quemCriticou: 'Mercado financeiro e parlamentares de centro temem impacto na meta de déficit primário.',
      statusVotacao: 'Negociação na Comissão Mista de Orçamento'
    }
  ],
  roteiroCompleto: `Olá, cidadão! Este é o Boletim Cívico Voz & Voto da semana. Em exatamente três minutos, você vai entender o que aconteceu no Congresso Nacional e como isso afeta seu bolso e seu tempo.

Primeiro minuto: A PEC que propõe o fim da escala 6x1 e a redução da jornada para 36 horas semanais conseguiu 216 assinaturas — bem mais que as 171 necessárias — e agora vai começar a tramitar na Comissão de Constituição e Justiça. Atenção para a transparência: ainda não houve votação de plenário. Apoiada por movimentos de trabalhadores e rebatida por entidades do comércio que temem alta nos custos, a batalha agora é pela escolha do deputado que será o relator.

Segundo minuto: No Senado, a regulamentação da Reforma Tributária deu um passo decisivo. Em votação nominal, com 68 votos a favor e apenas 12 contrários, o Senado garantiu a cesta básica nacional com alíquota zero total, incluindo carnes e produtos essenciais. O contraponto é que, para fechar a conta, a alíquota padrão para os outros setores pode chegar a 27% a partir de 2026.

Terceiro minuto: Na Comissão de Orçamento, deputados e senadores travam a disputa sobre a correção da tabela do Imposto de Renda. A promessa de elevar a isenção para salários de até R$ 5.000 depende de encontrar cerca de R$ 35 bilhões em receitas compensatórias. A disputa é clara: taxar altas rendas para aliviar o holerite de quem ganha entre 3 e 7 salários mínimos.

Você não precisa de discurso fácil ou heróis inventados. O endereço de quem decide está no seu estado. Compartilhe este áudio no grupo da sua família e cobre seus representantes. Até a próxima semana!`,
  textoWhatsApp: `🇧🇷 *BOLETIM SEMANAL VOZ & VOTO (Congresso Nacional)*
_O que votaram esta semana que mexe direto na sua vida:_

⏱ *1. Escala 6x1 na Câmara:*
A PEC para reduzir a jornada semanal de 44h para 36h bateu 216 assinaturas e vai para a CCJ. _Ainda não há votação nominal de plenário, apenas lista de quem apoiou ou resistiu à tramitação._

🛒 *2. Reforma Tributária no Senado:*
Aprovada a isenção de imposto na cesta básica (arroz, feijão, carnes). Mas a alíquota padrão para outros produtos e serviços deve ficar em ~27%. Placar: 68 a 12.

💼 *3. Tabela do Imposto de Renda:*
A promessa de isentar quem ganha até R$ 5 mil está travada na Comissão de Orçamento: falta definir quem vai pagar a conta de R$ 35 bilhões.

👉 _Cobre o deputado do seu estado antes da votação!_
Acesse o radar completo e veja como cada parlamentar votou:
https://vozevoto.org`
};
