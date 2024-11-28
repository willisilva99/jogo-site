const output = document.getElementById("output");
const commandInput = document.getElementById("command-input");
const levelDisplay = document.getElementById("level");
const missionNameDisplay = document.getElementById("mission-name");
const coinsDisplay = document.getElementById("coins");

// Sons
const typingSound = new Audio('./assets/sound/typing.mp3');
const successSound = new Audio('./assets/sound/success.mp3');
const errorSound = new Audio('./assets/sound/error.mp3');
const missionSound = new Audio('./assets/sound/mission.mp3');

// Variáveis do jogo
let level = 1;
let coins = 100;
let currentMission = null;
let missionsCompleted = 0;

// Lista de missões
const missions = [
    { name: "Hackear servidor local", reward: 50, difficulty: 1 },
    { name: "Descriptografar dados de cliente", reward: 100, difficulty: 2 },
    { name: "Invadir banco de dados corporativo", reward: 200, difficulty: 3 }
];

// Comandos disponíveis
const commands = {
    help: "Comandos disponíveis:\n - help: Mostra os comandos\n - hack: Inicia a missão atual\n - clear: Limpa a tela\n - status: Mostra o progresso\n - shop: Exibe itens disponíveis para compra",
    clear: "Tela limpa.",
    shop: "Itens disponíveis:\n - Ferramenta de Hack: 200₿ (ajuda a hackear sistemas difíceis)\n - Energia Extra: 100₿ (permite mais tentativas)"
};

// Exibir texto no terminal
function appendOutput(text) {
    output.innerHTML += `<div>${text}</div>`;
    output.scrollTop = output.scrollHeight;
}

// Processar comandos
function processCommand(command) {
    typingSound.play();
    const lowerCaseCommand = command.toLowerCase();

    if (lowerCaseCommand === "hack") {
        startMission();
    } else if (commands[lowerCaseCommand]) {
        appendOutput(`> ${command}`);
        appendOutput(commands[lowerCaseCommand]);
    } else if (lowerCaseCommand === "status") {
        showStatus();
    } else {
        appendOutput(`> ${command}`);
        appendOutput("Comando não reconhecido. Digite 'help' para ver os comandos.");
        errorSound.play();
    }

    commandInput.value = "";
}

// Mostrar status do jogador
function showStatus() {
    appendOutput("===== Status do Jogador =====");
    appendOutput(`Nível: ${level}`);
    appendOutput(`Missões concluídas: ${missionsCompleted}`);
    appendOutput(`Moedas: ${coins}₿`);
    appendOutput("=============================");
}

// Iniciar missão
function startMission() {
    if (!currentMission) {
        currentMission = missions[missionsCompleted % missions.length];
        missionNameDisplay.innerText = currentMission.name;
        appendOutput(`Nova missão: ${currentMission.name}`);
        missionSound.play();
    } else {
        attemptHack();
    }
}

// Tentar hackear
function attemptHack() {
    if (!currentMission) {
        appendOutput("Nenhuma missão ativa. Use 'hack' para iniciar.");
        errorSound.play();
        return;
    }

    const success = Math.random() < (1 - currentMission.difficulty * 0.1);

    if (success) {
        missionsCompleted++;
        coins += currentMission.reward;
        level = Math.floor(missionsCompleted / 3) + 1;
        appendOutput(`Hack bem-sucedido! Recompensa: ${currentMission.reward}₿`);
        successSound.play();
        currentMission = null;
        missionNameDisplay.innerText = "Aguardando...";
    } else {
        appendOutput("Hack falhou! Tente novamente.");
        errorSound.play();
    }

    updateStats();
}

// Atualizar status no jogo
function updateStats() {
    levelDisplay.innerText = level;
    coinsDisplay.innerText = coins + "₿";
}

// Evento de envio de comando
commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && commandInput.value.trim() !== "") {
        processCommand(commandInput.value.trim());
    }
});
