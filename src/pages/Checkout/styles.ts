import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

//Criamos esta tipagem, para ajustar o tamanho de cada input direto na tag, pois cada input tem seu tamanho especifico
type InputGroupProps = {
  maxWidth?: string
}

//Criamos esta tipagem, para ajustar o margin-top de cada div ROW direto na tag, pois cada div tem seu margin-top especifico
type RowProps = {
  marginTop?: string
}

//Criamos a tipagem para definir o background color do button, quando ele estiver ativo ou não, por isso usamos um boolean
type TabButtonProps = {
  isActive: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: flex-end;
  column-gap: 24px;
  //o '0' irá informar que as tags que não estiver recebendo a valor marginTop, terá o margin-top 0
  margin-top: ${(props) => props.marginTop || '0'};

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`
export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;
  max-width: ${(props) => props.maxWidth || 'auto'};
  //o 'auto' irá informar que as tags que não estiver recebendo a valor maxWidth, terá o tamanho auto

  label {
    font-size: 14px;
    color: ${colors.white};
    margin-bottom: 8px;
    display: block;
  }

  input,
  select {
    background-color: ${colors.white};
    height: 32px;
    width: 100%;
    padding: 0 8px;
    border: 1px solid ${colors.white};

    &.error {
      border: 1px solid red;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 16px;
  }
`
export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  background-color: ${(props) =>
    props.isActive ? colors.green : colors.black};
  height: 32px;
  border: none;
  margin-right: 16px;
  padding: 0 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 8px;
    width: 100%;
  }
`
