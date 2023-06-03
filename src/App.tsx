import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import { GlobalCss } from './styles'
import Home from './pages/Home'
import Footer from './components/Footer'

import Categories from './pages/Categories'
import Product from './pages/Product'

import { store } from './store'
import Cart from './components/Cart'
import Checkout from './pages/Checkout'

//ASSIM É UMA NOVA FORMA DE UTILIZAR O BrowserRouter PARA ROTAS DE PAGINAS, CRIAMOS COMO SE FOSSE UM COMPONENTE, UTILIZANDO Routes e Route.
const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    {/* Passamos o /:id para informar o parametro que vamos passar para aquela pasta, neste caso o parametro vai ser o id dos produtos */}
    <Route path="/product/:id" element={<Product />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
)

function App() {
  return (
    //O PROVIDER ENCAPSULA TODO O CONTEUDO, PARA PODERMOS PASSAR A STORE DO REDUX
    <Provider store={store}>
      {/* //PARA UTILIZAR A ROTAS CRIADA ACIMA, TEMOS QUE ENGLOBAR TODO O CONTEUDO PELO BrowserRouter, E COLOCAMOS A CONST Rotas, PARA RENDERIZAR AS PAGINAS. */}
      <BrowserRouter>
        <GlobalCss />
        <div className="container">
          <Header />
        </div>
        <Rotas />
        <Footer />
        <Cart />
      </BrowserRouter>
    </Provider>
  )
}

export default App
