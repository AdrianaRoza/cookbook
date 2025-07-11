import FormModal from "./FormModal"
import IngredientesChecklist from "./IngredientesChecklist"

 const ModalDetalhesReceita = ({ receita, checklist, 
  toggleCheckbox, onClose, formatarData }) => {
  return (
    <FormModal onClose={onClose}>
      <h2 className="text-2xl font-bold mb-2">{receita.title}</h2>
      <p className="mb-2">{receita.description}</p>
      <p className="text-sm text-gray-600 mb-2">Autor: {receita.author}</p>
      <p className="text-sm mb-2">Data: 
        {formatarData(receita.date)} às {receita.time}
      </p>
      <div>
        <h4 className="font-semibold mb-2">Ingredientes:</h4>
        <IngredientesChecklist
          receitaId={receita.id}
          ingredientes={receita.ingredients}
          checklist={checklist}
          toggleCheckbox={toggleCheckbox}
        />
      </div>
    </FormModal>
  )
}
export default ModalDetalhesReceita
