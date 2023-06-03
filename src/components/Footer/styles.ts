import styled from 'styled-components'
import { colors } from '../../styles'
import { HashLink } from 'react-router-hash-link' //PACOTE QUE BAIXAMOS PARA QUE POSSAMOS USAR # NOS LINKS JUNTO DO TO="" PARA NAVEGAÇÃO DE PAGINAS JUNTO DE ID

export const Container = styled.footer`
  background-color: ${colors.gray};
  padding: 32px 0;
  font-size: 14px;
  margin-top: 40px;
`
export const SectionTitle = styled.h4`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
`
export const LinksList = styled.ul`
  display: flex;
  margin-top: 16px;
`

export const Link = styled(HashLink)`
  color: ${colors.lightgray};
  text-decoration: none;
  margin-right: 8px;
`
export const FooterSection = styled.div`
  margin-bottom: 64px;
`
