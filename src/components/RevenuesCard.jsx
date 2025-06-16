import { useState } from "react"

const RevenuesCard = ({image, titulo, descricao, autor, data, tempo}) => {
  const [showDetails, setShowDetails] = useState (false)
  
  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-md overflow-hidden 
          max-w-sm mx-auto transition transform hover:scale-105">
        
        <div className="relative">
          <img 
            src={image}
            alt={titulo}
            className="w-full h-56 object-cover" 
          />
          <h2 className="absolute bottom-2 left-2 text-white text-xl font-bold 
            bg-black bg-opacity-50 px-3 py-1 rounded">
              {titulo}
          </h2>
        </div>

        <div className="p-4 text-center">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="bg-orange-500 hover:bg-orange-600 
              text-white font-semibold py-2 px-4 rounded">
            {showDetails ? "Fechar" : "Ver Receita"}
          </button>
        </div>

        {showDetails && (
          <div className="px-4 pb-4 text-gray-700">
            <p className="mb-2">{descricao}</p>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>👩‍🍳 {autor}</span>
              <span>{data} • {tempo}</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default RevenuesCard
