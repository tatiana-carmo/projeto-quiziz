import { aleatorio } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");

const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

const botaoJogarNovamente =
    document.querySelector(".novamente-btn");

const botaoIniciar =
    document.querySelector(".iniciar-btn");

const telaInicial =
    document.querySelector(".tela-inicial");

let atual = 0;
let pontuacao = 0;
let perguntasDoJogo = [];


botaoIniciar.addEventListener("click", iniciaJogo);

botaoJogarNovamente.addEventListener(
    "click",
    jogaNovamente
);


function iniciaJogo() {

    atual = 0;

    pontuacao = 0;

    perguntasDoJogo = aleatorio(perguntas);

    telaInicial.style.display = "none";

    caixaResultado.classList.remove("mostrar");

    caixaPerguntas.style.display = "block";

    caixaAlternativas.style.display = "flex";

    mostraPergunta();
}


function mostraPergunta() {

    caixaAlternativas.innerHTML = "";

    if (atual >= perguntasDoJogo.length) {

        mostraResultado();

        return;
    }

    const perguntaAtual = perguntasDoJogo[atual];

    caixaPerguntas.textContent =
        `${atual + 1}. ${perguntaAtual.enunciado}`;


    perguntaAtual.alternativas.forEach(
        (alternativa, indice) => {

            const botaoAlternativa =
                document.createElement("button");

            botaoAlternativa.textContent =
                alternativa;

            botaoAlternativa.addEventListener(
                "click",
                () => respostaSelecionada(
                    botaoAlternativa,
                    indice,
                    perguntaAtual.correta
                )
            );

            caixaAlternativas.appendChild(
                botaoAlternativa
            );
        }
    );
}


function respostaSelecionada(
    botaoSelecionado,
    indiceSelecionado,
    respostaCorreta
) {

    const botoes =
        caixaAlternativas.querySelectorAll("button");


    // Impede o jogador de clicar em várias respostas
    botoes.forEach(botao => {

        botao.disabled = true;

    });


    // RESPOSTA CERTA
    if (indiceSelecionado === respostaCorreta) {

        botaoSelecionado.classList.add("certa");

        pontuacao++;

    }

    // RESPOSTA ERRADA
    else {

        botaoSelecionado.classList.add("errada");

        // Mostra qual era a resposta correta
        botoes[respostaCorreta]
            .classList.add("certa");
    }


    // Espera um pouco antes de passar para a próxima
    setTimeout(() => {

        atual++;

        mostraPergunta();

    }, 1200);
}


function mostraResultado() {

    caixaPerguntas.style.display = "none";

    caixaAlternativas.style.display = "none";

    caixaResultado.classList.add("mostrar");


    let mensagem;


    if (pontuacao === perguntasDoJogo.length) {

        mensagem =
            "🏆 Perfeito! Você acertou todas as perguntas!";

    }

    else if (pontuacao >= 7) {

        mensagem =
            "🥇 Excelente! Você entende muito de futebol!";

    }

    else if (pontuacao >= 5) {

        mensagem =
            "👏 Muito bem! Você conhece bastante de futebol.";

    }

    else if (pontuacao >= 3) {

        mensagem =
            "⚽ Bom trabalho! Mas ainda dá para melhorar.";

    }

    else {

        mensagem =
            "😅 Você precisa estudar um pouco mais de futebol!";

    }


    textoResultado.textContent =
        `${mensagem} Você acertou ${pontuacao} de ${perguntasDoJogo.length} perguntas.`;
}


function jogaNovamente() {

    atual = 0;

    pontuacao = 0;

    caixaResultado.classList.remove("mostrar");

    caixaPerguntas.style.display = "block";

    caixaAlternativas.style.display = "flex";

    perguntasDoJogo = aleatorio(perguntas);

    mostraPergunta();
}