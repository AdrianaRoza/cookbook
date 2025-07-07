// src/components/ReceitaCard.jsx

export default function ReceitaCard({ receita, onClick, onEdit, onDelete }) {
  return (
    <li
      onClick={() => onClick(receita)}
      className="bg-white p-6 min-h-[180px] rounded-2xl shadow-xl 
        hover:shadow-2xl hover:scale-[1.02] cursor-pointer 
        transition-all duration-200"
    >
      <div className="mb-4">
        <h3 
          className="font-bold text-xl text-orange-700 mb-2">
            {receita.title}
        </h3>
        <p 
          className="text-gray-600 text-sm">
            {receita.description}
        </p>
      </div>
      <div className="text-sm text-gray-500 mt-auto">
        <p><strong>Autor:</strong> 
          {receita.author}
        </p>
        <p><strong>Data:</strong> 
          {receita.date} às {receita.time}
        </p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(receita)
            }}
            className="bg-orange-500 text-white px-3 py-1 
              rounded hover:bg-orange-600"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(receita.id)
            }}
            className="bg-red-500 text-white px-3 py-1 
              rounded hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </li>
  )
}
