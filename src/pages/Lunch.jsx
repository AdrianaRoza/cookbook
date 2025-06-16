import RevenuesCard from "../components/RevenuesCard"

const  Lunch = () => {
  return (
    <div className="p-6 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-orange-800 mb-8">
        Receitas de Almoço
      </h1>


      <div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
         gap-4 w-full max-w-3xl'>
          
        <RevenuesCard 
          image="/image/almoco.jpg"
          titulo="Frango Grelhado"
          descricao="Ingredientes:
            2 Peitos de Frango Seara sem pele e sem osso
            2 colheres de sopa de azeite de oliva
            1 colher de chá de sal
            1/2 colher de chá de pimenta-do-reino
            1/2 colher de chá de alho em pó
            1/2 colher de chá de páprica doce ou defumada (opcional)
            Suco de 1/2 limão (opcional, para marinar)
            Ramos de ervas frescas (como tomilho ou alecrim) para adicionar aroma (opcional)
            Modo de Preparo:
            1) Marinada (Opcional): Para dar mais sabor e garantir a suculência, você pode marinar o frango. Misture o suco de limão, azeite, sal, pimenta, alho em pó e páprica em um recipiente. Coloque os peitos de frango na marinada e deixe descansar por pelo menos 30 minutos na geladeira. Se estiver com pressa, pule esta etapa e siga direto para o preparo.

            2) Preparação do Frango: Retire os peitos de frango da geladeira e deixe-os atingir a temperatura ambiente (cerca de 10 minutos). Isso ajuda a grelhar uniformemente. Enquanto isso, aqueça uma grelha ou frigideira em fogo médio-alto.

            3) Grelhar o Frango: Pincele a grelha ou a frigideira com um pouco de azeite para evitar que o frango grude. Coloque os peitos de frango e deixe grelhar sem mexer por cerca de 5-6 minutos. Não fique virando o frango com frequência – o segredo é deixá-lo dourar bem de um lado.

            4) Virar e Finalizar: Vire o frango e reduza o fogo para médio. Grelhe o outro lado por mais 5-6 minutos, ou até que o frango atinja uma temperatura interna de 74°C (ou até que, ao cortar, o suco saia claro). Se você tiver um termômetro de carne, use-o para garantir precisão.

            5) Descanso: Retire o frango da grelha e deixe descansar por 5 minutos antes de cortar. Esse tempo permite que os sucos se redistribuam dentro da carne, garantindo uma textura"
          autor="Adriana"
          data="16 Jun 2025"
          tempo="3 min de leitura"
        />

      </div>
    </div>
    )
}

export default Lunch
