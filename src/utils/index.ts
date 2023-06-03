//Usamos esta pasta para criar funções que serão re-utilizadas em outros arquivos, como conversão de moeda, mascara de cpf e assim vai.

//aqui criamos uma função para formatar o preço em real: R$ XX,XX
export const parseToBrl = (amount = 0) => {
  //Usamos essa estrutura para informar que queremos formatar em Real, e o preco começando em 0
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

//Função para somar os preços dos jogos no carrinho
export const getTotalPrice = (items: Game[]) => {
  //acumulador é o valor inicial que vai somando com o ValorAtual, que começa sendo 0
  return items.reduce((acumulador, valorAtual) => {
    if (valorAtual.prices.current) {
      return (acumulador += valorAtual.prices.current) //conseguimos acessar o .prices.current, pois a função esta partindo de um reduce de items, que tem essas propriedades, pois é do tipo GAME, então herda as propriedades de GAME
    }
    return 0
  }, 0) //este zero é o valor inicial do valorAtual
}
