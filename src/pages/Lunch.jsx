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
  const [checklist, setChecklist] = useState({}) //controle dos ingredientes marcados

  useEffect(() => {
    fetchReceitas()
  }, [])

  const fetchReceitas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/receitas/")
      const data = await response.json()
      setReceitas(data)

      // Inicializa os checkboxes como todos desmarcados
      const initialChecklist = {}
      data.forEach(receita => {
        initialChecklist[receita.id] = receita.ingredients
          .split(",")
          .map(() => false)
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
    try {
      const response = await fetch("http://127.0.0.1:8000/receitas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!response.ok) throw new Error("Erro ao criar receita")

      alert("Receita salva com sucesso!")
      setForm({
        title: "",
        description: "",
        author: "",
        date: "",
        time: "",
        ingredients: ""
      })
      fetchReceitas()
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
  }

  const toggleCheckbox = (receitaId, index) => {
    setChecklist((prev) => ({
      ...prev,
      [receitaId]: prev[receitaId].map((val, i) =>
        i === index ? !val : val
      )
    }))
  }

  return (
    <div className="p-6 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-800 mb-4">
        Cadastrar Receita de Almoço
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
        <button 
          type="submit" 
          className="bg-orange-600 text-white px-4 py-2 rounded
          hover:bg-orange-700">
          Salvar Receita
        </button>
      </form>

      <h2 
        className="text-2xl font-bold text-orange-800 mb-4">
          Receitas Salvas
      </h2>
      <ul className="space-y-4">
        {receitas.map((receita) => (
          <li key={receita.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold text-xl mb-1">{receita.title}</h3>
            <p>{receita.description}</p>
            <p className="text-sm text-gray-600">Autor: {receita.author}</p>
            <p className="text-sm">Data: {receita.date} às {receita.time}</p>

            <div className="mt-2">
              <h4 className="font-semibold">Ingredientes:</h4>
              <ul className="list-none">
                {receita.ingredients
                  .split(",")
                  .map((item, index) => (
                    <li key={index}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={
                            checklist[receita.id]?.[index] || false
                          }
                          onChange={() =>
                            toggleCheckbox(receita.id, index)
                          }
                        />
                        <span
                          className={
                            checklist[receita.id]?.[index]
                              ? "line-through text-gray-500"
                              : ""
                          }
                        >
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
