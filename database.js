// database.js - TITAN EDITION (Mega Expandido)

const knowledgeBase = [
    {
        category: "🧮 Matemática",
        color: "#e74c3c", // Vermelho
        questions: [
            // Básicas
            { q: "Quanto é 7 x 8?", options: ["54", "56", "48", "64"], a: 1 },
            { q: "Dobro de 15?", options: ["25", "30", "45", "150"], a: 1 },
            { q: "100 dividido por 4?", options: ["20", "25", "10", "40"], a: 1 },
            { q: "Quanto é 12 + 12 + 12?", options: ["24", "36", "48", "30"], a: 1 },
            { q: "Metade de 500?", options: ["200", "250", "300", "150"], a: 1 },
            { q: "Antecessor de 1000?", options: ["900", "990", "999", "1001"], a: 2 },
            { q: "Qual número é par?", options: ["13", "27", "42", "51"], a: 2 },
            // Intermediário
            { q: "5 ao quadrado (5²)?", options: ["10", "15", "25", "50"], a: 2 },
            { q: "10% de 200 reais?", options: ["10", "20", "50", "2"], a: 1 },
            { q: "Quantos lados tem um hexágono?", options: ["5", "6", "7", "8"], a: 1 },
            { q: "Raiz quadrada de 49?", options: ["6", "7", "8", "9"], a: 1 },
            { q: "Um triênio tem quantos anos?", options: ["2", "3", "4", "5"], a: 1 },
            // Lógica
            { q: "O que é mais pesado: 1kg de chumbo ou 1kg de algodão?", options: ["Chumbo", "Algodão", "Iguais", "Nenhum"], a: 2 },
            { q: "Se ontem foi sexta, amanhã é?", options: ["Sábado", "Domingo", "Segunda", "Terça"], a: 1 }
        ]
    },
    {
        category: "📜 História",
        color: "#f1c40f", // Amarelo Ouro
        questions: [
            { q: "Quem gritou 'Independência ou Morte'?", options: ["D. Pedro I", "D. Pedro II", "Tiradentes", "Cabral"], a: 0 },
            { q: "Em que ano a 2ª Guerra acabou?", options: ["1939", "1945", "1950", "1960"], a: 1 },
            { q: "Quem foi o 'Rei do Futebol'?", options: ["Maradona", "Pelé", "Zico", "Ronaldo"], a: 1 },
            { q: "País onde surgiram as Olimpíadas?", options: ["Roma", "Grécia", "Egito", "China"], a: 1 },
            { q: "Quem descobriu a lâmpada?", options: ["Tesla", "Edison", "Graham Bell", "Einstein"], a: 1 },
            { q: "Primeiro homem na Lua?", options: ["Gagarin", "Armstrong", "Buzz", "Collins"], a: 1 },
            { q: "Moeda do Brasil antes do Real?", options: ["Cruzeiro", "Cruzado", "Cruzeiro Real", "Todas"], a: 3 },
            { q: "Quem pintou o teto da Capela Sistina?", options: ["Da Vinci", "Michelangelo", "Donatello", "Rafael"], a: 1 },
            { q: "Zumbi dos Palmares lutou contra?", options: ["Escravidão", "Ditadura", "Monarquia", "Impostos"], a: 0 },
            { q: "Capital do Império Romano?", options: ["Atenas", "Roma", "Veneza", "Milão"], a: 1 }
        ]
    },
    {
        category: "🌍 Geografia",
        color: "#3498db", // Azul
        questions: [
            { q: "Capital da Alemanha?", options: ["Munique", "Berlim", "Hamburgo", "Frankfurt"], a: 1 },
            { q: "País mais populoso do mundo?", options: ["Índia", "China", "EUA", "Rússia"], a: 0 }, // Índia passou a China recentemente
            { q: "Onde fica o Deserto do Saara?", options: ["Ásia", "América", "África", "Oceania"], a: 2 },
            { q: "Qual o maior estado do Brasil?", options: ["Amazonas", "Pará", "Mato Grosso", "São Paulo"], a: 0 },
            { q: "Capital da Rússia?", options: ["São Petersburgo", "Moscou", "Kiev", "Sochi"], a: 1 },
            { q: "Rio mais famoso do Egito?", options: ["Amazonas", "Nilo", "Tigre", "Eufrates"], a: 1 },
            { q: "O Japão fica em qual continente?", options: ["Europa", "Oceania", "Ásia", "Antártida"], a: 2 },
            { q: "País conhecido pelos cangurus?", options: ["Áustria", "Austrália", "Nova Zelândia", "África do Sul"], a: 1 },
            { q: "Terra do Tango?", options: ["Espanha", "Brasil", "Argentina", "Uruguai"], a: 2 },
            { q: "O Everest fica na cordilheira do...", options: ["Andes", "Himalaia", "Alpes", "Rochosas"], a: 1 }
        ]
    },
    {
        category: "🧪 Ciências",
        color: "#2ecc71", // Verde
        questions: [
            { q: "Planeta mais próximo do Sol?", options: ["Vênus", "Terra", "Mercúrio", "Marte"], a: 2 },
            { q: "O que as abelhas produzem?", options: ["Leite", "Mel", "Seda", "Algodão"], a: 1 },
            { q: "Animal que nasce do ovo é?", options: ["Mamífero", "Ovíparo", "Vivíparo", "Marsupial"], a: 1 },
            { q: "Símbolo químico do Oxigênio?", options: ["O", "Ox", "Og", "Oi"], a: 0 },
            { q: "Qual órgão filtra o sangue?", options: ["Coração", "Rim", "Fígado", "Pulmão"], a: 1 },
            { q: "Maior osso do corpo humano?", options: ["Tíbia", "Fêmur", "Úmero", "Crânio"], a: 1 },
            { q: "A Terra gira em torno de quem?", options: ["Lua", "Marte", "Sol", "Dela mesma"], a: 2 },
            { q: "Metal líquido em temperatura ambiente?", options: ["Ferro", "Ouro", "Mercúrio", "Chumbo"], a: 2 },
            { q: "Gás usado em balões de festa?", options: ["Hélio", "Oxigênio", "Hidrogênio", "Nitrogênio"], a: 0 },
            { q: "Qual animal é um felino?", options: ["Lobo", "Urso", "Leão", "Hiena"], a: 2 }
        ]
    },
    {
        category: "🇺🇸 Inglês",
        color: "#9b59b6", // Roxo
        questions: [
            { q: "Traduza 'Window':", options: ["Porta", "Janela", "Parede", "Teto"], a: 1 },
            { q: "Cor 'White' é:", options: ["Preto", "Branco", "Vermelho", "Azul"], a: 1 },
            { q: "O que é 'Breakfast'?", options: ["Almoço", "Jantar", "Café da Manhã", "Lanche"], a: 2 },
            { q: "Verbo 'To Run' significa:", options: ["Comer", "Dormir", "Correr", "Andar"], a: 2 },
            { q: "Número 'Twenty' é:", options: ["12", "20", "30", "200"], a: 1 },
            { q: "Animal 'Horse' é:", options: ["Vaca", "Cavalo", "Porco", "Ovelha"], a: 1 },
            { q: "Dia 'Sunday' é:", options: ["Sábado", "Domingo", "Segunda", "Sexta"], a: 1 },
            { q: "Como diz 'Amigo'?", options: ["Enemy", "Father", "Friend", "Brother"], a: 2 },
            { q: "Oposto de 'Big'?", options: ["Large", "Huge", "Small", "Tall"], a: 2 },
            { q: "Parte do corpo 'Hand'?", options: ["Pé", "Mão", "Cabeça", "Braço"], a: 1 }
        ]
    },
    {
        category: "⚽ Esportes",
        color: "#e67e22", // Laranja
        questions: [
            { q: "Quantos jogadores num time de futebol?", options: ["10", "11", "12", "9"], a: 1 },
            { q: "Em que esporte se usa uma raquete?", options: ["Vôlei", "Basquete", "Tênis", "Judô"], a: 2 },
            { q: "País com mais Copas do Mundo?", options: ["Alemanha", "Itália", "Brasil", "Argentina"], a: 2 },
            { q: "Esporte praticado na piscina?", options: ["Hipismo", "Natação", "Esgrima", "Ciclismo"], a: 1 },
            { q: "Duração de uma partida de futebol?", options: ["60 min", "80 min", "90 min", "100 min"], a: 2 },
            { q: "Qual peça do xadrez anda em 'L'?", options: ["Torre", "Bispo", "Cavalo", "Peão"], a: 2 },
            { q: "Arte marcial brasileira?", options: ["Karatê", "Judô", "Capoeira", "Kung Fu"], a: 2 },
            { q: "Acessório obrigatório no Boxe?", options: ["Capacete", "Luvas", "Caneleira", "Taco"], a: 1 }
        ]
    },
    {
        category: "🎨 Música & Artes",
        color: "#ff9ff3", // Rosa
        questions: [
            { q: "Instrumento com teclas pretas e brancas?", options: ["Violão", "Piano", "Flauta", "Bateria"], a: 1 },
            { q: "Quem canta 'Show das Poderosas'?", options: ["Ivete", "Anitta", "Ludmilla", "Iza"], a: 1 },
            { q: "Quantas cordas tem um violão padrão?", options: ["4", "5", "6", "7"], a: 2 },
            { q: "Ritmo musical originado no Rio?", options: ["Sertanejo", "Forró", "Samba", "Axé"], a: 2 },
            { q: "Pintor que cortou a própria orelha?", options: ["Van Gogh", "Picasso", "Dali", "Monet"], a: 0 },
            { q: "Mistura de Vermelho + Branco dá?", options: ["Laranja", "Roxo", "Rosa", "Cinza"], a: 2 },
            { q: "Banda dos Beatles é de onde?", options: ["EUA", "Brasil", "Inglaterra", "Austrália"], a: 2 }
        ]
    },
    {
        category: "💻 Tecnologia",
        color: "#00d2d3", // Ciano
        questions: [
            { q: "O cérebro do computador é a...", options: ["Placa de Vídeo", "CPU", "Memória RAM", "Fonte"], a: 1 },
            { q: "Dispositivo usado para clicar?", options: ["Teclado", "Monitor", "Mouse", "Impressora"], a: 2 },
            { q: "Sistema operacional do Google para celular?", options: ["iOS", "Windows", "Android", "Linux"], a: 2 },
            { q: "O que significa 'Wi-Fi'?", options: ["Internet sem fio", "Cabo rápido", "Rede mundial", "Computador"], a: 0 },
            { q: "Qual destes é uma rede social?", options: ["Excel", "Instagram", "Word", "Paint"], a: 1 },
            { q: "Botão para sair de um programa?", options: ["Enter", "Space", "Esc", "Shift"], a: 2 }
        ]
    },
    {
        category: "🐾 Mundo Animal",
        color: "#10ac84", // Verde Escuro
        questions: [
            { q: "Animal mais rápido do mundo?", options: ["Leão", "Guepardo", "Cavalo", "Coelho"], a: 1 },
            { q: "Qual pássaro não voa?", options: ["Pombo", "Águia", "Pinguim", "Canário"], a: 2 },
            { q: "Animal que muda de cor?", options: ["Sapo", "Camaleão", "Cobra", "Jacaré"], a: 1 },
            { q: "O urso polar vive onde?", options: ["Pólo Norte", "Pólo Sul", "Deserto", "Floresta"], a: 0 },
            { q: "Quantos corações tem um polvo?", options: ["1", "2", "3", "4"], a: 2 }, // Curiosidade real!
            { q: "Qual é o rei da selva?", options: ["Tigre", "Elefante", "Leão", "Gorila"], a: 2 }
        ]
    }
];