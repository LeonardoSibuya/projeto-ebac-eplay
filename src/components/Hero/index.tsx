import { useDispatch } from 'react-redux'

import { Game } from '../../pages/Home'
import Button from '../Button'
import { formataPreco } from '../ProductsList'
import Tag from '../Tag'

import { Banner, Infos } from './styles'

import { add, open } from '../../store/reducers/cart'

type Props = {
  jogo: Game
}

const Hero = ({ jogo }: Props) => {
  const dispatch = useDispatch()

  //Aqui criamos a função de adicionar o jogo ao carrinho, neste caso atraves do dispatch, estamos utilizando a função add, que criamos no reducer da store, onde faz um push de um item para o array de Game, então neste caso precisamos também passar um argumento para função add, então passamos o 'jogo', criado na Props acima, onde já é do tipo Game.
  const AddToCart = () => {
    dispatch(add(jogo))
    dispatch(open()) //aqui estamos usando o dispatch da função open, para que ao clicar em adicionar o jogo no carrinho, também abra a barra lateral do carrinho
  }

  return (
    <Banner style={{ backgroundImage: `url(${jogo.media.cover})` }}>
      <div className="container">
        <div>
          <Tag>{jogo.details.category}</Tag>
          <Tag>{jogo.details.system}</Tag>
        </div>
        <Infos>
          <h2>{jogo.name}</h2>
          {/* Aqui pra baixo estamos usando uma condição, como se fosse um ternario/if para renderizar o preço, desconto e o botão de adicionar o carrinho, apenas se aquela condição for verdadeira */}
          <p>
            {jogo.prices.discount && (
              <span>De {formataPreco(jogo.prices.old)}</span>
            )}
            {jogo.prices.current && (
              <>Por {formataPreco(jogo.prices.current)}</>
            )}
          </p>
          {jogo.prices.current && (
            <Button
              type="button"
              title="Clique aqui para adicionar este jogo ao carrinho"
              variant="primary"
              onClick={AddToCart}
            >
              Adicionar ao carrinho
            </Button>
          )}
        </Infos>
      </div>
    </Banner>
  )
}

export default Hero
