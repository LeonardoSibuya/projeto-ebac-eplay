//Neste arquivo criamos as interfaces e tipagem que iremos compartilhar em diversos arquivos durante o projeto, e ao inves de utilizarmos o export, vamos utilizar o declare, ou seja, estamos declarando a tipagem

//Utilizando o declare, não precisamos importar estes types em nenhum arquivo, pois o vscode já encontrará este arquivo automaticamente

//Interface faz o papel da tipagem com type, mas para poder ser reaproveitado em outra tipagem/interface
declare interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

declare type Game = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    languages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}
