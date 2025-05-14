
import { Actor, FilterOption } from '../types/types';

export const actorsData: Actor[] = [
  {
    id: '1',
    name: 'TOTVS Labs',
    type: 'corporate',
    description: 'Centro de inovação da TOTVS focado no desenvolvimento de soluções tecnológicas inovadoras.',
    address: 'Rua Otto Boehm, 48 - América, Joinville - SC, 89201-700',
    coordinates: [-48.8462, -26.3009],
    website: 'https://www.totvs.com/labs/',
    founded: '2012'
  },
  {
    id: '2',
    name: 'UNIVILLE - Universidade da Região de Joinville',
    type: 'university',
    description: 'Instituição de ensino superior que forma profissionais e desenvolve pesquisa em diversas áreas.',
    address: 'Rua Paulo Malschitzki, 10 - Zona Industrial Norte, Joinville - SC, 89219-710',
    coordinates: [-48.8513, -26.2453],
    website: 'https://www.univille.edu.br/',
    founded: '1965'
  },
  {
    id: '3',
    name: 'Perini Business Park',
    type: 'coworking',
    description: 'Maior condomínio multissetorial privado do Brasil, abrigando empresas de diversos segmentos.',
    address: 'Rua Dona Francisca, 8300 - Distrito Industrial, Joinville - SC, 89219-600',
    coordinates: [-48.8382, -26.2668],
    website: 'https://www.perinibusinesspark.com.br/',
    founded: '2005'
  },
  {
    id: '4',
    name: 'Softville',
    type: 'accelerator',
    description: 'Fundação que apoia o desenvolvimento do setor de software em Joinville e região.',
    address: 'Rua Otto Boehm, 48 - América, Joinville - SC, 89201-700',
    coordinates: [-48.8462, -26.3029],
    website: 'https://www.softville.org.br/',
    founded: '1994'
  },
  {
    id: '5',
    name: 'ACATE Joinville',
    type: 'accelerator',
    description: 'Associação Catarinense de Tecnologia - polo Joinville, que apoia empresas de base tecnológica.',
    address: 'Rua Henrique Meyer, 61 - Centro, Joinville - SC, 89201-405',
    coordinates: [-48.8457, -26.3077],
    website: 'https://www.acate.com.br/',
    founded: '1986'
  },
  {
    id: '6',
    name: 'Conta Azul',
    type: 'startup',
    description: 'Empresa de software que oferece sistema de gestão online para pequenas empresas.',
    address: 'Av. Santos Dumont, 831 - Santo Antônio, Joinville - SC, 89218-105',
    coordinates: [-48.8220, -26.3039],
    website: 'https://contaazul.com/',
    founded: '2011',
    employees: 500
  },
  {
    id: '7',
    name: 'Asaas',
    type: 'startup',
    description: 'Plataforma de cobranças e gerenciamento financeiro para empresas e profissionais autônomos.',
    address: 'Rua Dona Francisca, 8300 - Distrito Industrial, Joinville - SC, 89219-600',
    coordinates: [-48.8382, -26.2698],
    website: 'https://www.asaas.com/',
    founded: '2013',
    employees: 250
  },
  {
    id: '8',
    name: 'Prefeitura de Joinville',
    type: 'government',
    description: 'Administração municipal de Joinville, com iniciativas de apoio à inovação e empreendedorismo.',
    address: 'Av. Hermann August Lepper, 10 - Saguaçu, Joinville - SC, 89221-005',
    coordinates: [-48.8444, -26.3087],
    website: 'https://www.joinville.sc.gov.br/',
    founded: '1851'
  },
  {
    id: '9',
    name: 'Angels Joinville',
    type: 'investor',
    description: 'Grupo de investidores-anjo que apoiam startups em estágio inicial em Joinville.',
    address: 'Centro, Joinville - SC',
    coordinates: [-48.8400, -26.3047],
    website: 'https://www.anjosjoinville.com.br'
  },
  {
    id: '10',
    name: 'UDESC - Universidade do Estado de Santa Catarina',
    type: 'university',
    description: 'Universidade pública com diversos cursos de graduação e pós-graduação em áreas tecnológicas.',
    address: 'Rua Paulo Malschitzki, 200 - Zona Industrial Norte, Joinville - SC, 89219-710',
    coordinates: [-48.8493, -26.2523],
    website: 'https://www.udesc.br/cct',
    founded: '1965'
  },
  {
    id: '11',
    name: 'Hub Conecta',
    type: 'coworking',
    description: 'Espaço de coworking com foco em inovação e tecnologia.',
    address: 'Rua Ministro Calógeras, 400 - Centro, Joinville - SC, 89202-008',
    coordinates: [-48.8462, -26.3069],
    website: 'https://www.hubconecta.com/',
    founded: '2018'
  },
  {
    id: '12',
    name: 'JaraguaTec',
    type: 'accelerator',
    description: 'Centro de Inovação Tecnológica que apoia empreendedores e startups da região.',
    address: 'Rua dos Imigrantes, 500 - Vila Rau, Jaraguá do Sul - SC, 89254-430',
    coordinates: [-48.8891, -26.2766],
    website: 'https://www.jaraguatec.org.br/',
    founded: '2005'
  },
];

export const filterOptions: FilterOption[] = [
  { id: 'startup', label: 'Startups', color: '#60a5fa', isActive: true },
  { id: 'accelerator', label: 'Aceleradoras', color: '#8b5cf6', isActive: true },
  { id: 'university', label: 'Universidades', color: '#10b981', isActive: true },
  { id: 'investor', label: 'Investidores', color: '#f97316', isActive: true },
  { id: 'coworking', label: 'Coworkings', color: '#ef4444', isActive: true },
  { id: 'corporate', label: 'Corporações', color: '#2563eb', isActive: true },
  { id: 'government', label: 'Governo', color: '#6b7280', isActive: true },
];

export const getColorByType = (type: string): string => {
  const filter = filterOptions.find(option => option.id === type);
  return filter ? filter.color : '#6b7280'; // default color
};

export const getIconByType = (type: string): string => {
  switch (type) {
    case 'startup':
      return '🚀';
    case 'accelerator':
      return '🔥';
    case 'university':
      return '🎓';
    case 'investor':
      return '💰';
    case 'coworking':
      return '🏢';
    case 'corporate':
      return '🏭';
    case 'government':
      return '🏛️';
    default:
      return '📍';
  }
};
