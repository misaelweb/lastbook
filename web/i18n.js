/* Lastbook interface language: Portuguese (Brazil) alongside the original English.
 *
 * The English text is the source of truth in the markup and the scripts; this file
 * only replaces whole UI strings it knows, and leaves anything else in English.
 * Nothing here reaches the network, and library content (titles, page text,
 * transcripts) is never rewritten by the dictionary: the translator is applied to
 * the interface chrome and to strings that exactly match a known label.
 *
 * Usage from other scripts:  LB.t('Save')  and  LB.apply(element)
 */
(function () {
  'use strict';

  const KEY = 'lb.lang';

  const PT = {
    /* ---------------- shell, navigation, common ---------------- */
    'Skip to content': 'Ir para o conteúdo',
    'Show or hide the sidebar': 'Mostrar ou ocultar a barra lateral',
    'Sidebar': 'Barra lateral',
    'Sections': 'Seções',
    'Main': 'Principal',
    'Videos': 'Vídeos',
    'Map': 'Mapa',
    'Chat': 'Conversa',
    'Works offline': 'Funciona sem internet',
    'Back': 'Voltar',
    'Forward': 'Avançar',
    'Lastbook videos': 'Vídeos do Lastbook',
    'Search the library': 'Buscar na biblioteca',
    'Search': 'Buscar',
    'Opening the guide…': 'Abrindo o guia…',
    'Lastbook needs JavaScript.': 'O Lastbook precisa de JavaScript.',
    'Back to the library': 'Voltar para a biblioteca',
    'Save': 'Salvar',
    'Saved': 'Salvo',
    'Removed from Saved': 'Removido dos salvos',
    'Saved on this device': 'Salvo neste dispositivo',
    'Saved as a file on this device': 'Salvo como arquivo neste dispositivo',
    'Something went wrong.': 'Algo deu errado.',
    'Try again': 'Tentar de novo',
    'Close': 'Fechar',
    'Open': 'Abrir',
    'Loading…': 'Carregando…',
    'Loading text.': 'Carregando o texto.',
    'Look again': 'Ver de novo',
    'Not found': 'Não encontrado',
    'That page isn’t here': 'Essa página não está aqui',
    'The link may be from an older version of the guide.': 'O link pode ser de uma versão anterior do guia.',
    'This page could not be opened': 'Não foi possível abrir esta página',
    'The library sent an unreadable reply.': 'A biblioteca enviou uma resposta ilegível.',
    'Server error': 'Erro do servidor',
    'Scroll left': 'Rolar para a esquerda',
    'Scroll right': 'Rolar para a direita',
    'You are here': 'Você está aqui',
    'Back to chat': 'Voltar para a conversa',
    'Back to page': 'Voltar para a página',
    'Source not found in this library copy': 'Fonte não encontrada nesta cópia da biblioteca',
    'Unknown publisher': 'Editora desconhecida',
    'transcript': 'transcrição',
    'Show more videos': 'Ver mais vídeos',
    'Show more': 'Ver mais',
    'See all': 'Ver tudo',
    'All videos': 'Todos os vídeos',
    'More like this': 'Mais como este',

    /* ---------------- home, guides, videos ---------------- */
    'Injury & illness': 'Ferimentos e doenças',
    'Drinking water': 'Água potável',
    'Power is out': 'Falta de energia',
    'Food & cooking': 'Comida e cozinhar',
    'Too hot or cold': 'Calor ou frio demais',
    'Toilets & hygiene': 'Banheiros e higiene',
    'Quake, fire, flood': 'Terremoto, fogo, enchente',
    'Contact & find way': 'Contato e orientação',
    'Grow food': 'Cultivar comida',
    'Preserve food': 'Conservar comida',
    'Health care': 'Cuidados de saúde',
    'Repair & build': 'Consertar e construir',
    'Power systems': 'Sistemas de energia',
    'Land & resources': 'Terra e recursos',
    'Need help now': 'Preciso de ajuda agora',
    'Learn a skill': 'Aprender uma habilidade',
    'Pick up where you left off': 'Continue de onde parou',
    'Step-by-step routes for the weeks and months ahead': 'Caminhos passo a passo para as próximas semanas e meses',
    'Watch how it’s done': 'Veja como se faz',
    'Videos picked for the guides': 'Vídeos escolhidos para os guias',
    'Resume at': 'Continuar em',
    'Ask a question about this': 'Fazer uma pergunta sobre isto',
    'Where do you want to start?': 'Por onde você quer começar?',
    'What’s happening?': 'O que está acontecendo?',
    'Videos for this': 'Vídeos sobre isto',
    'Get ready before it happens': 'Prepare-se antes de acontecer',
    'Go deeper: full manuals & articles': 'Aprofunde: manuais e artigos completos',
    'Search video titles': 'Buscar títulos de vídeos',
    'Under 10 min': 'Menos de 10 min',
    '10–30 min': '10–30 min',
    'Over 30 min': 'Mais de 30 min',
    'Continue watching': 'Continuar assistindo',
    'Any length': 'Qualquer duração',
    'Ask about this video': 'Perguntar sobre este vídeo',
    'Ask about this': 'Perguntar sobre isto',
    'Captions written by the publisher': 'Legendas escritas pela editora',
    'No matching words.': 'Nenhuma palavra correspondente.',
    'No transcript was saved for this video, so search and the assistant can’t see what’s said in it.':
      'Não há transcrição salva para este vídeo, então a busca e o assistente não conseguem ver o que é dito nele.',
    'How to show it': 'Como mostrar',
    'Show or hide the source details': 'Mostrar ou ocultar os detalhes da fonte',
    'Whole PDF': 'PDF completo',
    'Text only': 'Somente texto',
    'Page': 'Página',
    'Text': 'Texto',
    'Couldn’t load the text.': 'Não foi possível carregar o texto.',
    'This page image couldn’t be made.': 'Não foi possível gerar a imagem desta página.',
    'Show the text instead': 'Mostrar o texto em vez disso',
    'No text on this page (it may be a picture or blank).': 'Sem texto nesta página (pode ser uma imagem ou estar em branco).',
    'Text pulled out of the original automatically - tables, diagrams and warning boxes can be lost or out of order. Check the Page view for anything important.':
      'Texto extraído do original automaticamente — tabelas, diagramas e quadros de aviso podem faltar ou ficar fora de ordem. Confira a visualização de Página para o que for importante.',
    'If the PDF doesn’t show here (some phones can’t), use Page view or open the original file.':
      'Se o PDF não aparecer aqui (alguns celulares não conseguem), use a visualização de Página ou abra o arquivo original.',
    'Example searches': 'Buscas de exemplo',
    'cut won’t stop bleeding': 'corte que não para de sangrar',
    'Search results': 'Resultados da busca',
    'Results': 'Resultados',
    'Ask the library': 'Perguntar à biblioteca',
    'Get a written answer with the exact pages it came from': 'Receba uma resposta escrita com as páginas exatas de onde veio',
    'Use the words you’d use with a friend. For example:': 'Use as palavras que você usaria com um amigo. Por exemplo:',
    'Describe it in everyday words': 'Descreva com palavras do dia a dia',
    'Search isn’t responding.': 'A busca não está respondendo.',
    'The library may be busy rebuilding its index. Try again in a minute.':
      'A biblioteca pode estar ocupada reconstruindo o índice. Tente de novo em um minuto.',
    'Manuals & pages': 'Manuais e páginas',
    'In the manuals and saved pages': 'Nos manuais e páginas salvas',
    'In the encyclopedias': 'Nas enciclopédias',
    'Most relevant pages': 'Páginas mais relevantes',
    'Matched by your words': 'Encontrado pelas suas palavras',
    'Matched by meaning as well as by words': 'Encontrado pelo sentido e pelas palavras',
    'Every manual, saved web page and video': 'Todos os manuais, páginas salvas e vídeos',
    'Browse by subject': 'Navegar por assunto',
    'Complete offline copies': 'Cópias completas offline',
    'Step-by-step routes that start simple': 'Caminhos passo a passo que começam simples',
    'Prepare your household': 'Prepare sua casa',
    'Filter by title or publisher': 'Filtrar por título ou editora',
    'To read': 'Para ler',
    'Recently opened': 'Abertos recentemente',
    'PDF is a scan': 'O PDF é digitalizado',
    'PDFs are scans': 'Os PDFs são digitalizações',
    'One complete encyclopedia': 'Uma enciclopédia completa',
    'Two complete encyclopedias': 'Duas enciclopédias completas',
    'Three complete encyclopedias': 'Três enciclopédias completas',
    'Four complete encyclopedias': 'Quatro enciclopédias completas',
    'This download has no encyclopedias.': 'Este download não tem enciclopédias.',
    'No articles found': 'Nenhum artigo encontrado',
    'Try another word for the same thing.': 'Tente outra palavra para a mesma coisa.',
    'Searching the encyclopedias.': 'Buscando nas enciclopédias.',
    'Encyclopedia search isn’t available right now': 'A busca nas enciclopédias não está disponível agora',
    'Open one': 'Abrir uma',
    'Search:': 'Buscar:',
    'Medical encyclopedia': 'Enciclopédia médica',
    'Wikipedia (text only)': 'Wikipédia (somente texto)',
    'Wikibooks — how-to textbooks': 'Wikibooks — livros de instruções',
    'Appropedia — appropriate technology': 'Appropedia — tecnologia apropriada',
    'Medical encyclopedia (MDWiki)': 'Enciclopédia médica (MDWiki)',
    'MDWiki: plain-language articles on conditions, medicines and first aid.':
      'MDWiki: artigos em linguagem simples sobre doenças, medicamentos e primeiros socorros.',
    'Open textbooks and how-to manuals, from cooking to electronics.':
      'Livros didáticos e manuais de instruções, da culinária à eletrônica.',
    'Appropriate technology: water, sanitation, energy and building projects.':
      'Tecnologia apropriada: projetos de água, saneamento, energia e construção.',
    'The full English encyclopedia, text only (no pictures).':
      'A enciclopédia completa em inglês, somente texto (sem imagens).',
    'Community-written: good for background - use the guides’ manuals for safety-critical steps.':
      'Escrita pela comunidade: boa para contexto — use os manuais dos guias para passos críticos de segurança.',
    'Encyclopedia article — community-written': 'Artigo de enciclopédia — escrito pela comunidade',
    '[edit on Wikidata]': '[editar no Wikidata]',

    /* ---------------- local AI / about ---------------- */
    'About this library': 'Sobre esta biblioteca',
    'About': 'Sobre',
    'Local AI': 'IA local',
    'No local model is running, so Chat can’t write answers right now. Guides, search, videos and the map all work without one.':
      'Nenhum modelo local está rodando, então a Conversa não consegue escrever respostas agora. Guias, busca, vídeos e mapa funcionam sem ele.',
    'not added. Add it in Library and local AI (about 17 GB).':
      'não adicionado. Adicione em Biblioteca e IA local (cerca de 17 GB).',
    'checking the file…': 'verificando o arquivo…',
    'checking this computer’s memory…': 'verificando a memória deste computador…',
    'Turn on': 'Ligar',
    'Turn off': 'Desligar',
    'Stop it now': 'Parar agora',
    'Local AI ready': 'IA local pronta',
    'Local AI ready — it starts when you ask': 'IA local pronta — ela inicia quando você pergunta',
    'Local AI is off': 'IA local está desligada',
    'No local AI added': 'Nenhuma IA local adicionada',
    'Local AI unavailable': 'IA local indisponível',
    'The local AI could not start.': 'Não foi possível iniciar a IA local.',
    'The local AI file is not the right one.': 'O arquivo da IA local não é o correto.',
    'The assistant is offline; you will get matching pages instead':
      'O assistente está offline; em vez disso você verá as páginas correspondentes',
    'The local assistant model isn’t running right now.': 'O modelo do assistente local não está rodando agora.',
    'This copy has no version number (it was not built as an app).':
      'Esta cópia não tem número de versão (não foi compilada como aplicativo).',
    'Check again': 'Verificar de novo',
    'Check for updates': 'Verificar atualizações',
    'Lastbook could not ask about updates.': 'O Lastbook não conseguiu verificar atualizações.',
    'Lastbook app': 'Aplicativo Lastbook',

    /* ---------------- chat ---------------- */
    'Close chat list': 'Fechar lista de conversas',
    'Show chats': 'Mostrar conversas',
    'New chat': 'Nova conversa',
    'Chats will be forgotten when you close this page': 'As conversas serão esquecidas quando você fechar esta página',
    'Chats will be kept on this device': 'As conversas serão mantidas neste dispositivo',
    'Delete all chats on this device?': 'Apagar todas as conversas deste dispositivo?',
    'Starting the local AI.': 'Iniciando a IA local.',
    'Thinking.': 'Pensando.',
    'Searching the library.': 'Buscando na biblioteca.',
    'Reading the pages it found.': 'Lendo as páginas encontradas.',
    'Writing the answer.': 'Escrevendo a resposta.',
    'Working.': 'Trabalhando.',
    'Checking this computer’s memory…': 'Verificando a memória deste computador…',
    'Video at': 'Vídeo em',
    'Don’t use this as context': 'Não usar isto como contexto',
    'Tried to read an unknown document': 'Tentou ler um documento desconhecido',
    'Couldn’t view that page': 'Não foi possível ver essa página',
    'Place from the answer': 'Local da resposta',
    'Not found in the library': 'Não encontrado na biblioteca',
    'Sources disagree': 'As fontes discordam',
    'The model’s own reasoning — not from the library': 'Raciocínio do próprio modelo — não vem da biblioteca',
    'Couldn’t copy': 'Não foi possível copiar',
    'The server refused the question': 'O servidor recusou a pergunta',
    'The answer stopped unexpectedly.': 'A resposta parou inesperadamente.',
    'Stopped.': 'Parado.',
    'Stop the answer': 'Parar a resposta',
    'Copy': 'Copiar',
    'Copied': 'Copiado',
    'Explain this page in simple words': 'Explique esta página em palavras simples',
    'What are the warnings on this page?': 'Quais são os avisos desta página?',
    'Is there a video that shows this?': 'Existe um vídeo que mostra isto?',
    'Summarise what this video shows': 'Resuma o que este vídeo mostra',
    'What safety points does this video make?': 'Que pontos de segurança este vídeo apresenta?',
    'Find a manual page that covers the same thing': 'Encontre uma página de manual que trate do mesmo assunto',
    'What should I do first?': 'O que devo fazer primeiro?',
    'What are the most important warnings?': 'Quais são os avisos mais importantes?',
    'Which video should I watch first?': 'Qual vídeo devo assistir primeiro?',
    'The tap water is off. How do I make water safe to drink?':
      'A água da torneira acabou. Como torno a água segura para beber?',
    'Someone has a deep cut that won’t stop bleeding. What do I do?':
      'Alguém tem um corte profundo que não para de sangrar. O que eu faço?',
    'How do I run a generator safely during a power outage?':
      'Como uso um gerador com segurança durante uma queda de energia?',
    'The fridge has been off for 6 hours. What food is still safe?':
      'A geladeira está desligada há 6 horas. Que comida ainda está segura?',
    'The toilets don’t work. How do we make an emergency toilet?':
      'Os banheiros não funcionam. Como fazemos um banheiro de emergência?',
    'Phones are down. How can our household stay in contact?':
      'Os telefones estão fora. Como nossa casa pode manter contato?',
    'What vegetables can I plant this month?': 'Que hortaliças posso plantar este mês?',
    'How do I change the oil on a Honda EU2200i generator?':
      'Como troco o óleo de um gerador Honda EU2200i?',

    /* ---------------- map: tools ---------------- */
    'Map — Lastbook': 'Mapa — Lastbook',
    'Zoom in': 'Aproximar',
    'Zoom out': 'Afastar',
    'Go to my area': 'Ir para a minha área',
    'My area': 'Minha área',
    'Set as my area': 'Definir como minha área',
    'Whole map': 'Mapa inteiro',
    'Full screen': 'Tela cheia',
    'Exit full screen': 'Sair da tela cheia',
    'Exit full screen (Esc)': 'Sair da tela cheia (Esc)',
    '3D terrain view': 'Relevo em 3D',
    '3D view': 'Visão 3D',
    '3D view unavailable': 'Visão 3D indisponível',
    'Aerial photos': 'Fotos aéreas',
    'Linked place': 'Lugar vinculado',
    'Saved as your area on this device': 'Salvo como sua área neste dispositivo',
    'You are here (approx.)': 'Você está aqui (aprox.)',
    'Location unavailable:': 'Localização indisponível:',
    'Outside the area this map details, only main roads, towns and water show.':
      'Fora da área detalhada deste mapa, aparecem apenas estradas principais, cidades e água.',
    'This download has the base map only: main roads, towns and water.':
      'Este download tem apenas o mapa base: estradas principais, cidades e água.',
    'Click to list them': 'Clique para listá-los',
    'Click to zoom in': 'Clique para aproximar',
    'Other tree crops': 'Outras culturas arbóreas',
    'Nearest to the map center': 'Mais próximos do centro do mapa',
    'For the layers you have on. Straight-line distance, not by road.':
      'Para as camadas ativas. Distância em linha reta, não por estrada.',
    'Layers': 'Camadas',
    'No layers': 'Sem camadas',
    'Unnamed': 'Sem nome',

    /* map: layer groups and labels */
    'Emergency help': 'Ajuda de emergência',
    'Water': 'Água',
    'Supplies & camping': 'Suprimentos e acampamento',
    'Food that keeps growing (2025 crop maps)': 'Alimento que continua crescendo (mapas de cultivo de 2025)',
    'Natural resources (historical records)': 'Recursos naturais (registros históricos)',
    'Emergency': 'Emergência',
    'Supplies': 'Suprimentos',
    'Food trees': 'Árvores frutíferas',
    'Resources': 'Recursos',
    'All': 'Tudo',
    'Hospitals': 'Hospitais',
    'Clinics & doctors': 'Clínicas e médicos',
    'Pharmacies': 'Farmácias',
    'Fire stations': 'Bombeiros',
    'Police': 'Polícia',
    'Shelters (structures)': 'Abrigos (estruturas)',
    'Community centers, town halls & libraries': 'Centros comunitários, prefeituras e bibliotecas',
    'Drinking-water taps': 'Torneiras de água potável',
    'Reservoirs & named lakes': 'Reservatórios e lagos nomeados',
    'Unnamed ponds (1+ acre, year-round)': 'Lagoas sem nome (perenes)',
    'Dams (with storage & purpose)': 'Barragens (volume e finalidade)',
    'Springs (untested water)': 'Nascentes (água não testada)',
    'Supermarkets & food shops': 'Supermercados e lojas de comida',
    'Hardware stores': 'Lojas de ferragens',
    'Fuel stations': 'Postos de combustível',
    'Orchards: nuts, fruit, citrus, olives': 'Pomares: castanhas, frutas, cítricos, azeitonas',
    'Vineyards (grapes)': 'Vinhedos (uvas)',
    'Berries & asparagus': 'Frutas pequenas e aspargos',
    'Fish-stocking sites (California)': 'Locais de peixamento (Califórnia)',
    'Boating facilities (California)': 'Instalações náuticas (Califórnia)',
    'Minerals & mines (US)': 'Minerais e minas (EUA)',
    'Oil & gas wells (California)': 'Poços de petróleo e gás (Califórnia)',
    'Places': 'Lugares',
    'Roads': 'Estradas',
    'Buildings': 'Edifícios',
    'Terrain': 'Relevo',
    'School': 'Escola',
    'Dentist': 'Dentista',
    'Vet': 'Veterinário',
    'Care home': 'Casa de repouso',
    'Post office': 'Correios',
    'Recorded status': 'Situação registrada',
    'Last production year': 'Último ano de produção',
    'Well type': 'Tipo de poço',
    'Well status': 'Situação do poço',
    'API number': 'Número API',
    'Stocked (week of)': 'Peixamento (semana de)',
    'Also called': 'Também chamado',
    'Main purpose': 'Finalidade principal',
    'All purposes': 'Todas as finalidades',
    'River / stream': 'Rio / córrego',
    'Nearest town': 'Cidade mais próxima',
    'Normal storage (acre-ft)': 'Volume normal (acre-pé)',
    'Max storage (acre-ft)': 'Volume máximo (acre-pé)',
    'Surface (acres)': 'Superfície (acres)',
    'Height (ft)': 'Altura (pés)',
    'Dam type': 'Tipo de barragem',
    'Downstream hazard if it failed': 'Risco a jusante em caso de rompimento',
    'Area (acres)': 'Área (acres)',
    'Water present': 'Água presente',
    'Reservoir type': 'Tipo de reservatório',
    'Acres of it in this ~600 m block': 'Extensão neste bloco de ~600 m',
    'All tree, vine & berry acres in block': 'Área total de árvores, vinhas e frutas no bloco',
    'Satellite crop map year': 'Ano do mapa de cultivo por satélite',
    'Fuel sales': 'Venda de combustível',
    'Ramp lanes': 'Pistas de rampa',
    'Fish cleaning': 'Limpeza de peixe',
    'USGS mineral record: an occurrence or past mine, not proof of recoverable ore, access or safety. Old workings can be deadly.':
      'Registro mineral do USGS: uma ocorrência ou mina antiga, não prova de minério aproveitável, acesso ou segurança. Escavações antigas podem ser mortais.',
    'State well record. Most are plugged or idle; never approach an unsealed well head.':
      'Registro estadual de poço. A maioria está tampada ou inativa; nunca se aproxime de um poço aberto.',
    'A past stocking record — it does not confirm fish are present now.':
      'Um registro antigo de peixamento — não confirma que há peixes agora.',
    'Facility survey data; check current access.': 'Dados de levantamento da instalação; confirme o acesso atual.',
    'National Inventory of Dams record. Keep away from spillways and outlets — currents and sudden releases drown people.':
      'Registro do Inventário Nacional de Barragens (EUA). Fique longe de vertedouros e saídas — correntes e liberações súbitas matam.',
    'Surface water: filter, then boil or disinfect before drinking. Skip water with green scum or discolouration (toxic algae; boiling won’t remove it).':
      'Água de superfície: filtre e depois ferva ou desinfete antes de beber. Evite água com espuma verde ou cor alterada (algas tóxicas; ferver não remove).',
    'Small ponds are often livestock ponds with manure runoff: treat the water and cook any fish thoroughly. Small ponds can be fished out in weeks.':
      'Lagoas pequenas costumam ser de gado, com escoamento de esterco: trate a água e cozinhe bem qualquer peixe. Lagoas pequenas podem ficar sem peixe em semanas.',
    'Mapped spring — treat the water before drinking.': 'Nascente mapeada — trate a água antes de beber.',
    'Mapped tap; may be off in an emergency.': 'Torneira mapeada; pode estar sem água numa emergência.',

    /* ---------------- setup wizard ---------------- */
    'Set up Lastbook': 'Configurar o Lastbook',
    'Looking at this computer…': 'Examinando este computador…',
    'This computer': 'Este computador',
    'graphics card for the AI': 'placa de vídeo para a IA',
    'memory, shared with graphics': 'memória, compartilhada com a placa de vídeo',
    'memory': 'memória',
    'free on': 'livres em',
    'Not ready to download yet': 'Ainda não pronto para baixar',
    'On this computer': 'Neste computador',
    'Already downloaded': 'Já baixado',
    'with the local AI': 'com a IA local',
    'This computer does not have enough memory for it.': 'Este computador não tem memória suficiente para isso.',
    'Change the library': 'Trocar a biblioteca',
    'Your local map': 'Seu mapa local',
    'Select your state to continue.': 'Selecione seu estado para continuar.',
    'Your map is already included; only the address index downloads.':
      'Seu mapa já está incluído; só o índice de endereços será baixado.',
    'Your state map is already included.': 'O mapa do seu estado já está incluído.',
    'Street-address search is not available for this state yet.':
      'A busca por endereço ainda não está disponível para este estado.',
    'Checked at start': 'Verificado no início',
    'This is what you have now.': 'Isto é o que você tem agora.',
    'Pick a library.': 'Escolha uma biblioteca.',
    'the local AI': 'a IA local',
    'Choose your state to continue': 'Escolha seu estado para continuar',
    'Download and install': 'Baixar e instalar',
    'Download and install update': 'Baixar e instalar atualização',
    'Can’t change here': 'Não é possível trocar aqui',
    'The picker could not open. Try choosing the file or folder again.':
      'Não foi possível abrir o seletor. Tente escolher o arquivo ou a pasta de novo.',
    'The local AI file will be used. No need to download it.':
      'O arquivo da IA local será usado. Não é preciso baixá-lo.',
    'Setup could not start.': 'Não foi possível iniciar a configuração.',
    'Updated edition available —': 'Edição atualizada disponível —',
    'On this computer —': 'Neste computador —',
    'Not installed — about': 'Não instalado — cerca de',
    'Not for this computer.': 'Não serve para este computador.',
    'Detailed map:': 'Mapa detalhado:',
    'Detailed map': 'Mapa detalhado',
    'Choose state': 'Escolher estado',
    'Choose region': 'Escolher região',
    'Add address search': 'Adicionar busca por endereço',
    'The local AI was removed.': 'A IA local foi removida.',
    'The old library is being deleted.': 'A biblioteca antiga está sendo apagada.',
    'Repair could not start.': 'Não foi possível iniciar o reparo.',
    'This Lastbook cannot do that yet.': 'Esta versão do Lastbook ainda não faz isso.',
    'Your library is untouched and still works.': 'Sua biblioteca está intacta e continua funcionando.',
    'Nothing else on this computer was changed.': 'Nada mais neste computador foi alterado.',
    'Free some space, then retry, or go back and choose less.':
      'Libere espaço e tente de novo, ou volte e escolha menos.',
    'The internet connection dropped.': 'A conexão com a internet caiu.',
    'What is downloaded is kept. Retry when you are online again.':
      'O que já foi baixado é mantido. Tente de novo quando estiver online.',
    'The download came out damaged twice, so it was not used.':
      'O download veio corrompido duas vezes, então não foi usado.',
    'Retry to download it once more.': 'Tente baixar mais uma vez.',
    'Unpacking did not finish.': 'A descompactação não terminou.',
    'Check there is room on the disk, then retry.': 'Verifique se há espaço no disco e tente de novo.',
    'The new library is ready but could not be switched in.':
      'A nova biblioteca está pronta, mas não pôde ser ativada.',
    'Retry, or close Lastbook and open it again.': 'Tente de novo, ou feche o Lastbook e abra outra vez.',
    'The download was cancelled.': 'O download foi cancelado.',
    'Start again when you are ready.': 'Comece de novo quando quiser.',
    'Retry, or go back and choose again.': 'Tente de novo, ou volte e escolha outra vez.',
    'Checking stopped': 'Verificação interrompida',
    'Unpacking stopped': 'Descompactação interrompida',
    'Finishing stopped': 'Finalização interrompida',
    'Making sure every byte is right': 'Conferindo cada byte',
    'Switching to the new map': 'Ativando o novo mapa',
    'Switching to the new library': 'Ativando a nova biblioteca',
    'Checking the library': 'Verificando a biblioteca',
    'Stopped when Lastbook closed. Resume to finish; nothing needs downloading.':
      'Parou quando o Lastbook fechou. Retome para terminar; não é preciso baixar nada.',
    'What is downloaded is kept. Resume when you are ready, even after closing Lastbook.':
      'O que já foi baixado é mantido. Retome quando quiser, mesmo depois de fechar o Lastbook.',
    'All good': 'Tudo certo',
    'The library was checked and is complete.': 'A biblioteca foi verificada e está completa.',
    'A damaged part was downloaded again. The damaged copy is kept aside; you can delete it in Library and local AI.':
      'Uma parte danificada foi baixada de novo. A cópia danificada fica separada; você pode apagá-la em Biblioteca e IA local.',
    'The library is installed.': 'A biblioteca está instalada.',
    'The library was checked.': 'A biblioteca foi verificada.',
    'Installed. Ready to open.': 'Instalado. Pronto para abrir.',
    'Opening your library…': 'Abrindo sua biblioteca…',
    'Open the library': 'Abrir a biblioteca',
    'The library did not open. Try again.': 'A biblioteca não abriu. Tente de novo.',
    'Lastbook did not answer. Close it and open it again.':
      'O Lastbook não respondeu. Feche e abra de novo.',
    'Not available.': 'Não disponível.',
    'Lastbook sent an unreadable reply.': 'O Lastbook enviou uma resposta ilegível.',

    /* map sets and regions in setup */
    'Whole United States': 'Todo o mapa',
    'Whole US': 'Mapa todo',
    'Brasil': 'Brasil',
    'Brazil': 'Brasil',
    'São Paulo': 'São Paulo',

    /* ---------------- second pass: screens filled in by the scripts ---------------- */
    'Map — Lastbook': 'Mapa — Lastbook',
    'Map · Lastbook': 'Mapa · Lastbook',
    'Copied ✓': 'Copiado ✓',
    'Copied': 'Copiado',
    'Saves to': 'Salva em',
    'Your area': 'Sua área',
    'Map style': 'Estilo do mapa',
    'Zoom here': 'Aproximar aqui',
    'Start over': 'Começar de novo',
    'Keep going': 'Continuar',
    'Show on map': 'Mostrar no mapa',
    'Export chat': 'Exportar conversa',
    'Go to Videos': 'Ir para Vídeos',
    'What’s in it': 'O que tem dentro',
    'Space needed': 'Espaço necessário',
    'Choose again': 'Escolher de novo',
    'Other ways in': 'Outras formas de acessar',
    'Your question': 'Sua pergunta',
    'Asking about:': 'Perguntando sobre:',
    'Related guides': 'Guias relacionados',
    'Still arriving': 'Ainda chegando',
    'Select a state': 'Selecione um estado',
    'Choose your state': 'Escolha seu estado',
    'Loading videos…': 'Carregando vídeos…',
    'Online original': 'Original online',
    'Loading places…': 'Carregando lugares…',
    'About this video': 'Sobre este vídeo',
    'Copy coordinates': 'Copiar coordenadas',
    'Delete all chats': 'Apagar todas as conversas',
    'Add the local AI': 'Adicionar a IA local',
    'What do you need?': 'Do que você precisa?',
    'About this source': 'Sobre esta fonte',
    'Nothing saved yet': 'Nada salvo ainda',
    'Supplies planning': 'Planejamento de suprimentos',
    'Start with a guide': 'Comece por um guia',
    'Gap closure report': 'Relatório de lacunas',
    'Mine-tailings dam:': 'Barragem de rejeitos:',
    'On this computer ·': 'Neste computador ·',
    'Your learning route': 'Sua trilha de aprendizado',
    'Not in this library': 'Não está nesta biblioteca',
    'Loading transcript…': 'Carregando transcrição…',
    'Open the full guide': 'Abrir o guia completo',
    'Government guidance': 'Orientação governamental',
    'Manufacturer manual': 'Manual do fabricante',
    'Sources and credits': 'Fontes e créditos',
    'Using it on a phone': 'Usar no celular',
    'Writing the answer…': 'Escrevendo a resposta…',
    'Delete it for good?': 'Apagar de vez?',
    'What this map covers': 'O que este mapa cobre',
    'Library and local AI': 'Biblioteca e IA local',
    'Not for this computer': 'Não serve para este computador',
    'Not installed · about': 'Não instalado · cerca de',
    'Open the file directly': 'Abrir o arquivo diretamente',
    'Starting the local AI…': 'Iniciando a IA local…',
    'Searching the library…': 'Buscando na biblioteca…',
    'Not linked to a source': 'Não vinculado a uma fonte',
    'Found on this computer': 'Encontrado neste computador',
    'Sources and permissions': 'Fontes e permissões',
    'How sources are labelled': 'Como as fontes são identificadas',
    'Learning pathways report': 'Relatório de trilhas de aprendizado',
    'Kept on this device only.': 'Mantido apenas neste dispositivo.',
    'What this guide does not do': 'O que este guia não faz',
    'Make the map center my area': 'Definir o centro do mapa como minha área',
    'Reading the pages it found…': 'Lendo as páginas encontradas…',
    'Updated edition available ·': 'Edição atualizada disponível ·',
    'Searching the encyclopedias…': 'Buscando nas enciclopédias…',
    'What the assistant can’t see': 'O que o assistente não vê',
    'Use the file you already have': 'Usar o arquivo que você já tem',
    'The old library is still here': 'A biblioteca antiga continua aqui',
    'University / extension service': 'Universidade / serviço de extensão',
    'Community-written encyclopedia': 'Enciclopédia escrita pela comunidade',
    'Pages you open will appear here.': 'As páginas que você abrir aparecerão aqui.',
    'Hesperian community health guide': 'Guia de saúde comunitária Hesperian',
    'Keep chat history on this device': 'Manter o histórico de conversas neste dispositivo',
    'Choose an existing library folder': 'Escolher uma pasta de biblioteca existente',
    'Stop and throw away the download?': 'Parar e descartar o download?',
    'About this library and its sources': 'Sobre esta biblioteca e suas fontes',
    'folder or Downloads, then Look again.': 'pasta ou Downloads e use Ver de novo.',
    'Choose a library zip or AI model file': 'Escolher um zip de biblioteca ou arquivo de modelo de IA',
    'Copy failed — select the numbers above': 'Falha ao copiar — selecione os números acima',
    'Getting-ready readings from every guide': 'Leituras de preparação de cada guia',
    'Nothing here matches. Try another word.': 'Nada corresponde aqui. Tente outra palavra.',
    'Numbers are places in the current view.': 'Os números são lugares na visualização atual.',
    'Local AI ready · it starts when you ask': 'IA local pronta · inicia quando você perguntar',
    'Encyclopedia article · community-written': 'Artigo de enciclopédia · escrito pela comunidade',
    'Add the local AI to get written answers.': 'Adicione a IA local para receber respostas escritas.',
    'Nothing picked for this yet — try searching.': 'Nada escolhido para isto ainda — tente buscar.',
    'No videos match. Try another word or length.': 'Nenhum vídeo corresponde. Tente outra palavra ou duração.',
    '— “Where There Is No Doctor” and related books.': '— “Onde Não Há Médico” e livros relacionados.',
    'the model’s own wording, not linked to a source': 'palavras do próprio modelo, sem vínculo com uma fonte',
    'Store water and food, plan for outages, pack kits': 'Estoque água e comida, planeje quedas e monte kits',
    'It is about 17 GB, and runs on this computer only.': 'Tem cerca de 17 GB e roda apenas neste computador.',
    'Try fewer words, or another word for the same thing.': 'Tente menos palavras ou outra palavra para a mesma coisa.',
    'The home button returns here. Saved on this device only.':
      'O botão de casa volta para cá. Salvo apenas neste dispositivo.',
    'Couldn’t load the list. Zoom in to see individual places.':
      'Não foi possível carregar a lista. Aproxime para ver lugares individuais.',
    'If this keeps happening, close Lastbook and open it again.':
      'Se continuar acontecendo, feche o Lastbook e abra de novo.',
    'Couldn’t load places for this view — move the map to retry.':
      'Não foi possível carregar os lugares desta visualização — mova o mapa para tentar de novo.',
    'Choose Save on any page, video, article or answer to keep it here.':
      'Use Salvar em qualquer página, vídeo, artigo ou resposta para guardar aqui.',
    'Answers questions from the library, in plain words. Works offline.':
      'Responde perguntas a partir da biblioteca, em linguagem simples. Funciona offline.',
    'Watch it done — practical how-tos first, then channels and courses.':
      'Veja como se faz — instruções práticas primeiro, depois canais e cursos.',
    'Pages found so far — you can open them while the answer is written:':
      'Páginas encontradas até agora — você pode abri-las enquanto a resposta é escrita:',
    'it holds mine waste, not usable water. Do not drink, swim or fish here.':
      'ela guarda rejeitos de mineração, não água utilizável. Não beba, não nade e não pesque aqui.',
    'Choose your state and library. Lastbook downloads them for offline use.':
      'Escolha seu estado e a biblioteca. O Lastbook baixa tudo para usar offline.',
    'Address not found in your offline data. Check the house number and street.':
      'Endereço não encontrado nos dados offline. Confira o número e a rua.',
    'Find an address, town or ZIP': 'Encontrar cidade, bairro ou lugar',
    'Find an address, town, ZIP code or place': 'Encontrar endereço, cidade, CEP ou lugar',
    'Local streets, buildings, water and places to get help. Available offline.':
      'Ruas locais, edifícios, água e lugares de ajuda. Disponível offline.',
    'Nothing here replaces trained help. Each guide shows the sources’ own limits.':
      'Nada aqui substitui ajuda treinada. Cada guia mostra os limites das próprias fontes.',
    'Pick what’s happening, search in your own words, or ask the library a question.':
      'Escolha o que está acontecendo, busque com suas palavras ou faça uma pergunta à biblioteca.',
    'All includes every state map. Choose your state for offline street-address search.':
      'Tudo inclui todos os mapas. Escolha seu estado para busca de endereços offline.',
    'Shopping lists and carts in older reports are plans, not proof of supplies you own.':
      'Listas de compras em relatórios antigos são planos, não prova do que você tem.',
    'Reading and watching are not the same as practising. Your ticks stay on this device.':
      'Ler e assistir não é o mesmo que praticar. Suas marcações ficam neste dispositivo.',
    'Your saved things, learning routes, encyclopedias and every manual in the collection.':
      'O que você salvou, trilhas de aprendizado, enciclopédias e todos os manuais da coleção.',
    'Get an answer built from the manuals, with the exact pages and video moments it came from':
      'Receba uma resposta feita a partir dos manuais, com as páginas e os momentos exatos de onde veio',
    'Chats stay on this device. Nothing is sent anywhere except this computer’s own assistant.':
      'As conversas ficam neste dispositivo. Nada é enviado para fora, só para o assistente deste computador.',
    'Ticks are your own notes on this device. Reading or watching is not the same as practising safely.':
      'As marcações são suas anotações neste dispositivo. Ler ou assistir não é o mesmo que praticar com segurança.',
    'Offline: works with no internet. Shows what was mapped by 25 Oct 2026 — not damage, closures or hazards.':
      'Offline: funciona sem internet. Mostra o que foi mapeado até 25/10/2026 — não danos, interdições ou riscos.',
    'A shopping list or cart isn’t the same as supplies you own, and reading isn’t the same as a practised plan.':
      'Lista de compras não é o mesmo que suprimentos que você tem, e ler não é o mesmo que um plano praticado.',
    'Readings for getting ready before water, power or services stop — gathered from each guide. One area at a time.':
      'Leituras para se preparar antes de faltar água, energia ou serviços — reunidas de cada guia. Uma área por vez.',
    'Public manuals, health guides, courses, videos and encyclopedias kept on this computer, so it works when the internet and phones don’t.':
      'Manuais públicos, guias de saúde, cursos, vídeos e enciclopédias mantidos neste computador, para funcionar quando a internet e os telefones falharem.',
    'Only videos already downloaded are shown. Many have no captions, so the transcript search and the assistant can’t see what’s said in them.':
      'Só aparecem vídeos já baixados. Muitos não têm legendas, então a busca em transcrições e o assistente não veem o que é dito neles.',
    'Answers are built only from the manuals, guides and video transcripts on this computer — with the exact page or video moment for each point.':
      'As respostas são feitas apenas com os manuais, guias e transcrições deste computador — com a página ou o momento exato de cada ponto.',
    'A video shows how one person did something. Watching isn’t practice, and it may not match current safety guidance — check a manual for anything risky.':
      'Um vídeo mostra como uma pessoa fez algo. Assistir não é praticar, e pode não corresponder à orientação atual de segurança — consulte um manual para qualquer coisa arriscada.',
    'Offline survival and rebuilding guide: first aid, water, food, power, shelter, videos, maps and skills — works without internet.':
      'Guia offline de sobrevivência e reconstrução: primeiros socorros, água, comida, energia, abrigo, vídeos, mapas e habilidades — funciona sem internet.',
    'Brazil — São Paulo': 'Brasil — São Paulo',
    'Brazil — Rio de Janeiro': 'Brasil — Rio de Janeiro',
    'Brazil — Minas Gerais': 'Brasil — Minas Gerais',
    'Brazil — Espírito Santo': 'Brasil — Espírito Santo',
    '— FEMA, CDC, EPA, USDA, NOAA, National Park Service and similar.':
      '— FEMA, CDC, EPA, USDA, NOAA, Serviço de Parques Nacionais dos EUA e similares.',
    '— WHO, Red Cross / Red Crescent, MSF, UNICEF, Sphere, St John Ambulance.':
      '— OMS, Cruz Vermelha / Crescente Vermelho, MSF, UNICEF, Sphere, St John Ambulance.',
    '— e.g. National Center for Home Food Preservation, UC extension.':
      '— por exemplo, National Center for Home Food Preservation, extensão da UC.',
  };

  const DICT = Object.create(null);
  for (const k of Object.keys(PT)) DICT[normalize(k)] = PT[k];

  function normalize(s) {
    return String(s)
      .replace(/\u00a0/g, ' ')
      .replace(/[\u2010-\u2015\u2212]/g, '-')      // dashes: the writing varies between files
      .replace(/[\u2018\u2019\u201b]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function detect() {
    let saved = null;
    try { saved = localStorage.getItem(KEY) } catch (e) { }
    if (saved === 'en' || saved === 'pt-BR') return saved;
    const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || 'en'];
    for (const l of langs) {
      const low = String(l).toLowerCase();
      if (low === 'pt-br' || low === 'pt') return 'pt-BR';
    }
    return 'en';
  }

  let lang = detect();
  const metric = () => lang === 'pt-BR';

  function t(s) {
    if (lang === 'en' || s == null) return s;
    const key = normalize(s);
    return DICT[key] || s;
  }

  const ATTRS = ['title', 'aria-label', 'placeholder', 'alt'];
  const SEEN = new WeakSet();

  function translateTextNode(n) {
    const raw = n.nodeValue;
    if (!raw || !raw.trim()) return;
    const key = normalize(raw);
    const hit = DICT[key];
    if (!hit) return;
    const lead = raw.match(/^\s*/)[0];
    const tail = raw.match(/\s*$/)[0];
    n.nodeValue = lead + hit + tail;
  }

  function skip(el) {
    return !el || el.closest('script,style,code,pre,textarea,[data-i18n-skip],.pagetext,.wikitext,.pageimg,.frame');
  }

  function apply(root) {
    if (lang === 'en' || !root) return;
    const base = root.nodeType === 1 ? root : document.body;
    if (!base || skip(base)) return;
    if (base.nodeType === 3) { translateTextNode(base); return; }
    const walker = document.createTreeWalker(base, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === 1) {
          if (skip(node)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let node = walker.nextNode();
    while (node) {
      translateTextNode(node);
      node = walker.nextNode();
    }
    const els = base.querySelectorAll ? base.querySelectorAll('*') : [];
    for (const el of els) {
      if (skip(el)) continue;
      for (const a of ATTRS) {
        const v = el.getAttribute(a);
        if (!v) continue;
        const hit = DICT[normalize(v)];
        if (hit) el.setAttribute(a, hit);
      }
    }
    if (base === document.body) {
      document.documentElement.lang = lang;
      const title = document.title;
      const hit = DICT[normalize(title)];
      if (hit) document.title = hit;
    }
  }

  function setLang(next, reload) {
    try { localStorage.setItem(KEY, next) } catch (e) { }
    lang = next;
    document.documentElement.lang = lang;
    document.dispatchEvent(new CustomEvent('lb:lang', { detail: lang }));
    if (reload !== false) location.reload();
  }

  function toggle() {
    setLang(lang === 'pt-BR' ? 'en' : 'pt-BR');
  }

  /* Translate what the scripts draw after the first paint, without touching
     library text: only exact matches from the dictionary are replaced. */
  function watch() {
    if (lang === 'en' || !window.MutationObserver) return;
    let queued = new Set();
    let scheduled = false;
    const flush = () => {
      scheduled = false;
      const nodes = queued; queued = new Set();
      for (const n of nodes) if (n.isConnected) apply(n);
    };
    new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'characterData') { queued.add(m.target); continue }
        for (const n of m.addedNodes) if (n.nodeType === 1) queued.add(n);
      }
      if (queued.size && !scheduled) { scheduled = true; Promise.resolve().then(flush) }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function boot() {
    document.documentElement.lang = lang;
    apply(document.body);
    watch();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => apply(document.body));
    // A small language switch in the sidebar, added once the shell exists.
    const side = document.querySelector('#side .side-end');
    if (side) {
      const b = document.createElement('button');
      b.className = 'row-s';
      b.type = 'button';
      b.title = 'Idioma / Language';
      b.innerHTML = lang === 'pt-BR' ? '<span aria-hidden="true">🌐</span><span>English</span>'
        : '<span aria-hidden="true">🌐</span><span>Português</span>';
      b.addEventListener('click', () => setLang(lang === 'pt-BR' ? 'en' : 'pt-BR'));
      side.append(b);
    }
  }

  window.LB = { t, tr: t, apply, lang: () => lang, setLang, toggle, metric, dict: DICT };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
