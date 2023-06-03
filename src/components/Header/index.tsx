import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import * as S from './styles'

import logo from '../../assets/images/logo.svg'
import cartIcon from '../../assets/images/carrinho.svg'

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

  const [navMobileIsOpen, setNavMobileIsOpen] = useState(false)

  return (
    <S.HeaderBar>
      <S.HeaderRow>
        <div>
          {/* Desta forma que fazemos o menu abrir e fechar, manipulamos o estado negando ele, ou seja, se for false, no onClick será true e assim por diante */}
          <S.Hamburguer onClick={() => setNavMobileIsOpen(!navMobileIsOpen)}>
            <span />
            <span />
            <span />
          </S.Hamburguer>
          <Link to="/">
            <h1>
              <img src={logo} alt="EPLAY" />
            </h1>
          </Link>
          <nav>
            <S.Links>
              <S.LinkItem>
                <Link
                  to="categories"
                  title="Clique aqui para acessar a página de categorias"
                >
                  Categorias
                </Link>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  to="/#coming-soon"
                  title="Clique aqui para acessar a seção de em breve"
                >
                  Em Breve
                </HashLink>
              </S.LinkItem>
              <S.LinkItem>
                <HashLink
                  to="/#on-sale"
                  title="Clique aqui para acessar a seção de promoções"
                >
                  Promoções
                </HashLink>
              </S.LinkItem>
            </S.Links>
          </nav>
        </div>
        {/* Role: Serve para informar o papel que aquele elemento esta sendo responsavel, por exemplo, o CartButton é um span mas faz o papel de um botão. Pratica importante para SEO */}
        <S.CartButton role="button" onClick={openCart}>
          {items.length} <span> - produto(s)</span>
          <img src={cartIcon} alt="carrinho" />
        </S.CartButton>
      </S.HeaderRow>
      <S.NavMobile className={navMobileIsOpen ? 'isOpen' : ''}>
        <S.Links>
          <S.LinkItem>
            <Link
              to="categories"
              title="Clique aqui para acessar a página de categorias"
              onClick={() => setNavMobileIsOpen(false)}
            >
              Categorias
            </Link>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              to="/#coming-soon"
              title="Clique aqui para acessar a seção de em breve"
              onClick={() => setNavMobileIsOpen(false)}
            >
              Em Breve
            </HashLink>
          </S.LinkItem>
          <S.LinkItem>
            <HashLink
              to="/#on-sale"
              title="Clique aqui para acessar a seção de promoções"
              onClick={() => setNavMobileIsOpen(false)}
            >
              Promoções
            </HashLink>
          </S.LinkItem>
        </S.Links>
      </S.NavMobile>
    </S.HeaderBar>
  )
}

export default Header
