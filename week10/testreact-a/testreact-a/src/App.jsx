import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Movies from './pages/Movies'

function App() {

  return (
    <BrowserRouter>
      {/* The empty tag above is a React fragment (think of it as a virtual element). In this case, we're using it as the root element because we don't want to have an extra HTML element rendered as the root. Fragments do not compile to an HTML element. */}
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route path="/movies" element={<Movies />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
