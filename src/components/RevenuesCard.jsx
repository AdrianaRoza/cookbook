import { useState } from "react";

const RevenuesCard = ({ image, titulo, descricao, autor, data, tempo }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden 
        max-w-sm mx-auto transition transform hover:scale-105"
      >
        {/* IMAGEM E TÍTULO SOBREPOSTO */}
        <div className="relative">
          <img
            src={image}
            alt={titulo}
            className="w-full h-56 object-cover"
          />
          <h2
            className="absolute bottom-2 left-2 text-white text-xl font-bold 
            bg-black bg-opacity-50 px-3 py-1 rounded"
          >
            {titulo}
          </h2>
        </div>

        {/* BOTÃO */}
        <div className="p-4 text-center">
          <button
            onClick={() => setShowDetails(true)}
            className="bg-orange-500 hover:bg-orange-600 
            text-white font-semibold py-2 px-4 rounded"
          >
            Ver Receita
          </button>
        </div>
      </div>

      {/* MODAL DE DETALHES */}
      {showDetails && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-auto max-h-[90vh] relative p-6">
            {/* BOTÃO FECHAR */}
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-3xl font-bold"
            >
              &times;
            </button>

            {/* CONTEÚDO DO MODAL */}
            <img
              src={image}
              alt={titulo}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
            <h1 className="text-3xl font-bold text-orange-700 mb-4">
              {titulo}
            </h1>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{descricao}</p>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>👩‍🍳 {autor}</span>
              <span>{data} • {tempo}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RevenuesCard;
