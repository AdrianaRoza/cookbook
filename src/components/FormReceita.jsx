// src/components/FormReceita.jsx

export default function FormReceita({
  form,
  editingId,
  handleChange,
  handleSubmit,
  handleCancel
}) {
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

      <div className="flex gap-2">
        <button 
          type="submit" 
          className="bg-orange-500 text-white px-4 py-2 rounded
           hover:bg-orange-600">
          {editingId ? "Atualizar Receita" : "Salvar Receita"}
        </button>
        <button 
          type="button" 
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded
          hover:bg-gray-500">
          Cancelar
        </button>
      </div>
    </form>
  )
}
