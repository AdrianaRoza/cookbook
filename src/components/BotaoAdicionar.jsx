export default function BotaoAdicionar({ onClick, editing }) {
  return (
    <button
      onClick={onClick}
      className="bg-orange-500 text-white px-4 py-2 rounded 
        hover:bg-orange-600 transition"
    >
      {editing ? "✏️ Editando Receita..." : "Adicionar Receita"}
    </button>
  )
}
