import { Container, List, Title } from './styles'

import Product from '../Product'

import { Game } from '../../pages/Home'

export type Props = {
  title: string
  background: 'gray' | 'black'
  gamesArray: Game[] //aqui criamos um novo tipo que recebe o type que criamos na home, onde manipula a api
}

//aqui criamos uma função para formatar o preço em real: R$ XX,XX
export const formataPreco = (preco = 0) => {
  //Usamos essa estrutura para informar que queremos formatar em Real, e o preco começando em 0
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const ProductsList = ({ background, title, gamesArray }: Props) => {
  //aqui é uma função criada para coletar as infos do game e renderizar na tag, sendo o valor da promoção do game, ou a data de lançamento futuro
  const getGameTags = (jogo: Game) => {
    const tags = []

    if (jogo.release_date) {
      //aqui estamos informando que se o jogo for referente a release_date (jogo que ainda não lançou) iremos efetuar um push no array de tags, para a tag renderizar uma data
      tags.push(jogo.release_date)
    }

    if (jogo.prices.discount) {
      //aqui estamos informando que se o jogo for referente a prices.discount (desconto no preço) iremos efetuar um push no array de tags, para a tag renderizar uma % de desconto
      tags.push(`${jogo.prices.discount}%`)
    }

    if (jogo.prices.current) {
      //aqui estamos informando que se o jogo for referente a prices.current (preço do jogo) iremos efetuar um push no array de tags, para a tag renderizar o valor do jogo formatado em real usando a função: formataPreco
      tags.push(formataPreco(jogo.prices.current))
    }

    return tags
  }

  return (
    <Container background={background}>
      <div className="container">
        <Title>{title}</Title>
        <List>
          {gamesArray.map((game) => (
            <li key={game.id}>
              <Product
                id={game.id}
                title={game.name}
                category={game.details.category}
                system={game.details.system}
                description={game.description}
                infos={getGameTags(game)}
                image={game.media.thumbnail}
              />
            </li>
          ))}
        </List>
      </div>
    </Container>
  )
}

export default ProductsList
