import ProductsList from '../../components/ProductsList'

import {
  useGetAcaoQuery,
  useGetLutaQuery,
  useGetEsportesQuery,
  useGetRpgQuery,
  useGetSimulacaoQuery
} from '../../services/api'

const Categories = () => {
  const { data: gamesAcao, isLoading: isLoadingAction } = useGetAcaoQuery()
  const { data: gamesLuta, isLoading: isLoadingFight } = useGetLutaQuery()
  const { data: gamesEsportes, isLoading: isLoadingSports } =
    useGetEsportesQuery()
  const { data: gamesRpg, isLoading: isLoadingRpg } = useGetRpgQuery()
  const { data: gamesSimulacao, isLoading: isLoadingSimulator } =
    useGetSimulacaoQuery()

  return (
    <>
      <ProductsList
        gamesArray={gamesAcao}
        title="Ação"
        background="black"
        id="action"
        isLoading={isLoadingAction}
      />
      <ProductsList
        gamesArray={gamesEsportes}
        title="Esportes"
        background="gray"
        id="sports"
        isLoading={isLoadingFight}
      />
      <ProductsList
        gamesArray={gamesSimulacao}
        title="Simulação"
        background="black"
        id="simulation"
        isLoading={isLoadingSports}
      />
      <ProductsList
        gamesArray={gamesLuta}
        title="Luta"
        background="gray"
        id="fight"
        isLoading={isLoadingRpg}
      />
      <ProductsList
        gamesArray={gamesRpg}
        title="Rpg"
        background="black"
        id="rpg"
        isLoading={isLoadingSimulator}
      />
    </>
  )
}

export default Categories
