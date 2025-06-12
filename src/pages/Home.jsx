import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div 
      className='min-h-screen bg-orange-100 p-6 
        flex flex-col items-center'>
      
      <h1 
        className='text-3xl sm:text-4xl font-bold md-8 
          text-center text-orange-800'>
        Minhas Receitas
      </h1>

      <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         gap-4 w-full max-w-3xl'>

          <LinkCard to= "/lunch" title="Almoço" />
          <LinkCard to= "/dinner" title="Jantar" />
          <LinkCard to= "/cafe da manha" title="Café da Manhã" />
          <LinkCard to= "/Lanches" title="Lanches" />
          <LinkCard to= "/Bebidas" title="Bebidas" />
          <LinkCard to= "/Caudos" title="Caldos" />

      </div>
    </div>
    )
}

function LinkCard({ to, title}) {
  return(
    <Link
      to={to}
      className='bg-white shadow-md rounded-2xl p-6 text-center
       text-xl gap-4 w-full max-w-3xl'>
        {title}
    </Link>
  )
}

export default Home
