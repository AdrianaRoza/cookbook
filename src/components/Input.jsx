import { useState } from "react"

const Input = () => {
  const [newRevenues, setNewRevenues] = useState('')
  const [category, setCategory] = useState('lanch')

  const addRecipe = () => {
    if (!newRevenues.trim()) return // Evita adicionar receitas vazias

    const novaReceita = {
      image: "/image/placeholder.jpg",
      titulo: newRevenues,
      descricao: `Receita adicionada na categoria ${category}.`,
      autor: "Usuário",
      data: new Date().toLocaleDateString("pt-BR"),
      tempo: "1 min de leitura"
    }

    setRevenuesLunch([novaReceita, ...revenuesLunch])
    setNewRevenues('')
    setCategory('lanch')
  }
  return (
    <div className="p-6 bg-orange-100">

       {/* Campo de adição de receitas */}
       <div className="mb-6 w-full max-w-2xl mx-auto text-center">
        <input
          type="text"
          value={newRevenues}
          onChange={(e) => setNewRevenues(e.target.value)}
          placeholder='Digite o nome da nova receita...'
          className="w-full p-3 border border-orange-300 rounded-lg mb-2
            focus:outline-none focus:border-orange-500 focus-ring-2 
            focus:ring-orange-800"
        />
        <button
          onClick={addRecipe}
          className=' bg-orange-300 text-white font-bold py-2 
            px-4 rounded hover:bg-orange-200'
        >
          Adicionar Receita
        </button>
      </div>
    </div>
    )
}

export default Input
