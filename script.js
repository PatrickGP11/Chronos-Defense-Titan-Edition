// script.js - Modo Facilitado

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Deck de perguntas
let questionDeck = [];

function initDeck() {
    questionDeck = JSON.parse(JSON.stringify(knowledgeBase));
}

// --- ESTADO DO JOGO ---
const state = {
    energy: 150, // Começa com mais energia
    lives: 10,   // Mais vidas (eram 5)
    wave: 1,
    frame: 0,
    enemies: [],
    towers: [],
    projectiles: [],
    currentQuestion: null
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
        // MUDANÇA: Ganha mais energia (50)
        state.energy += 50;
        updateUI();
        container.classList.add('correct');

        document.getElementById('game-wrapper').style.borderColor = '#2ecc71';
        setTimeout(() => {
            container.classList.remove('correct');
            document.getElementById('game-wrapper').style.borderColor = '#0f3460';
        }, 500);

        loadNewQuestion();
    } else {
        // MUDANÇA: Perde menos energia (5)
        state.energy = Math.max(0, state.energy - 5);
        updateUI();
        container.classList.add('wrong');

        document.getElementById('game-wrapper').style.borderColor = '#e74c3c';
        setTimeout(() => {
            container.classList.remove('wrong');
            document.getElementById('game-wrapper').style.borderColor = '#0f3460';
        }, 500);
    }
}

// --- CLASSES ---

class Enemy {
    constructor() {
        this.wpIndex = 0;
        this.x = path[0].x;
        this.y = path[0].y;
        // MUDANÇA: Inimigos mais lentos (0.8 base)
        this.speed = 0.8 + (state.wave * 0.15);
        this.hp = 30 + (state.wave * 8);
        this.maxHp = this.hp;
        this.radius = 12;
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
                state.lives--;
                this.hp = 0;
                updateUI();
                if (state.lives <= 0) {
                    alert("Fim de Jogo! F5 para recomeçar.");
                    state.lives = 0;
                }
            }
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }

    draw() {
        ctx.fillStyle = '#e94560';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - 10, this.y - 20, 20, 4);
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(this.x - 10, this.y - 20, 20 * (this.hp / this.maxHp), 4);
    }
}

class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 160; // Alcance um pouquinho maior
        this.cooldown = 0;
    }

    update() {
        if (this.cooldown > 0) this.cooldown--;
        else {
            const target = state.enemies.find(e => Math.hypot(e.x - this.x, e.y - this.y) < this.range);
            if (target) {
                state.projectiles.push(new Projectile(this.x, this.y, target));
                this.cooldown = 30; // Tiro mais rápido (era 35/40)
            }
        }
    }

    draw() {
        ctx.fillStyle = '#4cc9f0';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
        ctx.stroke();
    }
}

class Projectile {
    constructor(x, y, target) {
        this.x = x; this.y = y; this.target = target;
        this.speed = 10; this.damage = 15; this.active = true;
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
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- ENGINE ---
function updateUI() {
    document.getElementById('energy-val').innerText = state.energy;
    document.getElementById('lives-val').innerText = state.lives;
}

function buyTower() {
    if (state.energy >= 100) {
        canvas.style.cursor = 'crosshair';
        const clickHandler = (e) => {
            const rect = canvas.getBoundingClientRect();
            state.towers.push(new Tower(e.clientX - rect.left, e.clientY - rect.top));
            state.energy -= 100;
            updateUI();
            canvas.style.cursor = 'default';
            canvas.removeEventListener('click', clickHandler);
        };
        canvas.addEventListener('click', clickHandler);
    } else {
        alert("Sem energia! Responda mais perguntas.");
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 45;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    path.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();

    ctx.strokeStyle = '#252540';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Spawner: Um pouco mais demorado entre inimigos
    if (state.frame % 140 === 0) state.enemies.push(new Enemy());

    for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        e.update();
        e.draw();
        if (e.hp <= 0) state.enemies.splice(i, 1);
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

initDeck();
loadNewQuestion();
document.getElementById('btn-buy').onclick = buyTower;
loop();