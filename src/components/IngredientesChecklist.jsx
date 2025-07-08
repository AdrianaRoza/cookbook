export default function IngredientesChecklist({ receitaId, ingredientes, 
  checklist, toggleCheckbox }) {
  const listaIngredientes = ingredientes.replace(/^"|"$/g, "").split(",")

  return (
    <ul className="list-none">
      {listaIngredientes.map((item, index) => (
        <li key={index}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checklist[receitaId]?.[index] || false}
              onChange={() => toggleCheckbox(receitaId, index)}
            />
            <span className={checklist[receitaId]?.[index] ? 
              "line-through text-gray-500" : ""}>
              {item.trim()}
            </span>
          </label>
        </li>
      ))}
    </ul>
  )
}
