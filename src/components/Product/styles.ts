import { Link } from 'react-router-dom'

import styled from 'styled-components'
import { colors } from '../../styles'

import { TagContainer } from '../Tag/styles'

export const Card = styled(Link)`
  background-color: ${colors.gray};
  border-radius: 8px;
  padding: 8px;
  position: relative;
  text-decoration: none;
  color: ${colors.white};
  display: block;
  max-height: 100%;
  height: 100%;

  ${TagContainer} {
    margin-right: 8px;
  }

  img {
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`
export const Title = styled.h3`
  font-weight: bold;
  font-size: 16px;
  display: block;
  margin: 16px 0 8px;
`
export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-top: 16px;
`
export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
