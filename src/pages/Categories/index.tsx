import { useEffect, useState } from 'react'

import ProductsList from '../../components/ProductsList'

import { Game } from '../Home'

import {
  useGetAcaoQuery,
  useGetLutaQuery,
  useGetEsportesQuery,
  useGetRpgQuery,
  useGetSimulacaoQuery
} from '../../services/api'

const Categories = () => {
  const { data: gamesAcao } = useGetAcaoQuery()
  const { data: gamesLuta } = useGetLutaQuery()
  const { data: gamesEsportes } = useGetEsportesQuery()
  const { data: gamesRpg } = useGetRpgQuery()
  const { data: gamesSimulacao } = useGetSimulacaoQuery()

  if (gamesAcao && gamesLuta && gamesEsportes && gamesRpg && gamesSimulacao) {
    return (
      <>
        <ProductsList gamesArray={gamesAcao} title="Ação" background="black" />
        <ProductsList
          gamesArray={gamesEsportes}
          title="Esportes"
          background="gray"
        />
        <ProductsList
          gamesArray={gamesSimulacao}
          title="Simulação"
          background="black"
        />
        <ProductsList gamesArray={gamesLuta} title="Luta" background="gray" />
        <ProductsList gamesArray={gamesRpg} title="Rpg" background="black" />
      </>
    )
  }

  return <h4>carregando</h4>
}

export default Categories
