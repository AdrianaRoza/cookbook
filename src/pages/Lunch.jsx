import { useState, useEffect } from "react"

export default function Lunch() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    date: "",
    time: "",
    ingredients: ""
  })

  const [receitas, setReceitas] = useState([])
  const [checklist, setChecklist] = useState({})
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchReceitas()
  }, [])

  const fetchReceitas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/receitas/")
      const data = await response.json()
      setReceitas(data)

      const initialChecklist = {}
      data.forEach(r => {
        initialChecklist[r.id] = r.ingredients.split(",").map(() => false)
      })
      setChecklist(initialChecklist)
    } catch (error) {
      console.error("Erro ao buscar receitas:", error)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = editingId
      ? `http://127.0.0.1:8000/receitas/${editingId}`
      : "http://127.0.0.1:8000/receitas/"

    const method = editingId ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!response.ok) throw new Error("Erro ao salvar receita")

      alert(`Receita ${editingId ? "atualizada" : "salva"} com sucesso!`)
      setForm({ title: "", description: "", author: "", date: "", time: "", ingredients: "" })
      setEditingId(null)
      fetchReceitas()
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
  }

  const startEdit = (receita) => {
    setForm({
      title: receita.title,
      description: receita.description,
      author: receita.author,
      date: receita.date?.split("T")[0] || "",
      time: receita.time?.slice(0, 5) || "",
      ingredients: receita.ingredients
    })
    setEditingId(receita.id)
  }

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return
    try {
      const response = await fetch(`http://127.0.0.1:8000/receitas/${id}`, {
        method: "DELETE"
      })
      if (!response.ok) throw new Error("Erro ao excluir receita")
      alert("Receita excluída com sucesso!")
      fetchReceitas()
    } catch (err) {
      console.error(err)
      alert("Erro ao excluir receita.")
    }
  }

  const toggleCheckbox = (receitaId, index) => {
    setChecklist(prev => ({
      ...prev,
      [receitaId]: prev[receitaId].map((val, i) => i === index ? !val : val)
    }))
  }

  return (
    <div className="p-6 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-800 mb-4">
        {editingId ? "Editar Receita" : "Cadastrar Receita de Almoço"}
      </h1>

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
        <input 
          name="ingredients" 
          value={form.ingredients} 
          onChange={handleChange} 
          placeholder="Ingredientes separados por vírgula" 
          className="block p-2 w-full rounded" 
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-orange-600 text-white px-4 
            py-2 rounded hover:bg-orange-700">
            {editingId ? "Atualizar Receita" : "Salvar Receita"}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setForm({ title: "", description: "", author: "", date: "", time: "", ingredients: "" })
              setEditingId(null)
            }} 
              className="bg-gray-400 text-white px-4 py-2 
                rounded hover:bg-gray-500">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-bold text-orange-800 mb-4">
        Receitas Salvas
      </h2>
      <ul className="space-y-4">
        {receitas.map((receita) => (
          <li key={receita.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">{receita.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(receita)}
                  className="bg-orange-500 text-white px-3 py-1 rounded 
                    hover:bg-orange-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(receita.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded
                   hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
            <p>{receita.description}</p>
            <p className="text-sm text-gray-600">Autor: {receita.author}</p>
            <p className="text-sm">Data: {receita.date} às {receita.time}</p>

            <div className="mt-2">
              <h4 className="font-semibold">Ingredientes:</h4>
              <ul className="list-none">
                {receita.ingredients.split(",").map((item, index) => (
                  <li key={index}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checklist[receita.id]?.[index] || false}
                        onChange={() => toggleCheckbox(receita.id, index)}
                      />
                      <span className={checklist[receita.id]?.[index] ?
                         "line-through text-gray-500" : ""}>
                        {item.trim()}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
