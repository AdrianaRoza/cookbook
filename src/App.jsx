import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Jantar from'./pages/Dinner'

function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="dinner" element={ <Jantar/> }/>
    </Routes>
   </Router>
  )
}

export default App
