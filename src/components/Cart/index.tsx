import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../Button'

import { RootReducer } from '../../store/index'
import { close, remove } from '../../store/reducers/cart'

import * as S from './styles'

import Tag from '../Tag'
import { getTotalPrice, parseToBrl } from '../../utils'

const Cart = () => {
  //utilizamos o useSelector, para poder utilizar os TYPE que criamos na store, e o state é do tipo RootReducer que criamos na store.
  //o isOpen é um TYPE que criamos no reducer de Cart, que é um booleano, usado para abrir e fechar o carrinho
  //o TYPE items, criado no reducer de CART, ITEMS é um array de games, que começa vazio
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  //aqui estamos utilizando o dispatch, para poder utilizar o reducer CLOSE que criamos no reducer de cart, que no caso o estado no CLOSE faz o TYPE isOpen ser FALSE, ou seja a barra lateral estara Fechada
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const closeCart = () => {
    dispatch(close())
  }

  //aqui é a função de remover um item do carrinho, atraves da função criada no reducer de carrinho, e passamos o id do tipo number como parametro, pois a função criada precisa de um parametro para poder filtrar os itens do carrinho
  const removeItemCart = (id: number) => {
    dispatch(remove(id))
  }

  //função para manipular o click do botão de continuar com a compra, onde colocamos os jogos no carrinho, e clicando em continuar será redirecionado para pagina de checkout
  const goToChekout = () => {
    navigate('/checkout') //USAMOS O NAVIGATE() DO REACT-ROUTER-DOM PARA PODER REDIRECIONAR O USUARIO PARA PAGINA DO CHECKOUT AO CLICAR NO BOTÃO
    closeCart()
  }

  return (
    //Aqui no CartContainer estamos informando que caso o estado isOpen que é um booleano que criamos nos reducers, seja true, então adiciona a classe is-open, que criamos no style.ts, para o componente receber o display: flex
    <S.CartContainer className={isOpen ? 'is-open' : ''}>
      <S.Overlay onClick={closeCart} />
      <S.SideBar>
        {items.length > 0 ? (
          <>
            <ul>
              {items.map((jogo) => (
                <S.CartItem key={jogo.id}>
                  <img src={jogo.media.thumbnail} alt={jogo.name} />
                  <div>
                    <h3>{jogo.name}</h3>
                    <Tag>{jogo.details.category}</Tag>
                    <Tag>{jogo.details.system}</Tag>
                    <span>{parseToBrl(jogo.prices.current)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItemCart(jogo.id)}
                  />
                </S.CartItem>
              ))}
            </ul>
            <S.Quantity>{items.length} jogo(s) no carrinho</S.Quantity>
            <S.Prices>
              Total de R$ {parseToBrl(getTotalPrice(items))}
              <span>Em até 6x sem juros</span>
            </S.Prices>
            <Button
              title="clique aqui para continuar com a compra"
              type={'button'}
              variant={'primary'}
              onClick={goToChekout}
            >
              Continuar com a compra
            </Button>
          </>
        ) : (
          <p className="empty-text">
            O carrinho está vazio, adicione pelo menos um produto para continuar
            com a compra
          </p>
        )}
      </S.SideBar>
    </S.CartContainer>
  )
}

export default Cart
