import { Card, Titulo, Descricao, Infos } from './styles'

import Tag from '../Tag'

type Props = {
  title: string
  category: string
  system: string
  description: string
  infos: string[] //infos é um array de string, pois receberá mais de uma tag
  image: string
}

//Criei o type acima para poder preencher como conteudo dentro dos elementos que irão compor o Card do jogo, e o valor destas propriedades tipadas serão passadas no arquivo ProductsList

const Product = ({
  category,
  description,
  image,
  infos,
  system,
  title
}: Props) => {
  return (
    <Card>
      <img src={image} alt={title} />
      <Infos>
        {infos.map((i) => (
          <Tag key={i}>{i}</Tag>
        ))}
      </Infos>
      <Titulo>{title}</Titulo>
      <Tag>{category}</Tag>
      <Tag>{system}</Tag>
      <Descricao>{description}</Descricao>
    </Card>
  )
}

export default Product
