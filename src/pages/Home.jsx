import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-orange-50 p-6 flex flex-col items-center'>
      <h1 
        className='text-3xl sm:text-4xl font-bold mb-8 text-center 
        text-orange-800'>
        Minhas Receitas
      </h1>

      <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          gap-6 w-full max-w-6xl'>
        <LinkCard to="/lunch" title="Almoço" image="/image/almoco.jpg" />
        <LinkCard to="/dinner" title="Jantar" image="/image/jantar.jpg" />
        <LinkCard to="/breakfast" title="Café da Manhã" image="/image/cafe.jpg"/>
        <LinkCard to="/snacks" title="Lanches" image="/image/lanche.jpg" />
        <LinkCard to="/drinks" title="Bebidas" image="/image/bebidas.jpg" />
        <LinkCard to="/broths" title="Caldos" image="/image/caldos.jpg" />
      </div>
    </div>
  )
}

function LinkCard({ to, title, image }) {
  return (
    <Link
      to={to}
      className='bg-white shadow-xl rounded-2xl overflow-hidden transition 
        transform hover:scale-105'
    >
      {/* Imagem da categoria */}
      <div
        className='h-40 sm:h-52 bg-cover bg-center'
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Título abaixo da imagem */}
      <div className='p-4 text-center'>
        <h2 className='text-xl font-bold text-orange-800 mb-2'>{title}</h2>
        <p className='text-orange-600 text-sm'>Ver receitas de {title}</p>
      </div>
    </Link>
  );
}

export default Home
