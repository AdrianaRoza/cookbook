import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div 
      className='bg-orange-100 p-6 
        flex flex-col items-center'>
      
      <h1 
        className='text-3xl sm:text-4xl font-bold mb-8 
          text-center text-orange-800'>
        Minhas Receitas
      </h1>

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
