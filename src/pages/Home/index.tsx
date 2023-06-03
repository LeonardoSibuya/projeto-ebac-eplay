import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'

import { useGetEmBreveQuery, useGetPromocoesQuery } from '../../services/api'

const Home = () => {
  const { data: emBreve, isLoading: isLoadingSale } = useGetEmBreveQuery()
  const { data: promocoes, isLoading: isLoadingSoon } = useGetPromocoesQuery()
  //Este isLoading é da propriedade que o data da API retorna, e renomeamos para isLoadingSale e isLoadingSoon para que seja o valor do type isLoading que criamos no productList, sendo o loader das paginas

  return (
    <>
      {/* Para renderizar os arrays criados acima, o ProductList recebe a tipagem gamesArray, definido no component ProductList, e como valor que teria que receber um array, recebeu pelas consts criadas acima, sendo promocoes e emBreve. */}
      <Banner />
      <ProductsList
        gamesArray={promocoes}
        title={'Promoções'}
        background={'gray'}
        id="on-sale"
        isLoading={isLoadingSale}
      />
      <ProductsList
        gamesArray={emBreve}
        title={'Em Breve'}
        background={'black'}
        id="coming-soon"
        isLoading={isLoadingSoon}
      />
    </>
  )
}

export default Home

//EXEMPLO DE CRIAÇÃO DE CLASSE
//Não iremos mais utilizar classe neste projeto, pois não iremos criar novas instancias da classe, novos cadastros de jogos e afins, então iremos usar a tipagem para manipular a api do backend, ao inves de classes.

// class Game {
//   title: string
//   category: string
//   system: string
//   description: string
//   infos: string[]
//   image: string
//   id: number

//   constructor(
//     id: number,
//     category: string,
//     description: string,
//     image: string,
//     infos: string[],
//     system: string,
//     title: string
//   ) {
//     //O THIS representa o class criado la em cima, nesse caso a class Game, e o que vem depois do = representa o constructor acima.
//     this.id = id
//     this.category = category
//     this.description = description
//     this.image = image
//     this.infos = infos
//     this.system = system
//     this.title = title
//   }
// }

// export default Game

//AQUI É COMO FAZEMOS O USO DE API'S VIA USEEFFECT, SEM SER PELO REDUX:

//Estamos informando que o promocoes e emBreve são useState de Game array, criado acima, e tem o estado inicial sendo um array vazio
// const [promocoes, setPromocoes] = useState<Game[]>([])
// const [emBreve, setEmBreve] = useState<Game[]>([])

//aqui criamos o useEffect que irá executar de inicio, e será responsável por recuperar os dados da api
// useEffect(() => {
//   fetch('https://fake-api-tau.vercel.app/api/eplay/promocoes')
//     .then((res) => res.json())
//     .then((res) => setPromocoes(res))

//   fetch('https://fake-api-tau.vercel.app/api/eplay/em-breve')
//     .then((res) => res.json())
//     .then((res) => setEmBreve(res))
// }, [])
