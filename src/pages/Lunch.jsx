import RevenuesCard from "../components/RevenuesCard"

const revenuesLunch = [
  {
    image: "/image/almoco.jpg",
    titulo: "Frango Grelhado",
    descricao: `Ingredientes:
    - 2 Peitos de Frango Seara sem pele e sem osso
    - 2 colheres de sopa de azeite de oliva
    - 1 colher de chá de sal
    - 1/2 colher de chá de pimenta-do-reino
    - 1/2 colher de chá de alho em pó
    - 1/2 colher de chá de páprica doce ou defumada (opcional)
    - Suco de 1/2 limão (opcional)
    - Ramos de ervas frescas (opcional)

      Modo de Preparo:
      1) Marinada (opcional): misture os ingredientes e deixe na geladeira por 30 min.
      2) Aqueça a grelha.
      3) Grelhe o frango por 5-6 min de cada lado.
      4) Deixe descansar por 5 min antes de servir.`,
    autor: "Adriana",
    data: "16 Jun 2025",
    tempo: "3 min de leitura"
  },
  {
    image: "/image/lasanha.jpg",
    titulo: "Lasanha à Bolonhesa",
    descricao: `Camadas de massa com molho de carne moída e queijo gratinado.

      Ingredientes:
      - Massa de lasanha
      - Molho à bolonhesa
      - Queijo mussarela
      - Parmesão ralado

      Modo de Preparo:
      Monte em camadas e asse por 30 minutos.`,
    autor: "João",
    data: "15 Jun 2025",
    tempo: "4 min de leitura"
  },
  {
    image: "/image/macarrao.jpg",
    titulo: "Macarrão Alho e Óleo",
    descricao: `Simples, rápido e delicioso!
      Ingredientes:
      - Macarrão espaguete
      - Alho picado
      - Azeite
      - Pimenta calabresa

      Modo de Preparo:
      Cozinhe o macarrão, refogue o alho no azeite, misture e sirva.`,
    autor: "Maria",
    data: "14 Jun 2025",
    tempo: "2 min de leitura"
  }
]

const  Lunch = () => {
  return (
    <div className="p-6 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-800 mb-8">
        Receitas de Almoço
      </h1>


      <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         gap-4 w-full max-w-6xl mx-auto'>

        {revenuesLunch.map((receita, index) => (
          <RevenuesCard
            key={index}
            image={receita.image}
            titulo={receita.titulo}
            descricao={receita.descricao}
            autor={receita.autor}
            data={receita.data}
            tempo={receita.tempo}
          />
        ))}
      </div>
    </div>
    )
}

export default Lunch
