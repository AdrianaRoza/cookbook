import { useState } from "react"
import { Link } from 'react-router-dom'
import BotaoAdicionar from "../components/BotaoAdicionar"
import FormModal from "../components/FormModal"
import FormReceita from "../components/FormReceita"

const initialFormState = {
  title: "",
  description: "",
  author: "",
  date: "",
  time: "",
  ingredients: ""
}

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(initialFormState)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCancel = () => {
    setForm(initialFormState)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ingredientesConvertidos = form.ingredients
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .join(",")

    const receitaFinal = { ...form, ingredients: ingredientesConvertidos }

    try {
      const response = await fetch("http://127.0.0.1:8000/receitas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(receitaFinal)
      })
      if (!response.ok) throw new Error("Erro ao salvar receita")
      alert("Receita salva com sucesso!")
      setForm(initialFormState)
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert("Erro ao salvar receita.")
    }
  }

  return (
    <div className='bg-orange-50 p-6 flex flex-col items-center'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-4 text-orange-800 text-center'>
        Minhas Receitas
      </h1>

      {/* Botão Adicionar no topo */}
      <div className='mb-6 self-end w-full max-w-6xl flex justify-end'>
        <BotaoAdicionar
          onClick={() => setShowForm(true)}
          editing={false}
        />
      </div>

      {showForm && (
        <FormModal onClose={handleCancel}>
          <h1 className="text-2xl font-bold text-orange-800 mb-4">
            Nova Receita
          </h1>
          <FormReceita
            form={form}
            editingId={null}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </FormModal>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl'>
        <LinkCard to="/lunch" title="Almoço" image="/image/almoco.jpg" />
        <LinkCard to="/dinner" title="Jantar" image="/image/jantar.jpg" />
        <LinkCard to="/breakfast" title="Café da Manhã" image="/image/cafe.jpg" />
        <LinkCard to="/snacks" title="Lanches" image="/image/lanche.jpg" />
        <LinkCard to="/drinks" title="Bebidas" image="/image/bebidas.jpg" />
        <LinkCard to="/broths" title="Caldos" image="/image/caldos.jpg" />
      </div>
    </div>
  )
}

function LinkCard({ to, title, image }) {
  return (
    <Link
      to={to}
      className='bg-white shadow-xl rounded-2xl overflow-hidden transition transform hover:scale-105'
    >
      <div
        className='h-40 sm:h-52 bg-cover bg-center'
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className='p-4 text-center'>
        <h2 className='text-xl font-bold text-orange-800 mb-2'>{title}</h2>
        <p className='text-orange-600 text-sm'>Ver receitas de {title}</p>
      </div>
    </Link>
  )
}

export default Home
