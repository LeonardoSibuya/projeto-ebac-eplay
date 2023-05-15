import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '../../pages/Home'

//aqui criamos um estado para o slice, que é um items do tipo Game array que criamos anteriormente
type CartState = {
  items: Game[]
  isOpen: boolean //isOpen é para definir se a barra lateral do carrinho está aberta ou não
}

//aqui é o estado inicial do slice, que no caso é do tipo CartState que criamos acima, mas que recebe um array vazio como estado inicial, e depois vai ter os valores alterados de acordo com o array de Game
const initialState: CartState = {
  items: [],
  isOpen: false //começa como false, pois a barra lateral começa fechada
}

//Slice, é como se fosse um pedacinho de reducer, que forma o rootReducer
const cartSlice = createSlice({
  name: 'cart', //Damos um nome para este slice

  initialState, //aqui é o estado inicial do item que estamos criando, neste caso um carrinho de compras que começa sendo um array vazio confirme definido na const la de cima

  reducers: {
    //aqui é onde terá as funções que irão alterar o estado deste carrinho
    //Recebe o state que é o estado inicial, e a action que contem o item que iremos adicionar ao carrinho, recebendo o type PayloadAction, que recebe o type Game que criamos na page Home
    add: (state, action: PayloadAction<Game>) => {
      //aqui criamos a const gameItem, que faz um find, para procurar se algum item que está no array de Game é igual ao item que estamos fazendo o push para este array de game, ou seja se o jogo que queremos adicionar ao carrinho é igual ao jogo que ja esta no carrinho
      const JaEstaNoCarrinho = state.items.find(
        (jogo) => jogo.id === action.payload.id
      )

      //aqui estamos falando que se gameItem for falso, ou undifined, ou seja não tem nenhum jogo igual a esse no carrinho, pode fazer o push, ou seja adicionar ao carrinho
      if (!JaEstaNoCarrinho) {
        //aqui pegamos o estado do items, que inicialmente é um array vazio, e fazemos um push neste array, com o action que é o item que iremos adicionar ao carrinho, e o .payload é o conteudo que este item que sera push está recebendo, no caso de acordo com o type de Game.
        state.items.push(action.payload)
      } else {
        alert('Jogo já adicionado ao carrinho')
      }
    },
    //aqui é a função de remover jogo do carrinho, e passamos number entre <>, pois queremos trabalhar apenas com o id do jogo, e para acessarmos este ID, usamos o 'items' criado no type la em cima, onde recebe o array de Game.
    remove: (state, action: PayloadAction<number>) => {
      //aqui estamos pegando o estado do item, e fazendo o filter, ou seja filtrando e removendo um item do array, onde passamos o paramentro jogo, para filtrar o jogo que tem o id diferente do payload
      state.items = state.items.filter((jogo) => jogo.id !== action.payload)
    },
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    }
  }
})

//AGORA TEMOS QUE EXPORTAR O SLICE QUE CRIAMOS E A FUNÇÃO DE ADICIONAR AO CARRINHO QUE CRIAMOS:

//aqui estamos exportando a ação/função de adicionar ao carrinho
export const { add, close, open, remove } = cartSlice.actions

//aqui estamos exportando todo o slice deste reducer
export default cartSlice.reducer

//
//
// type de Game que estamos trabalhando em cima:
//     id: number;
//     name: string;
//     description: string;
//     release_date?: string | undefined;
//     prices: {
//         discount?: number;
//         old?: number;
//         current?: number;
//     };
//     details: {
//         category: string;
//         system: string;
//         developer: string;
//         publisher: string;
//         languages: string[];
//     };
//     media: {
//         thumbnail: string;
//         cover: string;
//         gallery: GalleryItem[];
//     };
// }
