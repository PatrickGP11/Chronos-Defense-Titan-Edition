// script.js - NIGHTMARE EDITION

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Deck de perguntas
let questionDeck = [];

function initDeck() {
    questionDeck = JSON.parse(JSON.stringify(knowledgeBase));
}

// --- ESTADO DO JOGO ---
const state = {
    energy: 120,    // Começa com menos energia
    lives: 5,       // Apenas 5 vidas (antes eram 10)
    wave: 1,
    enemiesKilledInWave: 0,
    frame: 0,
    enemies: [],
    towers: [],
    projectiles: [],
    currentQuestion: null,
    baseTowerCost: 100, // Custo base
    currentTowerCost: 100 // Custo atual (sobe a cada compra)
};

// Mapa
const path = [
    { x: 0, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 300 },
    { x: 500, y: 300 }, { x: 500, y: 100 }, { x: 700, y: 100 }, { x: 700, y: 400 }, { x: 800, y: 400 }
];

// --- LÓGICA EDUCACIONAL ---
function loadNewQuestion() {
    questionDeck = questionDeck.filter(cat => cat.questions.length > 0);
    if (questionDeck.length === 0) initDeck();

    const catIdx = Math.floor(Math.random() * questionDeck.length);
    const category = questionDeck[catIdx];

    const qIdx = Math.floor(Math.random() * category.questions.length);
    const questionData = category.questions[qIdx];

    state.currentQuestion = { ...questionData, correctIndex: questionData.a };
    category.questions.splice(qIdx, 1);

    document.getElementById('cat-tag').innerText = category.category;
    document.getElementById('cat-tag').style.color = category.color;
    document.getElementById('q-text').innerText = state.currentQuestion.q;

    const optsDiv = document.getElementById('options');
    optsDiv.innerHTML = '';

    state.currentQuestion.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn-opt';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optsDiv.appendChild(btn);
    });
}

function checkAnswer(index, btnElement) {
    const container = document.getElementById('quiz-container');

    if (index === state.currentQuestion.correctIndex) {
        // Acertou
        state.energy += 60; // Recompensa um pouco maior para compensar a inflação
        updateUI();
        container.classList.add('correct');
        setTimeout(() => container.classList.remove('correct'), 500);
        loadNewQuestion();
    } else {
        // ERROU: Punição Severa
        state.energy = Math.max(0, state.energy - 20);

        // --- O FANTASMA DA IGNORÂNCIA ---
        // Spawna um inimigo instantaneamente ao errar
        spawnEnemy('GHOST');

        updateUI();
        container.classList.add('wrong');

        // Efeito visual de tela vermelha forte
        document.body.style.backgroundColor = '#660000';
        setTimeout(() => {
            container.classList.remove('wrong');
            document.body.style.backgroundColor = '#1a1a2e';
        }, 300);
    }
}

// --- SISTEMA DE INIMIGOS ---
function spawnEnemy(forcedType = null) {
    state.enemies.push(new Enemy(forcedType));
}

class Enemy {
    constructor(forcedType = null) {
        this.wpIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;

        // Multiplicador de Dificuldade Exponencial (1.15x por onda)
        const difficultyMult = Math.pow(1.15, state.wave - 1);

        let type = forcedType;
        if (!type) {
            const rand = Math.random();
            const isBossWave = state.wave % 5 === 0;

            if (isBossWave && rand < 0.25) type = 'BOSS';
            else if (state.wave >= 3 && rand < 0.25) type = 'SPEEDY';
            else if (state.wave >= 2 && rand < 0.25) type = 'TANK'; // Novo inimigo
            else type = 'NORMAL';
        }

        // Configuração dos Tipos
        if (type === 'GHOST') {
            this.radius = 10;
            this.color = '#dfe6e9'; // Quase branco
            this.speed = 3.5; // Extremamente rápido
            this.hp = 20 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 2; // Tira 2 vidas
        }
        else if (type === 'BOSS') {
            this.radius = 30;
            this.color = '#8e44ad'; // Roxo
            this.speed = 0.5;
            this.hp = 500 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 10; // Instakill praticamente
        }
        else if (type === 'TANK') { // O Tanque Azul
            this.radius = 18;
            this.color = '#0984e3'; // Azul forte
            this.speed = 0.7; // Lento
            this.hp = 150 * difficultyMult; // Muita vida
            this.maxHp = this.hp;
            this.reward = 3;
        }
        else if (type === 'SPEEDY') {
            this.radius = 8;
            this.color = '#f1c40f'; // Amarelo
            this.speed = 2.2 + (state.wave * 0.1);
            this.hp = 25 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 1;
        }
        else { // Normal
            this.radius = 12;
            this.color = '#e94560'; // Vermelho
            this.speed = 1.2 + (state.wave * 0.05);
            this.hp = 50 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 1;
        }

        this.type = type;
    }

