const FormReceita = ({
  form,
  editingId,
  handleChange,
  handleSubmit,
  handleCancel
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input 
        name="title" 
        value={form.title} 
        onChange={handleChange}
        placeholder="Título" 
        className="block p-2 w-full rounded" 
      />

      <input 
        name="description" 
        value={form.description} 
        onChange={handleChange}
        placeholder="Descrição" 
        className="block p-2 w-full rounded" 
      />

      <input 
        name="author" 
        value={form.author} 
        onChange={handleChange}
        placeholder="Autor" 
        className="block p-2 w-full rounded" 
      />

      <input 
        name="date" 
        type="date" 
        value={form.date} 
        onChange={handleChange}
        className="block p-2 w-full rounded" 
      />

      <input 
        name="time" 
        type="time" 
        value={form.time} 
        onChange={handleChange}
        className="block p-2 w-full rounded" 
      />

      <textarea
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
        placeholder="Digite um ingrediente por linha"
        className="block p-2 w-full rounded h-32 resize-none"
      />

      <textarea
        name="preparation"
        value={form.preparation}
        onChange={handleChange}
        placeholder="Digite o modo de preparo, cada passo em uma linha"
        className="block p-2 w-full rounded h-32 resize-none"
      />

      
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="block p-2 w-full rounded bg-white border"
        required
      >
        <option value="">Selecione uma categoria</option>
        <option value="Lunch">Almoço</option>
        <option value="Dinner">Jantar</option>
        <option value="Breakfast">Café da Manhã</option>
        <option value="Snacks">Lanches</option>
        <option value="Drinks">Bebidas</option>
        <option value="Broths">Caldos</option>
      </select>

      <div className="flex gap-2">
        <button 
          type="submit" 
          className="bg-orange-500 text-white px-4 py-2 rounded 
            hover:bg-orange-600"
        >
          {editingId ? "Atualizar Receita" : "Salvar Receita"}
        </button>
        <button 
          type="button" 
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded 
            hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
export default FormReceita

