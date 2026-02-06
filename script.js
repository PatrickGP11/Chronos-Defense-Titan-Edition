// script.js - GOD MODE (IMPOSSIBLE)

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let questionDeck = [];
let gameRunning = false; // Controle do Estado do Jogo

function initDeck() {
    questionDeck = JSON.parse(JSON.stringify(knowledgeBase));
}

// --- ESTADO DO JOGO ---
const state = {
    energy: 100,          // Começa baixo
    lives: 5,             // Poucas vidas
    wave: 1,
    enemiesKilledInWave: 0,
    frame: 0,
    enemies: [],
    towers: [],
    projectiles: [],
    currentQuestion: null,
    baseTowerCost: 100,
    currentTowerCost: 100
};

const path = [
    { x: 0, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 300 },
    { x: 500, y: 300 }, { x: 500, y: 100 }, { x: 700, y: 100 }, { x: 700, y: 400 }, { x: 800, y: 400 }
];

// --- FUNÇÃO DE START ---
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    gameRunning = true;

    // Inicializa tudo
    initDeck();
    loadNewQuestion();
    updateUI();

    // Ativa o botão de compra
    const btn = document.getElementById('btn-buy');
    btn.onclick = buyTower;
    btn.innerText = `Comprar Torre (${state.currentTowerCost}⚡)`;

    // Começa o loop
    loop();
}

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
    if (!gameRunning) return; // Não deixa responder se não começou

    const container = document.getElementById('quiz-container');

    if (index === state.currentQuestion.correctIndex) {
        // --- NERF: Recompensa muito baixa ---
        state.energy += 30; // Era 60, agora é 30. Tem que suar!
        updateUI();
        container.classList.add('correct');
        setTimeout(() => container.classList.remove('correct'), 500);
        loadNewQuestion();
    } else {
        // --- PUNIÇÃO: Perda e Fantasma ---
        state.energy = Math.max(0, state.energy - 25);
        spawnEnemy('GHOST');
        updateUI();
        container.classList.add('wrong');
        document.body.style.backgroundColor = '#660000';
        setTimeout(() => {
            container.classList.remove('wrong');
            document.body.style.backgroundColor = '#0b0c10';
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

        // Dificuldade: 20% mais forte a cada onda (era 15%)
        const difficultyMult = Math.pow(1.20, state.wave - 1);

        let type = forcedType;
        if (!type) {
            const rand = Math.random();
            const isBossWave = state.wave % 5 === 0;

            if (isBossWave && rand < 0.3) type = 'BOSS'; // Mais chance de Boss
            else if (state.wave >= 2 && rand < 0.35) type = 'SPEEDY'; // Mais Speedys
            else if (state.wave >= 2 && rand < 0.35) type = 'TANK';
            else type = 'NORMAL';
        }

        if (type === 'GHOST') {
            this.radius = 10;
            this.color = '#dfe6e9';
            this.speed = 4.5; // Quase impossível de ver
            this.hp = 25 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 2;
        }
        else if (type === 'BOSS') {
            this.radius = 32;
            this.color = '#8e44ad';
            this.speed = 0.6; // Um pouco mais rápido que antes
            this.hp = 800 * difficultyMult; // Tanque de guerra
            this.maxHp = this.hp;
            this.reward = 999; // Instakill
        }
        else if (type === 'TANK') {
            this.radius = 20;
            this.color = '#0984e3';
            this.speed = 0.9;
            this.hp = 200 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 5;
        }
        else if (type === 'SPEEDY') {
            this.radius = 8;
            this.color = '#f1c40f';
            this.speed = 3.0 + (state.wave * 0.2); // Muito rápido
            this.hp = 30 * difficultyMult;
            this.maxHp = this.hp;
            this.reward = 1;
        }
        else {
            this.radius = 12;
            this.color = '#e74c3c';
            this.speed = 1.5 + (state.wave * 0.1); // Base mais rápida
            this.hp = 60 * difficultyMult;
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
                    alert(`💀 GAME OVER 💀\nOnda: ${state.wave}`);
                    location.reload();
                }
            }
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }

    draw() {
        ctx.globalAlpha = this.type === 'GHOST' ? 0.5 : 1.0;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        if (this.type === 'BOSS' || this.type === 'TANK') {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        const hpPercent = Math.max(0, this.hp / this.maxHp);
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - 12, this.y - (this.radius + 8), 24, 4);
        ctx.fillStyle = hpPercent > 0.5 ? '#2ecc71' : '#c0392b';
        ctx.fillRect(this.x - 12, this.y - (this.radius + 8), 24 * hpPercent, 4);
        ctx.globalAlpha = 1.0;
    }
}

class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 130; // Alcance reduzido
        this.cooldown = 0;
    }

    update() {
        if (this.cooldown > 0) this.cooldown--;
        else {
            const target = state.enemies.find(e => Math.hypot(e.x - this.x, e.y - this.y) < this.range);
            if (target) {
                state.projectiles.push(new Projectile(this.x, this.y, target));
                // --- NERF: Cadência de Tiro ---
                this.cooldown = 40; // Atira MUITO mais devagar (antes era 25)
            }
        }
    }

    draw() {
        ctx.fillStyle = '#45a29e';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(102, 252, 241, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
        ctx.stroke();
    }
}

class Projectile {
    constructor(x, y, target) {
        this.x = x; this.y = y; this.target = target;
        this.speed = 15;
        this.damage = 25;
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
        ctx.fillStyle = '#66fcf1';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- ENGINE ---
function updateUI() {
    document.getElementById('energy-val').innerText = Math.floor(state.energy);
    document.getElementById('lives-val').innerText = state.lives;

    if (gameRunning) {
        const btn = document.getElementById('btn-buy');
        btn.innerText = `Comprar Torre (${state.currentTowerCost}⚡)`;
        btn.style.opacity = state.energy < state.currentTowerCost ? '0.5' : '1';
    }
}

function buyTower() {
    if (!gameRunning) return;

    if (state.energy >= state.currentTowerCost) {
        canvas.style.cursor = 'crosshair';
        canvas.style.borderColor = '#66fcf1';

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

            state.towers.push(new Tower(realX, realY));
            state.energy -= state.currentTowerCost;

            // --- INFLAÇÃO PESADA ---
            state.currentTowerCost += 80; // Era +50, agora +80. Impossível comprar muitas.

            updateUI();

            canvas.style.cursor = 'default';
            canvas.style.borderColor = '#45a29e';
            canvas.removeEventListener('click', clickHandler);
        };
        canvas.addEventListener('click', clickHandler);
    } else {
        const btn = document.getElementById('btn-buy');
        btn.style.backgroundColor = '#c0392b';
        setTimeout(() => btn.style.backgroundColor = '#2ecc71', 200);
    }
}

function loop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mapa
    ctx.strokeStyle = '#0b0c10';
    ctx.lineWidth = 45;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();

    ctx.strokeStyle = '#1f2833';
    ctx.lineWidth = 3;
    ctx.stroke();

    if (state.enemiesKilledInWave >= (15 + state.wave * 3)) {
        state.wave++;
        state.enemiesKilledInWave = 0;
    }

    // Spawn Rate Extremamente Rápido
    const spawnRate = Math.max(20, 100 - (state.wave * 10)); // Metralhadora de inimigos

    if (state.frame % spawnRate === 0) {
        spawnEnemy();
    }

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

// Inicializa, mas NÃO roda o loop ainda

document.getElementById('btn-buy').onclick = null; // Desativa botão até começar