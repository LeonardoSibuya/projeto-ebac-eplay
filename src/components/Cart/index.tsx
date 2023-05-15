import { useDispatch, useSelector } from 'react-redux'

import { RootReducer } from '../../store/index'

import { close, remove } from '../../store/reducers/cart'

import Button from '../Button'

import {
  Overlay,
  CartContainer,
  SideBar,
  Prices,
  Quantity,
  CartItem
} from './styles'

import Tag from '../Tag'
import { formataPreco } from '../ProductsList'

const Cart = () => {
  //utilizamos o useSelector, para poder utilizar os TYPE que criamos na store, e o state é do tipo RootReducer que criamos na store.
  //o isOpen é um TYPE que criamos no reducer de Cart, que é um booleano, usado para abrir e fechar o carrinho
  //o TYPE items, criado no reducer de CART, ITEMS é um array de games, que começa vazio
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  //aqui estamos utilizando o dispatch, para poder utilizar o reducer CLOSE que criamos no reducer de cart, que no caso o estado no CLOSE faz o TYPE isOpen ser FALSE, ou seja a barra lateral estara Fechada
  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  //aqui é a função de remover um item do carrinho, atraves da função criada no reducer de carrinho, e passamos o id do tipo number como parametro, pois a função criada precisa de um parametro para poder filtrar os itens do carrinho
  const removeItemCart = (id: number) => {
    dispatch(remove(id))
  }

  //Função para somar os preços dos jogos no carrinho
  const getTotalPrice = () => {
    //acumulador é o valor inicial que vai somando com o ValorAtual, que começa sendo 0
    return items.reduce((acumulador, valorAtual) => {
      return (acumulador += valorAtual.prices.current!) //conseguimos acessar o .prices.current, pois a função esta partindo de um reduce de items, que tem essas propriedades, pois é do tipo GAME
    }, 0) //este zero é o valor inicial do valorAtual
  }

  return (
    //Aqui no CartContainer estamos informando que caso o estado isOpen que é um booleano que criamos nos reducers, seja true, então adiciona a classe is-open, que criamos no style.ts, para o componente receber o display: flex
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <SideBar>
        <ul>
          {items.map((jogo) => (
            <CartItem key={jogo.id}>
              <img src={jogo.media.thumbnail} alt={jogo.name} />
              <div>
                <h3>{jogo.name}</h3>
                <Tag>{jogo.details.category}</Tag>
                <Tag>{jogo.details.system}</Tag>
                <span>{formataPreco(jogo.prices.current)}</span>
              </div>
              <button type="button" onClick={() => removeItemCart(jogo.id)} />
            </CartItem>
          ))}
        </ul>
        <Quantity>{items.length} jogo(s) no carrinho</Quantity>
        <Prices>
          Total de R$ {formataPreco(getTotalPrice())}
          <span>Em até 6x sem juros</span>
        </Prices>
        <Button
          title="clique aqui para continuar com a compra"
          type={'button'}
          variant={'primary'}
        >
          Continuar com a compra
        </Button>
      </SideBar>
    </CartContainer>
  )
}

export default Cart
