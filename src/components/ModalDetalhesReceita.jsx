import FormModal from "./FormModal"
import IngredientesChecklist from "./IngredientesChecklist"
import PreparacaoChecklist from "./PreparationCheckList"

const ModalDetalhesReceita = ({ 
  receita, 
  checklist, 
  checklistPreparation,
  toggleCheckbox,
  toggleCheckboxPreparation,
  onClose, 
  formatarData 
}) => {
  // Garante que ingredients e preparation nunca sejam null
  const ingredientesArray = (receita.ingredients || "")
    .replace(/^"|"$/g, "")
    .split(",")
    .map(item => item.trim())
  
  const preparacaoArray = (receita.preparation || "")
    .replace(/^"|"$/g, "")
    .split(",")
    .map(step => step.trim())

  return (
    <FormModal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-2">{receita.title}</h2>
      <p className="mb-2">{receita.description}</p>
      <p className="text-sm text-gray-600 mb-2">Autor: {receita.author}</p>
      <p className="text-sm mb-2">Data: {formatarData(receita.date)} às {receita.time}</p>

      {/* Ingredientes */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Ingredientes:</h4>
        <IngredientesChecklist
          receitaId={receita.id}
          ingredientes={receita.ingredients || ""}
          checklist={checklist}
          toggleCheckbox={toggleCheckbox}
        />
      </div>

      {/* Modo de Preparo */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Modo de Preparo:</h4>
        <PreparacaoChecklist
          receitaId={receita.id}
          preparation={receita.preparation || ""}
          checklistPreparation={checklistPreparation}
          toggleCheckboxPreparation={toggleCheckboxPreparation}
        />
      </div>
    </FormModal>
  )
}

export default ModalDetalhesReceita
