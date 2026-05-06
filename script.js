// Gerenciamento do Jogador[cite: 5]
let jogador = {
    nome: "",
    vitorias: 0,
    derrotas: 0,
    partidas: 0
};

const screenCadastro = document.getElementById('screen-cadastro');
const screenGame = document.getElementById('screen-game');
const screenResult = document.getElementById('screen-result');
const scoreboard = document.getElementById('scoreboard');

// Cadastro Inicial
document.getElementById('form-cadastro').addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeInput = document.getElementById('nome').value.trim();
    if (nomeInput) {
        jogador.nome = nomeInput;
        document.getElementById('display-nome').textContent = jogador.nome;
        screenCadastro.classList.add('hidden');
        scoreboard.classList.remove('hidden');
        screenGame.classList.remove('hidden');
    }
});

// Seleção de Par ou Ímpar
let escolhaAtual = 'par';
const choiceBtns = document.querySelectorAll('.choice');

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        choiceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        escolhaAtual = btn.dataset.choice;
    });
});

// Lógica do Jogo[cite: 6]
document.getElementById('play-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const numJogador = parseInt(document.getElementById('numero').value);
    const numComputador = Math.floor(Math.random() * 11);
    const soma = numJogador + numComputador;
    const isPar = soma % 2 === 0;
    const tipoSoma = isPar ? 'par' : 'impar';
    
    const venceu = (escolhaAtual === tipoSoma);

    // Atualiza estatísticas[cite: 5]
    if (venceu) { jogador.vitorias++; } else { jogador.derrotas++; }
    jogador.partidas++;

    // Interface de Resultado
    const title = document.getElementById('result-title');
    title.textContent = venceu ? "Você Venceu!" : "Máquina Venceu";
    title.className = venceu ? 'gradient-text' : 'cyan';
    
    document.getElementById('num-player').textContent = numJogador;
    document.getElementById('num-comp').textContent = numComputador;
    document.getElementById('num-sum').textContent = soma;
    document.getElementById('result-detail').innerHTML = `Sua escolha: <strong>${escolhaAtual.toUpperCase()}</strong> | Soma deu <strong>${tipoSoma.toUpperCase()}</strong>`;

    // Atualiza Placar
    document.getElementById('stat-wins').textContent = jogador.vitorias;
    document.getElementById('stat-losses').textContent = jogador.derrotas;
    document.getElementById('stat-total').textContent = jogador.partidas;

    screenGame.classList.add('hidden');
    screenResult.classList.remove('hidden');
});

// Botões de Navegação
document.getElementById('btn-again').addEventListener('click', () => {
    document.getElementById('numero').value = '';
    screenResult.classList.add('hidden');
    screenGame.classList.remove('hidden');
});

document.getElementById('btn-sair').addEventListener('click', () => location.reload());