    update() {
        const target = path[this.wpIndex + 1];
        if (!target) return;

        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.speed) {
            this.x = target.x;
            this.y = target.y;
            this.wpIndex++;
            if (this.wpIndex >= path.length - 1) {
                state.lives -= this.reward;
                this.hp = 0;
                updateUI();
                if (state.lives <= 0) {
                    alert(`💀 GAME OVER 💀\nVocê sobreviveu até a Onda ${state.wave}`);
                    location.reload();
                }
            }
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }

    draw() {
        ctx.globalAlpha = this.type === 'GHOST' ? 0.6 : 1.0; // Fantasma é meio transparente

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.type === 'BOSS' || this.type === 'TANK') {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Barra de Vida
        const hpPercent = Math.max(0, this.hp / this.maxHp);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - 12, this.y - (this.radius + 8), 24, 4);
        ctx.fillStyle = hpPercent > 0.5 ? '#2ecc71' : '#e74c3c';
        ctx.fillRect(this.x - 12, this.y - (this.radius + 8), 24 * hpPercent, 4);

        ctx.globalAlpha = 1.0; // Reset alpha
    }
}

class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 140; // Alcance reduzido levemente
        this.cooldown = 0;
    }

    update() {
        if (this.cooldown > 0) this.cooldown--;
        else {
            const target = state.enemies.find(e => Math.hypot(e.x - this.x, e.y - this.y) < this.range);
            if (target) {
                state.projectiles.push(new Projectile(this.x, this.y, target));
                this.cooldown = 25; // Atira mais rápido
            }
        }
    }

    draw() {
        ctx.fillStyle = '#4cc9f0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
        ctx.stroke();
    }
}

class Projectile {
    constructor(x, y, target) {
        this.x = x; this.y = y; this.target = target;
        this.speed = 15; // Projétil muito rápido
        this.damage = 25; // Dano base
        this.active = true;
    }
    update() {
        if (!this.target || this.target.hp <= 0) {
            this.active = false;
            return;
        }
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.speed) {
            this.target.hp -= this.damage;
            this.active = false;
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }
    draw() {
        ctx.fillStyle = '#f1c40f';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- ENGINE ---
function updateUI() {
    document.getElementById('energy-val').innerText = Math.floor(state.energy); // Arredonda
    document.getElementById('lives-val').innerText = state.lives;

    // Atualiza o texto do botão com o preço atual (INFLAÇÃO)
    const btn = document.getElementById('btn-buy');
    btn.innerText = `Comprar Torre (${state.currentTowerCost}⚡)`;

    if (state.energy < state.currentTowerCost) {
        btn.style.opacity = '0.5';
    } else {
        btn.style.opacity = '1';
    }
}

function buyTower() {
    if (state.energy >= state.currentTowerCost) {
        canvas.style.cursor = 'crosshair';
        canvas.style.border = '2px solid #2ecc71';

        const clickHandler = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            let clientX = e.clientX;
            let clientY = e.clientY;

            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            const realX = (clientX - rect.left) * scaleX;
            const realY = (clientY - rect.top) * scaleY;

            // Compra a torre
            state.towers.push(new Tower(realX, realY));
            state.energy -= state.currentTowerCost;

            // --- A INFLAÇÃO ---
            // Cada torre aumenta o preço da próxima em +50
            state.currentTowerCost += 50;

            updateUI();

            canvas.style.cursor = 'default';
            canvas.style.border = 'none';
            canvas.removeEventListener('click', clickHandler);
        };
        canvas.addEventListener('click', clickHandler);
    } else {
        // Efeito de "Negado"
        const btn = document.getElementById('btn-buy');
        btn.style.backgroundColor = '#e74c3c';
        setTimeout(() => btn.style.backgroundColor = '#2ecc71', 200);
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha Mapa
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 45;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();

    ctx.strokeStyle = '#34495e'; // Cor do caminho mais escura
    ctx.lineWidth = 3;
    ctx.stroke();

    // Wave Logic
    if (state.enemiesKilledInWave >= (20 + state.wave * 2)) { // Mais inimigos por onda
        state.wave++;
        state.enemiesKilledInWave = 0;
        console.log("Onda Pesadelo: " + state.wave);
    }

    // Spawn Rate agressivo
    const spawnRate = Math.max(25, 120 - (state.wave * 8)); // Fica insuportável rápido

    if (state.frame % spawnRate === 0) {
        spawnEnemy();
    }

    // Updates
    for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        e.update();
        e.draw();
        if (e.hp <= 0) {
            state.enemies.splice(i, 1);
            state.enemiesKilledInWave++;
        }
    }

    state.towers.forEach(t => { t.update(); t.draw(); });

    for (let i = state.projectiles.length - 1; i >= 0; i--) {
        const p = state.projectiles[i];
        p.update();
        p.draw();
        if (!p.active) state.projectiles.splice(i, 1);
    }

    state.frame++;
    if (state.lives > 0) requestAnimationFrame(loop);
}

// Start
initDeck();
loadNewQuestion();
document.getElementById('btn-buy').onclick = buyTower;
updateUI(); // Chama uma vez para setar o botão inicial
loop();