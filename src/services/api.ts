//aqui é onde iremos armazenar as Api's que estamos consumindo no projeto

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//AQUI PRA BAIXO ESTAMOS CRIANDO A TIPAGEM PARA PODER MANIPULAR A API 'https://fake-api-tau.vercel.app/api/eplay/checkout'

//Aqui criamos o type products separado, pois é um array de objeto, então aqui criamos o objeto, e no type abaixo criamos o array deste objeto
type Product = {
  id: number
  price: number
}

type PurchasePayload = {
  products: Product[] //conforme escrito la em cima, aqui é o array do objeto criado acima
  billing: {
    name: string
    email: string
    document: string
  }
  delivery: {
    email: string
  }
  payment: {
    card: {
      active: boolean
      //AS PROPRIEDADES ABAIXO VAO SER OPCIONAIS, POIS DEPENDE DA PROPRIEDADE ACIMA active SER TRUE
      owner?: {
        name: string
        document: string
      }
      name?: string
      number?: string
      expires?: {
        month: number
        year: number
      }
      code?: number
    }
    installments: number
  }
}

//Aqui estamos tipando a resposta do servidor que recebemos após fazer o POST da compra do jogo para a API, que neste caso retorna um orderID do tipo string, desta forma podemos substituir o type any do: purchase: builder.mutation<any, PurchasePayload>
type PurchaseResponse = {
  orderId: string
}

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
    }),
    //AQUI ESTAMOS FAZENDO UM POST NA API, PARA ENVIAR DADOS PARA O SERVIDOR E NÃO BAIXAR OS DADOS, ENTÃO USAMOS O builder.mutation, OU SEJA, FAZENDO UMA MUTAÇÃO NOS DADOS E ENVIAR.
    //
    //O primeiro argumento dentro do <> é o resultado que a gente espera do servidor, mas neste caso como estamos realizando um post não sabemos, então usamos any, e o segundo argumento é o que iremos enviar para o servidor, que neste caso sabemos, de acordo com o type criado la em cima o type PurchasePayload que iremos enviar para o servidor
    purchase: builder.mutation<PurchaseResponse, PurchasePayload>({
      //aqui passamos o query recebendo um argumento que vai ser do type PurchasePayload
      query: (argumentoDoBody) => ({
        url: 'checkout', //temos que passar a url que é o complemento da url 'https://fake-api-tau.vercel.app/api/eplay' que neste caso recebe o /checkout
        method: 'POST', //Metodo post, que é usado para enviar dado ao servidor
        body: argumentoDoBody //Body que vai receber o argumento do type criado la em cima PurchasePayload
      })
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
  useGetJogoQuery,
  usePurchaseMutation
} = api

//aqui estamos exportando toda a const api
export default api
