import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Breakfast from './pages/Breakfast'
import Dinner from './pages/Dinner'
import Lunch from './pages/Lunch'
import Snacks from './pages/Snacks'
import Drinks from './pages/Drinks'
import Broths from './pages/Broths'
import Footer from './components/Footer'

function App() {

  return (
  <>
   <Router>
      <div className="h-screen flex flex-col bg-orange-100 overflow-hidden">
      <nav 
          className="bg-orange-100 p-4 flex gap-4 
            text-orange-800 font-semibold shadow">
          <Link to="/">Home</Link>
        </nav>
        <main className="flex-grow p-4 overflow-auto">
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="lunch" element={ <Lunch/> }/>
          <Route path="dinner" element={ <Dinner/> }/>
          <Route path="breakfast" element={ <Breakfast/> }/>
          <Route path="snacks" element={ <Snacks/> }/>
          <Route path="drinks" element={ <Drinks/> }/>
          <Route path="broths" element={ <Broths/> }/>
        </Routes>
      </main>
      <Footer/>
      </div>
   </Router>
   
  </>
  )
}

export default App
