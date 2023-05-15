import { configureStore } from '@reduxjs/toolkit'

import api from '../services/api' //aqui importamos a api, que irá armazenar todo conteudo da api que estamos consumindo

import cartReudcer from './reducers/cart' //aqui importamos o reducer, que irá armazenar todo conteudo do slice de manipular o carrinho de compras

//aqui é a store, onde irá armazenar toda os reducers
export const store = configureStore({
  reducer: {
    cart: cartReudcer, //aqui estamos informando que o reducer cart recebe o reducer cartReudcer que criamos na pasta de reducers
    [api.reducerPath]: api.reducer //estamos acessando a propriedade reducerPath do objeto api, que criamos na pasta de services, que recebe api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

//aqui é o type que criamos para o rootreducer
export type RootReducer = ReturnType<typeof store.getState>

//O typeof ele serve para retonar o tipo daquele dado, ex:
//let idade = 10
//typeof idade - VAI RETORNAR NUMBER, POIS É O TIPO DAQUELA VARIAVEL, QUE TEM O VALOR 10, OU SEJA, NUMBER
//type RootReducer = ReturnType<typeof store.getState> - ESTAMOS PEGANDO O TYPE DE store.getState, E PASSANDO PARA ReturnType, QUE ENTÃO ATRIBUI ESTE TYPE PARA O RootReducer QUE CRIAMOS
