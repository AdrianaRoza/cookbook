import ReceitaCard from "./ReceitaCard"

export default function ReceitaList({ receitas, onClick, onEdit, onDelete }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {receitas.map((receita) => (
        <ReceitaCard
          key={receita.id}
          receita={receita}
          onClick={onClick}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
