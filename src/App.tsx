import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import { GlobalCss } from './styles'
import Home from './pages/Home'
import Footer from './components/Footer'

import Categories from './pages/Categories'
import Product from './pages/Product'

//ASSIM É UMA NOVA FORMA DE UTILIZAR O BrowserRouter PARA ROTAS DE PAGINAS, CRIAMOS COMO SE FOSSE UM COMPONENTE, UTILIZANDO Routes e Route.
const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/product/:id" element={<Product />} />
    {/* Passamos o /:id para informar o parametro que vamos passar para aquela pasta, neste caso o parametro vai ser o id dos produtos */}
  </Routes>
)

function App() {
  return (
    //PARA UTILIZAR A ROTAS CRIADA ACIMA, TEMOS QUE ENGLOBAR TODO O CONTEUDO PELO BrowserRouter, E COLOCAMOS A CONST Rotas, PARA RENDERIZAR AS PAGINAS.
    <BrowserRouter>
      <GlobalCss />
      <div className="container">
        <Header />
      </div>
      <Rotas />
      <Footer />
    </BrowserRouter>
  )
}

export default App
