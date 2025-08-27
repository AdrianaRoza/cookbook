const PreparationChecklist = ({ receitaId, preparation, checklistPreparation, toggleCheckboxPreparation }) => {

  const listPreparation = (preparation || "").split("\n");

  return (
    <ul className="list-none">
      {listPreparation.map((step, index) => (
        <li key={index}>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checklistPreparation?.[receitaId]?.[index] || false}
              onChange={() => toggleCheckboxPreparation(receitaId, index)}
            />
            <span className={checklistPreparation[receitaId]?.[index] ? 
              "line-through text-gray-500" : ""}>
              {step.trim()}
            </span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export default PreparationChecklist
