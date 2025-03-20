import { useState } from 'react'
import './App.css'
import Menu from './components/Menu'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
function App() {
  const [count, setCount] = useState(0)

  const GAMES=  [

    {
      product: "The Legend of Zelda",
      description: "The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo, released for the Nintendo Switch and Wii U consoles on March 3, 2017.",
      price: "$59.99",
      image: "https://assets.nintendo.com/image/upload/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58"
    },
    {
      product: "Super Mario Odyssey",
      description: "Super Mario Odyssey is a platform game developed and published by Nintendo for the Nintendo Switch on October 27, 2017.",
      price: "$59.99",
      image: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5"
    },
    {
      product: "Mario Kart 8 Deluxe",
      description: "Mario Kart 8 Deluxe is a kart racing game developed and published by Nintendo for the Nintendo Switch. It is a port of the Wii U title Mario Kart 8.",
      price: "$59.99",
      image: "https://assets.nintendo.com/image/upload/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453"
    },
    {
      product: "Splatoon 2",
      description: "Splatoon 2 is a third-person shooter game developed and published by Nintendo for the Nintendo Switch, released on July 21, 2017.",
      price: "$59.99",
      image: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000529/b0b183a9860296016649fadb03b929411e7e5e0809af241e2e9652ebf0c5a715"
    },
    {
      product: "Animal Crossing: New Horizons",
      description: "Animal Crossing: New Horizons is a life simulation video game developed and published by Nintendo for the Nintendo Switch. It was released on March 20, 2020.",
      price: "$59.99",
      image: "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a"
    }
  ]


  return (
    <>
      <Header />
      <Menu games={GAMES} />
      <Footer />
    </>
  )
}

export default App
