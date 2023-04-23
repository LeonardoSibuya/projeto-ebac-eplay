import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import { GlobalCss } from './styles'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Footer from './components/Footer'

//ASSIM É UMA NOVA FORMA DE UTILIZAR O BrowserRouter PARA ROTAS DE PAGINAS, CRIAMOS COMO SE FOSSE UM COMPONENTE, UTILIZANDO Routes e Route.
const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/categories" element={<Categories />} />
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
