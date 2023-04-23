import {
  Container,
  FooterSection,
  Link,
  LinksList,
  SectionTitle
} from './styles'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <Container>
      <div className="container">
        <FooterSection>
          <SectionTitle>Categorias</SectionTitle>
          <LinksList>
            <li>
              <Link>RPG</Link>
            </li>
            <li>
              <Link>Ação</Link>
            </li>
            <li>
              <Link>Aventura</Link>
            </li>
            <li>
              <Link>Esportes</Link>
            </li>
            <li>
              <Link>Simulação</Link>
            </li>
            <li>
              <Link>Estrategia</Link>
            </li>
            <li>
              <Link>FPS</Link>
            </li>
          </LinksList>
        </FooterSection>
        <FooterSection>
          <SectionTitle>Acesso rápido</SectionTitle>
          <LinksList>
            <li>
              <Link>Novidades</Link>
            </li>
            <li>
              <Link>Promoções</Link>
            </li>
            <li>
              <Link>Em Breve</Link>
            </li>
          </LinksList>
        </FooterSection>
        <p>{currentYear} - &copy; E-PLAY Todos os direitos reservados</p>
      </div>
    </Container>
  )
}

export default Footer
