import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Game } from '../Home'

import Hero from '../../components/Hero'
import Section from '../../components/Section'
import Gallery from '../../components/Gallery'

import { useGetJogoQuery } from '../../services/api'

const Product = () => {
  const { id } = useParams() // Retorna um objeto

  const { data: game } = useGetJogoQuery(id!) //colocamos ! depois do ID para informar que é um valor OBRIGATÓRIO, para não retornar undefined

  if (!game) {
    return <h3>Carregando...</h3>
  }

  return (
    <>
      <Hero jogo={game} />
      <Section title={'Sobre o jogo'} background={'black'}>
        <p>{game.description}</p>
      </Section>

      <Section title={'Sobre o jogo'} background={'gray'}>
        <p>
          <b>Plataforma</b>: {game.details.system} <br />
          <b>Desenvolvedor</b>: {game.details.developer} <br />
          <b>Editora</b>: {game.details.publisher} <br />
          <b>Idiomas</b>: O jogo oferece suporte a diversos idiomas, incluindo{' '}
          {game.details.languages.join(', ')}
          {/* Usamos  .join(', ') para informar o separador na hora de renderizar os itens do array, neste caso renderizar as linguagens do jogo separadas por virgula e espaço*/}
        </p>
      </Section>
      <Gallery
        name={game.name}
        defaultCover={game.media.cover}
        items={game.media.gallery}
      />
    </>
  )
}

export default Product
