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
      <div className="min-h-screen flex flex-col">
      <nav 
          className="bg-orange-100p-4 flex gap-4 
            text-orange-800 font-semibold shadow">
          <Link to="/" className='hover:underline'>Home</Link>
        </nav>
        <main className="flex-grow p-4">
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
      </div>
   </Router>
   <Footer/>
  </>
  )
}

export default App
