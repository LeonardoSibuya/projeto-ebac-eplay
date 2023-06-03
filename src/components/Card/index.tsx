import { Container } from './styles'

type Props = {
  children: JSX.Element
  title: string
}

// Aqui Criamos o componente dos cards de pagamento, onde estamos utilizando no pages de Checkout, e por lá definindo os elementos que vão no children deste card
const Card = ({ children, title }: Props) => {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  )
}

export default Card
