import * as S from './styles'

import Product from '../Product'

import { parseToBrl } from '../../utils'
import Loader from '../Loader'

export type Props = {
  title: string
  background: 'gray' | 'black'
  gamesArray?: Game[] //aqui criamos um novo tipo que recebe o type que criamos na home, onde manipula a api
  id?: string
  isLoading: boolean
}

const ProductsList = ({
  background,
  title,
  gamesArray,
  id,
  isLoading
}: Props) => {
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
      //aqui estamos informando que se o jogo for referente a prices.current (preço do jogo) iremos efetuar um push no array de tags, para a tag renderizar o valor do jogo formatado em real usando a função: parseToBrl
      tags.push(parseToBrl(jogo.prices.current))
    }

    return tags
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <S.Container background={background} id={id}>
      <div className="container">
        <S.Title>{title}</S.Title>
        <S.List>
          {/* Definimos que o gamesArray que é do tipo array de Game é opcional, pois pode ser undefined, sendo assim aqui a baixo fizemos uma condição, que se gamesArray existir, faz o gamesArray.map */}
          {gamesArray &&
            gamesArray.map((game) => (
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
        </S.List>
      </div>
    </S.Container>
  )
}

export default ProductsList
