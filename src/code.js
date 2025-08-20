/**
SPDX-License-Identifier: GPL-3.0-or-later

This file is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published
by the Free Software Foundation, either version 3 of the License
(at your option) any later version.

This file is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this file.  If not, see <https://www.gnu.org/licenses/>.
 */


// adiciona um áudio na função de jogar que fica inicia e repetindo ate o jogador reiniciar
const som = new Audio("src/music.mp3");
som.loop = true;
som.volume = 0.5;

const botaoJogar = document.querySelector("#jogar")
botaoJogar.addEventListener("click", () => {
    const seletorDeRodadas = document.querySelector("#rodadas")
    const numeroDeRodadas = seletorDeRodadas[seletorDeRodadas.selectedIndex].value

    jogarPeloBotao(numeroDeRodadas)

    // toca a música quando clicar em Jogar
    som.play();
})

// A função jogarPeloBotao é a principal função do repositório. Ela que permite
// que o jogo seja jogado, alterando a página para adicionar os botões para a
// gameplay.
// Ela tem NUMERODERODADAS como parâmetro, que determina quantas vezes o jogo
// será jogado.
const jogarPeloBotao = (numeroDeRodadas) => {
    // A função selecionarElemento funciona como interface mais funcional para a
    // interação com o DOM, em comparação com a implementação original baseada
    // em objetos. Essa função seleciona um elemento ELEMENTO baseado na
    // funcionalidade padrão do querySelector (ou seja, é possível selecionar
    // um elemento da página por sua tag, classe ou id).
    const selecionarElemento = elemento => document.querySelector(elemento)

    // A função criarElemento cria um elemento do tipo ELEMENTO, e retorna o
    // elemento criado caso seja preciso interagir com ele.
    // ARGUMENTOS é um registro que pode ter as seguintes chaves:
    // - texto: o texto que vai aparecer dentro do elemento;
    // - classe: a classe que o elemento vai ter (bom para CSS);
    // - id: o id que o elemento vai ter (também bom para CSS).
    const criarElemento = (elemento, argumentos) => {
        const elementoCriado = document.createElement(elemento)

        if (argumentos.texto) {
            elementoCriado.textContent = argumentos.texto
        }
        if (argumentos.classe) {
            elementoCriado.classList.add(argumentos.classe)
        }
        if (argumentos.id) {
            elementoCriado.setAttribute("id", argumentos.id)
        }

        return elementoCriado
    }

    // A função acrescentarElemento tanto cria quanto adiciona um elemento ELEMENTO
    // à um outro PARENTE. Se ELEMENTO for uma string, então ele será primeiro
    // criado antes de ser adicionado à página. Veja @criarElemento para informções
    // sobre o parâmetro ARGUMENTOS.
    const acrescentarElemento = (parente, elemento, argumentos) => {
        // Cria o elemento primeiro se for uma string.
        if (typeof(elemento) === "string") {
            const elementoNormalizado = criarElemento(elemento, argumentos)

            parente.appendChild(elementoNormalizado)

            return elementoNormalizado
        } else {
            parente.appendChild(elemento)

            return elemento
        }
    }

    // A função apagarElemento apaga um elemento ELEMENTO encontrado na DOM.
    // ELEMENTO também pode ser uma string para evitar a necessidade de selecionar
    // o elemento primeiro.
    const apagarElemento = elemento => {
        if (typeof(elemento) === "string") {
            const elementoNormalizado = selecionarElemento(elemento)
            // Veja:
            // <https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild#simple_examples>.
            // Obrigado a todos os contribuidores do MDN.
            const parente = elementoNormalizado.parentNode

            if (parente) {
                parente.removeChild(elementoNormalizado)
            }
        } else {
            const parente = elemento.parentNode

            if (parente) {
                parente.removeChild(elemento)
            }
        }
    }

    // A Função jogarRodada é a função de literalmente somente 1 rodada, ela usa como argumento a escolha do jogador(opcao), de forma que a depender da escolha do jogador
    //o resultado muda, a const computador utiliza-se da função escolhaDoComputador passando como argumento pra ela o retorno da função aleatorizar(3), que vai
    // gerar um número entre 0 e 2, transformando o número em "Pedra", "papel" ou "tesoura".
    //A função também utiliza-se das funções determinarResultadoPedra, determinarResultadoPapel e determinarResultadoTesoura, determinando o vencedor ou se houve empate
    // o retorno da função será esse determinado resultado.
    const jogarRodada = opcao => {
        // A função aleatorizar gera um número aleatório maior ou igual a zero,
        // porém menor que MAX, é a função que é usada para determinar a escolha entre
        // pedra, papel ou tesoura, o funcionamento da função é:
        // Math.random gera um número entre 0 e 1, esse número é multiplicado pelo número máximo
        // e o Math floor por sua vez corta a parte decimal desse número, o tornando inteiro.
        const aleatorizar = max => {
            return Math.floor(Math.random()*max)
        }

        // A função escolhaDoComputador determina, por meio de NUMERO, a escolha que
        // a máquina oponente irá fazer. Como o jogo só possui três opções, um erro é
        // executado caso passe desse número.
        const escolhaDoComputador = numero => {
            const error = new RangeError("Valor inesperado, deve estar entre 0 e 2")

            if (numero === 0) {
                return "pedra"
            } else if (numero === 1) {
                return "papel"
            } else if (numero === 2) {
                return "tesoura"
            } else {
                throw error
            }
        }

        // A função determinarResultado, mediante currying, cria uma interface genérica
        // para determinar o vencedor de um jogo. OPCAO representa a escolha feita pelo
        // jogador. O verdadeiro argumento para essa função é ESCOLHADOCOMPUTADOR, pois
        // os outros são usados para criar as funções para cada escolha.
        const determinarResultado = opcao => (perde, ganha) => escolhaDoComputador => {
            const error = new RangeError(`Opção inesperada, deve ser "pedra", "papel" ou "tesoura"`)

            if (escolhaDoComputador === opcao) {
                return "empate"
            } else if (escolhaDoComputador === perde) {
                return "computador"
            } else if (escolhaDoComputador === ganha) {
                return "jogador"
            } else {
                throw error
            }
        }

        const determinarResultadoPedra = determinarResultado("pedra")("papel", "tesoura")

        const determinarResultadoPapel = determinarResultado("papel")("tesoura", "pedra")

        const determinarResultadoTesoura = determinarResultado("tesoura")("pedra", "papel")

        const computador = escolhaDoComputador(aleatorizar(3))
        const error = new RangeError(`Erro! opção errada, deve ser "pedra", "papel" ou "tesoura"`)

        if (opcao === "pedra") {
            const resultado = determinarResultadoPedra(computador)
            return resultado
        } else if(opcao === "papel") {
            const resultado = determinarResultadoPapel(computador)
            return resultado
        } else if(opcao === "tesoura") {
            const resultado = determinarResultadoTesoura(computador)
            return resultado
        } else {
            throw error
        }
    }

    // Isso apaga os botões originais, que serão substituídos.
    apagarElemento(".container")

    const containerBotao = acrescentarElemento(document.body, "div", {classe: "container"})
    const botaoPedra = criarElemento("button", {texto: "🪨 Pedra"})
    const botaoPapel = criarElemento("button", {texto: "📄 Papel"})
    const botaoTesoura = criarElemento("button", {texto:  "✂️ Tesoura"})
    const botoes = [botaoPedra, botaoPapel, botaoTesoura]
    botoes.map((item) => acrescentarElemento(containerBotao, item))

    let estadoDoJogo = {
        rodadas: numeroDeRodadas,
        pontuacaoJogador: 0,
        pontuacaoComputador: 0
    }
    // A função atualizarEstado atualiza o estado do jogo. Determina quem ganhou e quem perdeu por RESULTADO.
const divResultado = document.querySelector("#resultado");
const divPlacar = document.querySelector("#placar");

const atualizarEstado = (resultado) => {
    estadoDoJogo.rodadas--;

    // mostra resultado da rodada
    if (resultado === "jogador") {
        estadoDoJogo.pontuacaoJogador++;
        divResultado.textContent = "Você ganhou a rodada!";
    } else if (resultado === "computador") {
        estadoDoJogo.pontuacaoComputador++;
        divResultado.textContent = "O computador ganhou a rodada!";
    } else {
        divResultado.textContent = "Rodada empatada!";
    }

    // mostra placar atualizado
    divPlacar.textContent =
        `Placar → Você: ${estadoDoJogo.pontuacaoJogador} | Computador: ${estadoDoJogo.pontuacaoComputador} | Rodadas restantes: ${estadoDoJogo.rodadas}`;

    // se acabou o jogo
    if (estadoDoJogo.rodadas === 0) {
        let mensagemFinal = "Jogo acabou! ";

        if (estadoDoJogo.pontuacaoJogador > estadoDoJogo.pontuacaoComputador) {
            mensagemFinal += "🎉 Você ganhou o jogo!";
        } else if (estadoDoJogo.pontuacaoJogador < estadoDoJogo.pontuacaoComputador) {
            mensagemFinal += "😢 Você perdeu o jogo!";
        } else {
            mensagemFinal += "🤝 O jogo empatou!";
        }

        divResultado.textContent = mensagemFinal;

        // desativa os botões
        botaoPedra.disabled = true;
        botaoPapel.disabled = true;
        botaoTesoura.disabled = true;
    }
};

    // A função lidarComClique serve apenas como event listeners para os botões.
    const lidarComClique = (opcao) => {
        const resultado = jogarRodada(opcao)
        atualizarEstado(resultado)
    }

    botaoPedra.addEventListener("click", () => lidarComClique("pedra"))
    botaoPapel.addEventListener("click", () => lidarComClique("papel"))
    botaoTesoura.addEventListener("click", () => lidarComClique("tesoura"))
}
