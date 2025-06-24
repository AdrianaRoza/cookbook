
import { useState } from "react"

const AddRecipeModal = ({ isOpen, onClose, onAddRecipe }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    autor: "",
    data: "",
    tempo: "",
    ingredientes: [""],
  });

  const handleChange = (e, index = null) => {
    if (e.target.name === "ingredientes") {
      const novos = [...formData.ingredientes]
      novos[index] = e.target.value
      setFormData({ ...formData, ingredientes: novos })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const adicionarIngrediente = () => {
    setFormData({ ...formData, ingredientes: [...formData.ingredientes, ""] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const novaReceita = {
      ...formData,
      ingredientes: formData.ingredientes.filter((i) => i.trim() !== "")
    }
    onAddRecipe(novaReceita); // Envia para a página
    onClose() // Fecha modal
    setFormData({
      titulo: "",
      descricao: "",
      autor: "",
      data: "",
      tempo: "",
      ingredientes: [""],
    }) // Limpa formulário
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-orange-800">Adicionar Receita</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {["titulo", "descricao", "autor", "data", "tempo"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          ))}

          <div>
            <label className="block font-semibold text-orange-800 mb-1">
              Ingredientes (Checklist):
            </label>
            {formData.ingredientes.map((item, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  name="ingredientes"
                  value={item}
                  onChange={(e) => handleChange(e, index)}
                  className="flex-1 border border-gray-300 rounded px-3 py-1"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarIngrediente}
              className="text-sm text-blue-600 underline"
            >
              + adicionar ingrediente
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded"
            >
              Salvar Receita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRecipeModal
