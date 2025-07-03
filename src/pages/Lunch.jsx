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

  // Buscar receitas ao carregar a página
  useEffect(() => {
    fetchReceitas()
  }, [])

  const fetchReceitas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/receitas/")
      const data = await response.json()
      setReceitas(data)
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (!response.ok) throw new Error("Erro ao criar receita")

      const data = await response.json()
      alert("Receita salva com sucesso!")

      setForm({
        title: "",
        description: "",
        author: "",
        date: "",
        time: "",
        ingredients: ""
      })

      fetchReceitas() // Atualiza a lista de receitas
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
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
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Salvar Receita
        </button>
      </form>

      <h2 className="text-2xl font-bold text-orange-800 mb-4">Receitas Salvas</h2>
      <ul className="space-y-4">
        {receitas.map((receita) => (
          <li
            key={receita.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col"
          >
            <span className="font-bold text-lg">{receita.title}</span>
            <span className="text-sm text-gray-600">{receita.description}</span>
            <span className="text-sm">Autor: {receita.author}</span>
            <span className="text-sm">Data: {receita.date}</span>
            <span className="text-sm">Hora: {receita.time}</span>
            <span className="text-sm">
              Ingredientes:{" "}
              <ul className="list-disc list-inside">
                {receita.ingredients
                  .split(",")
                  .map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
              </ul>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
