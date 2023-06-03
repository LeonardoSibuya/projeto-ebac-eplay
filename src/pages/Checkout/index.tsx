import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

//Aqui estamos importando tudo o yup como Yup, para utilizarmos como Yup.OqueQueremos
//Yup é utilizado para realizar validações em formularios
import * as Yup from 'yup'

import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { clearCart } from '../../store/reducers/cart'

import Button from '../../components/Button'
import Card from '../../components/Card'

import * as S from './styles'

import barCode from '../../assets/images/boleto.png'
import creditCard from '../../assets/images/cartao.png'

import { getTotalPrice, parseToBrl } from '../../utils'

type ParcelasType = {
  quantidade: number //quantidade de parcelas, que vai de 1 a 6
  valor: number //valor total dos jogos
  valorFormatado: string //valor dos jogos dividido pela parcela
}

//Aqui estamos criando a page de checkout de pagamento, recebendo o component de Card, e por este arquivo de checkout que estamos definindo os elementos children do component de Card, e estilizando diretamente nesta Page, ou seja, podemos criar um arquivo styles.ts tambem nas pages, como se fosse um container de conteudo.
const Checkout = () => {
  const dispatch = useDispatch()

  const [payWithCard, setPayWithCard] = useState(false)

  //aqui usamos o usePurchaseMutation, criado na parte de services da API, para fazer o post, o envio dos dados da compra para o servidor
  //purchase é o método de post que criamos na parte de services da api, é a ação que iremos fazer, o POST.
  //isLoading, isError, data é o objeto que estamos fazendo a requisição da API de checkout, onde o ISLOADING, ISERROR e ISSUCCESS retornam um booleano para manipularmos, e o DATA retorna o item em si, o objeto que estamos fazendo o post
  const [purchase, { isLoading, isSuccess, data }] = usePurchaseMutation()

  //aqui estamos desestruturando o estado do carrinho la do reducer, e usando os items do carrinho
  const { items } = useSelector((state: RootReducer) => state.cart)

  //aqui criamos a cont que será responsável por definir as parcelas no momento de compra com cartão de crédito, e será um ARRAY inicialmente vazio do ARRAY do TYPE ParcelasType
  const [parcelas, setParcelas] = useState<ParcelasType[]>([])

  //Const criada para armazenar a função que criamos que recebe e soma os valores de todos os jogos do carrinho
  const valorTotal = getTotalPrice(items)

  //é usado para gerenciar os valores e logicas do formulario, para não ter que criar um useState para cada campo do formulario
  const formDoFomik = useFormik({
    //aqui é onde será o valor inicial dos inputs, onde passamos o id do input e o valor inicial.
    initialValues: {
      fullname: '',
      email: '',
      cpf: '',
      deliveryEmail: '',
      confirmeDeliveryEmail: '',
      cardOwner: '',
      cpfCardOwner: '',
      cardDisplayName: '',
      cardNumber: '',
      expiresMonth: '',
      expiresYear: '',
      cardCode: '',
      installments: 1
    },
    //Aqui é onde utilizamos o Yup para manipular os inputs, por exemplo passar a mensagem quando o usuario preenche o input vazio ou com menos caracteres que queremos
    validationSchema: Yup.object({
      //////////////////////////////////////////////////////    CAMPO DE DADOS       //////////////////////////////////////////////////////
      fullname: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      cpf: Yup.string()
        .min(14, 'O campo precisa ter 14 caracteres')
        .max(14, 'O campo precisa ter 14 caracteres')
        .required('O campo é obrigatório'),
      deliveryEmail: Yup.string()
        .email('E-mail inválido')
        .required('O campo é obrigatório'),
      confirmeDeliveryEmail: Yup.string()
        //Fazemos desta forma para solicitar que o usuario coloque o valor do campo sendo o mesmo de outro campo, neste caso o input confirmeDeliveryEmail, tem que ter o mesmo valor do input deliveryEmail.
        .oneOf([Yup.ref('deliveryEmail')], 'Os e-mails são diferentes')
        .required('O campo é obrigatório'),

      //////////////////////////////////////////////////////    CAMPO DE PAGAMENTO       //////////////////////////////////////////////////////
      //Aqui validamos diferente, pois só exigimos o preenchimento destes campos, caso o payWithCard seja true, então fazemos o ternario, que se for true, o schema que é a validação é required, se não, não é obrigatorio
      cardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cpfCardOwner: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardDisplayName: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardNumber: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresMonth: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      expiresYear: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      cardCode: Yup.string().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      ),
      installments: Yup.number().when((values, schema) =>
        payWithCard ? schema.required('O campo é obrigatório') : schema
      )
    }),
    //função quando o formulario for submetido, vai receber os valores atraves do metodo post que criamos na pagina de services da api.
    //passamos o argumento  values para percorrer o purchase, e o purchase é responsável pela ação/função de receber os valores dos inputs e fazer o post, de acordo com a api: 'https://fake-api-tau.vercel.app/api/eplay/checkout'
    onSubmit: (values) => {
      purchase({
        billing: {
          document: values.cpf,
          email: values.email,
          name: values.fullname
        },
        delivery: {
          email: values.deliveryEmail
        },
        payment: {
          installments: values.installments,
          card: {
            active: payWithCard, //Como o active é boolean, o retorno dele ser true ou false vai depender do useState payWithCard que criamos
            code: Number(values.cardCode),
            name: values.cardDisplayName,
            number: values.cardNumber,
            owner: {
              name: values.cardOwner,
              document: values.cpfCardOwner
            },
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        },
        //Aqui como o products é um array qye recebe o id e o price de acordo com a api que fazemos o get e o post, fazemos um map do items do reducer de cart, e passamos o parametro item para percorer e passar o id e o price. Passamos o as number para que não retorne undifined
        products: items.map((item) => ({
          id: item.id,
          price: item.prices.current as number
        }))
      })
    }
  })

  //aqui criamos a function que será responsável por informar o usuario sobre algum erro no input, seja por estar vazio, ou incompleto
  const checkInputHasError = (nomeDoCampo: string) => {
    //criamos a const 'estaAlterado' para verificar se o input dentro do formik foi alterado, por exemplo, se o input fullname dentro do formDoFomik teve seu value alterado
    const estaAlterado = nomeDoCampo in formDoFomik.touched

    //criamos a const 'estaInvalido' para verificar se o input dentro do formik está com erro, por exemplo, se o input fullname dentro do formDoFomik está vazio, ou incompleto
    const estaInvalido = nomeDoCampo in formDoFomik.errors

    //aqui verificamos se as consts acima forem true, retornarmos esta const temErro
    const temErro = estaAlterado && estaInvalido

    return temErro
  }

  useEffect(() => {
    const calculaParcelas = () => {
      const parcelasArray: ParcelasType[] = []

      for (let parcela = 1; parcela <= 6; parcela++) {
        parcelasArray.push({
          quantidade: parcela,
          valor: valorTotal / parcela,
          valorFormatado: parseToBrl(valorTotal / parcela)
        })
      }

      return parcelasArray
    }

    if (valorTotal > 0) {
      setParcelas(calculaParcelas())
    }
  }, [valorTotal])

  //Criamos este useEffect para acompanhar o sucesso no POST da finalização da compra, para ai sim limpar o array do carrinho
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart())
    }
  }, [dispatch, isSuccess])

  //estamos usando o items do useSelector do carrinho, para verificar se não houver items no carrinho e o isSuccess for falso, ao usuario tentar finalizar a compra e vir para pagina do checkout, ele será redirecionado para a home
  if (items.length === 0 && !isSuccess) {
    return <Navigate to="/" /> //USAMOS O NAVIGATE COMO COMPONENTE DO REACT-ROUTER-DOM, PARA INFORMAR QUE SE NÃO HOUVER ITEMS NO CARRINHO, IREMOS REDIRECIONAR O USUARIO PARA HOME
  }

  //para utilizar o formik criado acima para manipulação de valores do formulario, passamos o name para o input que é o mesmo nome do id do input, a propriedade value, que passamos o formik.value.NomeCriado, e um onChange que recebe o formik.handleChange, e um onBlur que recebe formik.handleBlur
  //o form recebe o onSubimit do formik.handleSubmit
  return (
    <div className="container">
      {/* Aqui renderizamos a mensagem de sucesso na compra caso o isSuccess e o Data do POST da API seja true, e sabemos se é true ou não após o submit do formulario */}
      {isSuccess && data ? (
        <Card title="Muito obrigado">
          <>
            <p>
              É com satisfação que informamos que recebemos seu pedido com
              sucesso! <br /> Abaixo estão os detalhes da sua compra: <br />
              Número do pedido: {data.orderId} <br />
              Forma de pagamento:{' '}
              {payWithCard ? 'Cartão de crédito' : 'Boleto Bancário'}
            </p>
            <p className="margin-top">
              Caso tenha optado pelo pagamento via boleto bancário, lembre-se de
              que a confirmação pode levar até 3 dias úteis. Após a aprovação do
              pagamento, enviaremos um e-mail contendo o código de ativação do
              jogo.
            </p>
            <p className="margin-top">
              Se você optou pelo pagamento com cartão de crédito, a liberação do
              código de ativação ocorrerá após a aprovação da transação pela
              operadora do cartão. Você receberá o código no e-mail cadastrado
              em nossa loja.
            </p>
            <p className="margin-top">
              Pedimos que verifique sua caixa de entrada e a pasta de spam para
              garantir que receba nossa comunicação. Caso tenha alguma dúvida ou
              necessite de mais informações, por favor, entre em contato conosco
              através dos nossos canais de atendimento ao cliente.
            </p>
            <p className="margin-top">
              Agradecemos por escolher a EPLAY e esperamos que desfrute do seu
              jogo!
            </p>
          </>
        </Card>
      ) : (
        <form onSubmit={formDoFomik.handleSubmit}>
          <Card title="Dados de cobrança">
            <>
              <S.Row>
                <S.InputGroup>
                  <label htmlFor="fullname">Nome completo</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formDoFomik.values.fullname}
                    onChange={formDoFomik.handleChange}
                    onBlur={formDoFomik.handleBlur}
                    //Aqui estamos passando a função checkInputHasError que verifica se o input tem erro, recebendo entr () o name do campo e se for true, receberá a classe error do styles
                    className={checkInputHasError('fullname') ? 'error' : ''}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formDoFomik.values.email}
                    onChange={formDoFomik.handleChange}
                    onBlur={formDoFomik.handleBlur}
                    className={checkInputHasError('email') ? 'error' : ''}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="cpf">CPF</label>
                  <InputMask
                    mask="999.999.999-99"
                    type="text"
                    id="cpf"
                    name="cpf"
                    value={formDoFomik.values.cpf}
                    onChange={formDoFomik.handleChange}
                    onBlur={formDoFomik.handleBlur}
                    className={checkInputHasError('cpf') ? 'error' : ''}
                  />
                </S.InputGroup>
              </S.Row>
              <h3 className="margin-top">
                Dados de entrega - conteúdo digital
              </h3>
              <S.Row>
                <S.InputGroup>
                  <label htmlFor="deliveryEmail">E-mail</label>
                  <input
                    type="email"
                    id="deliveryEmail"
                    name="deliveryEmail"
                    value={formDoFomik.values.deliveryEmail}
                    onChange={formDoFomik.handleChange}
                    onBlur={formDoFomik.handleBlur}
                    className={
                      checkInputHasError('deliveryEmail') ? 'error' : ''
                    }
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <label htmlFor="confirmeDeliveryEmail">
                    Confirme o e-mail
                  </label>
                  <input
                    type="email"
                    id="confirmeDeliveryEmail"
                    name="confirmeDeliveryEmail"
                    value={formDoFomik.values.confirmeDeliveryEmail}
                    onChange={formDoFomik.handleChange}
                    onBlur={formDoFomik.handleBlur}
                    className={
                      checkInputHasError('confirmeDeliveryEmail') ? 'error' : ''
                    }
                  />
                </S.InputGroup>
              </S.Row>
            </>
          </Card>
          <Card title="pagamento">
            <>
              {/* Aqui usamos a tipagem criada no styles, que é um boolean, para ser true dependendo do estado do payWithCard, onde o botao do boleto estara com o type isActive quando o estado do payWithCard for false, e ao contrario com o botao do cartao de credito, desta forma alterando o background color */}
              <S.TabButton
                isActive={!payWithCard}
                onClick={() => setPayWithCard(false)}
                type="button"
              >
                <img src={barCode} alt="Boleto" />
                Boleto bancário
              </S.TabButton>
              <S.TabButton
                isActive={payWithCard}
                onClick={() => setPayWithCard(true)}
                type="button"
              >
                <img src={creditCard} alt="Cartão de crédito" />
                Cartão de crédito
              </S.TabButton>
              <div className="margin-top">
                {payWithCard ? (
                  <>
                    <S.Row>
                      <S.InputGroup>
                        <label htmlFor="cardOwner">
                          Nome do titular do cartão
                        </label>
                        <input
                          type="text"
                          id="cardOwner"
                          name="cardOwner"
                          value={formDoFomik.values.cardOwner}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('cardOwner') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>
                      <S.InputGroup>
                        <label htmlFor="cpfCardOwner">
                          CPF do titular do cartão
                        </label>
                        <InputMask
                          mask="999.999.999-99"
                          type="text"
                          id="cpfCardOwner"
                          name="cpfCardOwner"
                          value={formDoFomik.values.cpfCardOwner}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('cpfCardOwner') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>
                    </S.Row>

                    {/* marginTop É um type que criamos no arquivo styles, para poder ajusatar o marginTop de cada tag na propria tag */}
                    <S.Row marginTop="24px">
                      <S.InputGroup>
                        <label htmlFor="cardDisplayName">Nome no cartão</label>
                        <input
                          type="text"
                          id="cardDisplayName"
                          name="cardDisplayName"
                          value={formDoFomik.values.cardDisplayName}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('cardDisplayName') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>
                      <S.InputGroup>
                        <label htmlFor="cardNumber">Número do cartão</label>
                        <InputMask
                          mask="9999 9999 9999 9999"
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formDoFomik.values.cardNumber}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('cardNumber') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>

                      {/* maxWidth É um type que criamos no arquivo styles, para poder ajusatar o width de cada tag na propria tag */}
                      <S.InputGroup maxWidth="123px">
                        <label htmlFor="expiresMonth">Mês de vencimento</label>
                        <InputMask
                          mask="99"
                          type="text"
                          id="expiresMonth"
                          name="expiresMonth"
                          value={formDoFomik.values.expiresMonth}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('expiresMonth') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>
                      <S.InputGroup maxWidth="123px">
                        <label htmlFor="expiresYear">Ano de vencimento</label>
                        <InputMask
                          mask="99"
                          type="text"
                          id="expiresYear"
                          name="expiresYear"
                          value={formDoFomik.values.expiresYear}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('expiresYear') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>
                      <S.InputGroup maxWidth="48px">
                        <label htmlFor="cardCode">CVV</label>
                        <InputMask
                          mask="999"
                          type="text"
                          id="cardCode"
                          name="cardCode"
                          value={formDoFomik.values.cardCode}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('cardCode') ? 'error' : ''
                          }
                        />
                      </S.InputGroup>
                    </S.Row>
                    <S.Row marginTop="24px">
                      <S.InputGroup maxWidth="150px">
                        <label htmlFor="installments">Parcelamento</label>
                        <select
                          name="installments"
                          id="installments"
                          value={formDoFomik.values.installments}
                          onChange={formDoFomik.handleChange}
                          onBlur={formDoFomik.handleBlur}
                          className={
                            checkInputHasError('installments') ? 'error' : ''
                          }
                        >
                          {parcelas.map((parcela) => (
                            <option
                              value={parcela.quantidade}
                              key={parcela.quantidade}
                            >
                              {parcela.quantidade}x de {parcela.valorFormatado}
                            </option>
                          ))}
                        </select>
                      </S.InputGroup>
                    </S.Row>
                  </>
                ) : (
                  <p>
                    Ao optar por essa forma de pagamento, é importante lembrar
                    que a confirmação pode levar até 3 dias úteis, devido aos
                    prazos estabelecidos pelas instituições financeiras.
                    Portanto, a liberação do código de ativação do jogo
                    adquirido ocorrerá somente após a aprovação do pagamento do
                    boleto.
                  </p>
                )}
              </div>
            </>
          </Card>
          <Button
            type="submit"
            title="Clique aqui para finalizar a compra"
            onClick={formDoFomik.handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Finalizando compra...' : 'Finalizar compra'}
          </Button>
        </form>
      )}
    </div>
  )
}

export default Checkout
