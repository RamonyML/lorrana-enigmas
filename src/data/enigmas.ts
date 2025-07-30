import { Enigma } from '../types/enigmas';

export const enigmas: Enigma[] = [
  {
    id: 1,
    title: "O Portal Misterioso",
    question: "Não sou casa, mas sou abrigo.\nNão sou festa, mas tem música.\nNão sou amigo, mas escuto segredos.\nOnde sou, há copos, risos… e às vezes, solidão.\n\nO que sou eu?",
    hint: "Pense em onde vocês se encontram para celebrar...",
    answer: "bar",
    nextEnigmaId: 2,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "🍺"
  },
  {
    id: 2,
    title: "A Guerra dos Universos",
    question: "Ramony diz que a Marvel é melhor que a DC. Se você concordar com ele (mesmo que seja difícil), qual é a primeira letra da palavra 'Marvel'?",
    hint: "É só a primeira letra mesmo...",
    answer: "m",
    nextEnigmaId: 3,
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    icon: "🦸‍♀️"
  },
  {
    id: 3,
    title: "O Enigma Musical",
    question: "Como psicóloga e musicista, você sabe que a música tem poder terapêutico. Quantas notas musicais existem na escala cromática ocidental?",
    hint: "Do Dó ao Si, incluindo os sustenidos/bemóis...",
    answer: "12",
    nextEnigmaId: 4,
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    icon: "🎵"
  },
  {
    id: 4,
    title: "Nossos grupos",
    question: "Quantos grupos a gente tem juntos??",
    hint: "kkkkkkkkkkk tiração né",
    answer: "47",
    nextEnigmaId: 5,
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    icon: "🔍"
  },
  {
    id: 5,
    title: "O Código das Cores",
    question: "Se vermelho = 1, azul = 2, verde = 3, amarelo = 4, qual é a soma das cores da bandeira do Brasil?",
    hint: "Verde + amarelo + azul...",
    answer: "9",
    nextEnigmaId: 6,
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    icon: "🎨"
  },
  {
    id: 6,
    title: "O Enigma do Tempo",
    question: "Se hoje é 29/07/2025, e seu aniversário é no dia 29, quantos dias se passaram desde o início do ano até hoje?",
    hint: "Janeiro tem 31, fevereiro 28, março 31, abril 30, maio 31, junho 30, julho 29...",
    answer: "210",
    nextEnigmaId: 7,
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    icon: "⏰"
  },
  {
    id: 7,
    title: "A Sequência Mágica",
    question: "Complete a sequência: 2, 4, 8, 16, 32, ?",
    hint: "Cada número é o dobro do anterior...",
    answer: "64",
    nextEnigmaId: 8,
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    icon: "✨"
  },
  {
    id: 8,
    title: "O Enigma das Letras",
    question: "Se A=1, B=2, C=3... qual é a soma das letras da palavra 'LORRANA'?",
    hint: "L=12, O=15, R=18, R=18, A=1, N=14, A=1...",
    answer: "79",
    nextEnigmaId: 9,
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    icon: "📝"
  },
  {
    id: 9,
    title: "O Desafio Matemático",
    question: "Se log₂(x) = 10, qual é o valor de x? (Use apenas números na resposta)",
    hint: "Se log₂(x) = 10, então x = 2¹⁰...",
    answer: "1024",
    nextEnigmaId: 10,
    background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    icon: "🧮"
  },
  {
    id: 10,
    title: "O Invisível que Move",
    question: "Não tenho forma, mas sou moldado.\nNasço de choques, toques ou vozes,\ne viajo sem pernas, corro sem corpo.\nSou filho da vibração e pai da emoção.\nPosso atravessar muralhas, mas morro no vácuo.\nSou sentido por todos, mas cada um me escuta de um jeito.\nNo silêncio, sou ausência; no grito, sou presença.\nQuando sou arte, você me chama de música.\nQuando sou dor, você me chama de ruído.\nE quando me perco, só então você percebe que eu fazia falta.\n\nQuem sou eu?",
    hint: "É algo que você pode ouvir, mas não pode ver...",
    answer: "som",
    nextEnigmaId: 11,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    icon: "��"
  },
  {
    id: 11,
    title: "O Senhor dos Anéis",
    question: "No Senhor dos Anéis, qual é o nome do hobbit que carrega o Um Anel até Mordor?",
    hint: "Calma que vai ficando mais dificil...",
    answer: "frodo",
    nextEnigmaId: 12,
    background: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)",
    icon: "💍"
  },
  {
    id: 12,
    title: "Star Wars",
    question: "Qual é o nome do pai de Luke Skywalker?",
    hint: "Ele tem uma respiração característica...",
    answer: "vader",
    nextEnigmaId: 13,
    background: "linear-gradient(135deg, #000000 0%, #333333 100%)",
    icon: "⚡"
  },
  {
    id: 13,
    title: "Essa é de Avatar",
    question: "Sou um guardião de um reino perdido, com olhos profundos, mas nunca falo uma palavra. Fui encontrado por um mestre da água, mas em mim reside o fogo, o ar e a terra. Eu sou um ser antigo, mas renasci com um novo propósito. Sou portador de um poder lendário, guardado por um povo que sabia que um dia eu voltaria. Quem sou eu?",
    hint: "Tu é fã da bagaça. Então acerta aí!",
    answer: "cometa sozin",
    nextEnigmaId: 14,
    background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)",
    icon: "🌪️"
  },
  {
    id: 14,
    title: "Psicologia",
    question: "Como psicóloga, tu deve saber: quantos anos Freud viveu?",
    hint: "Nasceu em 1856, morreu em 1939...",
    answer: "83",
    nextEnigmaId: 15,
    background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)",
    icon: "🧠"
  },
  {
    id: 15,
    title: "Ponto de partida",
    question: "Eu sou a soma do que você vê e o produto do que você sente. Em mim, as estrelas brilham, mas você não pode tocá-las. Divido o infinito, mas me encontro na borda do finito. Em um mundo de números, sou o elo que conecta o eterno e o transitório. Tome minhas raízes, e você me perderá, mas sem mim, você não teria nada. Sou simples, mas uma vez que você me entende, o universo se revela em múltiplos. Quem sou eu?",
    hint: "Sempre começa por ele...",
    answer: "1",
    nextEnigmaId: 16,
    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    icon: "🌟"
  },
  {
    id: 16,
    title: "Música Clássica",
    question: "Quantas sinfonias Beethoven compôs?",
    hint: "É um número entre 5 e 10...",
    answer: "9",
    nextEnigmaId: 17,
    background: "linear-gradient(135deg, #4B0082 0%, #8A2BE2 100%)",
    icon: "🎼"
  },
  {
    id: 17,
    title: "Uai?",
    question: "Sou o elo entre o que se vê e o que se sente, Capaz de mostrar sem ser tocado, Carrego histórias em meu silêncio, Mas, ao menor impacto, me quebro em pedaços. Reflexo quem você é, mas também mostro o que você não pode tocar. Embora meu ser seja frágil, sou feito de algo eterno. Quem sou eu?",
    hint: "Seloco, não compensa dica...",
    answer: "vidro",
    nextEnigmaId: 18,
    background: "linear-gradient(135deg, #000080 0%, #191970 100%)",
    icon: "🪟"
  },
  {
    id: 18,
    title: "Nem tudo é sarcasmo...",
    question: "Eu existo, mas não sou visto. Eu sou sentido, mas não posso ser tocado. A cada momento, sou moldado por suas escolhas, e mesmo assim, meu destino já está decidido. Posso ser fugaz ou eterno, tudo depende de como você me observa. Minha essência não tem forma, mas eu sou a razão de todos os atos e pensamentos. Se tento me revelar, me torno mais impenetrável, mas, se me ignoro, eu continuo a existir em silêncio. Quem sou eu?",
    hint: "Eu tenho ansiedade, e tu sabes que eu tenho medo dele...",
    answer: "o futuro",
    nextEnigmaId: 19,
    background: "linear-gradient(135deg, #FF4500 0%, #FF6347 100%)",
    icon: "😏"
  },
  {
    id: 19,
    title: "A Trama da Existência",
    question: "Sou criada sem pressa,\nmas posso prender em um instante.\nFico invisível àqueles que não sabem ver,\nmas forte o suficiente para manter tudo o que se aproxima.\nMinha força vem do vazio,\ne meu controle é a ilusão de liberdade.\nSou tecida no silêncio,\nmas minha presença ecoa em cada movimento.\n\nQuem sou eu?",
    hint: "Pense em algo que captura...",
    answer: "teia",
    nextEnigmaId: 20,
    background: "linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)",
    icon: "🕸️"
  },
  {
    id: 20,
    title: "A última =(",
    question: "Vou te falar uma parada sincera. eu gosto dessa frase, mas sinto que falta algo. O que é?: ''O menino sonhou com o fim do gelo, onde o frio intenso se esconde sob luz do sol no inverno.''",
    hint: "Aí tu já quer um marido né? kkkkk",
    answer: "A",
    nextEnigmaId: 0,
    isFinal: true,
    background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)",
    icon: "💖"
  }
]; 