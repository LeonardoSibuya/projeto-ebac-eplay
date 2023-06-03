import * as S from './styles'

import Tag from '../Tag'
import Button from '../Button'
import Loader from '../Loader'

import { useGetJogosDestaquesQuery } from '../../services/api' //aqui importamos a requisição que criamos com reduxToolkit, que faz a requisição dos jogos destaques

import { parseToBrl } from '../../utils'

const Banner = () => {
  const { data: game } = useGetJogosDestaquesQuery() //aqui extraimos dois argumentos, DATA: É o jogo em destaque que estamos extraindo da API, mas renomeamos como game | isLoading: É para saber se esta carregando, retorna um booleano

  //criamos este if, para informar que se não tiver renderizado o game, para não retornar null, irá retornar 'Carregando'
  if (!game) {
    return <Loader />
  }

  return (
    <S.Image style={{ backgroundImage: `url(${game?.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do dia</Tag>
        <div>
          <S.Title>{game?.name}</S.Title>
          <S.Prices>
            {/* usamos a função parseToBrl para transformar o valor em real, de acordo com a função criada na pasta ProductList */}
            De <span>{parseToBrl(game.prices.old)}</span> <br />
            por apenas {parseToBrl(game.prices.current)}
          </S.Prices>
        </div>
        <Button
          type="link"
          to={`/product/${game.id}`}
          title="clique aqui para aproveitar esta oferta"
          variant={'secundary'}
        >
          Aproveitar
        </Button>
      </div>
    </S.Image>
  )
}

export default Banner
