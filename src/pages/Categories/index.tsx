import ProductsList from '../../components/ProductsList'

import Game from '../../models/Game'

import resident from '../../assets/images/resident.png'
import diablo from '../../assets/images/diablo.png'
import zelda from '../../assets/images/zelda.png'
import startWars from '../../assets/images/star_wars.png'

//Criamos estas duas consts de array para renderizar os jogos na tela, neste caso são array do tipo class Game[] que criamos na pasta models.
const promocoes: Game[] = [
  {
    id: 1,
    category: 'Ação',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Resident Evil 4',
    system: 'windows',
    infos: ['10%', 'R$ 250,00'],
    image: resident
  },
  {
    id: 2,
    category: 'Ação',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Resident Evil 4',
    system: 'PS5',
    infos: ['5%', 'R$ 290,00'],
    image: diablo
  },
  {
    id: 3,
    category: 'Ação',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Resident Evil 4',
    system: 'windows',
    infos: ['10%', 'R$ 250,00'],
    image: zelda
  },
  {
    id: 4,
    category: 'Ação',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Resident Evil 4',
    system: 'windows',
    infos: ['10%', 'R$ 250,00'],
    image: startWars
  }
]

const emBreve: Game[] = [
  {
    id: 5,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Diablo 4',
    system: 'windows',
    infos: ['17/05'],
    image: diablo
  },
  {
    id: 6,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Diablo 4',
    system: 'windows',
    infos: ['17/05'],
    image: diablo
  },
  {
    id: 7,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Diablo 4',
    system: 'windows',
    infos: ['17/05'],
    image: diablo
  },
  {
    id: 8,
    category: 'RPG',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quam voluptatibus culpa obcaecati mollitia explicabo esse quidem quibusdam exercitationem voluptas ipsam sit eligendi numquam facere dolorum, aut soluta aspernatur a.',
    title: 'Diablo 4',
    system: 'windows',
    infos: ['17/05'],
    image: diablo
  }
]

const Categories = () => {
  return (
    <>
      <ProductsList gamesArray={promocoes} title={'RPG'} background={'gray'} />
      <ProductsList gamesArray={emBreve} title={'Ação'} background={'black'} />
      <ProductsList
        gamesArray={promocoes}
        title={'Aventura'}
        background={'gray'}
      />
      <ProductsList gamesArray={emBreve} title={'FPS'} background={'black'} />
    </>
  )
}

export default Categories
