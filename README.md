# 🛡️ Chrono Defense: Nightmare Edition

> **Um Tower Defense Educacional "Hardcore" desenvolvido com HTML5, CSS3 e JavaScript Puro.**

O **Chrono Defense** é um jogo de estratégia onde o conhecimento é sua única munição. Diferente de jogos educativos tradicionais, esta versão **Nightmare** foi desenhada para ser desafiadora, punitiva e estratégica, introduzindo mecânicas de economia inflacionária e inimigos que reagem aos erros do jogador.

## 📱 Jogue Onde Quiser (Responsivo)
O projeto foi atualizado com **CSS Media Queries** e **Cálculo de Escala no Canvas**, tornando-o 100% jogável em Desktops, Tablets e Smartphones.

## 💀 Mecânicas "Nightmare"

O jogo possui um sistema de dificuldade progressiva e cruel:

* **Economia Inflacionária:** Cada torre comprada aumenta o preço da próxima (+50 de energia). Você não pode apenas "spammer" torres; cada colocação deve ser calculada.
* **O Fantasma da Ignorância 👻:** Se você **errar** uma pergunta, um inimigo "Fantasma" (extremamente rápido) nasce instantaneamente no mapa. Chutar respostas é perigoso!
* **Escala Exponencial:** A vida dos inimigos aumenta em 15% a cada onda (juros compostos), tornando as ondas avançadas extremamente difíceis.
* **Sistema de Energia:** Acertos geram energia. Erros drenam energia e invocam inimigos.

## 👾 Bestiário (Inimigos)

| Ícone | Tipo | Cor | Comportamento |
| :---: | :--- | :--- | :--- |
| 🔴 | **Normal** | Vermelho | Velocidade e vida balanceadas. Aparece desde o início. |
| 🟡 | **Speedy** | Amarelo | **Muito rápido**, mas com pouca vida. Exige torres espalhadas. |
| 🔵 | **Tank** | Azul | Lento, mas com **blindagem pesada**. Serve para distrair suas torres. |
| 🟣 | **BOSS** | Roxo | Gigante e extremamente resistente. Aparece a cada 5 ondas. Instakill se passar. |
| 👻 | **Ghost** | Branco | Inimigo semi-transparente que nasce **apenas quando você erra**. |

## 📚 O "Cérebro" (Banco de Dados Titan)

O jogo conta com o `database.js` expandido (Titan Edition), contendo quase **100 perguntas** únicas com sistema anti-repetição, cobrindo:

* 🧮 Matemática (Lógica, Aritmética, Geometria)
* 📜 História (Geral e do Brasil)
* 🌍 Geografia
* 🧪 Ciências & Biologia
* 🇺🇸 Inglês Básico
* 💻 Tecnologia
* ⚽ Esportes
* 🎨 Música & Artes
* 🐾 Mundo Animal

## 🚀 Tecnologias Utilizadas

* **HTML5 Canvas:** Renderização gráfica de alta performance (60 FPS).
* **CSS3 Moderno:** Layout Flexbox/Grid e Animações Keyframes.
* **JavaScript (ES6+):**
    * POO (Programação Orientada a Objetos) para entidades.
    * Lógica de *Game Loop* e *Time Delta*.
    * Algoritmos de *Pathfinding* (Waypoints).
    * Manipulação de Eventos Touch/Click para responsividade.

## 📂 Estrutura do Projeto

text
/ChronoDefense
│
├── index.html      # Container principal e meta tags viewport
├── style.css       # Estilos responsivos e tema "Dark/Neon"
├── script.js       # Engine do jogo (Lógica Nightmare e Classes)
└── database.js     # Banco de dados JSON com as perguntas

## 🛠️ Como Executar

*1. Baixe este repositório.*

*2. Garanta que os 4 arquivos estejam na mesma pasta.*

*3. Abra o index.html em seu navegador (Chrome, Firefox, Edge, Safari mobile).*

*4. Dica: Para testar o modo mobile no PC, aperte F12 e ative o "Device Toolbar".*

## ✏️ Personalização

Para ajustar a dificuldade ou adicionar perguntas, edite as constantes no início do script.js ou adicione objetos ao array no database.js.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

Desenvolvido com 💻 e café.

## 👨‍💻 Autor

Desenvolvido por Patrick Gonçalves

💡 Projeto educacional e interativo em JavaScript

