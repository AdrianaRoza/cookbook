import { useState, useEffect } from "react"
import FormReceita from "../components/FormReceita"

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
  const [modalReceita, setModalReceita] = useState(null)
  const [showForm, setShowForm] = useState(false) // agora controla o modal de formulário

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
        initialChecklist[r.id] = r.ingredients
          .replace(/^"|"$/g, "")
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
      setForm({ title: "", description: "", author: "", date: "", time: "", 
        ingredients: "" })
      setEditingId(null)
      setShowForm(false) // fecha o modal
      fetchReceitas()
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
  }

  const handleCancel = () => {
    setForm({ title: "", description: "", author: "", date: "", time: "", 
      ingredients: "" })
    setEditingId(null)
    setShowForm(false)
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
    setShowForm(true) // abre o modal de edição
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

  const openModal = (receita) => {
    setModalReceita(receita)
  }

  const closeModal = () => {
    setModalReceita(null)
  }

  return (
    <div className="p-6 bg-orange-100 min-h-screen">

      <button
        onClick={() => {
          setShowForm(true)
          setEditingId(null) // se estiver criando, limpa a edição
        }}
        className="bg-orange-600 text-white px-4 py-2 rounded 
          hover:bg-orange-700 mb-6"
      >
        {editingId ? "✏️ Editando Receita..." : "➕ Adicionar Receita"}
      </button>

      {/* Modal de formulário */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm 
            flex items-center justify-center z-50 transition-opacity 
            duration-300">
          <div 
            className="bg-white rounded-xl p-6 w-11/12 max-w-2xl max-h-[90vh] 
              overflow-y-auto shadow-2xl transform transition-all duration-300 
              scale-95 opacity-0 animate-fadeIn relative">

            <button
              onClick={handleCancel}
              className="absolute top-2 right-3 text-red-600 text-xl font-bold"
            >
              ✕
            </button>
            <h1 className="text-2xl font-bold text-orange-800 mb-4">
              {editingId ? "Editar Receita" : "Nova Receita de Almoço"}
            </h1>

            <FormReceita
              form={form}
              editingId={editingId}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-orange-800 mb-4">
        Receitas Salvas
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receitas.map((receita) => (
          <li
            key={receita.id}
            onClick={() => openModal(receita)}
            className="bg-white p-6 min-h-[180px] rounded-xl shadow-md 
              hover:shadow-lg cursor-pointer transition duration-200 flex 
              flex-col justify-between"
          >
            <div className="mb-4">
              <h3 className="font-bold text-xl text-orange-700 mb-2">
                {receita.title}
              </h3>
              <p className="text-gray-600 text-sm">{receita.description}</p>
            </div>
            <div className="text-sm text-gray-500 mt-auto">
              <p><strong>Autor:</strong> {receita.author}</p>
              <p><strong>Data:</strong> {receita.date} às {receita.time}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    startEdit(receita)
                  }}
                  className="bg-orange-500 text-white px-3 py-1 rounded 
                    hover:bg-orange-600"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(receita.id)
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded
                   hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de detalhes */}
      {modalReceita && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 
            backdrop-blur-sm flex items-center justify-center z-50 
            transition-opacity duration-300">
          <div 
            className="bg-white rounded-xl p-6 w-11/12 max-w-2xl 
              max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all 
              duration-300 scale-95 opacity-0 animate-fadeIn relative">

            <button
              onClick={closeModal}
              className="text-red-500 text-right w-full font-bold mb-4"
            >
              ✕ Fechar
            </button>
            <h2 className="text-2xl font-bold mb-2">{modalReceita.title}</h2>
            <p className="mb-2">{modalReceita.description}</p>
            <p className="text-sm text-gray-600 mb-2">
              Autor: {modalReceita.author}
            </p>
            <p className="text-sm mb-4">
              Data: {modalReceita.date} às {modalReceita.time}
            </p>

            <div>
              <h4 className="font-semibold mb-2">Ingredientes:</h4>
              <ul className="list-none">
                {modalReceita.ingredients
                  .replace(/^"|"$/g, "")
                  .split(",")
                  .map((item, index) => (
                    <li key={index}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checklist[modalReceita.id]?.[index] || false}
                          onChange={() => toggleCheckbox(modalReceita.id,index)}
                        />
                        <span className={checklist[modalReceita.id]?.[index]
                          ? "line-through text-gray-500"
                          : ""}>
                          {item.trim()}
                        </span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
