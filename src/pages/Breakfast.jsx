import { useState } from "react";
import AddRecipeModal from "../components/AddRecipeModal";

const Breakfast = () => {
  const [showModal, setShowModal] = useState(false);
  const [receitas, setReceitas] = useState([
    {
      titulo: "Panqueca Americana",
      descricao: "Fofinha com mel e frutas...",
      autor: "Ana",
      data: "12 Jun 2025",
      tempo: "2 min de leitura",
      ingredientes: ["1 ovo", "1 xícara de leite", "1 xícara de farinha"],
    },
  ]);

  const handleAddRecipe = (novaReceita) => {
    setReceitas([...receitas, novaReceita]);
  };

  return (
    <div className="min-h-screen bg-orange-100 p-6">
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-800">Café da Manhã</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          ➕ Adicione sua Receita
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {receitas.map((receita, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold text-orange-700">{receita.titulo}</h2>
            <p className="text-gray-700 my-2 whitespace-pre-line">{receita.descricao}</p>
            <div className="text-sm text-gray-500 mb-2">
              <p><strong>Autor:</strong> {receita.autor}</p>
              <p><strong>Data:</strong> {receita.data}</p>
              <p><strong>Tempo:</strong> {receita.tempo}</p>
            </div>

            {receita.ingredientes && receita.ingredientes.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold text-orange-800">Ingredientes:</p>
                <ul className="list-none space-y-1">
                  {receita.ingredientes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <AddRecipeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddRecipe={handleAddRecipe}
      />
    </div>
  );
};

export default Breakfast;
