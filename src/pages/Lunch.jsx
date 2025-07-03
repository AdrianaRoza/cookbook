import { useState } from "react"

export default function Lunch() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    date: "",
    time: "",
    ingredients: ""
  })

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
      console.log("Receita criada:", data)
      alert("Receita salva com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
  }

  return (
    <div className="p-6 bg-orange-100 min-h-screen">
      <h1 
        className="text-2xl font-bold text-orange-800 mb-4">
          Cadastrar Receita de Almoço
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          name="title" 
          onChange={handleChange} 
          placeholder="Título" 
          className="block p-2 w-full" 
        />
        <input 
          name="description" 
          onChange={handleChange} 
          placeholder="Descrição" 
          className="block p-2 w-full" 
        />
        <input 
          name="author" 
          onChange={handleChange} 
          placeholder="Autor" 
          className="block p-2 w-full" 
        />
        <input 
          name="date" 
          type="date" 
          onChange={handleChange} 
          className="block p-2 w-full" 
        />
        <input 
          name="time" 
          type="time" 
          onChange={handleChange} 
          className="block p-2 w-full" 
        />
        <input 
          name="ingredients" 
          onChange={handleChange} 
          placeholder="Ingredientes separados por vírgula" 
          className="block p-2 w-full" 
        />
        <button 
          type="submit" 
          className="bg-orange-600 text-white px-4 py-2 rounded
           hover:bg-orange-700">
          Salvar Receita
        </button>
      </form>
    </div>
  )
}
