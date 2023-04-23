import { Container, List, Title } from './styles'

import Product from '../Product'
import Game from '../../models/Game'

export type Props = {
  title: string
  background: 'gray' | 'black'
  gamesArray: Game[] //aqui criamos um novo tipo que recebe a class de Game que criamos na pasta models
}

const ProductsList = ({ background, title, gamesArray }: Props) => {
  return (
    <Container background={background}>
      <div className="container">
        <Title>{title}</Title>
        <List>
          {/* O product está sendo renderizado do componente criado Product através do tipo gamesArray que recebe a classe Game, criado na pasta models */}
          {gamesArray.map((game) => (
            <Product
              key={game.id}
              title={game.title}
              category={game.category}
              system={game.system}
              description={game.description}
              infos={game.infos}
              image={game.image}
            />
          ))}
        </List>
      </div>
    </Container>
  )
}

export default ProductsList
