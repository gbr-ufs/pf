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
// porém menor que o número máximo definido,é a função que é usada para
// determinar a escolha entre pedra, papel ou tesoura, o funcionamento da função é:
// Math.random gera um número entre 0 e 1, esse número é multiplicado pelo número máximo
// e o Math floor por sua vez corta a parte decimal desse número, o tornando inteiro.
const aleatorizar = max => {
    return Math.floor(Math.random()*max)
}

// A função escolhaDoComputador determina, por meio de um número, a escolha que
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
