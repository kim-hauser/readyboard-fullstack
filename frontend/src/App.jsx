import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import BackToTop from './components/BackToTop'
import ChangeDetail from './pages/ChangeDetail'
import CreateChange from './pages/CreateChange'
import Dashboard from './pages/Dashboard'
import EditChange from './pages/EditChange'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="app">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/changes" element={<Dashboard />} />
        <Route path="/changes/new" element={<CreateChange />} />
        <Route path="/changes/:id" element={<ChangeDetail />} />
        <Route path="/changes/:id/edit" element={<EditChange />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Works as a redirect. */}
        
      </Routes>
      <BackToTop />
      <Footer />
    </div>
  )
}

export default App