import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { HeaderBar, LinkItem, Links, CartButton } from './styles'

import logo from '../../assets/images/logo.svg'
import carrinho from '../../assets/images/carrinho.svg'

import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store/index'

const Header = () => {
  //aqui estamos utilizando o dispatch, para poder utilizar o reducer OPEN que criamos no reducer de cart, que no caso o estado no OPEN faz o TYPE isOpen ser TRUE, ou seja a barra lateral estara aberta
  const dispatch = useDispatch()

  //aqui estamos utilizando o useSelector para pegar o TYPE items, criado no reducer de CART, ITEMS é um array de games, que começa vazio
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <HeaderBar>
      <div>
        <Link to="/">
          <img src={logo} alt="eplay" />
        </Link>
        <nav>
          <Links>
            <LinkItem>
              <Link to="categories">Categorias</Link>
            </LinkItem>
            <LinkItem>
              <a href="#">Novidades</a>
            </LinkItem>
            <LinkItem>
              <a href="#">Promoções</a>
            </LinkItem>
          </Links>
        </nav>
      </div>
      <CartButton onClick={openCart}>
        {items.length} - produto(s) <img src={carrinho} alt="carrinho" />
      </CartButton>
    </HeaderBar>
  )
}

export default Header
