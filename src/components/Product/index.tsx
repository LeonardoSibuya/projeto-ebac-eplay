import { Card, Titulo, Descricao, Infos } from './styles'

import Tag from '../Tag'

type Props = {
  title: string
  category: string
  system: string
  description: string
  infos: string[] //infos é um array de string, pois receberá mais de uma tag
  image: string
  id: number
}

//Criei o type acima para poder preencher como conteudo dentro dos elementos que irão compor o Card do jogo, e o valor destas propriedades tipadas serão passadas no arquivo ProductsList

const Product = ({
  category,
  description,
  image,
  infos,
  system,
  title,
  id
}: Props) => {
  //aqui é uma função para delimitar o tamanho da descricao do jogo, onde se passar de 95 caracteres, iremos cortar depois do 92 e acrescenter ..., se não, irá retornar a descrição completa, caso não seja maior que 95
  const getDescricao = (descricao: string) => {
    if (descricao.length > 95) {
      return descricao.slice(0, 92) + '...'
    }
    return descricao
  }

  return (
    <Card to={`/product/${id}`}>
      <img src={image} alt={title} />
      <Infos>
        {infos.map((i) => (
          <Tag key={i}>{i}</Tag>
        ))}
      </Infos>
      <Titulo>{title}</Titulo>
      <Tag>{category}</Tag>
      <Tag>{system}</Tag>
      <Descricao>{getDescricao(description)}</Descricao>
    </Card>
  )
}

export default Product
