import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Home = () => {
  const [newRevenues, setNewRevenues] = useState("")
  const [category, setCategory] = useState("lunch")
  const navigate = useNavigate()

  const addRecipe = () => {
    if(!newRevenues.trim())return alert("Digite sua receita.")
      alert(`Receita "${newRevenues}" adicionada à categoria "${category}"`)
      setCategory("")
      navigate(`/${category}`)
  }

  return (
    <div 
      className='bg-orange-100 p-6 flex flex-col items-center'>
      
      <h1 
        className='text-3xl sm:text-4xl font-bold mb-8 
          text-center text-orange-800'>
        Minhas Receitas
      </h1>

      {/* Campo de adicao de receitas */}
      <div className="mb-6 w-full max-w-2xl text-center">
        
        <input 
          type="text" 
          value={newRevenues}
          onChange={(e) => setNewRevenues(e.target.value)}
          placeholder='Digite o nome da nova receita...'
          className="w-full p-3 border border-orange-300 rounded-lg mb-2
            focus:outline-none focus:border-orange-500 focus-ring-2 
            focus:ring-orange-800" 
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 text-orange-800 bg-white rounded-md 
            border-orange-300 mb-2 focus:outline-none 
            focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
        >

          <option value="lanch">Almoço</option>
          <option value="dinner">Jantar</option>
          <option value="breakfast">Café da Manhã</option>
          <option value="snacks">Lanches</option>
          <option value="drinks">Bebidas</option>
          <option value="broths">Caldos</option>

        </select>

        <button
          onClick={addRecipe}
          className='block w-full bg-orange-300 text-white font-bold py-2 
            px-4 rounded hover:bg-orange-200'
        >
          Adicionar Receita
        </button>

      </div>

      <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         gap-4 w-full max-w-6xl'>

          <LinkCard to= "/lunch" title="Almoço" />
          <LinkCard to= "/dinner" title="Jantar" />
          <LinkCard to= "/breakfast" title="Café da Manhã" />
          <LinkCard to= "/snacks" title="Lanches" />
          <LinkCard to= "/drinks" title="Bebidas" />
          <LinkCard to= "/broths" title="Caldos" />

      </div>
    </div>
    )
}

function LinkCard({ to, title}) {
  return(
    <Link
      to={to}
      className='bg-white shadow-lg rounded-2xl overflow-hidden transition 
        transform hover:scale-105'>
          <div 
            className='h-40 sm:h-52 bg-orange-300 flex 
              items-center justify-center'>
            
            <span 
              className="text-2xl sm:text-3xl text-white font-bold">
                {title}
            </span>
          </div>
          <div className="p-2 text-center">
            <p className='text-orange-700 text-lg font-medium'>Ver receitas de {title}</p>
          </div>
    </Link>
  )
}

export default Home
