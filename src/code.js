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

//Primeiramente foi criada variavéis globais, placarComputador marca os pontos do computador enquanto o placarJogador marca os pontos do Jogador,
//por fim, historico é a lista que armazena os resultados de cada rodada.
let placarComputador = 0
let placarJogador = 0
let historico = []
// A função rodada, primeiramente verifica o número de rodadas, como defini para a partida ter no máximo de 5 rodadas, caso já tenha
//atingido esse limite, aparece o alerta "O jogo acabou! Atualize a página para jogar novamente", caso contrário,a const computador
// utiliza-se da função escolhaDoComputador passando como argumento pra ela o retorno da função aleatorizar(3), que vai gerar um número entre 0 e 2,
//transformando o número em Pedra,Papel ou Tesoura, após isso foi criada uma nova variável global, a resultado, que por inicio não tem valor
//definido, porém mais a frente a mesma recebe o valor do retorno da função determinarResultadoPedra(computador) ou da determinarResultadoPapel(computador) ou da
//determinarResultadoTesoura(computador), isso depende da opcao(escolha do jogador), essas funções retornam quem ganhou a partida ou se foi empate, portanto
// resultado ,nada a mais nada a menos, faz guardar o resultado da rodada, com base nisso se resultado for jogador, o placar é atualizado somando 1 ao placar do jogador, se
// o resultado for computador, o placar é atualizado somando 1 ao placar do computador e se resultado for empate, nenhum dos dois ganham pontos.
//em seguida o historico é atualizado, guardando o resultado da rodada, por conseguinte é mostrado no console o placar e a rodada e quando bater o número de 5 rodadas
//é verificado quem ganhou a partida por meio da comparação entre placarJogador e placarComputador.
const rodada = opcao => {
    if (historico.length >= 5)
    {
        alert("O jogo acabou! Atualize a página para jogar novamente")
    } else {
        const computador = escolhaDoComputador(aleatorizar(3))
        let resultado
        if (opcao === "pedra") {
            resultado = determinarResultadoPedra(computador)
        } else if (opcao === "papel") {
            resultado = determinarResultadoPapel(computador)
        } else if (opcao === "tesoura") {
            resultado = determinarResultadoTesoura(computador)
        }
        if (resultado === "jogador") {
            placarJogador++
        } else if (resultado === "computador") {
            placarComputador++
        }
        historico = [...historico, resultado]
        console.log(`Rodada ${historico.length}`)
        console.log(`Placar: Jogador ${placarJogador} | Computador ${placarComputador}`)
        if (historico.length === 5) {
            if (placarJogador > placarComputador) alert("Fim do jogo! Você venceu a partida!")
            else if (placarJogador < placarComputador) alert("Fim do jogo! Você perdeu a partida!")
            else alert("Fim do jogo! Empate na partida!")
        }
    }
}
