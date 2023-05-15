import { useState } from 'react'

import Section from '../Section'
import { GalleryItem } from '../../pages/Home'

import { Item, ItemsList, Action, Modal, ModalContent } from './styles'

import play from '../../assets/images/play.png'
import zoom from '../../assets/images/zoom.png'
import fechar from '../../assets/images/fechar.png'

//Aqui estamos extendendo/reaproveitando as propriedades da tipagem GalleryItem e acrescentando o estaVisivel: boolean
interface ModalState extends GalleryItem {
  estaVisivel: boolean
}

type Props = {
  //Type apenas para dinamizar o alt das imagens
  defaultCover: string
  name: string
  items: GalleryItem[]
}

const Gallery = ({ defaultCover, name, items }: Props) => {
  //Criamos este useState que recebe a tipagem/interface modalState criada acima, que podemos passar os estados iniciais de acordo com as propriedades do type/interface.
  //Irá fazer o mesmo papel de se tivermos criado outros useStates:
  //const [modalEstaAberto, setModalEstaAberto] = useState(false) - Para abrir e fechar o modal(IMAGEM)
  //const [modalUrl, setModalUrl] = useState('') - Para setar a url/imagem que irá abrir/renderizar
  const [modal, setModal] = useState<ModalState>({
    estaVisivel: false,
    type: 'image',
    url: 'url'
  })

  //Para definir se for imagem, irá renderizar a imagem da url, mas se não for imagem, e for video, irá renderizar uma imagem padrão
  const getMediaCover = (item: GalleryItem) => {
    if (item.type === 'image') return item.url
    return defaultCover
  }

  //Para definir o icone que será renderizado com o hover da imagem da capa, e se for uma imagem irá renderizar o icone de zoom, se não e for video irá renderizar o icone de play
  const getMediaIcon = (item: GalleryItem) => {
    if (item.type === 'image') return zoom
    return play
  }

  //função para fechar o modal, seja clicando no X, quanto clicando no overlay fora da imagem/video
  const closeModal = () => {
    setModal({
      estaVisivel: false,
      type: 'image',
      url: ''
    })
  }

  return (
    <>
      <Section title={'Galeria'} background={'black'}>
        <ItemsList>
          {/* aqui fazemos o map da const de array de objetos mock que criamos acima, e recuperamos a mídia e o index dos itens */}
          {items.map((media, index) => (
            <Item
              key={media.url}
              onClick={() => {
                setModal({
                  estaVisivel: true,
                  type: media.type,
                  url: media.url
                })
              }}
            >
              <img
                src={getMediaCover(media)}
                alt={`media ${index + 1} de ${name}`}
              />
              <Action>
                <img
                  src={getMediaIcon(media)}
                  alt="clique para maximizar a mídia"
                />
              </Action>
            </Item>
          ))}
        </ItemsList>
      </Section>

      {/* Modal é para ao clicar na imagem ela expandir na tela toda, e neste caso o Modal é o container geral da imagem, e recebe um useState para definir se o modal está visivel ou não, atráves da classe 'visivel' */}
      <Modal className={modal.estaVisivel ? 'visivel' : ''}>
        {/* ModalContent é o container do conteudo, seja da imagem que será aberta, e do header como nome do jogo e o botão de fechar a imagem */}
        <ModalContent className="container">
          <header>
            <h4>{name}</h4>
            <img
              src={fechar}
              alt="icone de fechar"
              // aqui estamos informando que ao clicar, mudamos o estado do modal atraves do setModal, paar fechar a imagem
              onClick={closeModal}
            />
          </header>
          {/* Assim fazemos o ternario/if e else, que se o type do modal for image, irá renderizar o modal.url no img, se não, irá renderizar um iframe para o video */}
          {modal.type === 'image' ? (
            <img src={modal.url} alt="" />
          ) : (
            <iframe src={modal.url} frameBorder={0}></iframe>
          )}
        </ModalContent>

        {/* Criamos esta div de overlay para escurecer o conteudo do site atras da imagem aberta */}
        <div className="overlay" onClick={closeModal}></div>
      </Modal>
    </>
  )
}

export default Gallery
