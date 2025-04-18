import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import PokemonInfiniteScroll from './pages/index'
import './App.css'
import PokemonItem from './pages/show'


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<PokemonInfiniteScroll />} />
        <Route path="/pokemon/:id" element={<PokemonItem />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
