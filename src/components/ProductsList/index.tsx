import { Container, List, Title } from './styles'

import Product from '../Product'

export type Props = {
  title: string
  background: 'gray' | 'black'
}

const ProductsList = ({ background, title }: Props) => {
  return (
    <Container background={background}>
      <div className="container">
        <Title>{title}</Title>
        <List>
          {/* O product está sendo renderizado do componente criado Product, que tem essas propriedades definidas anteriormente, e preenchida seus valores neste arquivo */}
          <Product
            title={'Nome do jogo'}
            category={'Ação'}
            system={'Windows'}
            description={'teste'}
            infos={['-10%', 'R$ 150']}
            image={'//placehold.it//222x250'}
          />
          <Product
            title={'Nome do jogo'}
            category={'Ação'}
            system={'Windows'}
            description={'teste'}
            infos={['-10%', 'R$ 150']}
            image={'//placehold.it//222x250'}
          />
          <Product
            title={'Nome do jogo'}
            category={'Ação'}
            system={'Windows'}
            description={'teste'}
            infos={['-10%', 'R$ 150']}
            image={'//placehold.it//222x250'}
          />
          <Product
            title={'Nome do jogo'}
            category={'Ação'}
            system={'Windows'}
            description={'teste'}
            infos={['-10%', 'R$ 150']}
            image={'//placehold.it//222x250'}
          />
        </List>
      </div>
    </Container>
  )
}

export default ProductsList
