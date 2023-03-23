import React from 'react'
import Header from "./Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsDetails from './Components/CardsDetails';
import Cards from './Components/Cards';
import{ Routes, Route } from 'react-router-dom';
import './Components/style.css';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Cards />} />
        <Route path='/cart/:id' element={<CardsDetails />} />
      </Routes>
    </>
  )
}

export default App