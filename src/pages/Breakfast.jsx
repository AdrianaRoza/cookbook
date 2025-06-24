import { useState } from "react"
import AddRecipeModal from "../components/AddRecipeModal"

const Breakfast = () => {
  const [showModal, setShowModal] = useState(false)
  const [receitaSelecionada, setReceitaSelecionada] = useState(null)
  const [receitas, setReceitas] = useState([
    {
      titulo: "Panqueca Americana",
      descricao: "Fofinha com mel e frutas...",
      autor: "Ana",
      data: "12 Jun 2025",
      tempo: "2 min de leitura",
      ingredientes: ["1 ovo", "1 xícara de leite", "1 xícara de farinha"],
    }
  ])

  const handleAddRecipe = (novaReceita) => {
    setReceitas([...receitas, novaReceita]);
  }

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-800">Café da Manhã</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded 
            hover:bg-orange-600"
        >
          ➕ Adicione sua Receita
        </button>
      </div>

      {/* Lista de Cards com layout menor e centralizado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        gap-4 max-w-6xl mx-auto">
        {receitas.map((receita, index) => (
          <div
            key={index}
            onClick={() => setReceitaSelecionada(receita)}
            className="bg-orange-200 p-4 rounded shadow cursor-pointer 
              transition-all duration-200 hover:shadow-lg h-[220px] flex 
              flex-col items-center justify-center text-center"
          >
            <h2 className="text-lg font-bold text-orange-700 mb-2">
              {receita.titulo}
            </h2>

            <p className="text-gray-700 mb-2 text-sm overflow-hidden 
              text-ellipsis line-clamp-3">
              {receita.descricao}
            </p>

            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Autor:</strong> {receita.autor}</p>
              <p><strong>Data:</strong> {receita.data}</p>
              <p><strong>Tempo:</strong> {receita.tempo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para adicionar nova receita */}
      <AddRecipeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddRecipe={handleAddRecipe}
      />

      {/* Modal para visualização da receita completa */}
      {receitaSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex 
          justify-center items-center z-50">

          <div className="bg-white p-6 rounded-lg shadow-md w-full 
            max-w-2xl max-h-[90vh] overflow-auto relative">
            <button
              onClick={() => setReceitaSelecionada(null)}
              className="absolute top-2 right-3 text-red-600 text-xl 
                font-bold"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold mb-2 text-orange-800">
              {receitaSelecionada.titulo}
            </h2>

            <p className="text-gray-800 mb-3 whitespace-pre-line">
              {receitaSelecionada.descricao}
            </p>

            <div className="text-sm text-gray-500 mb-4">
              <p><strong>Autor:</strong> {receitaSelecionada.autor}</p>
              <p><strong>Data:</strong> {receitaSelecionada.data}</p>
              <p><strong>Tempo:</strong> {receitaSelecionada.tempo}</p>
            </div>

            {receitaSelecionada.ingredientes?.length > 0 && (
              <div>
                <p className="font-semibold text-orange-800">Ingredientes:</p>
                <ul className="list-none space-y-1 mt-2">
                  {receitaSelecionada.ingredientes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Breakfast
