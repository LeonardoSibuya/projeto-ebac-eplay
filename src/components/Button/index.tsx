import { ButtonContainer, ButtonLink } from './styles'

//Aqui criei a tipagem para poder criar botões que serão realmente botões recebendo o onClick(), e outros serão links, recebendo o to:'/'
export type Props = {
  type: 'button' | 'link'
  title: string
  to?: string
  onClick?: () => void //Aqui informa que a tipagem permite receber uma função que não tem argumentos
  children: string
  variant: 'primary' | 'secundary'
}

const Button = ({
  type,
  children,
  title,
  onClick,
  to,
  variant = 'primary'
}: Props) => {
  if (type === 'button') {
    return (
      <ButtonContainer
        type="button"
        title={title}
        onClick={onClick}
        variant={variant}
      >
        {children}
      </ButtonContainer>
    )
  }

  return (
    <ButtonLink to={to as string} title={title}>
      {children}
    </ButtonLink>
  )
}

export default Button
