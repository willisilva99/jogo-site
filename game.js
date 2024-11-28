document.addEventListener("DOMContentLoaded", function () {
    const terminal = document.getElementById("terminal");
    const output = document.getElementById("output");
    const commandInput = document.getElementById("command");

    // Sons do jogo
    const sounds = {
        typing: new Audio("sound/typing.mp3"),
        success: new Audio("sound/success.mp3"),
        error: new Audio("sound/error.mp3"),
    };

    // Missões
    const missions = [
        "Hackear servidor local",
        "Descriptografar dados do cliente",
        "Invadir banco de dados corporativo",
    ];

    let currentMission = 0;
    let currency = 100;

    function displayMessage(message, type = "info") {
        const color = type === "error" ? "red" : type === "success" ? "green" : "#00ff00";
        output.innerHTML += `<p style="color: ${color}">${message}</p>`;
        output.scrollTop = output.scrollHeight;
    }

    function executeCommand(command) {
        if (command === "hack") {
            if (Math.random() > 0.2) {
                const reward = 50 + currentMission * 50;
                currency += reward;
                sounds.success.play();
                displayMessage(`Hack bem-sucedido! Recompensa: ${reward}₿`, "success");
                currentMission = (currentMission + 1) % missions.length;
                displayMessage(`Nova missão: ${missions[currentMission]}`);
            } else {
                sounds.error.play();
                displayMessage("Hack falhou! Tente novamente.", "error");
            }
        } else {
            sounds.error.play();
            displayMessage("Comando inválido!", "error");
        }
    }

    // Evento de digitação
    commandInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const command = commandInput.value.trim();
            commandInput.value = "";
            if (command) {
                sounds.typing.play();
                displayMessage(`> ${command}`);
                executeCommand(command);
            }
        }
    });

    // Iniciar o jogo
    displayMessage(`Nova missão: ${missions[currentMission]}`);
    displayMessage(`Saldo atual: ${currency}₿`);
});
