# 🛡️ Chrono Defense: Titan Edition

> **Um Tower Defense Educacional desenvolvido com HTML5, CSS3 e JavaScript Puro.**

O **Chrono Defense** é um jogo de estratégia do gênero *Tower Defense* onde a munição é o seu conhecimento. Para construir defesas e proteger sua base contra inimigos que avançam, o jogador precisa responder corretamente a perguntas de diversas matérias escolares e curiosidades gerais.

## 🎮 Mecânicas do Jogo

* **Sistema de Energia por Conhecimento:** O jogador não ganha dinheiro matando inimigos, mas sim acertando perguntas.
* **Banco de Dados "Titan":** Conta com quase **100 perguntas** únicas divididas em 9 categorias (Matemática, História, Geografia, Ciências, Inglês, Esportes, Música, Tecnologia e Mundo Animal).
* **Lógica Anti-Repetição:** Um algoritmo inteligente remove as perguntas já respondidas do "baralho". As perguntas só se repetem quando todas as cartas de uma categoria forem esgotadas, garantindo variedade.
* **Sistema de Ondas:** A dificuldade aumenta progressivamente (inimigos mais rápidos e resistentes) a cada onda.
* **Punição e Recompensa:** Acertos geram muita energia; erros consomem uma pequena parte da energia acumulada.

## 🚀 Tecnologias Utilizadas

O projeto foi construído sem o uso de *frameworks* ou bibliotecas externas, focando no aprendizado da base da Web:

* **HTML5 Canvas:** Para renderização gráfica do mapa, inimigos, torres e projéteis em tempo real.
* **CSS3 Moderno:** Estilização com Flexbox, Grid, Animações (Keyframes) e tema visual "Dark/Neon".
* **JavaScript (ES6+):**
    * Programação Orientada a Objetos (Classes para Inimigos, Torres e Projéteis).
    * Manipulação do DOM para a interface de Quiz.
    * Lógica de *Game Loop* (requestAnimationFrame).
    * Manipulação de Arrays e Objetos JSON.

## 📂 Estrutura do Projeto

A organização dos arquivos segue o princípio da separação de responsabilidades:

text
/ChronoDefense
│
├── index.html      # Estrutura principal e container do Canvas
├── style.css       # Estilização visual (UI e efeitos)
├── script.js       # Lógica do jogo (Engine, Classes e Loop)
└── database.js     # Banco de dados das perguntas (JSON Array)

## 🛠️ Como Executar

*1. Baixe ou clone este repositório.*

*2. Certifique-se de que os 4 arquivos (index.html, style.css, script.js, database.js) estejam na mesma pasta.*

*3. Abra o arquivo index.html em qualquer navegador moderno (Chrome, Firefox, Edge).*

*4. Divirta-se aprendendo!*

## ✏️ Como Personalizar

O jogo foi feito para ser expansível. Para adicionar suas próprias perguntas:

*1. Abra o arquivo database.js em um editor de texto (VS Code, Bloco de Notas).*

*2. Localize a categoria desejada ou crie uma nova seguindo o padrão*

{
    category: "Minha Nova Matéria",
    color: "#corHexadecimal",
    questions: [
        { q: "Sua pergunta aqui?", options: ["A", "B", "C", "D"], a: 0 } // 'a' é o índice da resposta correta (0 a 3)
    ]
}

*3. Salve o arquivo e recarregue a página do jogo.*

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

Desenvolvido com 💻 e café.

## 👨‍💻 Autor

Desenvolvido por Patrick Gonçalves

💡 Projeto educacional e interativo em JavaScript

