import * as S from './styles'

//Aqui criei a tipagem para poder criar botões que serão realmente botões recebendo o onClick(), e outros serão links, recebendo o to:'/'
export type Props = {
  type: 'button' | 'link' | 'submit'
  title: string
  to?: string
  onClick?: () => void //Aqui informa que a tipagem permite receber uma função que não tem argumentos
  children: string
  variant?: 'primary' | 'secundary'
  disabled?: boolean //booleano para podermos manipular se o botão está desabilitado após clicar em concluir a compra
}

const Button = ({
  type,
  children,
  title,
  onClick,
  to,
  variant = 'primary',
  disabled
}: Props) => {
  if (type === 'button' || type === 'submit') {
    return (
      <S.ButtonContainer
        type={type}
        title={title}
        onClick={onClick}
        variant={variant}
        disabled={disabled}
      >
        {children}
      </S.ButtonContainer>
    )
  }

  return (
    <S.ButtonLink to={to as string} title={title}>
      {children}
    </S.ButtonLink>
  )
}

export default Button
