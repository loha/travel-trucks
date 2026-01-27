import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import DetailsPage from './pages/DetailsPage/DetailsPage'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<DetailsPage />} />
      </Routes>
    </>
  )
}

export default App
