//aqui é onde iremos armazenar as Api's que estamos consumindo no projeto

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Game } from '../pages/Home'

const api = createApi({
  baseQuery: fetchBaseQuery({
    //é de onde iremos pegar os dados da api
    baseUrl: 'https://fake-api-tau.vercel.app/api/eplay'
  }),
  endpoints: (builder) => ({
    getJogosDestaques: builder.query<Game, void>({
      query: () => 'destaque' //Aqui estamos pegando o caminho da url dos jogos destaques, e colocando 'destaque', estamos praticamente completando a url acima: 'https://fake-api-tau.vercel.app/api/eplay' com /destaque
    }),
    getPromocoes: builder.query<Game[], void>({
      //aqui diferente do destaque, recebemos o tipo Game mas em forma de array, pois a seção dos jogos de promoções é um array, e o de destaque é apenas um jogo
      query: () => 'promocoes'
    }),
    getEmBreve: builder.query<Game[], void>({
      query: () => 'em-breve'
    }),
    getAcao: builder.query<Game[], void>({
      query: () => 'acao'
    }),
    getEsportes: builder.query<Game[], void>({
      query: () => 'esportes'
    }),
    getSimulacao: builder.query<Game[], void>({
      query: () => 'simulacao'
    }),
    getLuta: builder.query<Game[], void>({
      query: () => 'luta'
    }),
    getRpg: builder.query<Game[], void>({
      query: () => 'rpg'
    }),
    //AQUI ESTAMOS FAZENDO O GET DO URL DO JOGO QUE RECEBE UM ID, MAS NO CASO O ID DO JOGO RETORNA UMA STRING, ENTÃO PASSAMOS O TYPE GAME E STRING COMO RETORNO, PARA COMPLETAR A URL: https://fake-api-tau.vercel.app/api/eplay/jogos/${id}
    getJogo: builder.query<Game, string>({
      query: (id) => `jogos/${id}` //agora tem um argumento que temos que passar na arrow function, que é o ID
    })
  })
})

//aqui estamos exportando o endpoint useGetJogosDestaquesQuery, que será responsável pela chamada dos jogos destaques
export const {
  useGetJogosDestaquesQuery,
  useGetEmBreveQuery,
  useGetPromocoesQuery,
  useGetAcaoQuery,
  useGetEsportesQuery,
  useGetLutaQuery,
  useGetRpgQuery,
  useGetSimulacaoQuery,
  useGetJogoQuery
} = api

//aqui estamos exportando toda a const api
export default api
