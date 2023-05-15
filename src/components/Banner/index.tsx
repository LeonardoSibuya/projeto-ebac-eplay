import { useEffect, useState } from 'react'

import { Game } from '../../pages/Home'
import { Imagem, Titulo, Precos } from './styles'

import Tag from '../Tag'
import Button from '../Button'
import { formataPreco } from '../ProductsList'

import { useGetJogosDestaquesQuery } from '../../services/api' //aqui importamos a requisição que criamos com reduxToolkit, que faz a requisição dos jogos destaques

const Banner = () => {
  const { data: game, isLoading } = useGetJogosDestaquesQuery() //aqui extraimos dois argumentos, DATA: É o jogo em destaque que estamos extraindo da API, mas renomeamos como game | isLoading: É para saber se esta carregando, retorna um booleano

  //criamos este if, para informar que se não tiver renderizado o game, para não retornar null, irá retornar 'Carregando'
  if (!game) {
    return <h3>Carregando...</h3>
  }

  return (
    <Imagem style={{ backgroundImage: `url(${game?.media.cover})` }}>
      <div className="container">
        <Tag size="big">Destaque do dia</Tag>
        <div>
          <Titulo>{game?.name}</Titulo>
          <Precos>
            {/* usamos a função formataPreco para transformar o valor em real, de acordo com a função criada na pasta ProductList */}
            De <span>{formataPreco(game.prices.old)}</span> <br />
            por apenas {formataPreco(game.prices.current)}
          </Precos>
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
    </Imagem>
  )
}

export default Banner
