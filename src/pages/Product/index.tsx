import { useParams } from 'react-router-dom'

import Hero from '../../components/Hero'
import Section from '../../components/Section'
import Gallery from '../../components/Gallery'
import Loader from '../../components/Loader'

import { useGetJogoQuery } from '../../services/api'

//Criamos este Type para informar que o id do useParams retorna obrigatoriamente uma string e não podendo ser undefined, e eviamos ter que usar o id! como artimanha de não deixar o id ser unidefined
type GameParams = {
  id: string
}

const Product = () => {
  const { id } = useParams() as GameParams // Retorna um objeto | Usamos o as GameParams para poder tipar o id com o type do GameParams

  const { data: game } = useGetJogoQuery(id) //colocamos ! depois do ID para informar que é um valor OBRIGATÓRIO, para não retornar undefined

  if (!game) {
    return <Loader />
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
