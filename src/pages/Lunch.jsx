import { useState, useEffect } from "react"
import FormReceita from "../components/FormReceita"
import FormModal from "../components/FormModal"
import ReceitaList from "../components/ReceitaList"
import ModalDetalhesReceita from "../components/ModalDetalhesReceita"
import BotaoAdicionar from "../components/BotaoAdicionar"

const initialFormState = {
  title: "",
  description: "",
  author: "",
  date: "",
  time: "",
  ingredients: ""
}

export default function Lunch() {
  const [form, setForm] = useState(initialFormState)
  const [receitas, setReceitas] = useState([])
  const [checklist, setChecklist] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [modalReceita, setModalReceita] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchReceitas()
  }, [])

  function formatarData(dataISO) {
    if (!dataISO) return ""
    const [ano, mes, dia] = dataISO.split("-")
    return `${dia}/${mes}/${ano}`
  }

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

    const ingredientesConvertidos = form.ingredients
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .join(",")

    const receitaFinal = { ...form, ingredients: ingredientesConvertidos }

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receitaFinal)
      })
      if (!response.ok) throw new Error("Erro ao salvar receita")
      alert(`Receita ${editingId ? "atualizada" : "salva"} com sucesso!`)
      setForm(initialFormState)
      setEditingId(null)
      setShowForm(false)
      fetchReceitas()
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
  }

  const handleCancel = () => {
    setForm(initialFormState)
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
        .replace(/^"|"$/g, "")
        .split(",")
        .map(item => item.trim())
        .join("\n")
    })
    setEditingId(receita.id)
    setShowForm(true)
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
      [receitaId]: prev[receitaId].map((val, i) => (i === index ? !val : val))
    }))
  }

  const openModal = (receita) => {
    setModalReceita(receita)
  }

  const closeModal = () => {
    setModalReceita(null)
  }

  return (
    <div className="bg-orange-50 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-orange-800 text-center">
          Receitas de Almoço
        </h1>

        <div className="flex justify-end mb-6">
          <BotaoAdicionar
            onClick={() => {
              setShowForm(true)
              setEditingId(null)
            }}
            editing={!!editingId}
          />
        </div>

        {showForm && (
          <FormModal onClose={handleCancel}>
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
          </FormModal>
        )}

        <ReceitaList
          receitas={receitas}
          onClick={openModal}
          onEdit={startEdit}
          onDelete={handleDelete}
        />

        {modalReceita && (
          <ModalDetalhesReceita
            receita={modalReceita}
            checklist={checklist}
            toggleCheckbox={toggleCheckbox}
            onClose={closeModal}
            formatarData={formatarData}
          />
        )}
      </div>
    </div>
  )
}
