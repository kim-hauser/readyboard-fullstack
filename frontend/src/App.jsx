import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Header from './components/Header'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import ChangeDetail from './pages/ChangeDetail'


function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/changes" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Works as a redirect. */}
        <Route path="/change/:id" element={<ChangeDetail />} />
      </Routes>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default App