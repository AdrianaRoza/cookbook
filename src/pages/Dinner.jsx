import { useState, useEffect } from "react"
import ReceitaList from "../components/ReceitaList"
import ModalDetalhesReceita from "../components/ModalDetalhesReceita"
import FormReceita from "../components/FormReceita"

const initialFormState = {
  title: "",
  description: "",
  author: "",
  date: "",
  time: "",
  ingredients: "",
  category: "Dinner",
  preparation: ""
}

const Dinner = () => {
  const [receitas, setReceitas] = useState([])
  const [checklist, setChecklist] = useState({})
  const [checklistPreparation,setChecklistPreparation] = useState({})
  const [modalReceita, setModalReceita] = useState(null)

  const [form, setForm] = useState(initialFormState)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchReceitas()
  }, [])

  const fetchReceitas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/receitas/")
      const data = await response.json()

      // Filtra só as receitas da categoria Dinner
      const dinnerReceitas = data.filter(r => r.category === "Dinner")
      setReceitas(dinnerReceitas)

      // Inicializa checklist (se quiser usar)
      const initialChecklist = {}
      dinnerReceitas.forEach(r => {
        initialChecklist[r.id] = (r.ingredients || "")
          .replace(/^"|"$/g, "")
          .split(",")
          .map(() => false)
      })
      setChecklist(initialChecklist)


      // ✅ Inicializa checklist de preparo
      const initialChecklistPreparation = {}
      dinnerReceitas.forEach(r => {
        initialChecklistPreparation[r.id] = (r.preparation || "")
          .split("\n")
          .map(() => false)
      })
      setChecklistPreparation(initialChecklistPreparation)


    } catch (error) {
      console.error("Erro ao buscar receitas:", error)
    }
  }

  const startEdit = (receita) => {
    setForm({
      title: receita.title,
      description: receita.description,
      author: receita.author,
      date: receita.date?.split("T")[0] || "",
      time: receita.time?.slice(0, 5) || "",
      ingredients: (receita.ingredients || "")
        .replace(/^"|"$/g, "")
        .split(",")
        .map(item => item.trim())
        .join("\n"),
      category: receita.category || "Dinner",

      preparation: (receita.preparation || "")
        .replace(/^"|"$/g, "")
        .split(",")
        .map(item => item.trim())
        .join("\n")
    })
    setEditingId(receita.id)
    setShowForm(true)
  }

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(initialFormState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ingredientesConvertidos = form.ingredients
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .join(",")


    const preparoConvertido = form.preparation
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .join("\n")

    const receitaFinal = {
      ...form,
      ingredients: ingredientesConvertidos,
      preparation: preparoConvertido
    }

    const url = editingId
      ? `http://127.0.0.1:8000/receitas/${editingId}`
      : "http://127.0.0.1:8000/receitas/"
    const method = editingId ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receitaFinal)
      })

      if (!response.ok) throw new Error("Erro ao salvar receita")

      alert(`Receita ${editingId ? "atualizada" : "criada"} com sucesso!`)

      setForm(initialFormState)
      setEditingId(null)
      setShowForm(false)
      fetchReceitas()
    } catch (error) {
      console.error(error)
      alert("Erro ao salvar receita.")
    }
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

  const toggleCheckboxPreparation = (receitaId, index) => {
    setChecklistPreparation(prev => ({
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
    <div className="bg-orange-50 p-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 
          className="text-3xl sm:text-4xl font-bold mb-6 
          text-orange-800 text-center">
          Receitas de Jantar
        </h1>

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
            checklistPreparation={checklistPreparation}
            toggleCheckbox={toggleCheckbox}
            toggleCheckboxPreparation={toggleCheckboxPreparation}
            onClose={closeModal}
            formatarData={(dataISO) => {
              if (!dataISO) return ""
              const [ano, mes, dia] = dataISO.split("-")
              return `${dia}/${mes}/${ano}`
            }}
          />
        )}

        {showForm && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 flex 
              justify-center items-center z-50">
            <div 
              className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
              <h2 
                className="text-xl font-bold text-orange-800 mb-4">
                  {editingId ? "Editar Receita" : "Nova Receita"}
              </h2>
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
      </div>
    </div>
  )
}
export default Dinner
